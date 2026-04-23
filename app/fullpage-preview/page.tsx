"use client";

import { LangProvider, useLang } from "@/components/LangContext";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import AxesConnection from "@/components/AxesConnection";
import About from "@/components/About";
import News from "@/components/News";
import { content } from "@/lib/i18n";
import Link from "next/link";
import { useEffect } from "react";

/* Fullpage slide preview — Hero · Projects · Axes · About · News+Footer 융합
 * 모든 섹션을 minHeight: 100dvh로 맞추되 Axes는 자연 높이 유지(엣지 플립).
 * News+Footer는 단일 섹션으로 융합 (B안).
 */

const SECTION_IDS: string[] = ["hero", "products", "axes", "about", "news-fused"];
const NAV_OFFSET = 72;
const WHEEL_THRESHOLD = 150;
const ANIM_LOCK_MS = 780;
const EDGE_TOLERANCE = 4;

function useFullpageFlip() {
  useEffect(() => {
    const container = document.getElementById("scroll-container");
    if (!container) return;

    let isAnimating = false;
    let accumulator = 0;
    let resetTimer: ReturnType<typeof setTimeout> | null = null;
    let touchStartY: number | null = null;

    const getSectionTops = () =>
      SECTION_IDS.map((id) => {
        const el = document.getElementById(id);
        return el ? { id, top: el.offsetTop - NAV_OFFSET, height: el.offsetHeight } : null;
      }).filter((x): x is { id: string; top: number; height: number } => x !== null);

    const getCurrentIndex = () => {
      const tops = getSectionTops();
      const y = container.scrollTop;
      let best = 0;
      let bestDist = Infinity;
      tops.forEach((t, i) => {
        const d = Math.abs(y - t.top);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      return { index: best, tops };
    };

    const scrollToIndex = (i: number, tops: ReturnType<typeof getSectionTops>) => {
      const target = tops[i];
      if (!target) return;
      isAnimating = true;
      container.scrollTo({ top: target.top, behavior: "smooth" });
      setTimeout(() => {
        isAnimating = false;
        accumulator = 0;
      }, ANIM_LOCK_MS);
    };

    const atSectionEdge = (dir: 1 | -1) => {
      const { index, tops } = getCurrentIndex();
      const current = tops[index];
      if (!current) return { atEdge: true, nextIndex: index, tops };
      const viewTop = container.scrollTop;
      const viewBottom = viewTop + container.clientHeight;
      const sectionTop = current.top;
      const sectionBottom = current.top + current.height;
      if (dir === 1) {
        const atBottom = viewBottom >= sectionBottom - EDGE_TOLERANCE;
        return { atEdge: atBottom, nextIndex: Math.min(tops.length - 1, index + 1), tops };
      }
      const atTop = viewTop <= sectionTop + EDGE_TOLERANCE;
      return { atEdge: atTop, nextIndex: Math.max(0, index - 1), tops };
    };

    const onWheel = (e: WheelEvent) => {
      if (isAnimating) {
        e.preventDefault();
        return;
      }
      const dir: 1 | -1 = e.deltaY > 0 ? 1 : -1;
      const { atEdge, nextIndex, tops } = atSectionEdge(dir);

      if (!atEdge) {
        accumulator = 0;
        return;
      }

      e.preventDefault();
      accumulator += e.deltaY;
      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        accumulator = 0;
      }, 220);

      if (Math.abs(accumulator) >= WHEEL_THRESHOLD) {
        const { index } = getCurrentIndex();
        if (tops && nextIndex !== index) {
          scrollToIndex(nextIndex, tops);
        } else {
          accumulator = 0;
        }
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY === null || isAnimating) return;
      const endY = e.changedTouches[0].clientY;
      const delta = touchStartY - endY;
      touchStartY = null;
      if (Math.abs(delta) < 40) return;
      const dir: 1 | -1 = delta > 0 ? 1 : -1;
      const { atEdge, nextIndex, tops } = atSectionEdge(dir);
      if (!atEdge || !tops) return;
      const { index } = getCurrentIndex();
      if (nextIndex !== index) scrollToIndex(nextIndex, tops);
    };

    const onKey = (e: KeyboardEvent) => {
      if (isAnimating) return;
      const keyMap: Record<string, 1 | -1> = {
        ArrowDown: 1,
        PageDown: 1,
        " ": 1,
        ArrowUp: -1,
        PageUp: -1,
      };
      const dir = keyMap[e.key];
      if (!dir) return;
      const { index, tops } = getCurrentIndex();
      const next = dir === 1 ? Math.min(tops.length - 1, index + 1) : Math.max(0, index - 1);
      if (next !== index) {
        e.preventDefault();
        scrollToIndex(next, tops);
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
      if (resetTimer) clearTimeout(resetTimer);
    };
  }, []);
}

/* 경량 인라인 푸터 — News 섹션 하단에 통합 */
function SlimFooter() {
  const { lang } = useLang();
  const tf = content.footer[lang];
  return (
    <div
      className="px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 py-6"
      style={{ background: "#06060c", borderTop: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="max-w-[1680px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black"
              style={{ background: "#ff5a6a", color: "#fff" }}
            >
              L
            </div>
            <span className="text-[12.5px] font-black" style={{ color: "#f5f5f7" }}>
              {tf.company}
            </span>
          </div>
          <div className="flex items-center flex-wrap gap-4">
            {tf.links.slice(0, 4).map((l) =>
              l.href.startsWith("/") ? (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-[11.5px] font-semibold"
                  style={{ color: "rgba(255,255,255,0.62)" }}
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-[11.5px] font-semibold"
                  style={{ color: "rgba(255,255,255,0.62)" }}
                >
                  {l.label}
                </a>
              )
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
          <a
            href={`mailto:${tf.contact}`}
            className="text-[11.5px] font-bold"
            style={{ color: "#f5f5f7" }}
          >
            {tf.contact}
          </a>
          <span className="text-[10.5px]" style={{ color: "rgba(255,255,255,0.35)" }}>
            {tf.rights.replace("2026", String(new Date().getFullYear()))}
          </span>
        </div>
      </div>
    </div>
  );
}

function PreviewBanner() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between gap-3 px-4 py-2"
      style={{
        background: "rgba(255,90,106,0.14)",
        borderBottom: "1px solid rgba(255,90,106,0.35)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <span
        className="text-[11px] font-black tracking-[0.18em]"
        style={{ color: "#ff5a6a" }}
      >
        FULLPAGE PREVIEW · Hero · Projects · Axes · About · News+Footer
      </span>
      <Link
        href="/"
        className="text-[11px] font-bold"
        style={{ color: "rgba(255,255,255,0.75)" }}
      >
        ← 메인으로
      </Link>
    </div>
  );
}

function PageContent() {
  useFullpageFlip();
  return (
    <>
      {/* Compacting overrides for Projects / About / News so they fit 100dvh */}
      <style>{`
        #products .fullpage-projects > section { padding-top: 3rem !important; padding-bottom: 3rem !important; }
        #products .fullpage-projects [data-card] { min-height: 460px !important; }
        #products .fullpage-projects h2 { font-size: clamp(1.6rem, 3.6vw, 3rem) !important; }

        #about .fullpage-about > section { padding-top: 3rem !important; padding-bottom: 3rem !important; }
        #about .fullpage-about h2 { font-size: clamp(1.6rem, 3.6vw, 3rem) !important; }
        #about .fullpage-about .lg\\:gap-24 { gap: 3rem !important; }

        #news-fused .fullpage-news > section { padding-top: 3rem !important; padding-bottom: 1.5rem !important; }
        #news-fused .fullpage-news h2 { font-size: clamp(1.6rem, 3.6vw, 3rem) !important; }
      `}</style>

      <PreviewBanner />

      <div
        id="scroll-container"
        className="relative"
        style={{
          height: "100dvh",
          overflowY: "auto",
          background: "#0a0a12",
          scrollBehavior: "smooth",
          overscrollBehavior: "contain",
        }}
      >
        <Nav />

        {/* Hero — 이미 min-height 100dvh */}
        <Hero />

        {/* Projects — 100dvh centered, 콘텐츠 컴팩트 */}
        <section
          id="products"
          style={{ minHeight: "100dvh", display: "flex", alignItems: "center" }}
        >
          <div className="fullpage-projects w-full">
            <Projects />
          </div>
        </section>

        {/* Axes — 자연 높이 유지 (엣지 플립) */}
        <section id="axes">
          <AxesConnection />
        </section>

        {/* About — 100dvh centered */}
        <section
          id="about"
          style={{ minHeight: "100dvh", display: "flex", alignItems: "center" }}
        >
          <div className="fullpage-about w-full">
            <About />
          </div>
        </section>

        {/* News + Footer 융합 — 100dvh, News 중앙, Footer 바닥 */}
        <section
          id="news-fused"
          style={{
            minHeight: "100dvh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            className="fullpage-news flex-1 flex items-center w-full"
          >
            <div className="w-full">
              <News />
            </div>
          </div>
          <SlimFooter />
        </section>
      </div>
    </>
  );
}

export default function FullpagePreviewPage() {
  return (
    <LangProvider>
      <PageContent />
    </LangProvider>
  );
}
