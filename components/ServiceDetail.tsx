"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "./LangContext";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { content } from "@/lib/i18n";

type ServiceItem = (typeof content.products.items)[number];

const AXIS_COLOR: Record<string, string> = {
  game: "#e63946",
  community: "#ff8c42",
  tech: "#00a3cc",
};
const AXIS_LABEL: Record<string, string> = {
  game: "GAME",
  community: "COMMUNITY",
  tech: "TECH",
};

type Section = { id: string; label: { ko: string; en: string } };
const SECTIONS: Section[] = [
  { id: "hero",     label: { ko: "개요",     en: "Overview" } },
  { id: "about",    label: { ko: "소개",     en: "About" } },
  { id: "features", label: { ko: "주요 기능", en: "Features" } },
  { id: "gallery",  label: { ko: "갤러리",    en: "Gallery" } },
  { id: "cta",      label: { ko: "문의",      en: "Contact" } },
];

export default function ServiceDetail({ item }: { item: ServiceItem }) {
  const { lang, toggle } = useLang();
  const axis = (item as ServiceItem & { axis: "game" | "community" | "tech" }).axis;
  const axisColor = AXIS_COLOR[axis];
  const axisLabel = AXIS_LABEL[axis];

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroBgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroTitleY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const heroTitleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
  };

  return (
    <div style={{ background: "#fff", color: "#111" }}>
      {/* ── Top Nav ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid #ececec",
        }}
      >
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#333" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{lang === "ko" ? "LULU.AI" : "LULU.AI"}</span>
        </Link>
        <div className="flex items-center gap-4">
          <span
            className="text-[10px] font-black tracking-[0.16em] px-2.5 py-1 rounded-full"
            style={{
              background: `${axisColor}15`,
              color: axisColor,
              border: `1px solid ${axisColor}40`,
            }}
          >
            {axisLabel}
          </span>
          <span className="text-xs font-black tracking-wider hidden sm:inline" style={{ color: item.color }}>
            {item.name}
          </span>
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold"
            style={{ border: "1px solid #dcdcdc", color: "#666" }}
          >
            <span style={{ color: lang === "ko" ? "#111" : "#bbb" }}>KO</span>
            <span style={{ color: "#ccc" }}>|</span>
            <span style={{ color: lang === "en" ? "#111" : "#bbb" }}>EN</span>
          </button>
        </div>
      </header>

      {/* ── Side Section Nav (desktop) ── */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
        {SECTIONS.map((s) => {
          const isActive = activeSection === s.id;
          return (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="group flex items-center gap-3 justify-end"
            >
              <span
                className="text-[11px] font-bold tracking-[0.12em] opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: isActive ? item.color : "#666" }}
              >
                {s.label[lang]}
              </span>
              <span
                className="block rounded-full transition-all"
                style={{
                  width: isActive ? 28 : 14,
                  height: 2,
                  background: isActive ? item.color : "#d4d4d4",
                }}
              />
            </button>
          );
        })}
      </nav>

      {/* ── HERO ── */}
      <section
        id="hero"
        ref={heroRef}
        className="relative overflow-hidden flex items-center"
        style={{ minHeight: "100vh", paddingTop: 72 }}
      >
        {/* Background layers */}
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ y: heroBgY }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 80% 70% at 50% 40%, ${item.color}16, transparent 70%)`,
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `radial-gradient(${item.color}60 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
            }}
          />
          {/* Big floating shape (service color) */}
          <div
            className="absolute -right-20 top-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: "min(56vw, 620px)",
              height: "min(56vw, 620px)",
              background: `radial-gradient(circle, ${item.color}25, transparent 65%)`,
              filter: "blur(24px)",
            }}
          />
          <div
            className="absolute left-10 top-20 rounded-full"
            style={{
              width: 260,
              height: 260,
              background: `radial-gradient(circle, ${axisColor}20, transparent 70%)`,
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-48"
            style={{ background: "linear-gradient(to top, #fff, transparent)" }}
          />
        </motion.div>

        {/* Content */}
        <motion.div
          className="relative z-10 max-w-[1280px] w-full mx-auto px-6 md:px-12 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center"
          style={{ y: heroTitleY, opacity: heroTitleOpacity }}
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <span
                className="text-[11px] font-black tracking-[0.28em] px-3 py-1.5 rounded-full"
                style={{
                  background: axisColor,
                  color: "#fff",
                }}
              >
                {axisLabel}
              </span>
              <span
                className="text-[11px] font-black tracking-[0.18em]"
                style={{ color: "#999" }}
              >
                {item.status[lang].toUpperCase()}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-black leading-[0.92] tracking-tight mb-6"
              style={{
                fontSize: "clamp(3.2rem, 10vw, 8rem)",
                color: item.color,
              }}
            >
              {item.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="font-bold mb-4"
              style={{ fontSize: "clamp(16px, 1.5vw, 20px)", color: "#222" }}
            >
              {item.tag[lang]}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="leading-relaxed max-w-xl mb-8"
              style={{ fontSize: "clamp(14px, 1.1vw, 16px)", color: "#555" }}
            >
              {item.desc[lang]}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {item.badges[lang].map((b) => (
                <span
                  key={b}
                  className="text-[11px] font-bold px-3 py-1.5 rounded-full"
                  style={{
                    background: `${item.color}12`,
                    color: item.color,
                    border: `1px solid ${item.color}40`,
                  }}
                >
                  #{b}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-3"
            >
              <button
                onClick={() => scrollTo("features")}
                className="px-6 py-3 rounded-full text-sm font-black"
                style={{ background: item.color, color: "#fff" }}
              >
                {lang === "ko" ? "기능 살펴보기" : "Explore Features"} →
              </button>
              <button
                onClick={() => scrollTo("cta")}
                className="px-6 py-3 rounded-full text-sm font-black"
                style={{ background: "#fff", color: "#111", border: "1px solid #dcdcdc" }}
              >
                {lang === "ko" ? "제휴 문의" : "Partner With Us"}
              </button>
            </motion.div>
          </div>

          {/* Right: Large Key Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <KeyVisual id={item.id} color={item.color} />
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-black tracking-[0.3em]" style={{ color: "#aaa" }}>
            SCROLL
          </span>
          <div className="w-px h-8 scroll-hint" style={{ background: "#bbb" }} />
        </motion.div>
      </section>

      {/* ── ABOUT (big statement) ── */}
      <section
        id="about"
        className="relative py-32 md:py-44 px-6 md:px-12"
        style={{ background: "#fff" }}
      >
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-black tracking-[0.32em] mb-6"
            style={{ color: item.color }}
          >
            ABOUT {item.name.toUpperCase()}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-black leading-[1.15] tracking-tight max-w-[36ch] whitespace-pre-line"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#111" }}
          >
            {item.desc[lang]}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-14 grid md:grid-cols-3 gap-6"
          >
            {[
              { k: lang === "ko" ? "카테고리" : "Category", v: item.tag[lang] },
              { k: lang === "ko" ? "브랜드 축" : "Axis", v: axisLabel },
              { k: lang === "ko" ? "상태" : "Status", v: item.status[lang] },
            ].map((r) => (
              <div key={r.k} className="border-t pt-5" style={{ borderColor: "#e5e5e5" }}>
                <div className="text-[11px] font-black tracking-[0.2em] mb-2" style={{ color: "#999" }}>
                  {r.k}
                </div>
                <div className="text-[16px] font-bold" style={{ color: "#111" }}>
                  {r.v}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES (alternating big rows) ── */}
      <section
        id="features"
        className="relative py-28 md:py-40 px-6 md:px-12"
        style={{ background: "#fafafa" }}
      >
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-16 md:mb-24 text-center">
            <div className="text-[11px] font-black tracking-[0.32em] mb-4" style={{ color: item.color }}>
              FEATURES
            </div>
            <h2
              className="font-black tracking-tight"
              style={{ fontSize: "clamp(1.8rem, 4.2vw, 3rem)", color: "#111" }}
            >
              {lang === "ko" ? "플레이어의 경험을 만드는 기능들" : "Features That Shape the Experience"}
            </h2>
          </div>

          <div className="flex flex-col gap-16 md:gap-28">
            {item.features.map((f, i) => {
              const reverse = i % 2 === 1;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={`grid md:grid-cols-2 gap-10 md:gap-20 items-center ${reverse ? "md:[direction:rtl]" : ""}`}
                >
                  <div style={{ direction: "ltr" }}>
                    <div
                      className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 text-xl"
                      style={{
                        background: `${item.color}15`,
                        border: `1px solid ${item.color}40`,
                        color: item.color,
                      }}
                    >
                      {f.icon}
                    </div>
                    <div className="text-[11px] font-black tracking-[0.22em] mb-3" style={{ color: item.color }}>
                      {String(i + 1).padStart(2, "0")} / {String(item.features.length).padStart(2, "0")}
                    </div>
                    <h3
                      className="font-black leading-tight mb-4 tracking-tight"
                      style={{ fontSize: "clamp(1.6rem, 3vw, 2.3rem)", color: "#111" }}
                    >
                      {f.title[lang]}
                    </h3>
                    <p className="leading-relaxed" style={{ fontSize: "clamp(14px, 1.1vw, 16px)", color: "#555" }}>
                      {f.desc[lang]}
                    </p>
                  </div>
                  <FeatureVisual index={i} color={item.color} accent={axisColor} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section
        id="gallery"
        className="relative py-28 md:py-36 px-6 md:px-12"
        style={{ background: "#fff" }}
      >
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-12">
            <div className="text-[11px] font-black tracking-[0.32em] mb-4" style={{ color: item.color }}>
              GALLERY
            </div>
            <h2
              className="font-black tracking-tight"
              style={{ fontSize: "clamp(1.8rem, 4.2vw, 3rem)", color: "#111" }}
            >
              {lang === "ko" ? "서비스 미리보기" : "Preview"}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="rounded-2xl overflow-hidden relative group"
                style={{
                  aspectRatio: i === 0 ? "4 / 5" : "4 / 5",
                  background: `linear-gradient(160deg, ${item.color}10, ${axisColor}08 60%, #f2f2f2)`,
                  border: "1px solid #ececec",
                }}
              >
                <GalleryVisual id={item.id} color={item.color} variant={i} />
                <div
                  className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-black tracking-[0.16em]"
                  style={{ color: "#666" }}
                >
                  <span>{lang === "ko" ? "시안" : "MOCKUP"} {String(i + 1).padStart(2, "0")}</span>
                  <span>{item.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        id="cta"
        className="relative py-28 md:py-40 px-6 md:px-12 overflow-hidden"
        style={{ background: "#111" }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${item.color}22, transparent 70%)`,
          }}
        />
        <div className="relative max-w-[1000px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-black tracking-[0.32em] mb-5"
            style={{ color: item.color }}
          >
            PARTNERSHIP
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-black leading-tight tracking-tight mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", color: "#fff" }}
          >
            {lang === "ko"
              ? `${item.name}와 함께하세요`
              : `Build the future with ${item.name}`}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-10"
            style={{ fontSize: "clamp(14px, 1.1vw, 16px)", color: "rgba(255,255,255,0.6)" }}
          >
            {lang === "ko"
              ? "홀덤펍·브랜드·크리에이터, 어떤 형태의 제휴도 환영합니다."
              : "Holdem pubs, brands, creators. Every form of partnership is welcome."}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <a
              href={`mailto:contact@lulu.ai?subject=${encodeURIComponent(`Partnership: ${item.name}`)}`}
              className="px-7 py-3.5 rounded-full text-sm font-black"
              style={{ background: item.color, color: "#fff" }}
            >
              {lang === "ko" ? "제휴 문의하기" : "Contact for Partnership"} →
            </a>
            <Link
              href="/"
              className="px-7 py-3.5 rounded-full text-sm font-black"
              style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              {lang === "ko" ? "홈으로 돌아가기" : "Back to Home"}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Bottom strip ── */}
      <div
        className="py-8 px-6 md:px-12 text-center"
        style={{ background: "#fff", borderTop: "1px solid #ececec" }}
      >
        <Link
          href="/"
          className="text-[12px] font-bold tracking-[0.12em]"
          style={{ color: "#666" }}
        >
          ← LULU.AI
        </Link>
      </div>
    </div>
  );
}

/* ─── Key Visual ─── */
function KeyVisual({ id, color }: { id: string; color: string }) {
  if (id === "pokerlulu") {
    return (
      <div className="relative w-full aspect-[5/6] max-w-[480px] mx-auto">
        <div
          className="absolute inset-0 rounded-[28px]"
          style={{
            background: `linear-gradient(160deg, ${color}20, ${color}05 60%, #fff)`,
            border: `1px solid ${color}30`,
            boxShadow: `0 30px 80px ${color}28`,
          }}
        />
        {/* Stacked cards */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-2xl"
            style={{
              left: `${14 + i * 6}%`,
              top: `${12 + i * 4}%`,
              width: "44%",
              aspectRatio: "5/7",
              background: "#fff",
              border: `1px solid ${color}50`,
              boxShadow: `0 10px 30px ${color}20`,
              transform: `rotate(${-10 + i * 6}deg)`,
            }}
          >
            <div className="p-3 h-full flex flex-col justify-between">
              <span className="text-2xl font-black" style={{ color }}>
                {["♠", "♥", "♦"][i]}
              </span>
              <span className="text-2xl font-black self-end" style={{ color, transform: "rotate(180deg)" }}>
                {["♠", "♥", "♦"][i]}
              </span>
            </div>
          </div>
        ))}
        {/* Chip */}
        <div
          className="absolute right-[8%] bottom-[12%] w-24 h-24 rounded-full flex items-center justify-center"
          style={{
            background: `radial-gradient(circle, ${color}, ${color}88)`,
            border: `3px dashed #fff`,
            boxShadow: `0 14px 40px ${color}55`,
            color: "#fff",
            fontWeight: 900,
            fontSize: 14,
          }}
        >
          LULU
        </div>
      </div>
    );
  }

  if (id === "linkplay") {
    return (
      <div className="relative w-full aspect-[5/6] max-w-[480px] mx-auto">
        <div
          className="absolute inset-0 rounded-[28px]"
          style={{
            background: `linear-gradient(160deg, ${color}18, #fff)`,
            border: `1px solid ${color}30`,
            boxShadow: `0 30px 80px ${color}25`,
          }}
        />
        {/* Brand logo badge */}
        <div
          className="absolute left-[10%] -top-4 flex items-center gap-2 px-3 py-2 rounded-full"
          style={{
            background: "#fff",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            border: "1px solid #eee",
            zIndex: 2,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/linkplay.svg" alt="LinkPlay" style={{ width: 22, height: 22, display: "block" }} />
          <span className="text-[12px] font-black tracking-wide" style={{ color: "#111" }}>LinkPlay</span>
        </div>
        {/* Video window */}
        <div
          className="absolute left-[10%] top-[12%] right-[10%] rounded-2xl aspect-video"
          style={{ background: "#111", overflow: "hidden" }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/linkplay.svg"
              alt=""
              style={{ width: "38%", height: "auto", filter: "drop-shadow(0 6px 18px rgba(47,128,237,0.55))" }}
            />
          </div>
          <div
            className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-black"
            style={{ background: color, color: "#fff" }}
          >
            LIVE
          </div>
        </div>
        {/* Chat bubbles */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-full text-[11px] font-bold px-3 py-2"
            style={{
              left: `${8 + i * 20}%`,
              bottom: `${14 + i * 9}%`,
              background: "#fff",
              color: "#333",
              border: `1px solid ${color}30`,
              boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
            }}
          >
            {["🎮 PLAY!", "GG!", "✨ 대박"][i]}
          </div>
        ))}
      </div>
    );
  }

  if (id === "moitto") {
    return (
      <div className="relative w-full aspect-[5/6] max-w-[480px] mx-auto">
        <div
          className="absolute inset-0 rounded-[28px]"
          style={{
            background: `linear-gradient(160deg, ${color}18, #fff)`,
            border: `1px solid ${color}30`,
            boxShadow: `0 30px 80px ${color}25`,
          }}
        />
        {/* People circles connected */}
        <svg viewBox="0 0 300 360" className="absolute inset-0 w-full h-full p-6">
          <line x1="80" y1="120" x2="220" y2="120" stroke={`${color}50`} strokeWidth="2" strokeDasharray="4 4" />
          <line x1="150" y1="60" x2="80" y2="120" stroke={`${color}50`} strokeWidth="2" strokeDasharray="4 4" />
          <line x1="150" y1="60" x2="220" y2="120" stroke={`${color}50`} strokeWidth="2" strokeDasharray="4 4" />
          <line x1="80" y1="120" x2="150" y2="260" stroke={`${color}40`} strokeWidth="2" strokeDasharray="4 4" />
          <line x1="220" y1="120" x2="150" y2="260" stroke={`${color}40`} strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="150" cy="60" r="32" fill={`${color}20`} stroke={color} strokeWidth="2" />
          <circle cx="150" cy="50" r="10" fill={color} />
          <path d="M130 80 Q150 70 170 80" stroke={color} strokeWidth="2" fill="none" />
          <circle cx="80" cy="120" r="26" fill={`${color}20`} stroke={color} strokeWidth="2" />
          <circle cx="80" cy="112" r="8" fill={color} />
          <circle cx="220" cy="120" r="26" fill={`${color}20`} stroke={color} strokeWidth="2" />
          <circle cx="220" cy="112" r="8" fill={color} />
          <circle cx="150" cy="260" r="40" fill={color} stroke={color} strokeWidth="2" />
          <text x="150" y="268" fontSize="28" textAnchor="middle" fill="#fff" fontWeight="900">★</text>
        </svg>
      </div>
    );
  }

  // Default / others
  return (
    <div className="relative w-full aspect-[5/6] max-w-[480px] mx-auto">
      <div
        className="absolute inset-0 rounded-[28px]"
        style={{
          background: `linear-gradient(160deg, ${color}22, #fff 70%)`,
          border: `1px solid ${color}30`,
          boxShadow: `0 30px 80px ${color}25`,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="text-[100px] font-black"
          style={{ color: `${color}`, letterSpacing: "-0.02em" }}
        >
          {id[0].toUpperCase()}
        </div>
      </div>
      <div className="absolute top-8 left-8 right-8 flex justify-between text-[11px] font-bold tracking-[0.2em]" style={{ color: `${color}` }}>
        <span>LULU.AI</span>
        <span>{id.toUpperCase()}</span>
      </div>
    </div>
  );
}

/* ─── Feature Visual (per index) ─── */
function FeatureVisual({ index, color, accent }: { index: number; color: string; accent: string }) {
  const shapes = [
    <svg key="0" viewBox="0 0 400 300" className="w-full h-full">
      <rect width="400" height="300" rx="24" fill={`${color}08`} />
      <circle cx="200" cy="150" r="90" fill="none" stroke={color} strokeWidth="2" strokeDasharray="6 4" />
      <circle cx="200" cy="150" r="60" fill={`${color}15`} stroke={color} strokeWidth="1.5" />
      <circle cx="200" cy="150" r="30" fill={color} />
      <circle cx="120" cy="100" r="12" fill={accent} />
      <circle cx="290" cy="110" r="9" fill={accent} opacity="0.7" />
      <circle cx="140" cy="220" r="10" fill={color} opacity="0.8" />
      <circle cx="280" cy="210" r="14" fill={color} />
    </svg>,
    <svg key="1" viewBox="0 0 400 300" className="w-full h-full">
      <rect width="400" height="300" rx="24" fill={`${color}08`} />
      <rect x="40" y="60" width="130" height="22" rx="11" fill={`${color}25`} />
      <rect x="40" y="95" width="180" height="22" rx="11" fill={`${color}40`} />
      <rect x="40" y="130" width="100" height="22" rx="11" fill={`${color}20`} />
      <rect x="230" y="60" width="130" height="180" rx="16" fill="#fff" stroke={`${color}40`} strokeWidth="1.5" />
      <circle cx="295" cy="130" r="38" fill={color} />
      <text x="295" y="140" fontSize="26" textAnchor="middle" fill="#fff" fontWeight="900">
        {index + 1}
      </text>
      <rect x="245" y="185" width="100" height="8" rx="4" fill={`${color}40`} />
      <rect x="245" y="202" width="70" height="8" rx="4" fill={`${color}25`} />
    </svg>,
    <svg key="2" viewBox="0 0 400 300" className="w-full h-full">
      <rect width="400" height="300" rx="24" fill={`${color}08`} />
      <path d="M40 240 L110 180 L170 210 L230 140 L310 100 L360 80"
        stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 240 L110 180 L170 210 L230 140 L310 100 L360 80 L360 240 Z"
        fill={`${color}18`} />
      {[[110, 180], [170, 210], [230, 140], [310, 100], [360, 80]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="6" fill={color} stroke="#fff" strokeWidth="2" />
      ))}
      <rect x="40" y="260" width="320" height="2" fill={`${color}30`} />
    </svg>,
    <svg key="3" viewBox="0 0 400 300" className="w-full h-full">
      <rect width="400" height="300" rx="24" fill={`${color}08`} />
      <g transform="translate(200 150)">
        <polygon points="0,-70 60,-20 40,55 -40,55 -60,-20" fill={`${color}30`} stroke={color} strokeWidth="2" />
        <polygon points="0,-40 30,-10 20,30 -20,30 -30,-10" fill={color} />
        <text y="8" textAnchor="middle" fill="#fff" fontSize="26" fontWeight="900">★</text>
      </g>
      <circle cx="70" cy="80" r="8" fill={accent} />
      <circle cx="340" cy="100" r="10" fill={accent} />
      <circle cx="80" cy="240" r="12" fill={color} opacity="0.6" />
      <circle cx="330" cy="230" r="9" fill={color} opacity="0.7" />
    </svg>,
  ];
  return (
    <div
      className="relative rounded-3xl overflow-hidden"
      style={{
        background: `linear-gradient(160deg, #fff, ${color}06)`,
        border: "1px solid #ececec",
        aspectRatio: "4/3",
      }}
    >
      {shapes[index % shapes.length]}
    </div>
  );
}

/* ─── Gallery Visual ─── */
function GalleryVisual({ id, color, variant }: { id: string; color: string; variant: number }) {
  return (
    <svg viewBox="0 0 300 400" className="absolute inset-0 w-full h-full">
      {/* Background dots */}
      <pattern id={`g-dots-${id}-${variant}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill={`${color}30`} />
      </pattern>
      <rect width="300" height="400" fill={`url(#g-dots-${id}-${variant})`} />

      {variant === 0 && (
        <g>
          <rect x="40" y="60" width="220" height="280" rx="18" fill="#fff" stroke={`${color}40`} strokeWidth="1.5" />
          <rect x="60" y="90" width="180" height="18" rx="9" fill={`${color}55`} />
          <rect x="60" y="118" width="120" height="12" rx="6" fill={`${color}35`} />
          <rect x="60" y="150" width="180" height="70" rx="12" fill={`${color}15`} />
          <circle cx="150" cy="185" r="20" fill={color} />
          <rect x="60" y="235" width="180" height="10" rx="5" fill={`${color}30`} />
          <rect x="60" y="255" width="130" height="10" rx="5" fill={`${color}20`} />
          <rect x="60" y="290" width="180" height="30" rx="15" fill={color} />
        </g>
      )}

      {variant === 1 && (
        <g>
          <rect x="30" y="40" width="240" height="310" rx="18" fill="#fff" stroke={`${color}40`} strokeWidth="1.5" />
          <rect x="50" y="60" width="200" height="50" rx="10" fill={`${color}18`} />
          <circle cx="75" cy="85" r="14" fill={color} />
          <rect x="100" y="75" width="120" height="8" rx="4" fill={`${color}55`} />
          <rect x="100" y="90" width="80" height="7" rx="3.5" fill={`${color}30`} />
          <rect x="50" y="130" width="200" height="50" rx="10" fill={`${color}18`} />
          <circle cx="75" cy="155" r="14" fill={color} />
          <rect x="100" y="145" width="120" height="8" rx="4" fill={`${color}55`} />
          <rect x="100" y="160" width="80" height="7" rx="3.5" fill={`${color}30`} />
          <rect x="50" y="200" width="200" height="50" rx="10" fill={`${color}18`} />
          <circle cx="75" cy="225" r="14" fill={color} />
          <rect x="100" y="215" width="120" height="8" rx="4" fill={`${color}55`} />
          <rect x="100" y="230" width="80" height="7" rx="3.5" fill={`${color}30`} />
          <rect x="50" y="280" width="200" height="40" rx="20" fill={color} />
        </g>
      )}

      {variant === 2 && (
        <g>
          <rect x="30" y="40" width="240" height="310" rx="18" fill="#fff" stroke={`${color}40`} strokeWidth="1.5" />
          <rect x="50" y="60" width="200" height="130" rx="12" fill={`${color}12`} />
          <path d="M60 180 L100 140 L140 160 L190 110 L240 100"
            stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="100" cy="140" r="4" fill={color} />
          <circle cx="140" cy="160" r="4" fill={color} />
          <circle cx="190" cy="110" r="4" fill={color} />
          <rect x="50" y="205" width="95" height="60" rx="10" fill={`${color}18`} />
          <text x="98" y="230" fontSize="12" textAnchor="middle" fill={color} fontWeight="900">USERS</text>
          <text x="98" y="252" fontSize="18" textAnchor="middle" fill={color} fontWeight="900">1,204</text>
          <rect x="155" y="205" width="95" height="60" rx="10" fill={`${color}18`} />
          <text x="203" y="230" fontSize="12" textAnchor="middle" fill={color} fontWeight="900">GROWTH</text>
          <text x="203" y="252" fontSize="18" textAnchor="middle" fill={color} fontWeight="900">+32%</text>
          <rect x="50" y="285" width="200" height="40" rx="20" fill={color} />
        </g>
      )}
    </svg>
  );
}
