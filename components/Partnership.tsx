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
  const services = content.products.items;
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section
      id="partnership"
      className="relative overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >
      {/* Orbs */}
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[400px] blur-[170px] opacity-[0.08] pointer-events-none" style={{ background: "radial-gradient(ellipse, #ec4899, transparent)" }} />
      <div className="absolute top-0 right-1/3 w-[400px] h-[300px] blur-[150px] opacity-[0.06] pointer-events-none" style={{ background: "radial-gradient(ellipse, #8b5cf6, transparent)" }} />
      <div className="absolute top-[60%] left-0 w-[500px] h-[500px] blur-[200px] opacity-[0.05] pointer-events-none" style={{ background: "radial-gradient(ellipse, #6366f1, transparent)" }} />
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "70px 70px" }} />

      {/* Top nav bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-16 py-5"
        style={{ background: "rgba(5,5,8,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
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
            className="text-xs font-semibold tracking-[0.25em] text-pink-400 mb-6 uppercase"
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
              background: "linear-gradient(135deg, #ffffff 0%, #c7d2fe 60%, #a5b4fc 100%)",
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
            className="text-lg md:text-xl text-white/35 leading-relaxed max-w-2xl mb-12"
          >
            {t.sub}
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onClick={() => setContactOpen(true)}
            className="btn-shimmer inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)", boxShadow: "0 0 30px rgba(236,72,153,0.35), inset 0 1px 0 rgba(255,255,255,0.12)" }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 50px rgba(236,72,153,0.55), inset 0 1px 0 rgba(255,255,255,0.12)" }}
            whileTap={{ scale: 0.97 }}
          >
            {t.cta}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 3L13 8L8 13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </motion.button>
        </div>
      </div>

      {/* ─── Section 2: Partner Types ─── */}
      <div className="relative py-24 md:py-32">
        <div className="px-8 md:px-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.25em] text-pink-400/60 mb-12 md:mb-16 uppercase"
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
              className="group grid md:grid-cols-[80px_1fr] gap-3 md:gap-8 items-baseline py-8 md:py-10"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              <span className="text-[48px] md:text-[64px] font-black leading-none text-white/[0.04] group-hover:text-white/[0.08] transition-colors duration-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h4 className="text-lg md:text-xl font-bold text-white mb-2 tracking-tight group-hover:text-pink-200 transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-sm md:text-base text-white/35 leading-relaxed max-w-lg">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── Section 3: Our Ecosystem (서비스 요약) ─── */}
      <div className="relative py-24 md:py-32">
        <div className="px-8 md:px-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.25em] text-pink-400/60 mb-4 uppercase"
          >
            OUR ECOSYSTEM
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="font-black text-white leading-tight mb-4"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)" }}
          >
            {lang === "ko" ? "파트너와 함께 성장하는 서비스" : "Services That Grow With Partners"}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="text-white/30 text-sm md:text-base mb-12 max-w-xl"
          >
            {lang === "ko"
              ? "우리의 서비스 생태계 전반에 걸쳐 파트너십 기회가 열려 있습니다."
              : "Partnership opportunities span across our entire service ecosystem."}
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {services.map((svc, i) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="rounded-2xl p-5 md:p-6 relative overflow-hidden group"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${svc.color}40, transparent)` }}
                />
                <div
                  className="w-2 h-2 rounded-full mb-4"
                  style={{ background: svc.color, boxShadow: `0 0 8px ${svc.color}60` }}
                />
                <div className="text-sm md:text-base font-bold text-white mb-1">{svc.name}</div>
                <div className="text-xs text-white/30">{svc.tag[lang]}</div>
                <div
                  className="mt-2 inline-block text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-full"
                  style={{ background: `${svc.color}15`, color: svc.color, border: `1px solid ${svc.color}25` }}
                >
                  {svc.status[lang]}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Section 4: Vision ─── */}
      <div className="relative py-24 md:py-32">
        <div className="px-8 md:px-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.25em] text-pink-400/60 mb-12 uppercase"
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
                background: "linear-gradient(135deg, #ffffff 0%, #c7d2fe 60%, #a5b4fc 100%)",
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
              className="text-sm md:text-base text-white/35 leading-relaxed"
            >
              {v.body}
            </motion.p>
          </div>
        </div>
      </div>

      {/* ─── Section 5: CTA ─── */}
      <div className="relative py-24 md:py-32">
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
              style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)", boxShadow: "0 0 30px rgba(236,72,153,0.35), inset 0 1px 0 rgba(255,255,255,0.12)" }}
              whileHover={{ scale: 1.04, boxShadow: "0 0 50px rgba(236,72,153,0.55), inset 0 1px 0 rgba(255,255,255,0.12)" }}
              whileTap={{ scale: 0.97 }}
            >
              {t.cta}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 3L13 8L8 13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </motion.button>
            <span className="text-xs text-white/25">help@pokerlulu.com</span>
          </motion.div>
        </div>
      </div>

      {/* Footer strip */}
      <div className="relative px-8 md:px-16 py-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-black text-white" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>L</div>
            <span className="text-white/40 text-xs font-semibold">lulu.ai</span>
          </Link>
          <span className="text-[11px] text-white/20">© {new Date().getFullYear()} lulu.ai</span>
        </div>
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
}
