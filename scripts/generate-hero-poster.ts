import { promises as fs } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const outputs = [
  { width: 1600, height: 900, file: "public/hero-property-finance-poster.webp" },
  { width: 800, height: 450, file: "public/hero-property-finance-poster-mobile.webp" },
];
const browser = await chromium.launch({ headless: true });

try {
  const page = await browser.newPage();
  for (const output of outputs) {
    const dataUrl = await page.evaluate(({ width, height }) => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d")!;
      const scale = width / 1600;

      const background = context.createLinearGradient(0, 0, width, height);
      background.addColorStop(0, "#07111f");
      background.addColorStop(0.45, "#102e50");
      background.addColorStop(1, "#4d7ea8");
      context.fillStyle = background;
      context.fillRect(0, 0, canvas.width, canvas.height);

      const glow = context.createRadialGradient(
        1280 * scale,
        180 * scale,
        20 * scale,
        1280 * scale,
        180 * scale,
        520 * scale,
      );
      glow.addColorStop(0, "rgba(148, 205, 255, 0.7)");
      glow.addColorStop(0.45, "rgba(65, 143, 207, 0.25)");
      glow.addColorStop(1, "rgba(7, 17, 31, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Soft cloud forms echo the retained hero video without making the
      // poster itself a large media dependency.
      for (let index = 0; index < 22; index += 1) {
        const x = (720 + ((index * 193) % 1050)) * scale;
        const y = (120 + ((index * 97) % 520)) * scale;
        const radius = (90 + ((index * 31) % 150)) * scale;
        const cloud = context.createRadialGradient(x, y, 0, x, y, radius);
        cloud.addColorStop(0, "rgba(230, 243, 255, 0.23)");
        cloud.addColorStop(0.55, "rgba(178, 215, 245, 0.11)");
        cloud.addColorStop(1, "rgba(150, 200, 240, 0)");
        context.fillStyle = cloud;
        context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      }

      const shade = context.createLinearGradient(0, 0, 1100 * scale, 0);
      shade.addColorStop(0, "rgba(3, 9, 17, 0.98)");
      shade.addColorStop(0.45, "rgba(3, 9, 17, 0.78)");
      shade.addColorStop(1, "rgba(3, 9, 17, 0)");
      context.fillStyle = shade;
      context.fillRect(0, 0, canvas.width, canvas.height);

      return canvas.toDataURL("image/webp", 0.78);
    }, output);

    const outputPath = path.resolve(output.file);
    await fs.writeFile(outputPath, Buffer.from(dataUrl.replace(/^data:image\/webp;base64,/, ""), "base64"));
    const stats = await fs.stat(outputPath);
    console.log(`Generated ${path.relative(process.cwd(), outputPath)} (${Math.round(stats.size / 1024)} KB).`);
  }
} finally {
  await browser.close();
}
