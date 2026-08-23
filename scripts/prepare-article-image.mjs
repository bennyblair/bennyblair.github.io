import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const args = process.argv.slice(2);
const input = args[0];
const output = args[1];

function option(name, fallback) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : fallback;
}

if (!input || !output) {
  console.error("Usage: node scripts/prepare-article-image.mjs <input> <output> [--width 1200] [--height 630] [--quality 78] [--fit cover|contain] [--background #ffffff] [--padding 0]");
  process.exit(1);
}

const repoRoot = process.cwd();
const inputPath = path.resolve(repoRoot, input);
const outputPath = path.resolve(repoRoot, output);
const publicRoot = path.resolve(repoRoot, "public");
if (!inputPath.startsWith(`${publicRoot}${path.sep}`) || !outputPath.startsWith(`${publicRoot}${path.sep}`)) {
  throw new Error("input and output must stay inside public/");
}
if (!fs.existsSync(inputPath)) throw new Error(`input image does not exist: ${input}`);

const width = Number(option("--width", "1200"));
const height = Number(option("--height", "630"));
const quality = Number(option("--quality", "78"));
const fit = option("--fit", "cover");
const background = option("--background", "#ffffff");
const padding = Number(option("--padding", "0"));
if (![width, height, quality, padding].every(Number.isFinite) || width < 1 || height < 1 || quality < 1 || quality > 100) {
  throw new Error("image dimensions, padding, and quality must be valid numbers");
}
if (!new Set(["cover", "contain"]).has(fit)) throw new Error("--fit must be cover or contain");

const extension = path.extname(inputPath).toLowerCase();
const mime = extension === ".png" ? "image/png" : extension === ".ico" ? "image/x-icon" : extension === ".webp" ? "image/webp" : "image/jpeg";
const outputExtension = path.extname(outputPath).toLowerCase();
const outputMime = outputExtension === ".png" ? "image/png" : outputExtension === ".jpg" || outputExtension === ".jpeg" ? "image/jpeg" : "image/webp";
const dataUrl = `data:${mime};base64,${fs.readFileSync(inputPath).toString("base64")}`;

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage();
  const encoded = await page.evaluate(async ({ dataUrl: source, width: targetWidth, height: targetHeight, quality: targetQuality, fit: targetFit, background: targetBackground, padding: targetPadding, outputMime: targetMime }) => {
    const image = new Image();
    image.src = source;
    await image.decode();

    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("canvas context is unavailable");
    context.fillStyle = targetBackground;
    context.fillRect(0, 0, targetWidth, targetHeight);

    const availableWidth = targetWidth - targetPadding * 2;
    const availableHeight = targetHeight - targetPadding * 2;
    const scale = targetFit === "contain"
      ? Math.min(availableWidth / image.naturalWidth, availableHeight / image.naturalHeight)
      : Math.max(availableWidth / image.naturalWidth, availableHeight / image.naturalHeight);
    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;
    context.drawImage(image, (targetWidth - drawWidth) / 2, (targetHeight - drawHeight) / 2, drawWidth, drawHeight);

    const blob = await new Promise((resolve, reject) =>
      canvas.toBlob((value) => value ? resolve(value) : reject(new Error("image encoding failed")), targetMime, targetQuality / 100),
    );
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result).split(",")[1]);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
  }, { dataUrl, width, height, quality, fit, background, padding, outputMime });

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, Buffer.from(encoded, "base64"));
  const bytes = fs.statSync(outputPath).size;
  console.log(`${output} ${width}x${height} ${Math.ceil(bytes / 1024)} KB ${outputMime}`);
  if (bytes > 250 * 1024 && outputMime !== "image/png") process.exitCode = 2;
} finally {
  await browser.close();
}
