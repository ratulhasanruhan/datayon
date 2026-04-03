import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/brand";
import { loadNotoSansBengali700 } from "@/lib/og/load-bengali-font";

export const runtime = "nodejs";

export const alt = `${BRAND.name} — ${BRAND.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const fontData = await loadNotoSansBengali700();
  const fontFamily = fontData ? "Noto Sans Bengali" : "system-ui, sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(148deg, #060e18 0%, #0d1b2a 38%, #102a3d 72%, #0d1b2a 100%)",
          padding: 72,
          position: "relative",
        }}
      >
        {/* Accent column */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 5,
            height: "55%",
            background: "linear-gradient(180deg, #3a8fa3 0%, #2a6f80 100%)",
            borderRadius: "0 0 4px 0",
          }}
        />
        {/* Soft glow */}
        <div
          style={{
            position: "absolute",
            right: -80,
            top: "20%",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(58,143,163,0.22) 0%, transparent 70%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            maxWidth: 920,
            position: "relative",
          }}
        >
          <span
            style={{
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
              fontSize: 24,
              letterSpacing: "0.42em",
              color: "#3a8fa3",
              fontWeight: 700,
            }}
          >
            {BRAND.nameLatin}
          </span>
          <span
            style={{
              fontFamily: fontFamily,
              fontSize: 62,
              fontWeight: 700,
              color: "#f0ebe0",
              lineHeight: 1.12,
            }}
          >
            {BRAND.name}
          </span>
          <span
            style={{
              fontFamily: fontFamily,
              fontSize: 30,
              fontWeight: 500,
              color: "#a8bcc8",
              lineHeight: 1.35,
              maxWidth: 880,
            }}
          >
            {BRAND.tagline}
          </span>
          <div
            style={{
              marginTop: 28,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 16,
            }}
          >
            <span
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
                fontSize: 22,
                color: "#3a8fa3",
                letterSpacing: "0.06em",
              }}
            >
              {BRAND.url}
            </span>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#3a8fa3",
                opacity: 0.7,
              }}
            />
            <span
              style={{
                fontFamily: "ui-sans-serif, system-ui, sans-serif",
                fontSize: 18,
                color: "#6a8a9a",
                fontWeight: 500,
              }}
            >
              বাংলা টেক ম্যাগাজিন
            </span>
          </div>
        </div>

        {/* Bottom rule */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #3a8fa3 0%, rgba(58,143,163,0.15) 45%, transparent 100%)",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [
            {
              name: "Noto Sans Bengali",
              data: fontData,
              style: "normal",
              weight: 700,
            },
          ]
        : [],
    }
  );
}
