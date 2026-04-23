"use client";

import { content } from "@/lib/i18n";
import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

const moitto = content.products.items.find((i) => i.id === "moitto")!;
const linkplay = content.products.items.find((i) => i.id === "linkplay")!;
const pokerlulu = content.products.items.find((i) => i.id === "pokerlulu")!;
const tubelulu = content.products.items.find((i) => i.id === "tubelulu")!;
const shuffleup = content.products.items.find((i) => i.id === "shuffleup")!;
const gtolulu = content.products.items.find((i) => i.id === "gtolulu")!;

const color = moitto.color; // #ff8c42
const AXIS_COLOR = "#ff8c42";
const AXIS_LABEL = "COMMUNITY";

export default function ServiceIdlePreview() {
  return (
    <div style={{ background: "#08080f", minHeight: "100vh", color: "#f5f5f7" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 120px" }}>
        <header style={{ marginBottom: 56 }}>
          <Link
            href="/"
            style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 700, letterSpacing: "0.12em" }}
          >
            ← LULU.AI
          </Link>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.32em",
              fontWeight: 900,
              color: "#ff5a6a",
              marginTop: 18,
              marginBottom: 10,
            }}
          >
            PREVIEW · SERVICE IDLE MOCKUPS
          </div>
          <h1 style={{ fontSize: 40, fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 12, lineHeight: 1.1 }}>
            영상이 없는 서비스의 메인 슬롯 시안
          </h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, maxWidth: 760, lineHeight: 1.7 }}>
            moitto 기준 시안 5종. 메인 Services 섹션의 21:9 영상 슬롯을 대체할 후보입니다. 모든 시안은 동일한 서비스(moitto · 출시 예정)로 렌더링해 공정 비교합니다.
            옵션 4는 레이아웃 자체를 바꾸므로 구조 비교용 목업입니다.
          </p>
        </header>

        <Option
          num={1}
          title="KeyVisual 재사용 — 네트워크 다이어그램"
          desc="상세 페이지의 moitto KeyVisual을 21:9에 맞게 재배치. 신규 자산 0개. 메인↔상세 시각 일관성 최대."
        >
          <Slot>
            <Variant1 />
          </Slot>
        </Option>

        <Option
          num={2}
          title="서비스별 모션 그래픽"
          desc="파티클이 부드럽게 떠다니며 연결선이 명멸. SVG + Framer Motion. 서비스마다 고유 모션 설계 필요(네트워크/웨이브폼/카드플립/차트)."
        >
          <Slot>
            <Variant2 />
          </Slot>
        </Option>

        <Option
          num={3}
          title="Coming Soon 타이포그래피"
          desc="대형 워드마크 + 출시예정 뱃지 + 라디얼 컬러 블룸 펄스. 정직한 기대감 연출. 라벨 오버레이 불필요."
        >
          <Slot noOverlay>
            <Variant3 />
          </Slot>
        </Option>

        <Option
          num={4}
          title="로드맵 belt — 레이아웃 전면 변경"
          desc="메인 캐러셀은 영상 있는 LinkPlay/PokerLulu만, 미출시 4개는 하단 belt 미니 카드로 분리. 위계가 명확해지지만 4개 서비스 브랜드 평등성 상실."
        >
          <div style={{ background: "#0a0a12", padding: 28 }}>
            <Variant4 />
          </div>
        </Option>

        <Option
          num={5}
          title="스톡 푸티지 (참고 플레이스홀더)"
          desc="실제 구현 시 네트워크/커뮤니티 테마 스톡 영상을 브랜드 톤으로 그레이딩. 라이선스 비용 + 제품 자체가 아닌 이미지. 실영상 소스가 없어 mood 플레이스홀더로 제시."
        >
          <Slot>
            <Variant5 />
          </Slot>
        </Option>
      </div>
    </div>
  );
}

function Option({
  num,
  title,
  desc,
  children,
}: {
  num: number;
  title: string;
  desc: string;
  children: ReactNode;
}) {
  return (
    <section style={{ marginBottom: 56 }}>
      <div style={{ marginBottom: 14 }}>
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.28em",
            fontWeight: 900,
            color,
            marginBottom: 6,
          }}
        >
          OPTION {String(num).padStart(2, "0")}
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.01em" }}>{title}</h2>
        <p
          style={{
            color: "rgba(255,255,255,0.55)",
            fontSize: 13,
            marginTop: 6,
            maxWidth: 780,
            lineHeight: 1.7,
          }}
        >
          {desc}
        </p>
      </div>
      <div
        style={{
          border: `1px solid ${color}30`,
          borderRadius: 16,
          overflow: "hidden",
          background: "#14141f",
          boxShadow: `0 20px 60px ${color}14`,
        }}
      >
        {children}
      </div>
    </section>
  );
}

function Slot({ children, noOverlay = false }: { children: ReactNode; noOverlay?: boolean }) {
  return (
    <div style={{ position: "relative", aspectRatio: "21 / 9", overflow: "hidden" }}>
      {children}
      {!noOverlay && (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to top, #14141f 0%, ${color}18 30%, transparent 60%)`,
              pointerEvents: "none",
            }}
          />
          <ServiceLabelOverlay />
        </>
      )}
    </div>
  );
}

function ServiceLabelOverlay() {
  return (
    <div style={{ position: "absolute", bottom: 24, left: 32, right: 32, pointerEvents: "none" }}>
      <span
        style={{
          fontSize: 10,
          letterSpacing: "0.16em",
          fontWeight: 900,
          padding: "4px 10px",
          borderRadius: 999,
          background: AXIS_COLOR,
          color: "#fff",
          display: "inline-block",
          marginBottom: 12,
        }}
      >
        {AXIS_LABEL}
      </span>
      <h3
        style={{
          fontSize: "clamp(2rem, 4vw, 3.2rem)",
          fontWeight: 900,
          color: "#fff",
          lineHeight: 1.1,
          textShadow: "0 2px 20px rgba(0,0,0,0.6)",
        }}
      >
        Moitto
      </h3>
      <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4, color: `${color}dd` }}>
        {moitto.tag.ko}
      </div>
    </div>
  );
}

/* ── Variant 1: KeyVisual reused (horizontal network) ── */
function Variant1() {
  const nodes = [
    { x: 400, y: 170, r: 44, center: true },
    { x: 180, y: 170, r: 28 },
    { x: 620, y: 170, r: 28 },
    { x: 260, y: 80, r: 22 },
    { x: 540, y: 80, r: 22 },
    { x: 260, y: 260, r: 22 },
    { x: 540, y: 260, r: 22 },
  ];
  const lines: Array<[number, number]> = [
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
    [1, 3],
    [1, 5],
    [2, 4],
    [2, 6],
  ];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(160deg, ${color}22, #14141f 60%)`,
      }}
    >
      <svg
        viewBox="0 0 800 340"
        preserveAspectRatio="xMidYMid meet"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        {lines.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke={color}
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.55"
          />
        ))}
        {nodes.map((n, i) => (
          <g key={i}>
            {n.center ? (
              <>
                <circle cx={n.x} cy={n.y} r={n.r + 14} fill={color} opacity="0.1" />
                <circle cx={n.x} cy={n.y} r={n.r} fill="#f5f5f7" stroke={color} strokeWidth="2" />
                <text x={n.x} y={n.y + 6} fontSize="18" fontWeight="900" fill={color} textAnchor="middle">
                  M
                </text>
              </>
            ) : (
              <>
                <circle cx={n.x} cy={n.y} r={n.r} fill={`${color}20`} stroke={color} strokeWidth="1.5" />
                <circle cx={n.x} cy={n.y - n.r * 0.35} r={n.r * 0.3} fill={color} />
                <path
                  d={`M ${n.x - n.r * 0.65} ${n.y + n.r * 0.35} Q ${n.x} ${n.y + n.r * 0.1} ${n.x + n.r * 0.65} ${n.y + n.r * 0.35}`}
                  stroke={color}
                  strokeWidth="2"
                  fill="none"
                />
              </>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ── Variant 2: Motion graphic (constellation) ── */
function Variant2() {
  const particles = Array.from({ length: 22 }, (_, i) => {
    const seed = (i * 37 + 7) % 100;
    const x = 60 + ((seed * 7) % 680);
    const y = 40 + ((seed * 11) % 260);
    const dx = ((seed * 13) % 40) - 20;
    const dy = ((seed * 17) % 40) - 20;
    const delay = (i % 5) * 0.4;
    return { x, y, dx, dy, delay, i, r: 2.5 + (i % 3) * 0.7 };
  });
  const connections: Array<[number, number]> = [];
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i];
      const b = particles[j];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < 130) connections.push([i, j]);
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(ellipse 70% 70% at 50% 50%, ${color}14, transparent 70%), #14141f`,
      }}
    >
      <svg
        viewBox="0 0 800 340"
        preserveAspectRatio="xMidYMid meet"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        {connections.map(([a, b], i) => {
          const p1 = particles[a];
          const p2 = particles[b];
          return (
            <motion.line
              key={i}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke={color}
              strokeWidth="1"
              initial={{ opacity: 0.08 }}
              animate={{ opacity: [0.08, 0.35, 0.08] }}
              transition={{
                duration: 3 + (i % 4),
                repeat: Infinity,
                delay: (i % 7) * 0.3,
                ease: "easeInOut",
              }}
            />
          );
        })}
        {particles.map((p) => (
          <motion.circle
            key={p.i}
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill={color}
            animate={{
              cx: [p.x, p.x + p.dx, p.x - p.dx * 0.5, p.x],
              cy: [p.y, p.y + p.dy, p.y - p.dy * 0.5, p.y],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: 8 + (p.i % 4) * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

/* ── Variant 3: Coming Soon wordmark ── */
function Variant3() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#08080f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 60% 70% at 50% 50%, ${color}35, transparent 70%)`,
        }}
        animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.08, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.08,
          backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      <div style={{ position: "relative", textAlign: "center", zIndex: 1, padding: 24 }}>
        <div style={{ display: "inline-flex", gap: 8, marginBottom: 24 }}>
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.24em",
              fontWeight: 900,
              padding: "5px 12px",
              borderRadius: 999,
              background: AXIS_COLOR,
              color: "#fff",
            }}
          >
            {AXIS_LABEL}
          </span>
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.24em",
              fontWeight: 900,
              padding: "5px 12px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            LAUNCHING SOON
          </span>
        </div>
        <div
          style={{
            fontSize: "clamp(3rem, 9vw, 6.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.02em",
            color: "#f5f5f7",
            lineHeight: 1,
          }}
        >
          Moitto
        </div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "rgba(255,255,255,0.6)",
            maxWidth: 480,
            margin: "14px auto 0",
          }}
        >
          {moitto.tag.ko}
        </div>
      </div>
    </div>
  );
}

/* ── Variant 4: Roadmap belt ── */
function Variant4() {
  const launched = [linkplay, pokerlulu];
  const upcoming = [moitto, tubelulu, shuffleup, gtolulu];
  return (
    <div>
      <div
        style={{
          fontSize: 11,
          letterSpacing: "0.32em",
          fontWeight: 900,
          color: "#ff5a6a",
          marginBottom: 16,
        }}
      >
        NOW LIVE
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 36 }}>
        {launched.map((s) => (
          <div
            key={s.id}
            style={{
              background: "#14141f",
              border: `1px solid ${s.color}30`,
              borderRadius: 14,
              aspectRatio: "16 / 10",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(135deg, ${s.color}22, transparent 60%)`,
              }}
            />
            <div style={{ position: "absolute", bottom: 18, left: 18 }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}>{s.name}</div>
              <div style={{ fontSize: 11, color: `${s.color}dd`, fontWeight: 600, marginTop: 2 }}>
                {s.tag.ko}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          fontSize: 11,
          letterSpacing: "0.32em",
          fontWeight: 900,
          color: "rgba(255,255,255,0.4)",
          marginBottom: 16,
        }}
      >
        COMING NEXT
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {upcoming.map((s) => (
          <div
            key={s.id}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: 16,
              aspectRatio: "1 / 1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: 9,
                letterSpacing: "0.2em",
                fontWeight: 900,
                padding: "3px 8px",
                borderRadius: 999,
                background: `${s.color}20`,
                color: s.color,
                alignSelf: "flex-start",
              }}
            >
              SOON
            </span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 900, color: "#f5f5f7" }}>{s.name}</div>
              <div
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.45)",
                  fontWeight: 600,
                  marginTop: 2,
                  lineHeight: 1.4,
                }}
              >
                {s.tag.ko}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Variant 5: Stock footage placeholder ── */
function Variant5() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(135deg, #1a2638, #0f1420)",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          left: "10%",
          top: "20%",
          width: 340,
          height: 340,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}40, transparent 60%)`,
          filter: "blur(40px)",
        }}
        animate={{ x: [0, 60, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{
          position: "absolute",
          right: "8%",
          bottom: "12%",
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: `radial-gradient(circle, #7a9cff35, transparent 60%)`,
          filter: "blur(40px)",
        }}
        animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          fontSize: 9,
          letterSpacing: "0.24em",
          fontWeight: 900,
          padding: "5px 10px",
          borderRadius: 4,
          background: "rgba(0,0,0,0.5)",
          color: "rgba(255,255,255,0.6)",
          border: "1px solid rgba(255,255,255,0.14)",
        }}
      >
        PLACEHOLDER · STOCK FOOTAGE
      </div>
    </div>
  );
}
