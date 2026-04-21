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
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { createContext, useContext, useEffect, useRef, useState, type RefObject } from "react";

const ScrollContainerCtx = createContext<RefObject<HTMLDivElement | null> | null>(null);

/* Fullpage slide preview v2 — 7-gap patches applied
 *  ① compact-style scoped overrides via data-fp-compact
 *  ② explicit numbers targeting 1080p viewport
 *  ③ parallax + fade transition per section (useScroll)
 *  ④ trackpad inertia cooldown
 *  ⑤ side-dot indicator with labels + click-to-jump
 *  ⑥ Axes diagram shrunken to fit 100dvh
 *  ⑦ mobile auto-disable + prefers-reduced-motion
 */

const SECTIONS = [
  { id: "hero", label: "HOME" },
  { id: "products", label: "SERVICES" },
  { id: "axes", label: "CONNECTION" },
  { id: "about", label: "ABOUT" },
  { id: "news-fused", label: "NEWS" },
] as const;

const NAV_OFFSET = 72;
const WHEEL_THRESHOLD = 150;
const ANIM_LOCK_MS = 820;
const COOLDOWN_MS = 360;
const INERTIA_DELTA = 25;
const EDGE_TOLERANCE = 4;
const MOBILE_BREAKPOINT = 768;

type IdxChange = (i: number) => void;

function useFullpageFlipV2(onChange: IdxChange) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const container = document.getElementById("scroll-container");
    if (!container) return;

    // ⑦ mobile disable
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    if (mql.matches) return;

    const lockMs = reduced ? 0 : ANIM_LOCK_MS;

    let isAnimating = false;
    let cooldownUntil = 0;
    let accumulator = 0;
    let resetTimer: ReturnType<typeof setTimeout> | null = null;
    let touchStartY: number | null = null;

    type TopEntry = { id: string; top: number; height: number };
    const getTops = (): TopEntry[] =>
      SECTIONS.map(({ id }): TopEntry | null => {
        const el = document.getElementById(id);
        return el ? { id, top: el.offsetTop - NAV_OFFSET, height: el.offsetHeight } : null;
      }).filter((x): x is TopEntry => x !== null);

    const getCurrent = () => {
      const tops = getTops();
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

    const scrollToIndex = (i: number, tops: ReturnType<typeof getTops>) => {
      const target = tops[i];
      if (!target) return;
      isAnimating = true;
      container.scrollTo({
        top: target.top,
        behavior: reduced ? "auto" : "smooth",
      });
      onChange(i);
      setTimeout(() => {
        isAnimating = false;
        cooldownUntil = Date.now() + COOLDOWN_MS;
        accumulator = 0;
      }, lockMs);
    };

    const atEdge = (dir: 1 | -1) => {
      const { index, tops } = getCurrent();
      const cur = tops[index];
      if (!cur) return { atEdge: true, nextIndex: index, tops };
      const vTop = container.scrollTop;
      const vBottom = vTop + container.clientHeight;
      const sTop = cur.top;
      const sBottom = cur.top + cur.height;
      if (dir === 1) {
        return { atEdge: vBottom >= sBottom - EDGE_TOLERANCE, nextIndex: Math.min(tops.length - 1, index + 1), tops };
      }
      return { atEdge: vTop <= sTop + EDGE_TOLERANCE, nextIndex: Math.max(0, index - 1), tops };
    };

    const onWheel = (e: WheelEvent) => {
      if (isAnimating) {
        e.preventDefault();
        return;
      }
      // ④ inertia cooldown
      const now = Date.now();
      if (now < cooldownUntil && Math.abs(e.deltaY) < INERTIA_DELTA) {
        e.preventDefault();
        return;
      }

      const dir: 1 | -1 = e.deltaY > 0 ? 1 : -1;
      const { atEdge: edge, nextIndex, tops } = atEdge(dir);

      if (!edge) {
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
        const { index } = getCurrent();
        if (tops && nextIndex !== index) scrollToIndex(nextIndex, tops);
        else accumulator = 0;
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY === null || isAnimating) return;
      const delta = touchStartY - e.changedTouches[0].clientY;
      touchStartY = null;
      if (Math.abs(delta) < 40) return;
      const dir: 1 | -1 = delta > 0 ? 1 : -1;
      const { atEdge: edge, nextIndex, tops } = atEdge(dir);
      if (!edge || !tops) return;
      const { index } = getCurrent();
      if (nextIndex !== index) scrollToIndex(nextIndex, tops);
    };

    const onKey = (e: KeyboardEvent) => {
      if (isAnimating) return;
      const { index, tops } = getCurrent();
      let next = index;
      if (["ArrowDown", "PageDown", " "].includes(e.key)) next = Math.min(tops.length - 1, index + 1);
      else if (["ArrowUp", "PageUp"].includes(e.key)) next = Math.max(0, index - 1);
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = tops.length - 1;
      else return;
      if (next !== index) {
        e.preventDefault();
        scrollToIndex(next, tops);
      }
    };

    // Expose jumpTo imperatively for SideDots
    (window as unknown as { __fpJump?: (i: number) => void }).__fpJump = (i: number) => {
      if (isAnimating) return;
      const { tops } = getCurrent();
      scrollToIndex(i, tops);
    };

    // Sync active index on native scroll (for mobile or fallback)
    const onScroll = () => {
      if (isAnimating) return;
      const { index } = getCurrent();
      onChange(index);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });
    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      if (resetTimer) clearTimeout(resetTimer);
    };
  }, [onChange, reduced]);
}

/* ⑤ Side-dot indicator */
function SideDots({ activeIndex }: { activeIndex: number }) {
  const jump = (i: number) => {
    const fn = (window as unknown as { __fpJump?: (i: number) => void }).__fpJump;
    fn?.(i);
  };
  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
      {SECTIONS.map((s, i) => {
        const active = activeIndex === i;
        return (
          <button
            key={s.id}
            onClick={() => jump(i)}
            className="group relative flex items-center gap-3"
            aria-label={`Go to ${s.label}`}
          >
            <span
              className="absolute right-6 whitespace-nowrap text-[10px] font-black tracking-[0.24em] pointer-events-none transition-opacity duration-200"
              style={{
                color: active ? "#ff5a6a" : "rgba(255,255,255,0.7)",
                opacity: active ? 1 : 0,
              }}
            >
              {s.label}
            </span>
            <span className="sr-only">{s.label}</span>
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: active ? 12 : 8,
                height: active ? 12 : 8,
                background: active ? "#ff5a6a" : "rgba(255,255,255,0.25)",
                boxShadow: active ? "0 0 14px rgba(255,90,106,0.75)" : "none",
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

/* ③ Parallax-fade wrapper for each section */
function ParallaxSlide({
  id,
  children,
  minHeight = "100dvh",
  center = true,
}: {
  id: string;
  children: React.ReactNode;
  minHeight?: string;
  center?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const containerRef = useContext(ScrollContainerCtx);
  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef ?? undefined,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], [0.15, 1, 1, 0.15]);

  return (
    <section
      id={id}
      ref={ref}
      style={{
        minHeight,
        display: center ? "flex" : "block",
        alignItems: center ? "center" : undefined,
      }}
    >
      <motion.div
        style={
          reduced
            ? { width: "100%" }
            : { width: "100%", y, opacity }
        }
      >
        {children}
      </motion.div>
    </section>
  );
}

/* 경량 인라인 푸터 */
function SlimFooter() {
  const { lang } = useLang();
  const tf = content.footer[lang];
  return (
    <div
      className="px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 py-5"
      style={{ background: "#06060c", borderTop: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="max-w-[1680px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
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
                <Link key={l.label} href={l.href} className="text-[11.5px] font-semibold" style={{ color: "rgba(255,255,255,0.62)" }}>
                  {l.label}
                </Link>
              ) : (
                <a key={l.label} href={l.href} className="text-[11.5px] font-semibold" style={{ color: "rgba(255,255,255,0.62)" }}>
                  {l.label}
                </a>
              )
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
          <a href={`mailto:${tf.contact}`} className="text-[11.5px] font-bold" style={{ color: "#f5f5f7" }}>
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

function PreviewBanner({ activeIndex }: { activeIndex: number }) {
  const cur = SECTIONS[activeIndex] ?? SECTIONS[0];
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
      <span className="text-[11px] font-black tracking-[0.18em]" style={{ color: "#ff5a6a" }}>
        FULLPAGE PREVIEW v2 · {activeIndex + 1}/{SECTIONS.length} · {cur.label}
      </span>
      <Link href="/" className="text-[11px] font-bold" style={{ color: "rgba(255,255,255,0.75)" }}>
        ← 메인으로
      </Link>
    </div>
  );
}

function PageContent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  useFullpageFlipV2(setActiveIndex);

  return (
    <ScrollContainerCtx.Provider value={scrollRef}>
    <div data-fp-compact>
      {/* ① compact-scoped overrides (data-fp-compact 스코프로만 적용) */}
      <style>{`
        [data-fp-compact] #products .fp-projects > section { padding-top: 2.5rem; padding-bottom: 2.5rem; }
        [data-fp-compact] #products .fp-projects [data-card] { min-height: 440px; }
        [data-fp-compact] #products .fp-projects h2 { font-size: clamp(1.6rem, 3.4vw, 2.8rem); }
        [data-fp-compact] #products .fp-projects .mb-10 { margin-bottom: 1.5rem; }

        [data-fp-compact] #about .fp-about > section { padding-top: 2.5rem; padding-bottom: 2.5rem; }
        [data-fp-compact] #about .fp-about h2 { font-size: clamp(1.6rem, 3.4vw, 2.8rem); }
        [data-fp-compact] #about .fp-about .mb-20 { margin-bottom: 2rem; }
        [data-fp-compact] #about .fp-about .pb-8 { padding-bottom: 1.1rem; }

        [data-fp-compact] #news-fused .fp-news > section { padding-top: 2.5rem; padding-bottom: 1rem; }
        [data-fp-compact] #news-fused .fp-news h2 { font-size: clamp(1.6rem, 3.4vw, 2.8rem); }
        [data-fp-compact] #news-fused .fp-news .mb-10 { margin-bottom: 1.5rem; }

        /* ⑥ Axes 다이어그램 축소 */
        [data-fp-compact] #axes .fp-axes > section { padding-top: 2.5rem; padding-bottom: 2.5rem; }
        [data-fp-compact] #axes .fp-axes h2 { font-size: clamp(1.6rem, 3.4vw, 2.8rem); }
        [data-fp-compact] #axes .fp-axes .mb-10 { margin-bottom: 1.25rem; }
        [data-fp-compact] #axes .fp-axes [style*="maxWidth: 1440"] { max-width: 980px; }
      `}</style>

      <PreviewBanner activeIndex={activeIndex} />

      <div
        id="scroll-container"
        ref={scrollRef}
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

        {/* Hero — already min-100dvh */}
        <ParallaxSlide id="hero" center={false} minHeight="0">
          <Hero />
        </ParallaxSlide>

        {/* Projects */}
        <ParallaxSlide id="products">
          <div className="fp-projects w-full">
            <Projects />
          </div>
        </ParallaxSlide>

        {/* ⑥ Axes — 축소해서 100dvh 안에 */}
        <ParallaxSlide id="axes">
          <div className="fp-axes w-full">
            <AxesConnection />
          </div>
        </ParallaxSlide>

        {/* About */}
        <ParallaxSlide id="about">
          <div className="fp-about w-full">
            <About />
          </div>
        </ParallaxSlide>

        {/* News + Footer */}
        <section
          id="news-fused"
          style={{
            minHeight: "100dvh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div className="fp-news flex-1 flex items-center w-full">
            <div className="w-full">
              <News />
            </div>
          </div>
          <SlimFooter />
        </section>
      </div>

      <SideDots activeIndex={activeIndex} />
    </div>
    </ScrollContainerCtx.Provider>
  );
}

export default function FullpagePreviewV2Page() {
  return (
    <LangProvider>
      <PageContent />
    </LangProvider>
  );
}
