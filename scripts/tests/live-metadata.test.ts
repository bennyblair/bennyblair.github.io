import assert from "node:assert/strict";
import { test } from "node:test";
import { authoredMetadataChecks } from "../lib/live-metadata";

for (const [authored, rendered] of [
  ["Cross-Collateralised Commercial Property Refinance | Emet Capital", "Cross-Collateralised Commercial Property Refinance"],
  ["Debtor Concentration Working Capital Finance Australia | Emet Capital", "Debtor Concentration Working Capital Finance Australia"],
]) test("accepts actual SEO output: " + rendered, () => {
  assert.equal(authoredMetadataChecks({isNew:false,metaTitle:authored,metaDescription:"A guide"},rendered,"A guide").authoredMetaTitle,true);
  assert.equal(authoredMetadataChecks({isNew:false,metaTitle:authored,metaDescription:"A guide"},"An unrelated title","A guide").authoredMetaTitle,false);
});
test("short titles must retain the authored brand suffix", () => {
  const item={isNew:false,metaTitle:"Business Finance | Emet Capital",metaDescription:"Guide"};
  assert.equal(authoredMetadataChecks(item,item.metaTitle,"Guide").authoredMetaTitle,true);
  assert.equal(authoredMetadataChecks(item,"Business Finance","Guide").authoredMetaTitle,false);
});
test("HTML encoding and description whitespace follow the rendered contract", () => {
  const item={isNew:true,metaTitle:"Purchase & Refinance",metaDescription:"Business   finance & property"};
  assert.deepEqual(authoredMetadataChecks(item,"Purchase &amp; Refinance","Business finance &amp; property"),{authoredMetaTitle:true,authoredMetaDescription:true});
  assert.equal(authoredMetadataChecks(item,"Purchase &amp; Refinance","Different copy").authoredMetaDescription,false);
});
test("only existing pages may use missing authored-metadata fallbacks", () => {
  for(const isNew of [true,false])assert.deepEqual(authoredMetadataChecks({isNew,metaTitle:"",metaDescription:""},"Fallback title","Fallback description"),{authoredMetaTitle:!isNew,authoredMetaDescription:!isNew});
});
