import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "HORUS — Live Order Flow Intelligence for Binance Futures";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#16150f",
          padding: "72px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(120deg, rgba(213,241,6,0.14) 0%, transparent 55%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 14, position: "relative" }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "#d5f106",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 700,
              color: "#1b1b19",
            }}
          >
            H
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#edece6", letterSpacing: -0.5 }}>
            HORUS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "relative" }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#edece6",
              lineHeight: 1.08,
              letterSpacing: -2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Live order flow.</span>
            <span>
              Trade smarter on <span style={{ color: "#d5f106" }}>Binance.</span>
            </span>
          </div>
          <div style={{ fontSize: 22, color: "#8a8784", maxWidth: 780 }}>
            Real-time delta, CVD, footprint, and divergence detection — free Chrome extension.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
          {["Delta", "CVD", "Footprint", "Divergence", "Open Interest"].map((tag) => (
            <div
              key={tag}
              style={{
                fontSize: 15,
                fontFamily: "monospace",
                color: "#d5f106",
                background: "rgba(213,241,6,0.1)",
                border: "1px solid rgba(213,241,6,0.3)",
                borderRadius: 999,
                padding: "8px 18px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
