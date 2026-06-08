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
          background: "#060A1A",
          display: "flex",
          flexDirection: "column",
          padding: "72px",
          fontFamily: "Inter, sans-serif",
          position: "relative",
          backgroundImage:
            "radial-gradient(900px 600px at 85% -10%, rgba(124,92,255,0.35), transparent), radial-gradient(800px 600px at -5% 110%, rgba(59,130,246,0.28), transparent), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 100% 100%, 48px 48px, 48px 48px",
        }}
      >
        {/* Logo chip */}
        <div
          style={{
            display: "flex",
            background: "#7C5CFF",
            color: "#E7ECFF",
            border: "6px solid #C8D2FF",
            boxShadow: "10px 10px 0 #34237A",
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
              color: "#AAB2D6",
            }}
          >
            AI Developer · Karlsruhe, Germany
          </div>
          <div
            style={{
              fontSize: 110,
              fontWeight: 900,
              color: "#E7ECFF",
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
                background: "#7C5CFF",
                padding: "0 16px",
                border: "6px solid #C8D2FF",
                boxShadow: "10px 10px 0 #34237A",
              }}
            >
              VANKUDRE
            </span>
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: "#E7ECFF",
              marginTop: "32px",
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                background: "#3B82F6",
                border: "4px solid #C8D2FF",
                padding: "6px 18px",
                boxShadow: "6px 6px 0 #34237A",
              }}
            >
              RAG
            </span>
            <span
              style={{
                background: "#7C5CFF",
                color: "#E7ECFF",
                border: "4px solid #C8D2FF",
                padding: "6px 18px",
                boxShadow: "6px 6px 0 #34237A",
              }}
            >
              LLMs
            </span>
            <span
              style={{
                background: "#3B82F6",
                border: "4px solid #C8D2FF",
                padding: "6px 18px",
                boxShadow: "6px 6px 0 #34237A",
              }}
            >
              Next.js
            </span>
            <span
              style={{
                background: "#F43F7A",
                border: "4px solid #C8D2FF",
                padding: "6px 18px",
                boxShadow: "6px 6px 0 #34237A",
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
