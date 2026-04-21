"use client";

import { useLang } from "./LangContext";
import { content } from "@/lib/i18n";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import HeroVisualE from "./hero-previews/HeroVisualE";

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

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center overflow-hidden px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32"
      style={{ minHeight: "100dvh", background: "#0a0a12" }}
    >
      {/* Subtle background glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,109,31,0.08), transparent 60%), radial-gradient(ellipse 80% 60% at 50% 100%, rgba(139,92,246,0.1), transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-[1680px] w-full mx-auto flex flex-col items-center gap-10 pt-20 pb-20">
        {/* tag badge */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.18em]"
          style={{
            background: "rgba(255,90,106,0.12)",
            border: "1px solid rgba(255,90,106,0.35)",
            color: "#ff5a6a",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#ff5a6a" }} />
          {t.tag.toUpperCase()}
        </motion.div>

        {/* Kinetic brand typography with headline caption */}
        <div className="w-full flex items-center justify-center">
          <HeroVisualE />
        </div>

        {/* sub copy */}
        <motion.p
          key={lang}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.6 }}
          className="whitespace-pre-line leading-relaxed max-w-3xl mx-auto text-center"
          style={{ color: "rgba(255,255,255,0.62)", fontSize: "clamp(15px, 1.4vw, 18px)" }}
        >
          {t.sub}
        </motion.p>
      </div>

      {/* SCROLL indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ delay: scrolled ? 0 : 1.4, duration: 0.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] font-bold tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.4)" }}>
          SCROLL
        </span>
        <div className="w-px h-8 scroll-hint" style={{ background: "rgba(255,255,255,0.35)" }} />
      </motion.div>
    </section>
  );
}
