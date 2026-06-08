import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Harshal Vankudre — AI Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F4F1E9",
          color: "#1A1813",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top rule */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #1A1813",
            paddingTop: "18px",
            fontFamily: "monospace",
            fontSize: 22,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#6A6456",
          }}
        >
          <span style={{ color: "#1A1813" }}>Harshal Vankudre</span>
          <span>AI / Software Engineer</span>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 96,
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
            fontWeight: 400,
          }}
        >
          <span>Designing &amp; building</span>
          <span>
            <span style={{ fontStyle: "italic", color: "#B4441F" }}>intelligent</span> systems
          </span>
          <span>for the real world.</span>
        </div>

        {/* Bottom meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(26,24,19,0.2)",
            paddingTop: "18px",
            fontFamily: "monospace",
            fontSize: 22,
            color: "#6A6456",
          }}
        >
          <span>Karlsruhe, DE</span>
          <span>RAG · LLMs · Full-stack</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
