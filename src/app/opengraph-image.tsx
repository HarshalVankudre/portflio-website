import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Harshal Vankudre — AI Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#CEFF00";
const BG = "#060607";
const FG = "#EAE8E3";
const DIM = "#98968F";
const LINE = "rgba(234, 232, 227, 0.14)";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: BG,
          display: "flex",
          flexDirection: "column",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          position: "relative",
          backgroundImage:
            "radial-gradient(42% 55% at 18% 20%, rgba(34, 20, 64, 0.9), rgba(6, 6, 7, 0) 70%), radial-gradient(40% 50% at 85% 80%, rgba(11, 43, 43, 0.9), rgba(6, 6, 7, 0) 70%), radial-gradient(24% 30% at 62% 12%, rgba(206, 255, 0, 0.10), rgba(6, 6, 7, 0) 75%)",
        }}
      >
        {/* Top meta row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${LINE}`,
            paddingBottom: "20px",
            color: DIM,
            fontSize: 20,
            letterSpacing: "0.22em",
          }}
        >
          <span>HARSHAL VANKUDRE — PORTFOLIO</span>
          <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 9999,
                background: ACCENT,
              }}
            />
            AI SYSTEMS IN PRODUCTION
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              fontSize: 132,
              fontWeight: 700,
              color: FG,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Harshal</span>
            <span style={{ display: "flex" }}>
              Vankudre<span style={{ color: ACCENT }}>.</span>
            </span>
          </div>
          <div
            style={{
              marginTop: 30,
              fontSize: 28,
              color: DIM,
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <span>AI Developer · RAG Systems · Karlsruhe, Germany</span>
          </div>
          <div
            style={{
              marginTop: 32,
              display: "flex",
              gap: "14px",
            }}
          >
            {["RAG", "LLMs", "Next.js", "Python"].map((tag) => (
              <span
                key={tag}
                style={{
                  border: `1px solid ${LINE}`,
                  borderRadius: 9999,
                  color: FG,
                  padding: "10px 24px",
                  fontSize: 24,
                  letterSpacing: "0.08em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Accent edge */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 6,
            background: ACCENT,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
