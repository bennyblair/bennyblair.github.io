const internalRoute = String.raw`(?:https?:\/\/(?:www\.)?emetcapital\.com\.au)?\/(?:resources\/(?:guides|case-studies|insights)|services)\/[a-z0-9][a-z0-9\-/]*(?:[?#][^\s<>'"\)\]]*)?`;

const markdownDestination = new RegExp(String.raw`(\]\(\s*)${internalRoute}(\s*(?:["'][^"']*["'])?\))`, "gi");
const htmlDestination = new RegExp(String.raw`(\bhref\s*=\s*["'])${internalRoute}(["'])`, "gi");
const referenceDestination = new RegExp(
  String.raw`^(\s*\[[^\]]+\]:\s*)${internalRoute}(\s*(?:["'][^"']*["'])?\s*)$`,
  "gim",
);

export function normalizeInternalLinkDestinations(value) {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(markdownDestination, "$1<internal-route>$2")
    .replace(htmlDestination, "$1<internal-route>$2")
    .replace(referenceDestination, "$1<internal-route>$2");
}

export function isInternalLinkOnlyChange(before, after) {
  if (before === after) return false;
  return normalizeInternalLinkDestinations(before) === normalizeInternalLinkDestinations(after);
}
