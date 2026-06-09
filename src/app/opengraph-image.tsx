import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Harshal Vankudre — AI Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#FF5C00";
const BG = "#0A0B0D";
const FG = "#E8E6E2";
const DIM = "#9BA0A6";
const LINE = "rgba(232, 230, 226, 0.14)";

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
            "linear-gradient(rgba(232,230,226,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(232,230,226,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
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
            fontSize: 22,
            letterSpacing: "0.2em",
          }}
        >
          <span>DOC.REF — HV / PORTFOLIO</span>
          <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 9999,
                background: "#3FB950",
              }}
            />
            STATUS: ACTIVE
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
              fontSize: 26,
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              color: ACCENT,
              display: "flex",
            }}
          >
            SYS.00 — IDENTIFICATION
          </div>
          <div
            style={{
              marginTop: 16,
              fontSize: 124,
              fontWeight: 800,
              color: FG,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              display: "flex",
              flexDirection: "column",
              textTransform: "uppercase",
            }}
          >
            <span>Harshal</span>
            <span style={{ color: ACCENT }}>Vankudre</span>
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              color: DIM,
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <span>AI Developer · Karlsruhe, Germany</span>
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
                  color: FG,
                  padding: "10px 22px",
                  fontSize: 26,
                  letterSpacing: "0.08em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Corner brackets */}
        {[
          { top: 32, left: 32, borderTop: `2px solid ${ACCENT}`, borderLeft: `2px solid ${ACCENT}` },
          { top: 32, right: 32, borderTop: `2px solid ${ACCENT}`, borderRight: `2px solid ${ACCENT}` },
          { bottom: 32, left: 32, borderBottom: `2px solid ${ACCENT}`, borderLeft: `2px solid ${ACCENT}` },
          { bottom: 32, right: 32, borderBottom: `2px solid ${ACCENT}`, borderRight: `2px solid ${ACCENT}` },
        ].map((cornerStyle, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 28,
              height: 28,
              ...cornerStyle,
            }}
          />
        ))}
      </div>
    ),
    { ...size }
  );
}
