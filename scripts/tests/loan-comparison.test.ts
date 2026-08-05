import assert from "node:assert/strict";
import test from "node:test";
import { calculateLoanDetails, compareLoanResults } from "../../src/lib/loan-comparison";

test("calculates a standard monthly principal-and-interest scenario", () => {
  const result = calculateLoanDetails({ amount: "100000", rate: "6", term: "5", fees: "1000" });
  assert.ok(result);
  assert.ok(Math.abs(result.monthlyPayment - 1933.28) < 0.01);
  assert.ok(Math.abs(result.totalCost - 116996.81) < 0.02);
});

test("supports a zero-rate offer and adds entered fees", () => {
  const result = calculateLoanDetails({ amount: "12000", rate: "0", term: "1", fees: "300" });
  assert.ok(result);
  assert.equal(result.monthlyPayment, 1000);
  assert.equal(result.totalInterest, 0);
  assert.equal(result.totalCost, 12300);
});

test("rejects incomplete or economically invalid inputs", () => {
  assert.equal(calculateLoanDetails({ amount: "", rate: "6", term: "5", fees: "0" }), null);
  assert.equal(calculateLoanDetails({ amount: "100", rate: "-1", term: "5", fees: "0" }), null);
  assert.equal(calculateLoanDetails({ amount: "100", rate: "6", term: "0", fees: "0" }), null);
  assert.equal(calculateLoanDetails({ amount: "100", rate: "6", term: "5", fees: "-1" }), null);
  assert.equal(calculateLoanDetails({ amount: "100", rate: "6", term: "0.1", fees: "0" }), null);
});

test("only identifies a lowest modelled cost for like-for-like principal and term", () => {
  const first = calculateLoanDetails({ amount: "100000", rate: "10", term: "5", fees: "2000" });
  const second = calculateLoanDetails({ amount: "100000", rate: "11", term: "5", fees: "0" });
  assert.deepEqual(compareLoanResults([first, second, null]), { status: "comparable", lowestIndex: 0 });

  const differentPrincipal = calculateLoanDetails({ amount: "90000", rate: "11", term: "5", fees: "0" });
  assert.deepEqual(compareLoanResults([first, differentPrincipal]), { status: "different_principal", lowestIndex: null });

  const differentTerm = calculateLoanDetails({ amount: "100000", rate: "11", term: "3", fees: "0" });
  assert.deepEqual(compareLoanResults([first, differentTerm]), { status: "different_term", lowestIndex: null });
});
