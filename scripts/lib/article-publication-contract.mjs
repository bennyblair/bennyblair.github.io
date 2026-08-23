const INTERNAL_EDITORIAL_PATTERN =
  /\b(?:LLM[\s-]*Readiness|AI[\s-]*Readiness|Citation[\s-]*Ready|QA (?:Summary|Snapshot|Check|Notes?)|SEO QA|Internal (?:Editorial )?Notes?|Editorial Checklist|Prompt (?:Notes?|Output)|AI Production Notes?)\b/i;
const TRAILING_ELLIPSIS_PATTERN = /(?:\.{3}|…|â€¦)\s*$/;
const FAQ_HEADING_PATTERN =
  /^##\s*(?:\d+\.\s*)?(?:Frequently Asked Questions|FAQs?|FAQ Section)(?:.*)?$/im;
const RELATED_HEADING_PATTERN =
  /^##\s+(?:Related Guides|Related Resources|Related Content|Further Reading)\s*$/gim;
const STANDARD_DISCLAIMER =
  "This article is for informational purposes only and does not constitute financial advice.";
const IMAGE_MAX_BYTES = 250 * 1024;

export function containsInternalEditorialLanguage(value) {
  return INTERNAL_EDITORIAL_PATTERN.test(String(value || ""));
}

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

function contentParagraphs(body) {
  return body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter((paragraph) =>
      paragraph.length >= 100
      && !/^(?:#{1,6}\s|[-*]\s|\d+\.\s|\|)/.test(paragraph),
    );
}

function shingles(value, size = 3) {
  const tokens = words(value);
  const result = new Set();
  for (let index = 0; index <= tokens.length - size; index += 1) {
    result.add(tokens.slice(index, index + size).join(" "));
  }
  return result;
}

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let intersection = 0;
  for (const item of a) if (b.has(item)) intersection += 1;
  return intersection / (a.size + b.size - intersection);
}

function repetitionMetrics(body) {
  const paragraphs = contentParagraphs(body);
  const normalized = new Map();
  let duplicate = "";
  let highestSimilarity = 0;
  let mostSimilar = [];

  for (const paragraph of paragraphs) {
    const key = paragraph.toLowerCase();
    if (normalized.has(key) && !duplicate) duplicate = paragraph;
    normalized.set(key, true);
  }

  for (let left = 0; left < paragraphs.length; left += 1) {
    const leftShingles = shingles(paragraphs[left]);
    for (let right = left + 1; right < paragraphs.length; right += 1) {
      const similarity = jaccard(leftShingles, shingles(paragraphs[right]));
      if (similarity > highestSimilarity) {
        highestSimilarity = similarity;
        mostSimilar = [paragraphs[left], paragraphs[right]];
      }
    }
  }

  return { duplicate, highestSimilarity, mostSimilar };
}

function validateImage(featuredImage, imageInfo, errors, warnings) {
  if (!featuredImage) {
    errors.push("featuredImage is required");
    return;
  }
  if (/placeholder\.svg(?:$|[?#])/i.test(featuredImage)) {
    errors.push("featuredImage must not use placeholder.svg");
    return;
  }
  if (!/^https:\/\//i.test(featuredImage) && !featuredImage.startsWith("/")) {
    errors.push("featuredImage must be an HTTPS URL or a root-relative public asset");
    return;
  }
  if (!/\.(?:png|jpe?g|webp)(?:$|[?#])/i.test(featuredImage)) {
    errors.push("featuredImage must be a PNG, JPEG, or WebP image");
    return;
  }

  const info = imageInfo(featuredImage);
  if (featuredImage.startsWith("/") && !info?.exists) {
    errors.push(`featuredImage does not exist in public assets: ${featuredImage}`);
    return;
  }
  if (!info?.exists) {
    warnings.push("remote featuredImage dimensions and file size could not be verified locally");
    return;
  }
  if (Number(info.bytes) > IMAGE_MAX_BYTES) {
    errors.push(`featuredImage must be 250 KB or smaller; found ${Math.ceil(info.bytes / 1024)} KB`);
  }
  if (info.width && info.height) {
    const ratio = info.width / info.height;
    if (info.width < 1200 || info.height < 630) {
      errors.push(`featuredImage must be at least 1200x630; found ${info.width}x${info.height}`);
    }
    if (ratio < 1.8 || ratio > 2) {
      errors.push(`featuredImage aspect ratio must be suitable for social cards; found ${ratio.toFixed(2)}`);
    }
  } else {
    errors.push("featuredImage dimensions could not be read");
  }
}

function validateFaq(body, errors, warnings) {
  const faqHeading = FAQ_HEADING_PATTERN.exec(body);
  if (!faqHeading) return { present: false, questions: 0 };

  const faqBody = body.slice(faqHeading.index + faqHeading[0].length).split(/\n##\s+/)[0];
  const matches = [...faqBody.matchAll(/^###\s+(.+\?)\s*$\n([\s\S]*?)(?=\n###\s+|$)/gm)];
  if (matches.length < 3 || matches.length > 6) {
    errors.push(`an included FAQ section must contain 3-6 questions; found ${matches.length}`);
  }
  for (const match of matches) {
    const answerWords = words(match[2]).length;
    if (answerWords < 18) warnings.push(`FAQ answer may not stand alone: "${match[1]}"`);
  }
  return { present: true, questions: matches.length };
}

export function validateArticlePublicationContract({ data, body, imageInfo = () => ({ exists: true }) }) {
  const errors = [];
  const warnings = [];
  const title = String(data.title || "").trim();
  const description = String(data.description || "").trim();
  const metaTitle = String(data.metaTitle || data.meta_title || "").trim();
  const metaDescription = String(data.metaDescription || data.meta_description || "").trim();
  const featuredImage = String(data.featuredImage || data.featured_image || "").trim();
  const featuredImageAlt = String(data.featuredImageAlt || data.featured_image_alt || "").trim();
  const publicCopy = `${title}\n${description}\n${metaTitle}\n${metaDescription}\n${body}`;

  if (containsInternalEditorialLanguage(publicCopy)) {
    errors.push("internal editorial or AI-production language is present in public copy");
  }

  if (!metaTitle) errors.push("metaTitle is required");
  else {
    if (metaTitle.length < 20 || metaTitle.length > 75) {
      errors.push(`metaTitle must be 20-75 characters; found ${metaTitle.length}`);
    } else if (metaTitle.length < 30 || metaTitle.length > 65) {
      warnings.push(`metaTitle preferred range is 30-65 characters; found ${metaTitle.length}`);
    }
  }

  if (!metaDescription) errors.push("metaDescription is required");
  else {
    if (metaDescription.length < 80 || metaDescription.length > 180) {
      errors.push(`metaDescription must be 80-180 characters; found ${metaDescription.length}`);
    } else if (metaDescription.length < 120 || metaDescription.length > 165) {
      warnings.push(`metaDescription preferred range is 120-165 characters; found ${metaDescription.length}`);
    }
  }

  if (TRAILING_ELLIPSIS_PATTERN.test(metaTitle) || TRAILING_ELLIPSIS_PATTERN.test(metaDescription)) {
    errors.push("metadata must not contain a persisted truncation ellipsis");
  }
  if (metaTitle && metaDescription && metaTitle.toLowerCase() === metaDescription.toLowerCase()) {
    errors.push("metaTitle and metaDescription must not be identical");
  }

  validateImage(featuredImage, imageInfo, errors, warnings);
  if (!featuredImageAlt || featuredImageAlt.length < 10) errors.push("featuredImageAlt must describe the article image");

  const articleHeadings = headings(body);
  if (articleHeadings.some((heading) => heading.level === 1)) {
    errors.push("body must not contain an H1; the article template owns the page H1");
  }
  if (articleHeadings.length && articleHeadings[0].level !== 2) {
    errors.push(`the first body heading must be H2; found H${articleHeadings[0].level}`);
  }
  let previousLevel = articleHeadings[0]?.level || 2;
  for (const heading of articleHeadings.slice(1)) {
    if (heading.level > previousLevel + 1) {
      errors.push(`heading hierarchy skips from H${previousLevel} to H${heading.level}: "${heading.text}"`);
      break;
    }
    previousLevel = heading.level;
  }
  const headingLabels = articleHeadings.map((heading) =>
    `${heading.level}:${heading.text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()}`,
  );
  if (new Set(headingLabels).size !== headingLabels.length) errors.push("duplicate headings are not allowed");

  const relatedSections = [...body.matchAll(RELATED_HEADING_PATTERN)].length;
  if (relatedSections !== 1) {
    errors.push(`article must contain exactly one reader-facing related-content section; found ${relatedSections}`);
  }

  const faq = validateFaq(body, errors, warnings);
  const wordCount = words(body).length;
  if (wordCount < 700 || wordCount > 2800) {
    errors.push(`article must contain 700-2800 substantive words; found ${wordCount}`);
  } else if (wordCount < 900 || wordCount > 2200) {
    warnings.push(`reader-first expected range is 900-2200 words; found ${wordCount}`);
  }

  const links = markdownInternalLinks(body);
  if (/\]\(https?:\/\/(?:www\.)?emetcapital\.com\.au\//i.test(body)) {
    errors.push("internal links must use root-relative paths");
  }
  const linkCounts = new Map();
  for (const link of links) linkCounts.set(link, (linkCounts.get(link) || 0) + 1);
  for (const [link, count] of linkCounts) {
    if (count > 2) errors.push(`internal link appears ${count} times; maximum is 2: ${link}`);
  }
  const designatedService = String(data.designatedServicePage || data.designated_service_page || "").trim();
  if (!designatedService) errors.push("designatedServicePage is required");
  else if (!links.includes(designatedService)) errors.push(`article must link to its designated service page: ${designatedService}`);
  const guideLinks = links.filter((link) => link.startsWith("/resources/guides/"));
  if (new Set(guideLinks).size < 2) errors.push("article must link to at least two relevant supporting guides");
  if (links.length < 5) warnings.push(`consider adding relevant contextual links; found ${links.length}`);
  if (links.length > 15) warnings.push(`possible internal-link stuffing; found ${links.length} links`);

  if (!body.includes(STANDARD_DISCLAIMER)) errors.push("standard general-information disclaimer is required");

  const contentRisk = String(data.contentRisk || data.content_risk || "").toLowerCase();
  const sources = Array.isArray(data.sources) ? data.sources : [];
  if (!contentRisk) errors.push("contentRisk is required");
  if (sources.length < 1) errors.push("at least one authoritative source is required");
  for (const source of sources) {
    if (!source?.label || !/^https:\/\//i.test(String(source?.url || ""))) {
      errors.push("every source requires a label and HTTPS URL");
    }
  }
  if (contentRisk === "high" && sources.length < 2) errors.push("high-risk content requires at least two authoritative sources");
  if (data.expiresAt && new Date(data.expiresAt).getTime() < Date.now()) errors.push("expiresAt is in the past");

  const repetition = repetitionMetrics(body);
  if (repetition.duplicate) {
    errors.push(`duplicate long paragraph detected: "${repetition.duplicate.slice(0, 80)}..."`);
  } else if (repetition.highestSimilarity >= 0.82) {
    errors.push(`near-duplicate paragraphs detected (${Math.round(repetition.highestSimilarity * 100)}% similarity)`);
  } else if (repetition.highestSimilarity >= 0.68) {
    warnings.push(`possible semantic repetition (${Math.round(repetition.highestSimilarity * 100)}% paragraph similarity)`);
  }

  return {
    errors,
    warnings,
    metrics: {
      wordCount,
      faqPresent: faq.present,
      faqQuestions: faq.questions,
      internalLinks: links.length,
      uniqueGuideLinks: new Set(guideLinks).size,
      highestParagraphSimilarity: Number(repetition.highestSimilarity.toFixed(3)),
    },
  };
}

export const articlePublicationContract = {
  metadata: {
    metaTitle: { preferredMin: 30, preferredMax: 65, hardMin: 20, hardMax: 75 },
    metaDescription: { preferredMin: 120, preferredMax: 165, hardMin: 80, hardMax: 180 },
  },
  wordCount: { preferredMin: 900, preferredMax: 2200, hardMin: 700, hardMax: 2800 },
  faqQuestions: { optional: true, minWhenPresent: 3, maxWhenPresent: 6 },
  internalLinks: { requiredServiceLink: true, supportingGuides: 2, warningMin: 5, warningMax: 15, maxPerTarget: 2 },
  image: { minWidth: 1200, minHeight: 630, maxBytes: IMAGE_MAX_BYTES, minRatio: 1.8, maxRatio: 2 },
};
