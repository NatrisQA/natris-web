"use client";

import { LangProvider } from "@/components/LangContext";
import Hero from "@/components/Hero";
import AxesConnection from "@/components/AxesConnection";
import About from "@/components/About";
import Projects from "@/components/Projects";
import News from "@/components/News";
import { useEffect, useState } from "react";

/* 두 안 병렬 비교 페이지 — /width-compare
 * A: max-w-[1200px] 통일 + 데스크탑 gutter 48px
 * B: max-w-[1280px] 통일 + 데스크탑 gutter 48px
 * 현재 라이브 페이지(혼재 상태)를 함께 보려면 상단 토글의 "CURRENT"를 사용.
 */

type Mode = "current" | "a" | "b" | "stacked";

function Sections() {
  return (
    <>
      <Hero />
      <AxesConnection />
      <Projects />
      <About />
      <News />
    </>
  );
}

function Block({ mode, label, color }: { mode: "a" | "b" | "current"; label: string; color: string }) {
  return (
    <section style={{ position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 60,
          padding: "12px 24px",
          background: "#fff",
          borderTop: `3px solid ${color}`,
          borderBottom: "1px solid #eee",
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontFamily: "sans-serif",
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: "0.28em",
            color,
          }}
        >
          {label}
        </span>
        <WidthRuler color={color} />
      </div>

      <div className={`scope-${mode}`}>
        <Sections />
      </div>
    </section>
  );
}

/* 뷰포트 폭 + 예상 콘텐츠 영역 경계를 실시간 표시 */
function WidthRuler({ color }: { color: string }) {
  const [w, setW] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setW(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  if (!w) return null;
  return (
    <span style={{ fontSize: 11, color: "#666", fontWeight: 700 }}>
      viewport {w}px
    </span>
  );
}

export default function WidthComparePage() {
  const [mode, setMode] = useState<Mode>("stacked");

  const modes: { key: Mode; label: string }[] = [
    { key: "stacked", label: "A·B 스택 비교" },
    { key: "a", label: "A 단독 (1200)" },
    { key: "b", label: "B 단독 (1280)" },
    { key: "current", label: "CURRENT 단독" },
  ];

  return (
    <LangProvider>
      <style>{`
        /* ── Option A: 1200 통일 + 거터 24/48 ── */
        .scope-a [class*="max-w-[1280px]"] { max-width: 1200px !important; }
        .scope-a [class*="max-w-[1200px]"] { max-width: 1200px !important; }
        .scope-a > section { padding-left: 24px !important; padding-right: 24px !important; }
        @media (min-width: 768px) {
          .scope-a > section { padding-left: 48px !important; padding-right: 48px !important; }
        }

        /* ── Option B: 1280 통일 + 거터 24/48 ── */
        .scope-b [class*="max-w-[1200px]"] { max-width: 1280px !important; }
        .scope-b [class*="max-w-[1280px]"] { max-width: 1280px !important; }
        .scope-b > section { padding-left: 24px !important; padding-right: 24px !important; }
        @media (min-width: 768px) {
          .scope-b > section { padding-left: 48px !important; padding-right: 48px !important; }
        }

        /* ── Current: 아무것도 안 건드림 ── */

        /* Guide lines (연한 세로 점선) — 콘텐츠 경계 가늠용 */
        .scope-a, .scope-b {
          position: relative;
        }
        .scope-a::before, .scope-a::after,
        .scope-b::before, .scope-b::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 1px;
          pointer-events: none;
          z-index: 1;
          opacity: 0.25;
        }
        .scope-a::before { left: calc(50% - 600px); border-left: 1px dashed #e60012; }
        .scope-a::after  { left: calc(50% + 600px); border-left: 1px dashed #e60012; }
        .scope-b::before { left: calc(50% - 640px); border-left: 1px dashed #111; }
        .scope-b::after  { left: calc(50% + 640px); border-left: 1px dashed #111; }
      `}</style>

      <div
        style={{
          position: "fixed",
          top: 12,
          right: 12,
          zIndex: 200,
          display: "flex",
          gap: 6,
          padding: 6,
          borderRadius: 999,
          background: "#fff",
          border: "1px solid #ddd",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          fontFamily: "sans-serif",
        }}
      >
        {modes.map((m) => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.06em",
              background: mode === m.key ? "#111" : "transparent",
              color: mode === m.key ? "#fff" : "#555",
              border: "none",
              cursor: "pointer",
            }}
          >
            {m.label}
          </button>
        ))}
      </div>

      {(mode === "stacked" || mode === "a") && (
        <Block mode="a" label="OPTION A · 1200 · GUTTER 24/48" color="#e60012" />
      )}
      {(mode === "stacked" || mode === "b") && (
        <Block mode="b" label="OPTION B · 1280 · GUTTER 24/48" color="#111" />
      )}
      {mode === "current" && (
        <Block mode="current" label="CURRENT · 1200·1280 혼재 · GUTTER 24" color="#888" />
      )}
    </LangProvider>
  );
}
