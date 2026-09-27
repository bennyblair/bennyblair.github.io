"""Fail-closed OpenSEO included-credit ledger, backed by the shared SEO control-plane DB."""
import argparse
import json
import sqlite3
from datetime import datetime, timezone

CATEGORY_CAPS = {
    "keyword_serp": 3000,
    "rank": 1500,
    "competitor_backlink": 2000,
    "local": 500,
    "investigation": 1000,
}
ROUTINE_CAP = 8000
RESERVE = 2000


def now():
    return datetime.now(timezone.utc).isoformat()


def connect(path):
    db = sqlite3.connect(path)
    db.execute("PRAGMA busy_timeout=5000")
    db.execute("""CREATE TABLE IF NOT EXISTS openseo_budget_cycle (
        cycle_id TEXT PRIMARY KEY, opening_balance INTEGER NOT NULL,
        routine_cap INTEGER NOT NULL, reserve_credits INTEGER NOT NULL,
        created_at TEXT NOT NULL, closed_at TEXT
    )""")
    db.execute("""CREATE TABLE IF NOT EXISTS openseo_credit_events (
        request_key TEXT PRIMARY KEY, cycle_id TEXT NOT NULL, category TEXT NOT NULL,
        estimated_credits INTEGER NOT NULL, actual_credits INTEGER,
        balance_after INTEGER, state TEXT NOT NULL,
        created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
        FOREIGN KEY(cycle_id) REFERENCES openseo_budget_cycle(cycle_id)
    )""")
    return db


def cycle(db):
    rows = db.execute(
        "SELECT cycle_id,opening_balance,routine_cap,reserve_credits FROM openseo_budget_cycle WHERE closed_at IS NULL"
    ).fetchall()
    if len(rows) != 1:
        raise ValueError("Exactly one confirmed active credit cycle is required")
    return rows[0]


def usage(db, cycle_id):
    rows = db.execute(
        "SELECT category,state,estimated_credits,actual_credits FROM openseo_credit_events WHERE cycle_id=?",
        (cycle_id,),
    ).fetchall()
    spent = sum(actual or 0 for _, state, _, actual in rows if state == "settled")
    pending = sum(estimate for _, state, estimate, _ in rows if state == "reserved")
    categories = {name: sum(
        (actual or 0) if state == "settled" else estimate
        for category, state, estimate, actual in rows
        if category == name and state in ("settled", "reserved")
    ) for name in CATEGORY_CAPS}
    return spent, pending, categories


def capacity(db, category, estimate, balance):
    if category not in CATEGORY_CAPS:
        raise ValueError("Unknown budget category")
    if not isinstance(estimate, int) or estimate < 0 or not isinstance(balance, int):
        raise ValueError("A bounded nonnegative credit estimate and current balance are required")
    cycle_id, opening, cap, reserve = cycle(db)
    if balance > opening:
        raise ValueError("Balance rose; confirm the new billing cycle before spending")
    spent, pending, categories = usage(db, cycle_id)
    observed_spend = max(spent, opening - balance)
    effective_total = observed_spend + pending
    if category == "rank" and estimate > 300:
        raise ValueError("One rank run exceeds the 300-credit ceiling")
    if categories[category] + estimate > CATEGORY_CAPS[category]:
        raise ValueError("Category credit ceiling reached")
    if effective_total + estimate > cap:
        raise ValueError("8,000-credit routine ceiling reached")
    if balance - pending - estimate < reserve:
        raise ValueError("2,000-credit account reserve would be crossed")
    return {
        "cycleId": cycle_id, "category": category, "estimate": estimate,
        "balance": balance, "observedSpend": observed_spend,
        "pending": pending, "routineRemaining": cap - effective_total,
        "categoryRemaining": CATEGORY_CAPS[category] - categories[category],
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--db", required=True)
    sub = ap.add_subparsers(dest="command", required=True)
    init = sub.add_parser("init")
    init.add_argument("--cycle-id", required=True)
    init.add_argument("--opening-balance", type=int, required=True)
    check = sub.add_parser("check")
    reserve = sub.add_parser("reserve")
    for cmd in (check, reserve):
        cmd.add_argument("--category", required=True, choices=list(CATEGORY_CAPS))
        cmd.add_argument("--estimate", type=int, required=True)
        cmd.add_argument("--balance", type=int, required=True)
    reserve.add_argument("--key", required=True)
    settle = sub.add_parser("settle")
    settle.add_argument("--key", required=True)
    settle.add_argument("--actual", type=int, required=True)
    settle.add_argument("--balance", type=int, required=True)
    release = sub.add_parser("release")
    release.add_argument("--key", required=True)
    sub.add_parser("status")
    args = ap.parse_args()
    db = connect(args.db)
    db.execute("BEGIN IMMEDIATE")
    try:
        if args.command == "init":
            existing = db.execute("SELECT cycle_id FROM openseo_budget_cycle WHERE closed_at IS NULL").fetchone()
            if existing and existing[0] != args.cycle_id:
                raise ValueError("Existing cycle remains active; verify its billing reset before opening another")
            db.execute("INSERT OR IGNORE INTO openseo_budget_cycle VALUES (?,?,?,?,?,NULL)",
                       (args.cycle_id, args.opening_balance, ROUTINE_CAP, RESERVE, now()))
            result = {"cycleId": cycle(db)[0], "openingBalance": cycle(db)[1]}
        elif args.command == "check":
            result = capacity(db, args.category, args.estimate, args.balance)
        elif args.command == "reserve":
            result = capacity(db, args.category, args.estimate, args.balance)
            stamp = now()
            db.execute("INSERT INTO openseo_credit_events VALUES (?,?,?,?,?,?,?,?,?)",
                       (args.key, result["cycleId"], args.category, args.estimate, None, None,
                        "reserved", stamp, stamp))
            result["requestKey"] = args.key
        elif args.command == "settle":
            row = db.execute("SELECT state,estimated_credits FROM openseo_credit_events WHERE request_key=?",
                             (args.key,)).fetchone()
            if row is None or row[0] != "reserved" or args.actual < 0 or args.balance < 0:
                raise ValueError("Settlement requires an existing reservation and valid account balance")
            db.execute("UPDATE openseo_credit_events SET state='settled',actual_credits=?,balance_after=?,updated_at=? WHERE request_key=?",
                       (args.actual, args.balance, now(), args.key))
            result = {"requestKey": args.key, "estimated": row[1], "actual": args.actual,
                      "balanceAfter": args.balance, "overEstimate": args.actual > row[1]}
        elif args.command == "release":
            cur = db.execute("UPDATE openseo_credit_events SET state='released',updated_at=? WHERE request_key=? AND state='reserved'",
                             (now(), args.key))
            if cur.rowcount != 1:
                raise ValueError("Only an existing reservation can be released")
            result = {"released": args.key}
        else:
            cycle_id, opening, cap, reserve = cycle(db)
            spent, pending, categories = usage(db, cycle_id)
            result = {"cycleId": cycle_id, "openingBalance": opening, "recordedSpent": spent,
                      "pending": pending, "routineCap": cap, "reserve": reserve,
                      "categories": categories}
        db.commit()
        print(json.dumps(result, sort_keys=True))
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    main()
