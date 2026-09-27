import importlib.util
import sqlite3
import tempfile
import unittest
from pathlib import Path

spec = importlib.util.spec_from_file_location(
    "openseo_budget", Path(__file__).parents[1] / "openseo_budget.py"
)
budget = importlib.util.module_from_spec(spec)
spec.loader.exec_module(budget)


class BudgetTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.db = budget.connect(Path(self.temp.name) / "budget.sqlite")
        self.db.execute("INSERT INTO openseo_budget_cycle VALUES (?,?,?,?,?,NULL)",
                        ("opening-20260927", 10000, 8000, 2000, budget.now()))
        self.db.commit()

    def tearDown(self):
        self.db.close()
        self.temp.cleanup()

    def test_external_spend_and_reservations_count_toward_cap(self):
        self.db.execute("INSERT INTO openseo_credit_events VALUES (?,?,?,?,?,?,?,?,?)",
                        ("rank-1", "opening-20260927", "rank", 270, None, None,
                         "reserved", budget.now(), budget.now()))
        self.db.commit()
        result = budget.capacity(self.db, "keyword_serp", 100, 9000)
        self.assertEqual(result["observedSpend"], 1000)
        self.assertEqual(result["pending"], 270)
        with self.assertRaisesRegex(ValueError, "routine ceiling"):
            budget.capacity(self.db, "competitor_backlink", 100, 2160)
        with self.assertRaisesRegex(ValueError, "routine ceiling"):
            budget.capacity(self.db, "keyword_serp", 100, 2300)

    def test_category_rank_and_cycle_guards(self):
        with self.assertRaisesRegex(ValueError, "Category"):
            budget.capacity(self.db, "local", 501, 10000)
        with self.assertRaisesRegex(ValueError, "300-credit"):
            budget.capacity(self.db, "rank", 301, 10000)
        with self.assertRaisesRegex(ValueError, "billing cycle"):
            budget.capacity(self.db, "rank", 1, 10001)


    def test_positive_estimate_and_shared_database_safety(self):
        with self.assertRaisesRegex(ValueError, "positive"):
            budget.capacity(self.db, "rank", 0, 10000)
        self.assertEqual(self.db.execute("PRAGMA foreign_keys").fetchone()[0], 1)
        self.assertEqual(self.db.execute("PRAGMA journal_mode").fetchone()[0].lower(), "wal")
        with self.assertRaises(sqlite3.IntegrityError):
            self.db.execute("INSERT INTO openseo_credit_events VALUES (?,?,?,?,?,?,?,?,?)",
                            ("invalid-fk", "missing-cycle", "rank", 1, None, None,
                             "reserved", budget.now(), budget.now()))
        self.db.rollback()

    def test_provider_overcharge_is_recorded_and_halts_paid_work(self):
        self.db.execute("INSERT INTO openseo_credit_events VALUES (?,?,?,?,?,?,?,?,?)",
                        ("bad-charge", "opening-20260927", "rank", 100, None, None,
                         "reserved", budget.now(), budget.now()))
        self.db.commit()
        result = budget.settle_event(self.db, "bad-charge", 9000, 1000)
        self.db.commit()
        self.assertTrue(result["budgetHalt"])
        self.assertEqual(self.db.execute("SELECT state,actual_credits FROM openseo_credit_events WHERE request_key='bad-charge'").fetchone(),
                         ("overrun", 9000))
        spent, pending, categories = budget.usage(self.db, "opening-20260927")
        self.assertEqual((spent, pending, categories["rank"]), (9000, 0, 9000))
        with self.assertRaisesRegex(ValueError, "reconcile"):
            budget.capacity(self.db, "keyword_serp", 1, 1000)


if __name__ == "__main__":
    unittest.main()
