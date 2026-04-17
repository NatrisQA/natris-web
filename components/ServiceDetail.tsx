"use client";

import { motion } from "framer-motion";
import { useLang } from "./LangContext";
import Link from "next/link";
import type { content } from "@/lib/i18n";

type ServiceItem = (typeof content.products.items)[number];

const statusColors: Record<string, string> = {
  "서비스 중": "#10b981", Live: "#10b981",
  "개발 중": "#f59e0b", "In Development": "#f59e0b",
  "출시 예정": "#6366f1", "Launching Soon": "#6366f1",
  "베타 준비": "#ec4899", "Beta Soon": "#ec4899",
  "기획 중": "#8b5cf6", Planned: "#8b5cf6",
};

export default function ServiceDetail({ item }: { item: ServiceItem }) {
  const { lang } = useLang();
  const sc = statusColors[item.status[lang]] || "#888";

  return (
    <div className="min-h-screen" style={{ background: "#050508" }}>
      {/* ── Fixed top bar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4" style={{ background: "rgba(5,5,8,0.8)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span className="font-medium">{lang === "ko" ? "홈" : "Home"}</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold tracking-wider" style={{ color: item.color }}>{item.name}</span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium" style={{ color: sc }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: sc, boxShadow: `0 0 6px ${sc}` }} />
            {item.status[lang]}
          </span>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full" style={{ background: `radial-gradient(circle, ${item.color}12, transparent 60%)`, filter: "blur(120px)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-[40%]" style={{ background: "linear-gradient(to top, #050508, transparent)" }} />
        </div>

        {/* Hero key visual placeholder */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[min(70vw,600px)] aspect-[16/10] rounded-3xl overflow-hidden" style={{ background: `${item.color}06`, border: `1px solid ${item.color}15` }}>
            {item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center relative">
                <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 30% 40%, ${item.color}10, transparent 60%), radial-gradient(ellipse at 70% 60%, ${item.color}08, transparent 50%)` }} />
                <svg viewBox="0 0 200 125" fill="none" className="w-1/2 opacity-10">
                  <rect x="20" y="10" width="160" height="105" rx="12" stroke={item.color} strokeWidth="1" strokeDasharray="6 4" />
                  <path d="M60 80 L80 50 L100 70 L120 40 L150 80" stroke={item.color} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                  <circle cx="65" cy="38" r="10" stroke={item.color} strokeWidth="1" fill={`${item.color}15`} />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 mt-[50vh]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-medium tracking-wide" style={{ background: `${item.color}15`, border: `1px solid ${item.color}30`, color: item.color }}>
              {item.tag[lang]}
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="font-black text-white leading-[0.95] mb-3"
            style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
          >
            {item.name}
          </motion.h1>

          {item.name_ko !== item.name && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl font-medium text-white/25 mb-8"
            >
              {item.name_ko}
            </motion.p>
          )}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-white/45 leading-relaxed whitespace-pre-line max-w-xl mx-auto mb-10"
          >
            {item.desc[lang]}
          </motion.p>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {item.badges[lang].map((badge) => (
              <span
                key={badge}
                className="text-xs px-3 py-1.5 rounded-full font-medium"
                style={{ background: `${item.color}10`, color: `${item.color}cc`, border: `1px solid ${item.color}20` }}
              >
                {badge}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-[11px] text-white/20 tracking-wider uppercase">Scroll</span>
            <div className="w-px h-8" style={{ background: `linear-gradient(to bottom, ${item.color}40, transparent)` }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── FEATURES ── */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative py-24 md:py-36 px-6 md:px-12 section-divider"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 md:mb-20"
          >
            <div className="text-xs font-semibold tracking-[0.25em] mb-4 uppercase" style={{ color: item.color }}>FEATURES</div>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              {lang === "ko" ? "핵심 기능" : "Key Features"}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {item.features.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-2xl p-8 md:p-10 overflow-hidden"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${item.color}08, transparent 60%)` }} />

                {/* Number */}
                <div className="absolute top-6 right-8 text-[64px] font-black leading-none pointer-events-none" style={{ color: `${item.color}08` }}>
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="relative z-10">
                  <div className="text-3xl mb-5">{feat.icon}</div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform duration-300">
                    {feat.title[lang]}
                  </h3>
                  <p className="text-sm md:text-base text-white/40 leading-relaxed">
                    {feat.desc[lang]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── GALLERY / SCREENSHOTS ── */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative py-24 md:py-36 px-6 md:px-12 overflow-hidden section-divider"
      >
        {/* Background orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full" style={{ background: `radial-gradient(circle, ${item.color}08, transparent 60%)`, filter: "blur(100px)" }} />

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 md:mb-20"
          >
            <div className="text-xs font-semibold tracking-[0.25em] mb-4 uppercase" style={{ color: item.color }}>PREVIEW</div>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              {lang === "ko" ? "스크린샷" : "Screenshots"}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {item.gallery.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="rounded-2xl overflow-hidden"
                style={{ aspectRatio: "16/10", background: `${item.color}06`, border: `1px solid ${item.color}12` }}
              >
                {img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={img} alt={`${item.name} screenshot ${i + 1}`} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center relative">
                    <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at ${30 + i * 20}% 40%, ${item.color}08, transparent 60%)` }} />
                    <div className="flex flex-col items-center gap-3 opacity-20">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke={item.color} strokeWidth="1.2" /><circle cx="8.5" cy="8.5" r="2" stroke={item.color} strokeWidth="1" /><path d="M3 16L8 11L13 16" stroke={item.color} strokeWidth="1" /><path d="M14 14L17 11L21 15" stroke={item.color} strokeWidth="1" /></svg>
                      <span className="text-[11px] tracking-wider uppercase" style={{ color: item.color }}>Coming Soon</span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── CTA SECTION ── */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative py-24 md:py-32 px-6 md:px-12 section-divider"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-black text-white mb-4">
              {lang === "ko"
                ? item.status[lang] === "기획 중"
                  ? "기대해주세요"
                  : "곧 만나보실 수 있습니다"
                : "Stay Tuned"
              }
            </h2>
            <p className="text-sm md:text-base text-white/35 mb-10 max-w-md mx-auto">
              {lang === "ko"
                ? `${item.name_ko}의 최신 소식을 가장 먼저 받아보세요.`
                : `Be the first to hear about ${item.name} updates.`
              }
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-200"
                  style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}bb)`, boxShadow: `0 0 30px ${item.color}40` }}
                >
                  {lang === "ko" ? "서비스 바로가기" : "Visit Service"}
                </a>
              )}
              <Link
                href="/"
                className="px-8 py-3.5 rounded-full text-sm font-semibold text-white/60 hover:text-white transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                {lang === "ko" ? "모든 서비스 보기" : "View All Services"}
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Footer strip ── */}
      <div className="py-8 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p className="text-xs text-white/15">&copy; 2026 lulu.ai. All rights reserved.</p>
      </div>
    </div>
  );
}
