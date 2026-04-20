"use client";

import { useLang } from "./LangContext";
import { content } from "@/lib/i18n";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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

function VennDiagram() {
  const AXIS_GAME = "#e63946";
  const AXIS_COMM = "#ff8c42";
  const AXIS_TECH = "#00a3cc";
  return (
    <div className="relative w-full max-w-[560px] mx-auto aspect-[1/0.85] pointer-events-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
        className="absolute inset-0"
        style={{ mixBlendMode: "multiply" }}
      >
        <div
          className="absolute rounded-full"
          style={{
            left: "8%", top: "8%",
            width: "52%", height: "64%",
            background: AXIS_GAME,
            opacity: 0.78,
            filter: "blur(0.3px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            right: "8%", top: "8%",
            width: "52%", height: "64%",
            background: AXIS_TECH,
            opacity: 0.78,
            filter: "blur(0.3px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            left: "24%", bottom: "0%",
            width: "52%", height: "64%",
            background: AXIS_COMM,
            opacity: 0.88,
            filter: "blur(0.3px)",
          }}
        />
      </motion.div>

      {/* Labels — centered within each circle's unique (non-overlapping) zone */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="absolute font-black tracking-[0.12em] text-white/95"
        style={{
          left: "22%",
          top: "30%",
          transform: "translate(-50%, -50%)",
          fontSize: "clamp(11px, 2vw, 13px)",
          textShadow: "0 1px 6px rgba(0,0,0,0.25)",
        }}
      >
        GAME
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute font-black tracking-[0.12em] text-white/95"
        style={{
          left: "78%",
          top: "30%",
          transform: "translate(-50%, -50%)",
          fontSize: "clamp(11px, 2vw, 13px)",
          textShadow: "0 1px 6px rgba(0,0,0,0.25)",
        }}
      >
        TECH
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute font-black tracking-[0.12em] text-white/95"
        style={{
          left: "50%",
          top: "82%",
          transform: "translate(-50%, -50%)",
          fontSize: "clamp(11px, 2.2vw, 14px)",
          textShadow: "0 1px 6px rgba(0,0,0,0.25)",
        }}
      >
        COMMUNITY
      </motion.div>

      {/* Center LULU.AI badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
      >
        <div
          className="px-4 py-2 rounded-full text-[13px] font-black tracking-[0.12em]"
          style={{
            background: "#fff",
            color: "#111",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
          }}
        >
          LULU.AI
        </div>
      </motion.div>
    </div>
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
            style={{ fontSize: "clamp(1.9rem, 4.4vw, 3.6rem)", color: "#111" }}
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

        {/* Right: Venn diagram */}
        <div className="flex items-center justify-center">
          <VennDiagram />
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
