import type { CSSProperties, ReactNode } from "react";
import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { portfolioData } from "../lib/portfolioData";

const colors = {
  cream: "#FFFEF5",
  ink: "#1A1A1A",
  paper: "#FFFFFF",
  muted: "#E9E3D0",
  yellow: "#FFE500",
  cyan: "#4ECDC4",
  red: "#FF6B6B",
};

const border = `5px solid ${colors.ink}`;
const shadow = (x = 12, y = 12) => `${x}px ${y}px 0 ${colors.ink}`;
const displayFont = '"Arial Black", Impact, system-ui, sans-serif';
const sansFont = 'Inter, "Segoe UI", Arial, sans-serif';
const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const easeInOut = Easing.bezier(0.45, 0, 0.55, 1);
const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

const sceneFrames = 90;
const revealChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&";

const normalized = (
  frame: number,
  start: number,
  end: number,
  easing = easeOut
) =>
  interpolate(frame, [start, end], [0, 1], {
    ...clamp,
    easing,
  });

const fadeScene = (frame: number, duration: number) => {
  const fade = 12;
  const fadeIn = normalized(frame, 0, fade);
  const fadeOut = interpolate(frame, [duration - fade, duration], [1, 0], {
    ...clamp,
    easing: Easing.in(Easing.cubic),
  });

  return Math.min(fadeIn, fadeOut);
};

const popIn = (frame: number, start: number, duration = 18) =>
  normalized(frame, start, start + duration, Easing.bezier(0.34, 1.56, 0.64, 1));

const scramble = (text: string, frame: number, startFrame: number) => {
  return text
    .split("")
    .map((letter, index) => {
      if (letter === " ") {
        return " ";
      }

      const localFrame = frame - startFrame - index * 2;
      if (localFrame > 8) {
        return letter;
      }

      const charIndex = Math.abs((frame * 7 + index * 13) % revealChars.length);
      return revealChars[charIndex];
    })
    .join("");
};

function GridBackground() {
  const frame = useCurrentFrame();
  const shiftX = -frame * 0.6;
  const shiftY = frame * 0.35;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.cream,
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.05) 2px, transparent 2px), linear-gradient(90deg, rgba(0,0,0,0.05) 2px, transparent 2px)",
        backgroundSize: "58px 58px",
        backgroundPosition: `${shiftX}px ${shiftY}px`,
      }}
    />
  );
}

function GraphicBlock({
  color,
  width,
  height,
  left,
  top,
  rotate,
  delay = 0,
}: {
  color: string;
  width: number;
  height: number;
  left: number;
  top: number;
  rotate: number;
  delay?: number;
}) {
  const frame = useCurrentFrame();
  const driftX = Math.sin((frame + delay) / 34) * 18;
  const driftY = Math.cos((frame + delay) / 42) * 20;
  const spin = Math.sin((frame + delay) / 55) * 4;

  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width,
        height,
        background: color,
        border,
        boxShadow: shadow(8, 8),
        transform: `translate(${driftX}px, ${driftY}px) rotate(${rotate + spin}deg)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(${colors.ink} 2px, transparent 2px)`,
          backgroundSize: "24px 24px",
          opacity: 0.14,
        }}
      />
    </div>
  );
}

function GlobalDecor() {
  return (
    <AbsoluteFill>
      <GraphicBlock color={colors.yellow} width={270} height={180} left={-70} top={210} rotate={9} />
      <GraphicBlock color={colors.cyan} width={210} height={300} left={900} top={430} rotate={13} delay={40} />
      <GraphicBlock color={colors.red} width={230} height={230} left={70} top={1530} rotate={-11} delay={85} />
      <GraphicBlock color={colors.muted} width={340} height={170} left={760} top={1350} rotate={-6} delay={125} />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 111,
          height: 20,
          background: colors.ink,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 122,
          height: 12,
          background: colors.ink,
        }}
      />
    </AbsoluteFill>
  );
}

function SceneShell({
  children,
  durationInFrames,
}: {
  children: ReactNode;
  durationInFrames: number;
}) {
  const frame = useCurrentFrame();
  const opacity = fadeScene(frame, durationInFrames);
  const y = interpolate(frame, [0, 16], [34, 0], {
    ...clamp,
    easing: easeOut,
  });

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
}

function WindowBar({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 56,
        padding: "0 22px",
        borderBottom: border,
        background: colors.cyan,
        fontFamily: sansFont,
        fontSize: 22,
        fontWeight: 900,
        textTransform: "uppercase",
        letterSpacing: 0,
      }}
    >
      <span>{label}</span>
      <span style={{ display: "flex", gap: 10 }}>
        {[colors.red, colors.yellow, colors.paper].map((color) => (
          <span
            key={color}
            style={{
              width: 22,
              height: 22,
              background: color,
              border: `3px solid ${colors.ink}`,
              display: "block",
            }}
          />
        ))}
      </span>
    </div>
  );
}

function Panel({
  children,
  style,
  label,
}: {
  children: ReactNode;
  style?: CSSProperties;
  label?: string;
}) {
  return (
    <div
      style={{
        background: colors.paper,
        border,
        boxShadow: shadow(),
        overflow: "hidden",
        ...style,
      }}
    >
      {label ? <WindowBar label={label} /> : null}
      {children}
    </div>
  );
}

function Sticker({
  children,
  color,
  left,
  top,
  rotate,
  start,
}: {
  children: ReactNode;
  color: string;
  left: number;
  top: number;
  rotate: number;
  start: number;
}) {
  const frame = useCurrentFrame();
  const enter = popIn(frame, start);

  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        padding: "15px 22px",
        background: color,
        border: `4px solid ${colors.ink}`,
        boxShadow: shadow(7, 7),
        transform: `scale(${enter}) rotate(${rotate}deg)`,
        transformOrigin: "center",
        fontFamily: displayFont,
        fontSize: 30,
        lineHeight: 1,
        textTransform: "uppercase",
        letterSpacing: 0,
      }}
    >
      {children}
    </div>
  );
}

function IntroScene() {
  const frame = useCurrentFrame();
  const nameProgress = normalized(frame, 8, 30);
  const roleProgress = normalized(frame, 34, 52);
  const monogramProgress = popIn(frame, 18);
  const firstName = scramble("HARSHAL", frame, 12);
  const lastName = scramble("VANKUDRE", frame, 27);

  return (
    <SceneShell durationInFrames={sceneFrames}>
      <AbsoluteFill style={{ padding: 84 }}>
        <div
          style={{
            position: "absolute",
            right: 90,
            top: 245,
            width: 365,
            height: 365,
            background: colors.yellow,
            border,
            boxShadow: shadow(14, 14),
            transform: `scale(${monogramProgress}) rotate(${interpolate(monogramProgress, [0, 1], [-8, 2])}deg)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: displayFont,
            fontSize: 158,
            lineHeight: 1,
          }}
        >
          HV
        </div>

        <Panel
          label="portfolio.id"
          style={{
            position: "absolute",
            left: 86,
            top: 560,
            width: 830,
          }}
        >
          <div style={{ padding: "54px 44px 48px" }}>
            <div
              style={{
                fontFamily: displayFont,
                fontSize: 110,
                lineHeight: 0.9,
                textTransform: "uppercase",
                letterSpacing: 0,
                transform: `translateX(${interpolate(nameProgress, [0, 1], [-70, 0])}px)`,
                opacity: nameProgress,
              }}
            >
              {firstName}
            </div>
            <div
              style={{
                display: "inline-block",
                marginTop: 24,
                padding: "12px 24px 18px",
                background: colors.yellow,
                border,
                boxShadow: shadow(10, 10),
                fontFamily: displayFont,
                fontSize: 88,
                lineHeight: 0.95,
                textTransform: "uppercase",
                letterSpacing: 0,
                transform: `translateX(${interpolate(nameProgress, [0, 1], [84, 0])}px) rotate(-1deg)`,
                opacity: nameProgress,
              }}
            >
              {lastName}
            </div>
          </div>
        </Panel>

        <div
          style={{
            position: "absolute",
            left: 122,
            top: 1008,
            padding: "18px 26px",
            background: colors.paper,
            border,
            boxShadow: shadow(8, 8),
            fontFamily: sansFont,
            fontSize: 37,
            fontWeight: 900,
            color: colors.ink,
            opacity: roleProgress,
            transform: `translateY(${interpolate(roleProgress, [0, 1], [36, 0])}px)`,
          }}
        >
          {portfolioData.personal.title}
          <span
            style={{
              color: colors.red,
              opacity: Math.floor(frame / 12) % 2 === 0 ? 1 : 0,
              paddingLeft: 8,
            }}
          >
            |
          </span>
        </div>

        <Sticker color={colors.cyan} left={135} top={1320} rotate={-8} start={50}>
          Karlsruhe
        </Sticker>
        <Sticker color={colors.red} left={430} top={1278} rotate={7} start={58}>
          AI systems
        </Sticker>
        <Sticker color={colors.yellow} left={615} top={1400} rotate={-5} start={64}>
          DE + EN
        </Sticker>
      </AbsoluteFill>
    </SceneShell>
  );
}

function SkillChip({
  label,
  color,
  index,
}: {
  label: string;
  color: string;
  index: number;
}) {
  const frame = useCurrentFrame();
  const enter = popIn(frame, 18 + index * 4, 16);
  const y = interpolate(enter, [0, 1], [34, 0]);

  return (
    <div
      style={{
        padding: "16px 22px",
        background: color,
        border: `4px solid ${colors.ink}`,
        boxShadow: shadow(6, 6),
        transform: `translateY(${y}px) scale(${enter})`,
        fontFamily: displayFont,
        fontSize: 31,
        textTransform: "uppercase",
        lineHeight: 1,
        letterSpacing: 0,
      }}
    >
      {label}
    </div>
  );
}

function CodeLine({ text, index }: { text: string; index: number }) {
  const frame = useCurrentFrame();
  const appear = normalized(frame, 44 + index * 9, 56 + index * 9);
  const width = interpolate(appear, [0, 1], [0, 1]);

  return (
    <div
      style={{
        fontFamily: '"Cascadia Mono", Consolas, monospace',
        fontSize: 30,
        lineHeight: 1.55,
        color: colors.paper,
        whiteSpace: "nowrap",
        overflow: "hidden",
        width: `${width * 100}%`,
      }}
    >
      <span style={{ color: colors.yellow }}>&gt;</span> {text}
    </div>
  );
}

function SkillsScene() {
  const skills = [
    { label: portfolioData.skills.languages[0], color: colors.yellow },
    { label: "TypeScript", color: colors.paper },
    { label: "Next.js", color: colors.cyan },
    { label: "React", color: colors.red },
    { label: "FastAPI", color: colors.yellow },
    { label: "OpenAI API", color: colors.cyan },
    { label: "RAG", color: colors.red },
    { label: "PostgreSQL", color: colors.paper },
    { label: "Docker", color: colors.yellow },
  ];

  return (
    <SceneShell durationInFrames={sceneFrames}>
      <AbsoluteFill style={{ padding: 84 }}>
        <div
          style={{
            position: "absolute",
            top: 196,
            left: 90,
            right: 90,
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "12px 18px",
              background: colors.red,
              border,
              boxShadow: shadow(7, 7),
              fontFamily: sansFont,
              fontSize: 26,
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            Toolkit
          </div>
          <h2
            style={{
              margin: "42px 0 0",
              fontFamily: displayFont,
              fontSize: 88,
              lineHeight: 0.96,
              textTransform: "uppercase",
              letterSpacing: 0,
            }}
          >
            AI + full-stack
            <br />
            build system
          </h2>
        </div>

        <div
          style={{
            position: "absolute",
            left: 90,
            right: 90,
            top: 560,
            display: "flex",
            flexWrap: "wrap",
            gap: 22,
          }}
        >
          {skills.map((skill, index) => (
            <SkillChip key={skill.label} label={skill.label} color={skill.color} index={index} />
          ))}
        </div>

        <Panel
          label="ship.log"
          style={{
            position: "absolute",
            left: 90,
            right: 90,
            bottom: 270,
            background: colors.ink,
          }}
        >
          <div style={{ padding: "40px 38px 44px" }}>
            <CodeLine text="compose RAG pipelines for company knowledge" index={0} />
            <CodeLine text="build Next.js apps with typed APIs" index={1} />
            <CodeLine text="turn messy data into useful tools" index={2} />
          </div>
        </Panel>
      </AbsoluteFill>
    </SceneShell>
  );
}

function MetricCard({
  value,
  label,
  color,
  index,
  bar,
}: {
  value: string;
  label: string;
  color: string;
  index: number;
  bar: number;
}) {
  const frame = useCurrentFrame();
  const enter = normalized(frame, 18 + index * 9, 36 + index * 9);
  const barProgress = normalized(frame, 38 + index * 8, 62 + index * 8, easeInOut);

  return (
    <div
      style={{
        background: color,
        border,
        boxShadow: shadow(9, 9),
        padding: "28px 30px",
        transform: `translateX(${interpolate(enter, [0, 1], [110, 0])}px)`,
        opacity: enter,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 82,
            lineHeight: 0.85,
            letterSpacing: 0,
          }}
        >
          {value}
        </div>
        <div
          style={{
            fontFamily: sansFont,
            fontSize: 24,
            lineHeight: 1.1,
            fontWeight: 900,
            textTransform: "uppercase",
            width: 260,
            textAlign: "right",
          }}
        >
          {label}
        </div>
      </div>
      <div
        style={{
          marginTop: 24,
          height: 22,
          background: colors.paper,
          border: `4px solid ${colors.ink}`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${bar * barProgress * 100}%`,
            background: colors.ink,
          }}
        />
      </div>
    </div>
  );
}

function ProjectLine({
  name,
  highlight,
  index,
}: {
  name: string;
  highlight: string;
  index: number;
}) {
  const frame = useCurrentFrame();
  const enter = normalized(frame, 42 + index * 6, 56 + index * 6);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "240px 1fr",
        columnGap: 22,
        padding: "20px 0",
        borderTop: index === 0 ? "none" : `3px solid ${colors.ink}`,
        opacity: enter,
        transform: `translateY(${interpolate(enter, [0, 1], [24, 0])}px)`,
      }}
    >
      <div
        style={{
          fontFamily: displayFont,
          fontSize: 26,
          lineHeight: 1,
          textTransform: "uppercase",
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontFamily: sansFont,
          fontSize: 25,
          lineHeight: 1.16,
          fontWeight: 800,
        }}
      >
        {highlight}
      </div>
    </div>
  );
}

function MetricsScene() {
  const metrics = portfolioData.metrics;
  const projects = portfolioData.projects.slice(0, 3);

  return (
    <SceneShell durationInFrames={sceneFrames}>
      <AbsoluteFill style={{ padding: 84 }}>
        <h2
          style={{
            position: "absolute",
            top: 190,
            left: 90,
            right: 90,
            margin: 0,
            fontFamily: displayFont,
            fontSize: 92,
            lineHeight: 0.95,
            textTransform: "uppercase",
            letterSpacing: 0,
          }}
        >
          Measurable
          <br />
          product impact
        </h2>

        <div
          style={{
            position: "absolute",
            left: 90,
            right: 90,
            top: 505,
            display: "grid",
            gap: 30,
          }}
        >
          <MetricCard
            value={metrics.responseImprovement}
            label="faster chatbot response time"
            color={colors.yellow}
            index={0}
            bar={0.35}
          />
          <MetricCard
            value={metrics.automationRate}
            label="tier-one inquiries automated"
            color={colors.cyan}
            index={1}
            bar={0.6}
          />
          <MetricCard
            value={metrics.equipmentRecords}
            label="equipment records indexed"
            color={colors.red}
            index={2}
            bar={0.84}
          />
        </div>

        <Panel
          label="selected.work"
          style={{
            position: "absolute",
            left: 90,
            right: 90,
            bottom: 190,
          }}
        >
          <div style={{ padding: "22px 32px 26px" }}>
            {projects.map((project, index) => (
              <ProjectLine
                key={project.name}
                name={project.name}
                highlight={project.highlight}
                index={index}
              />
            ))}
          </div>
        </Panel>
      </AbsoluteFill>
    </SceneShell>
  );
}

function SignalBlock({ index }: { index: number }) {
  const frame = useCurrentFrame();
  const progress = popIn(frame, 28 + index * 0.8, 12);
  const pattern = [colors.ink, colors.yellow, colors.cyan, colors.red, colors.paper];

  return (
    <div
      style={{
        width: 50,
        height: 50,
        background: pattern[index % pattern.length],
        border: `3px solid ${colors.ink}`,
        transform: `scale(${progress})`,
      }}
    />
  );
}

function FinalScene() {
  const frame = useCurrentFrame();
  const title = normalized(frame, 8, 28);
  const subtitle = normalized(frame, 30, 48);
  const slide = interpolate(title, [0, 1], [70, 0]);

  return (
    <SceneShell durationInFrames={sceneFrames}>
      <AbsoluteFill style={{ padding: 84 }}>
        <div
          style={{
            position: "absolute",
            left: 90,
            top: 210,
            width: 820,
            fontFamily: displayFont,
            fontSize: 116,
            lineHeight: 0.9,
            textTransform: "uppercase",
            letterSpacing: 0,
            opacity: title,
            transform: `translateX(${slide}px)`,
          }}
        >
          Building AI
          <br />
          systems that
          <br />
          ship.
        </div>

        <Panel
          style={{
            position: "absolute",
            left: 90,
            right: 90,
            top: 690,
            background: colors.yellow,
          }}
        >
          <div
            style={{
              padding: "40px 44px",
              fontFamily: sansFont,
              fontSize: 38,
              lineHeight: 1.22,
              fontWeight: 900,
              opacity: subtitle,
              transform: `translateY(${interpolate(subtitle, [0, 1], [32, 0])}px)`,
            }}
          >
            Enterprise AI chatbots, RAG systems, and full-stack apps with
            practical data workflows.
          </div>
        </Panel>

        <div
          style={{
            position: "absolute",
            left: 90,
            top: 1035,
            display: "grid",
            gridTemplateColumns: "repeat(6, 50px)",
            gap: 10,
            padding: 24,
            background: colors.paper,
            border,
            boxShadow: shadow(10, 10),
          }}
        >
          {Array.from({ length: 36 }).map((_, index) => (
            <SignalBlock key={index} index={index} />
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            left: 90,
            right: 90,
            bottom: 250,
            display: "grid",
            gap: 18,
          }}
        >
          {[
            portfolioData.personal.email,
            "github.com/HarshalVankudre",
            "vankudre.com",
          ].map((line, index) => {
            const enter = normalized(frame, 42 + index * 6, 56 + index * 6);
            return (
              <div
                key={line}
                style={{
                  padding: "20px 26px",
                  background: index === 0 ? colors.cyan : colors.paper,
                  border,
                  boxShadow: shadow(7, 7),
                  fontFamily: index === 0 ? displayFont : sansFont,
                  fontSize: index === 0 ? 34 : 31,
                  fontWeight: 900,
                  opacity: enter,
                  transform: `translateX(${interpolate(enter, [0, 1], [-46, 0])}px)`,
                }}
              >
                {line}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
}

function PortfolioMusic() {
  const { fps } = useVideoConfig();
  const duration = fps * 12;

  return (
    <Audio
      src={staticFile("audio/portfolio-bed.wav")}
      volume={(frame) =>
        interpolate(frame, [0, fps, duration - fps, duration], [0, 0.36, 0.36, 0], {
          ...clamp,
          easing: easeInOut,
        })
      }
    />
  );
}

export function PortfolioGraphic() {
  const { fps } = useVideoConfig();
  const timelineFrames = fps * 12;

  return (
    <AbsoluteFill
      style={{
        color: colors.ink,
        fontFamily: sansFont,
        overflow: "hidden",
      }}
    >
      <PortfolioMusic />
      <GridBackground />
      <GlobalDecor />
      <Sequence from={0} durationInFrames={sceneFrames}>
        <IntroScene />
      </Sequence>
      <Sequence from={sceneFrames} durationInFrames={sceneFrames}>
        <SkillsScene />
      </Sequence>
      <Sequence from={sceneFrames * 2} durationInFrames={sceneFrames}>
        <MetricsScene />
      </Sequence>
      <Sequence from={sceneFrames * 3} durationInFrames={timelineFrames - sceneFrames * 3}>
        <FinalScene />
      </Sequence>
    </AbsoluteFill>
  );
}
