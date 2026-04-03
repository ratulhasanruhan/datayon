import { MagazineApril2026ScrollBody } from "@/components/magazine/MagazineApril2026ScrollBody";
import { MagazinePrintMount } from "@/components/magazine/MagazinePrintMount";

/**
 * Playwright `page.pdf()` টার্গেট — শুধু স্ক্রল লেআউট, ক্রোম ছাড়া।
 * `npm run magazine:pdf`
 */
export default function MagazineApril2026PrintPage() {
  return (
    <>
      <MagazinePrintMount />
      <main
        id="main"
        className="magazine-print-root bg-paper print:bg-paper"
      >
        <MagazineApril2026ScrollBody />
      </main>
    </>
  );
}
