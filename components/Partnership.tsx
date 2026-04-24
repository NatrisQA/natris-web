"use client";

import { useLang } from "./LangContext";
import { content } from "@/lib/i18n";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import ContactModal from "./ContactModal";

export default function Partnership() {
  const { lang } = useLang();
  const t = content.partnership[lang];
  const v = content.vision[lang];
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section
      id="partnership"
      className="relative overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >
      {/* Orbs — warm red/orange palette matching main page */}
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[400px] blur-[170px] opacity-[0.09] pointer-events-none" style={{ background: "radial-gradient(ellipse, #ff5a6a, transparent)" }} />
      <div className="absolute top-0 right-1/3 w-[400px] h-[300px] blur-[150px] opacity-[0.07] pointer-events-none" style={{ background: "radial-gradient(ellipse, #ff8c42, transparent)" }} />
      <div className="absolute top-[60%] left-0 w-[500px] h-[500px] blur-[200px] opacity-[0.05] pointer-events-none" style={{ background: "radial-gradient(ellipse, #ff6d1f, transparent)" }} />
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "70px 70px" }} />

      {/* Top nav bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-16 py-5"
        style={{ background: "rgba(10,10,18,0.82)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          {lang === "ko" ? "홈으로" : "Home"}
        </Link>
        <span className="text-xs font-semibold tracking-[0.15em] text-white/30 uppercase">{t.label}</span>
      </motion.div>

      {/* ─── Section 1: Hero ─── */}
      <div className="relative flex items-center" style={{ minHeight: "80dvh" }}>
        <div className="px-8 md:px-16 py-24 max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.25em] text-[#ff5a6a] mb-6 uppercase"
          >
            {t.label}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-black text-white leading-[1.1] whitespace-pre-line mb-8"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              background: "linear-gradient(135deg, #ffffff 0%, #ffd5d8 55%, #ffb48a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-lg md:text-xl text-white/35 leading-relaxed max-w-2xl"
          >
            {t.sub}
          </motion.p>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-[11px] text-white/25 tracking-widest uppercase">
            {lang === "ko" ? "더 알아보기" : "Learn More"}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="text-white/20">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* ─── Section 2: Partner Types ─── */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative py-14 md:py-20 section-divider"
      >
        <div className="px-8 md:px-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.25em] text-[#ff5a6a]/70 mb-8 md:mb-10 uppercase"
          >
            {lang === "ko" ? "WHO WE WORK WITH" : "WHO WE WORK WITH"}
          </motion.div>

          {t.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group grid md:grid-cols-[72px_1fr] gap-3 md:gap-7 items-baseline py-5 md:py-6"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              <span className="text-[40px] md:text-[52px] font-black leading-none text-white/[0.04] group-hover:text-white/[0.08] transition-colors duration-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h4 className="text-lg md:text-xl font-bold text-white mb-1.5 tracking-tight group-hover:text-[#ffb4bc] transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-sm md:text-base text-white/35 leading-relaxed max-w-lg whitespace-pre-line">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ─── Section 4: Vision ─── */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative py-24 md:py-32 section-divider"
      >
        <div className="px-8 md:px-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.25em] text-[#ff5a6a]/70 mb-12 uppercase"
          >
            {v.label}
          </motion.div>

          <div className="grid md:grid-cols-[1fr_1fr] gap-12 md:gap-20 items-start">
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-black leading-[1.15] whitespace-pre-line"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                background: "linear-gradient(135deg, #ffffff 0%, #ffd5d8 55%, #ffb48a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {v.headline}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="text-sm md:text-base text-white/35 leading-relaxed whitespace-pre-line"
            >
              {v.body}
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* ─── Section 5: CTA ─── */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative py-24 md:py-32 section-divider"
      >
        <div className="px-8 md:px-16 max-w-6xl mx-auto text-center">
          <motion.h3
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-black text-white leading-tight mb-4"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)" }}
          >
            {lang === "ko" ? "함께할 준비가 되셨나요?" : "Ready to Partner?"}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/30 text-sm md:text-base mb-10 max-w-md mx-auto"
          >
            {lang === "ko"
              ? "아래 버튼을 눌러 문의를 보내주시면, 담당자가 빠르게 회신드리겠습니다."
              : "Send us an inquiry below and our team will get back to you shortly."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.button
              onClick={() => setContactOpen(true)}
              className="btn-shimmer inline-flex items-center gap-2.5 px-10 py-4 rounded-full text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #ff5a6a, #ff8c42)", boxShadow: "0 0 30px rgba(255,90,106,0.35), inset 0 1px 0 rgba(255,255,255,0.12)" }}
              whileHover={{ scale: 1.04, boxShadow: "0 0 50px rgba(255,90,106,0.55), inset 0 1px 0 rgba(255,255,255,0.12)" }}
              whileTap={{ scale: 0.97 }}
            >
              {t.cta}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 3L13 8L8 13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </motion.button>
            <span className="text-xs text-white/25">help@pokerlulu.com</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer strip */}
      <div className="relative px-8 md:px-16 py-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-black text-white" style={{ background: "#ff5a6a" }}>L</div>
            <span className="text-white/40 text-xs font-semibold">LULU.AI</span>
          </Link>
          <span className="text-[11px] text-white/20">© {new Date().getFullYear()} lulu.ai</span>
        </div>
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
}
