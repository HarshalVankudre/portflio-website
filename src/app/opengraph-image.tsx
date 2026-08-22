import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Harshal Vankudre — AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#C15F3C";
const BG = "#FAF9F5";
const FG = "#1F1E1D";
const DIM = "#5E5C57";
const LINE = "rgba(31, 30, 29, 0.16)";

export default async function OpengraphImage() {
  // Same faces the page itself uses (latin WOFF subsets; satori can't read woff2).
  const [sourceSerif, inter] = await Promise.all([
    readFile(
      join(process.cwd(), "src/fonts/source-serif-4-latin-600-normal.woff")
    ),
    readFile(join(process.cwd(), "src/fonts/inter-latin-400-normal.woff")),
  ]);

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
          fontFamily: "Inter",
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
              fontFamily: "Source Serif 4",
              fontSize: 132,
              fontWeight: 600,
              color: FG,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
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
    {
      ...size,
      fonts: [
        {
          name: "Source Serif 4",
          data: sourceSerif,
          weight: 600,
          style: "normal",
        },
        { name: "Inter", data: inter, weight: 400, style: "normal" },
      ],
    }
  );
}
