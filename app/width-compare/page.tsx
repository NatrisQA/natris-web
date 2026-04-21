"use client";

import { LangProvider } from "@/components/LangContext";
import Hero from "@/components/Hero";
import AxesConnection from "@/components/AxesConnection";
import About from "@/components/About";
import Projects from "@/components/Projects";
import News from "@/components/News";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

/* ────────────────────────────────────────────────────────────────
 * /width-compare — lulu.ai 섹션 가로폭 비교 프리뷰
 *
 * URL:
 *   /width-compare            → 부모 모드 (토글 UI + 기본 "side-by-side")
 *   /width-compare?mode=a     → 자식 단독 렌더 (1200 통일)
 *   /width-compare?mode=b     → 자식 단독 렌더 (1280 통일)
 *   /width-compare?mode=current → 자식 단독 렌더 (현재 혼재)
 *
 * 자식 URL은 부모의 iframe 대상으로도 쓰임 → side-by-side 모드에서 스크롤 동기화.
 * ──────────────────────────────────────────────────────────────── */

type ScopeMode = "a" | "b" | "current";
type ParentMode = "side-by-side" | "stacked" | "a" | "b" | "current";

const SCOPE_CSS = `
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

  /* ── Current: override 없음 ── */

  /* Guide lines — 콘텐츠 경계 가늠선 */
  .scope-a, .scope-b, .scope-current { position: relative; }
  .scope-a::before, .scope-a::after,
  .scope-b::before, .scope-b::after {
    content: "";
    position: absolute;
    top: 0; bottom: 0;
    width: 1px;
    pointer-events: none;
    z-index: 1;
    opacity: 0.25;
  }
  .scope-a::before { left: calc(50% - 600px); border-left: 1px dashed #e60012; }
  .scope-a::after  { left: calc(50% + 600px); border-left: 1px dashed #e60012; }
  .scope-b::before { left: calc(50% - 640px); border-left: 1px dashed #111; }
  .scope-b::after  { left: calc(50% + 640px); border-left: 1px dashed #111; }
`;

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

function ScopeBlock({ mode }: { mode: ScopeMode }) {
  return (
    <div className={`scope-${mode}`}>
      <Sections />
    </div>
  );
}

/* ── 부모: 토글 바 ── */
function Toolbar({
  mode,
  onChange,
}: {
  mode: ParentMode;
  onChange: (m: ParentMode) => void;
}) {
  const items: { key: ParentMode; label: string }[] = [
    { key: "side-by-side", label: "좌우 비교 (싱크)" },
    { key: "stacked", label: "A·B 세로 스택" },
    { key: "a", label: "A 단독" },
    { key: "b", label: "B 단독" },
    { key: "current", label: "CURRENT" },
  ];
  return (
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
      {items.map((it) => (
        <button
          key={it.key}
          onClick={() => onChange(it.key)}
          style={{
            padding: "6px 12px",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "0.06em",
            background: mode === it.key ? "#111" : "transparent",
            color: mode === it.key ? "#fff" : "#555",
            border: "none",
            cursor: "pointer",
          }}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

/* ── 실시간 뷰포트 폭 + 라벨 ── */
function LabelBar({ label, color, extra }: { label: string; color: string; extra?: string }) {
  const [w, setW] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setW(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 60,
        padding: "10px 20px",
        background: "#fff",
        borderTop: `3px solid ${color}`,
        borderBottom: "1px solid #eee",
        display: "flex",
        alignItems: "center",
        gap: 14,
        fontFamily: "sans-serif",
      }}
    >
      <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.28em", color }}>
        {label}
      </span>
      {w !== null && (
        <span style={{ fontSize: 11, color: "#666", fontWeight: 700 }}>
          viewport {w}px
        </span>
      )}
      {extra && (
        <span style={{ fontSize: 11, color: "#999", fontWeight: 600 }}>{extra}</span>
      )}
    </div>
  );
}

/* ── Side-by-side: 두 iframe + 섹션 앵커 기반 스크롤 동기화 ── */
function SideBySide() {
  const leftRef = useRef<HTMLIFrameElement>(null);
  const rightRef = useRef<HTMLIFrameElement>(null);
  /* owner = 현재 사용자가 조작 중인 쪽. 이쪽의 scroll 이벤트만 반대쪽으로 전파 → 핑퐁 차단 */
  const ownerRef = useRef<"left" | "right" | null>(null);

  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;
    if (!left || !right) return;

    type Anchor = { index: number; offsetInSection: number };

    /* 뷰포트 상단(0px)을 기준으로 "지금 몇 번째 섹션의 어느 위치에 있는가"를 구한다 */
    const getAnchor = (w: Window): Anchor => {
      const sections = Array.from(w.document.querySelectorAll("section")) as HTMLElement[];
      if (sections.length === 0) return { index: 0, offsetInSection: w.scrollY };
      for (let i = 0; i < sections.length; i++) {
        const r = sections[i].getBoundingClientRect();
        if (r.top <= 0 && r.bottom > 0) {
          return { index: i, offsetInSection: -r.top };
        }
      }
      /* 첫 섹션 위, 또는 마지막 섹션 아래 */
      if (sections[0].getBoundingClientRect().top > 0) {
        return { index: 0, offsetInSection: -sections[0].getBoundingClientRect().top };
      }
      const last = sections[sections.length - 1];
      return {
        index: sections.length - 1,
        offsetInSection: -last.getBoundingClientRect().top,
      };
    };

    /* 상대편에 앵커를 적용: 같은 인덱스 섹션의 같은 오프셋으로 스크롤 */
    const applyAnchor = (w: Window, anchor: Anchor) => {
      const sections = Array.from(w.document.querySelectorAll("section")) as HTMLElement[];
      const target = sections[anchor.index];
      if (!target) {
        w.scrollTo(0, anchor.offsetInSection);
        return;
      }
      const r = target.getBoundingClientRect();
      w.scrollTo(0, w.scrollY + r.top + anchor.offsetInSection);
    };

    const sync = (src: HTMLIFrameElement, dst: HTMLIFrameElement) => {
      const sw = src.contentWindow;
      const dw = dst.contentWindow;
      if (!sw || !dw) return;
      applyAnchor(dw, getAnchor(sw));
    };

    const attach = (
      iframeEl: HTMLIFrameElement,
      otherEl: HTMLIFrameElement,
      side: "left" | "right"
    ) => {
      const w = iframeEl.contentWindow;
      if (!w) return () => {};
      const claim = () => {
        ownerRef.current = side;
      };
      const onScroll = () => {
        if (ownerRef.current !== side) return;
        sync(iframeEl, otherEl);
      };
      /* 소유권 주장: 마우스/휠/포인터/터치 중 어느 하나라도 발생하면 이쪽이 조작자 */
      iframeEl.addEventListener("mouseenter", claim);
      w.addEventListener("wheel", claim, { passive: true });
      w.addEventListener("pointerdown", claim);
      w.addEventListener("touchstart", claim, { passive: true });
      w.addEventListener("keydown", claim);
      w.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        iframeEl.removeEventListener("mouseenter", claim);
        w.removeEventListener("wheel", claim);
        w.removeEventListener("pointerdown", claim);
        w.removeEventListener("touchstart", claim);
        w.removeEventListener("keydown", claim);
        w.removeEventListener("scroll", onScroll);
      };
    };

    let detachL = () => {};
    let detachR = () => {};

    const onLeftLoad = () => {
      detachL();
      detachL = attach(left, right, "left");
    };
    const onRightLoad = () => {
      detachR();
      detachR = attach(right, left, "right");
    };

    left.addEventListener("load", onLeftLoad);
    right.addEventListener("load", onRightLoad);

    if (left.contentWindow?.document.readyState === "complete") onLeftLoad();
    if (right.contentWindow?.document.readyState === "complete") onRightLoad();

    return () => {
      left.removeEventListener("load", onLeftLoad);
      right.removeEventListener("load", onRightLoad);
      detachL();
      detachR();
    };
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        height: "100dvh",
        width: "100%",
        gap: 2,
        background: "#ddd",
      }}
    >
      <div style={{ position: "relative", overflow: "hidden", background: "#fff" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            padding: "10px 16px",
            background: "rgba(255,255,255,0.96)",
            borderBottom: "1px solid #eee",
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: "0.22em",
            color: "#e60012",
            fontFamily: "sans-serif",
          }}
        >
          OPTION A · 1200 · GUTTER 24/48
        </div>
        <iframe
          ref={leftRef}
          src="/width-compare?mode=a"
          title="Option A preview"
          style={{
            border: "none",
            width: "100%",
            height: "100%",
            display: "block",
            paddingTop: 38,
            boxSizing: "border-box",
          }}
        />
      </div>
      <div style={{ position: "relative", overflow: "hidden", background: "#fff" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            padding: "10px 16px",
            background: "rgba(255,255,255,0.96)",
            borderBottom: "1px solid #eee",
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: "0.22em",
            color: "#111",
            fontFamily: "sans-serif",
          }}
        >
          OPTION B · 1280 · GUTTER 24/48
        </div>
        <iframe
          ref={rightRef}
          src="/width-compare?mode=b"
          title="Option B preview"
          style={{
            border: "none",
            width: "100%",
            height: "100%",
            display: "block",
            paddingTop: 38,
            boxSizing: "border-box",
          }}
        />
      </div>
    </div>
  );
}

/* ── 단독 블록 (자식 iframe 또는 '단독' 토글) ── */
function SoloBlock({ mode }: { mode: ScopeMode }) {
  const meta: Record<ScopeMode, { label: string; color: string }> = {
    a: { label: "OPTION A · 1200 · GUTTER 24/48", color: "#e60012" },
    b: { label: "OPTION B · 1280 · GUTTER 24/48", color: "#111" },
    current: { label: "CURRENT · 혼재 · GUTTER 24", color: "#888" },
  };
  return (
    <>
      <LabelBar label={meta[mode].label} color={meta[mode].color} />
      <ScopeBlock mode={mode} />
    </>
  );
}

/* ── 페이지 본체 ── */
function WidthCompareInner() {
  const searchParams = useSearchParams();
  const forcedRaw = searchParams.get("mode");
  const forcedMode: ScopeMode | null =
    forcedRaw === "a" || forcedRaw === "b" || forcedRaw === "current" ? forcedRaw : null;

  const [parentMode, setParentMode] = useState<ParentMode>("side-by-side");

  /* 자식(iframe) 모드: 크롬 없이 해당 scope만 렌더 */
  if (forcedMode) {
    return (
      <LangProvider>
        <style>{SCOPE_CSS}</style>
        <ScopeBlock mode={forcedMode} />
      </LangProvider>
    );
  }

  /* 부모 모드 */
  return (
    <LangProvider>
      <style>{SCOPE_CSS}</style>
      <Toolbar mode={parentMode} onChange={setParentMode} />

      {parentMode === "side-by-side" && <SideBySide />}

      {parentMode === "stacked" && (
        <>
          <SoloBlock mode="a" />
          <div style={{ height: 40, background: "#f5f5f5" }} />
          <SoloBlock mode="b" />
        </>
      )}

      {(parentMode === "a" || parentMode === "b" || parentMode === "current") && (
        <SoloBlock mode={parentMode} />
      )}
    </LangProvider>
  );
}

export default function WidthComparePage() {
  return (
    <Suspense fallback={null}>
      <WidthCompareInner />
    </Suspense>
  );
}
