import { normalizeSeoDescription, normalizeSeoTitle } from "../../src/lib/seo-metadata";
import { plainReleaseText } from "./content-release-proof.mjs";

export function authoredMetadataChecks(item: {
  isNew: boolean; metaTitle: string; metaDescription: string;
}, renderedTitle: string, renderedDescription: string) {
  // Compare the rendered contract used by SEO.tsx, including HTML escaping.
  // Existing fallbacks remain valid; new articles require authored metadata.
  return {
    authoredMetaTitle: item.metaTitle
      ? plainReleaseText(renderedTitle) === normalizeSeoTitle(item.metaTitle)
      : !item.isNew,
    authoredMetaDescription: item.metaDescription
      ? plainReleaseText(renderedDescription) === normalizeSeoDescription(item.metaDescription)
      : !item.isNew,
  };
}
