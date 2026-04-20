"use client";

import { useLang } from "./LangContext";
import { content } from "@/lib/i18n";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import HeroVisualE from "./hero-previews/HeroVisualE";

function WordReveal({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <span
      style={{
        display: "inline-block",
        overflow: "hidden",
        verticalAlign: "top",
        paddingBottom: "0.18em",
        marginBottom: "-0.18em",
        ...style,
      }}
    >
      <motion.span
        style={{ display: "inline-block" }}
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function HighlightedVerb({
  children,
  color,
  delay,
}: {
  children: React.ReactNode;
  color: string;
  delay: number;
}) {
  return (
    <span
      style={{
        display: "inline-block",
        overflow: "hidden",
        verticalAlign: "top",
        position: "relative",
        paddingBottom: "0.18em",
        marginBottom: "-0.18em",
      }}
    >
      <motion.span
        style={{ display: "inline-block", position: "relative", color }}
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {/* Soft highlight blob behind the word */}
        <motion.span
          aria-hidden
          style={{
            position: "absolute",
            left: "-0.08em",
            right: "-0.08em",
            top: "55%",
            height: "55%",
            background: color,
            opacity: 0.14,
            borderRadius: 6,
            zIndex: -1,
            transformOrigin: "left",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: delay + 0.2 }}
        />
        <span style={{ position: "relative" }}>{children}</span>
        {/* Animated underline stroke */}
        <motion.span
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: "-0.06em",
            height: "0.1em",
            background: `linear-gradient(90deg, transparent 0%, ${color} 18%, ${color} 82%, transparent 100%)`,
            borderRadius: 999,
            transformOrigin: "left",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: delay + 0.22 }}
        />
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const { lang } = useLang();
  const t = content.hero[lang];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const container = document.getElementById("scroll-container");
    if (!container) return;
    const onScroll = () => {
      setScrolled(container.scrollTop > 80);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  const AXIS_GAME = "var(--axis-game)";
  const AXIS_COMM = "var(--axis-community)";
  const AXIS_TECH = "var(--axis-tech)";

  // Split headline1 into colored verbs with accent highlight animation
  const renderHeadline1 = () => {
    if (lang === "ko") {
      return (
        <>
          <HighlightedVerb delay={0.1} color={AXIS_GAME}>모이고</HighlightedVerb>
          <WordReveal delay={0.14}>, </WordReveal>
          <HighlightedVerb delay={0.2} color={AXIS_COMM}>머물고</HighlightedVerb>
          <WordReveal delay={0.24}>, </WordReveal>
          <HighlightedVerb delay={0.3} color={AXIS_TECH}>성장하는</HighlightedVerb>
        </>
      );
    }
    return (
      <>
        <HighlightedVerb delay={0.1} color={AXIS_GAME}>Gather</HighlightedVerb>
        <WordReveal delay={0.14}>, </WordReveal>
        <HighlightedVerb delay={0.2} color={AXIS_COMM}>Stay</HighlightedVerb>
        <WordReveal delay={0.24}>, </WordReveal>
        <WordReveal delay={0.28}>and </WordReveal>
        <HighlightedVerb delay={0.34} color={AXIS_TECH}>Grow</HighlightedVerb>
      </>
    );
  };

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center overflow-hidden px-6"
      style={{ minHeight: "100dvh", background: "#ffffff" }}
    >
      {/* Subtle background pattern */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(230,0,18,0.03), transparent 60%), radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,140,66,0.04), transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-[1200px] w-full mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center pt-24 pb-20">
        {/* Left: Copy */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 text-[11px] font-bold tracking-[0.18em]"
            style={{
              background: "rgba(230,0,18,0.06)",
              border: "1px solid rgba(230,0,18,0.2)",
              color: "var(--brand-red)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--brand-red)" }} />
            {t.tag.toUpperCase()}
          </motion.div>

          <h1
            key={lang}
            className="font-black leading-[1.08] tracking-tight mb-6"
            style={{
              fontSize:
                lang === "ko"
                  ? "clamp(1.9rem, 4.4vw, 3.6rem)"
                  : "clamp(1.6rem, 3.4vw, 2.8rem)",
              color: "#111",
            }}
          >
            <span className="block mb-2" style={{ whiteSpace: "nowrap" }}>
              {renderHeadline1()}
            </span>
            <WordReveal delay={0.5} style={{ display: "block", whiteSpace: "nowrap" }}>
              <span style={{ color: "#111" }}>{t.headline2}</span>
            </WordReveal>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="whitespace-pre-line leading-relaxed max-w-xl mx-auto lg:mx-0"
            style={{ color: "#666", fontSize: "clamp(15px, 1.4vw, 17px)" }}
          >
            {t.sub}
          </motion.p>
        </div>

        {/* Right: Kinetic brand typography */}
        <div className="flex items-center justify-center">
          <HeroVisualE />
        </div>
      </div>

      {/* SCROLL indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ delay: scrolled ? 0 : 1.4, duration: 0.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] font-bold tracking-[0.3em]" style={{ color: "#999" }}>
          SCROLL
        </span>
        <div className="w-px h-8 scroll-hint" style={{ background: "#bbb" }} />
      </motion.div>
    </section>
  );
}
