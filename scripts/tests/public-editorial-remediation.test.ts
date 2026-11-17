import assert from "node:assert/strict";
import test from "node:test";
import {
  isExactPublicEditorialRemediation,
  remediatePublicEditorialLanguage,
} from "../lib/public-editorial-remediation.mjs";

const LENDER_CLOSER =
  "Emet Capital provides commercial lending solutions to eligible business borrowers.";
const BROKER_CLOSER =
  "Emet Capital is a commercial finance broker, not a lender, and helps eligible business borrowers compare options from lenders.";

test("guide closer lender-positioning sentence is an exact public editorial remediation", () => {
  const previous = [
    "---",
    'title: "Example guide"',
    "---",
    "",
    "Body copy remains unchanged.",
    "",
    `This article is for informational purposes only and does not constitute financial advice. ${LENDER_CLOSER} Please consult a licensed financial adviser, accountant, or commercial finance specialist as appropriate before making any financial decisions.`,
    "",
  ].join("\n");
  const approved = previous.replaceAll(LENDER_CLOSER, BROKER_CLOSER);

  assert.equal(remediatePublicEditorialLanguage(previous), approved);
  assert.equal(isExactPublicEditorialRemediation(previous, approved), true);
  assert.equal(
    isExactPublicEditorialRemediation(previous, approved.replace("Body copy remains unchanged.", "Body copy was rewritten.")),
    false,
  );
});

test("the closer replacement applies to every exact occurrence and ignores surrounding FAQ wording without the period", () => {
  const previous = [
    `No. ${LENDER_CLOSER.slice(0, -1)} and does not provide financial advice.`,
    `${LENDER_CLOSER} Please consult a licensed financial adviser before making any financial decisions.`,
    LENDER_CLOSER,
  ].join("\n");
  const approved = remediatePublicEditorialLanguage(previous);

  assert.equal(approved.split(BROKER_CLOSER).length - 1, 2);
  assert.match(approved, /No\. Emet Capital provides commercial lending solutions to eligible business borrowers and does not provide financial advice\./);
  assert.equal(isExactPublicEditorialRemediation(previous, approved), true);
});
