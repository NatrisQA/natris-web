"use client";

import { LangProvider, useLang } from "@/components/LangContext";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import AxesConnection from "@/components/AxesConnection";
import About from "@/components/About";
import Projects from "@/components/Projects";
import News from "@/components/News";
import Footer from "@/components/Footer";
import ScrollDots from "@/components/ScrollDots";
import { motion } from "framer-motion";
import { useEffect } from "react";

const sectionReveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const SECTION_IDS: string[] = ["hero", "products", "axes", "about", "news", "site-footer"];
const NAV_OFFSET = 72;
const WHEEL_THRESHOLD = 60; // accumulated deltaY to trigger flip
const ANIM_LOCK_MS = 780; // lock duration after each transition
const EDGE_TOLERANCE = 4; // px slack for "at top/bottom" detection

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
      if (!current) return { atEdge: true, nextIndex: index };
      const viewTop = container.scrollTop;
      const viewBottom = viewTop + container.clientHeight;
      const sectionTop = current.top;
      const sectionBottom = current.top + current.height;
      if (dir === 1) {
        // scrolling down — flip only when bottom of current section is at/above viewport bottom
        const atBottom = viewBottom >= sectionBottom - EDGE_TOLERANCE;
        return { atEdge: atBottom, nextIndex: Math.min(tops.length - 1, index + 1), tops };
      }
      // scrolling up — flip when top of current section is at/below viewport top
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

      // If not at edge → allow native scroll inside tall section
      if (!atEdge) {
        accumulator = 0;
        return;
      }

      // At edge — intercept & accumulate
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

function PageContent() {
  const { lang } = useLang();
  useFullpageFlip();
  return (
    <>
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
        <section id="hero">
          <Hero />
        </section>
        <motion.section id="products" {...sectionReveal}>
          <Projects />
        </motion.section>
        <motion.section id="axes" {...sectionReveal}>
          <AxesConnection />
        </motion.section>
        <motion.section id="about" {...sectionReveal}>
          <About />
        </motion.section>
        <motion.section id="news" {...sectionReveal}>
          <News />
        </motion.section>
        <section id="site-footer">
          <Footer />
        </section>
      </div>
      <ScrollDots lang={lang} />
    </>
  );
}

export default function Home() {
  return (
    <LangProvider>
      <PageContent />
    </LangProvider>
  );
}
