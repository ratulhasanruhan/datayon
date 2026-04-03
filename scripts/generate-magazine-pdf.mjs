/**
 * প্রথমে `npm run dev` চালু রাখুন, তারপর এই স্ক্রিপ্ট।
 * Chromium: `npx playwright install chromium` (একবার)
 *
 * আউটপুট: magazine-dist/magazine-april-2026.pdf, magazine-dist/magazine-april-2026-cover.png
 *
 * কভার PNG = ওয়েব স্ক্রিন মিডিয়া, `/magazine/april-2026/cover` (হেডার ছাড়া)।
 * PDF = প্রিন্ট স্টাইল, `/magazine/april-2026/print`, মার্জিন CSS @page-এ।
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "magazine-dist");
const pdfPath = path.join(outDir, "magazine-april-2026.pdf");
const coverPath = path.join(outDir, "magazine-april-2026-cover.png");

const base =
  process.env.MAGAZINE_PDF_BASE_URL?.replace(/\/$/, "") ?? "http://127.0.0.1:3000";
const printUrl = `${base}/magazine/april-2026/print`;
const coverUrl = `${base}/magazine/april-2026/cover`;

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({
      deviceScaleFactor: 2,
      locale: "bn-BD",
    });

    // ১) প্রচ্ছদ PNG — স্ক্রিন মিডিয়া, ওয়েবের মতো রঙ
    const coverPage = await context.newPage();
    try {
      await coverPage.goto(coverUrl, {
        waitUntil: "networkidle",
        timeout: 120_000,
      });
      await coverPage.emulateMedia({ media: "screen" });
      /* পোর্ট্রেট ভিউপোর্ট + সরু কলাম — কভার PNG উল্লম্ব অনুপাতে */
      await coverPage.setViewportSize({ width: 640, height: 1280 });
      await coverPage.evaluate(() => window.scrollTo(0, 0));
      const cover = coverPage.locator("[data-magazine-cover]").first();
      await cover.waitFor({ state: "visible", timeout: 30_000 });
      await cover.scrollIntoViewIfNeeded();
      await cover.screenshot({
        path: coverPath,
        type: "png",
        animations: "disabled",
      });
      console.log("Wrote:", coverPath);
    } finally {
      await coverPage.close();
    }

    // ২) পূর্ণ PDF — প্রিন্ট CSS; Playwright মার্জিন ০ (কম্বল মার্জিন globals.css @page)
    const pdfPage = await context.newPage();
    try {
      await pdfPage.goto(printUrl, {
        waitUntil: "networkidle",
        timeout: 120_000,
      });
      await pdfPage.emulateMedia({ media: "print" });
      await pdfPage.setViewportSize({ width: 1280, height: 720 });
      await pdfPage.pdf({
        path: pdfPath,
        format: "A4",
        printBackground: true,
        margin: { top: "0", bottom: "0", left: "0", right: "0" },
        /* @page margin ০ + শিটে padding — একক সোর্স অফ ট্রুথ */
        preferCSSPageSize: false,
        scale: 1,
      });
      console.log("Wrote:", pdfPath);
    } finally {
      await pdfPage.close();
    }

    await context.close();
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
