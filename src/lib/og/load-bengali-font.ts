/** TrueType only — `next/og` ImageResponse (Satori) does not support WOFF2. */
const FONT_URLS = [
  "https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSansBengali/NotoSansBengali-Bold.ttf",
  "https://raw.githubusercontent.com/googlefonts/noto-fonts/main/hinted/ttf/NotoSansBengali/NotoSansBengali-Bold.ttf",
];

export async function loadNotoSansBengali700(): Promise<ArrayBuffer | null> {
  for (const url of FONT_URLS) {
    try {
      const res = await fetch(url, { next: { revalidate: 86400 } });
      if (res.ok) {
        return res.arrayBuffer();
      }
    } catch {
      /* try next */
    }
  }
  return null;
}
