const INTERNAL_EDITORIAL_PATTERN =
  /\b(?:LLM[\s-]*Readiness|Citation[\s-]*Ready|QA Summary|SEO QA|Internal (?:Editorial )?Notes?|Editorial Checklist|Prompt (?:Notes?|Output)|TODO|TBD)\b/i;
const TRAILING_ELLIPSIS_PATTERN = /(?:\.{3}|…)\s*$/;
const FAQ_HEADING_PATTERN =
  /^##\s*(?:\d+\.\s*)?(?:Frequently Asked Questions|FAQs?|FAQ Section)(?:.*)?$/im;
const STANDARD_DISCLAIMER =
  "This article is for informational purposes only and does not constitute financial advice.";

function words(value) {
  return value
    .toLowerCase()
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2);
}

function headings(body) {
  return [...body.matchAll(/^(#{1,6})\s+(.+)$/gm)].map((match) => ({
    level: match[1].length,
    text: match[2].trim(),
  }));
}

function markdownInternalLinks(body) {
  return [...body.matchAll(/\[[^\]]+\]\((\/[^)\s#]+)(?:#[^)\s]*)?\)/g)].map((match) => match[1]);
}

function duplicateLongParagraphs(body) {
  const seen = new Map();
  const duplicates = new Set();
  for (const paragraph of body.split(/\n\s*\n/)) {
    const value = paragraph.replace(/\s+/g, " ").trim();
    if (value.length < 120 || /^(?:#{1,6}\s|[-*]\s|\|)/.test(value)) continue;
    const normalized = value.toLowerCase();
    if (seen.has(normalized)) duplicates.add(value.slice(0, 80));
    else seen.set(normalized, true);
  }
  return [...duplicates];
}

export function validateArticlePublicationContract({ data, body, imageExists = () => true }) {
  const errors = [];
  const title = String(data.title || "").trim();
  const description = String(data.description || "").trim();
  const metaTitle = String(data.metaTitle || data.meta_title || "").trim();
  const metaDescription = String(data.metaDescription || data.meta_description || "").trim();
  const featuredImage = String(data.featuredImage || data.featured_image || "").trim();
  const publicCopy = `${title}\n${description}\n${metaTitle}\n${metaDescription}\n${body}`;

  if (INTERNAL_EDITORIAL_PATTERN.test(publicCopy)) {
    errors.push("internal editorial or AI-production language is present in public copy");
  }

  if (!metaTitle) errors.push("metaTitle is required");
  else if (metaTitle.length < 30 || metaTitle.length > 60) {
    errors.push(`metaTitle must be 30-60 characters; found ${metaTitle.length}`);
  }

  if (!metaDescription) errors.push("metaDescription is required");
  else if (metaDescription.length < 120 || metaDescription.length > 160) {
    errors.push(`metaDescription must be 120-160 characters; found ${metaDescription.length}`);
  }

  if (TRAILING_ELLIPSIS_PATTERN.test(metaTitle) || TRAILING_ELLIPSIS_PATTERN.test(metaDescription)) {
    errors.push("metadata must not contain a persisted truncation ellipsis");
  }

  if (!featuredImage) {
    errors.push("featuredImage is required");
  } else if (/placeholder\.svg(?:$|[?#])/i.test(featuredImage)) {
    errors.push("featuredImage must not use placeholder.svg");
  } else if (!/^https:\/\//i.test(featuredImage) && !featuredImage.startsWith("/")) {
    errors.push("featuredImage must be an HTTPS URL or a root-relative public asset");
  } else if (!/\.(?:png|jpe?g|webp)(?:$|[?#])/i.test(featuredImage)) {
    errors.push("featuredImage must be a PNG, JPEG, or WebP image");
  } else if (featuredImage.startsWith("/") && !imageExists(featuredImage)) {
    errors.push(`featuredImage does not exist in public assets: ${featuredImage}`);
  }

  const articleHeadings = headings(body);
  if (articleHeadings.some((heading) => heading.level === 1)) {
    errors.push("body must not contain an H1; the article template owns the page H1");
  }

  let previousLevel = 2;
  for (const heading of articleHeadings.filter((item) => item.level > 1)) {
    if (heading.level > previousLevel + 1) {
      errors.push(`heading hierarchy skips from H${previousLevel} to H${heading.level}: "${heading.text}"`);
      break;
    }
    previousLevel = heading.level;
  }

  const h2Labels = articleHeadings
    .filter((heading) => heading.level === 2)
    .map((heading) => heading.text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim());
  if (new Set(h2Labels).size !== h2Labels.length) errors.push("duplicate H2 headings are not allowed");

  if (!/^###\s+Related In-Depth Guides\s*$/im.test(body)) {
    errors.push('missing required "### Related In-Depth Guides" section');
  }
  if (!/^##\s+Related Guides\s*$/im.test(body)) {
    errors.push('missing required "## Related Guides" section');
  }

  const faqHeading = FAQ_HEADING_PATTERN.exec(body);
  if (!faqHeading) {
    errors.push("FAQ section is required");
  } else {
    const faqBody = body.slice(faqHeading.index + faqHeading[0].length).split(/\n##\s+/)[0];
    const questions = faqBody.match(/^###\s+.+\?\s*$/gm) || [];
    if (questions.length < 5 || questions.length > 7) {
      errors.push(`FAQ section must contain 5-7 questions; found ${questions.length}`);
    }
  }

  const wordCount = words(body).length;
  if (wordCount < 1500 || wordCount > 2500) {
    errors.push(`article must contain 1500-2500 words; found ${wordCount}`);
  }

  const links = markdownInternalLinks(body);
  if (links.length < 10) errors.push(`article requires at least 10 internal links; found ${links.length}`);
  if (/\]\(https?:\/\/(?:www\.)?emetcapital\.com\.au\//i.test(body)) {
    errors.push("internal links must use root-relative paths");
  }
  const linkCounts = new Map();
  for (const link of links) linkCounts.set(link, (linkCounts.get(link) || 0) + 1);
  for (const [link, count] of linkCounts) {
    if (count > 2) errors.push(`internal link appears ${count} times; maximum is 2: ${link}`);
  }

  if (!body.includes(STANDARD_DISCLAIMER)) errors.push("standard general-information disclaimer is required");

  const repeatedParagraphs = duplicateLongParagraphs(body);
  if (repeatedParagraphs.length) {
    errors.push(`duplicate long paragraph detected: "${repeatedParagraphs[0]}..."`);
  }

  return errors;
}

export const articlePublicationContract = {
  metaTitle: { min: 30, max: 60 },
  metaDescription: { min: 120, max: 160 },
  wordCount: { min: 1500, max: 2500 },
  faqQuestions: { min: 5, max: 7 },
  internalLinks: { min: 10, maxPerTarget: 2 },
};
