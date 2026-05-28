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
          background: "#FFFEF5",
          display: "flex",
          flexDirection: "column",
          padding: "72px",
          fontFamily: "Inter, sans-serif",
          position: "relative",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        {/* Logo chip */}
        <div
          style={{
            display: "flex",
            background: "#FFE500",
            color: "#000",
            border: "6px solid #000",
            boxShadow: "10px 10px 0 #000",
            padding: "12px 28px",
            fontSize: 56,
            fontWeight: 900,
            alignSelf: "flex-start",
            lineHeight: 1,
          }}
        >
          HV
        </div>

        {/* Name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            gap: "8px",
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#666",
            }}
          >
            AI Developer · Karlsruhe, Germany
          </div>
          <div
            style={{
              fontSize: 110,
              fontWeight: 900,
              color: "#000",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <span>Harshal</span>
            <span
              style={{
                background: "#FFE500",
                padding: "0 16px",
                border: "6px solid #000",
                boxShadow: "10px 10px 0 #000",
              }}
            >
              VANKUDRE
            </span>
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: "#1a1a1a",
              marginTop: "32px",
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                background: "#4ECDC4",
                border: "4px solid #000",
                padding: "6px 18px",
                boxShadow: "6px 6px 0 #000",
              }}
            >
              RAG
            </span>
            <span
              style={{
                background: "#FFE500",
                color: "#1a1a1a",
                border: "4px solid #000",
                padding: "6px 18px",
                boxShadow: "6px 6px 0 #000",
              }}
            >
              LLMs
            </span>
            <span
              style={{
                background: "#4ECDC4",
                border: "4px solid #000",
                padding: "6px 18px",
                boxShadow: "6px 6px 0 #000",
              }}
            >
              Next.js
            </span>
            <span
              style={{
                background: "#FF6B6B",
                border: "4px solid #000",
                padding: "6px 18px",
                boxShadow: "6px 6px 0 #000",
              }}
            >
              Python
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
