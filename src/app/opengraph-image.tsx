import { ImageResponse } from "next/og";

export const alt = "Harshal Vankudre — AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#C15F3C";
const BG = "#FAF9F5";
const FG = "#1F1E1D";
const DIM = "#5E5C57";
const LINE = "rgba(31, 30, 29, 0.16)";

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
          <span>HARSHAL VANKUDRE</span>
          <span>KARLSRUHE, GERMANY</span>
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
            <span>AI Engineer · Mercedes-Benz Tech Innovation</span>
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
