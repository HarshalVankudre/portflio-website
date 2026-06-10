import { ImageResponse } from "next/og";
import { caseStudies, getCaseStudy } from "@/lib/caseStudies";

export const alt = "Case study — Harshal Vankudre";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#CEFF00";
const BG = "#060607";
const FG = "#EAE8E3";
const DIM = "#98968F";
const LINE = "rgba(234, 232, 227, 0.14)";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  const title = cs?.title ?? "Case study";
  const oneLiner = cs?.oneLiner.en ?? "";
  const metrics = cs?.metrics.slice(0, 3) ?? [];

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
          <span>CASE STUDY — {cs?.index ?? "—"}</span>
          <span>HARSHAL VANKUDRE</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              fontSize: 116,
              fontWeight: 700,
              color: FG,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              display: "flex",
            }}
          >
            {title}
            <span style={{ color: ACCENT }}>.</span>
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 27,
              color: DIM,
              lineHeight: 1.4,
              maxWidth: 980,
              display: "flex",
            }}
          >
            {oneLiner}
          </div>
          {metrics.length > 0 && (
            <div style={{ marginTop: 36, display: "flex", gap: "14px" }}>
              {metrics.map((m) => (
                <span
                  key={m.label.en}
                  style={{
                    border: `1px solid ${LINE}`,
                    borderRadius: 9999,
                    color: FG,
                    padding: "10px 24px",
                    fontSize: 22,
                    letterSpacing: "0.06em",
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <span style={{ color: ACCENT }}>{m.value}</span>
                  <span style={{ color: DIM }}>{m.label.en}</span>
                </span>
              ))}
            </div>
          )}
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
