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
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "70px 70px" }} />

      {/* Top nav bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 flex items-center justify-between px-6 md:px-16 py-5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          {lang === "ko" ? "홈으로" : "Home"}
        </Link>
        <span className="text-xs font-semibold tracking-[0.15em] text-white/30 uppercase">{t.label}</span>
      </motion.div>

      <div className="relative flex flex-col px-8 md:px-16 pt-16 md:pt-24 pb-16 max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.25em] text-pink-400 mb-4 uppercase"
          >
            {t.label}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="font-black text-white leading-tight whitespace-pre-line"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
          >
            {t.headline}
          </motion.h2>
        </div>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12 }}
          className="text-white/30 text-sm md:text-base mb-10 max-w-2xl"
        >
          {t.sub}
        </motion.p>

        {/* Partner types — editorial list */}
        <div className="mb-12">
          {t.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group grid md:grid-cols-[80px_1fr] gap-3 md:gap-8 items-baseline py-6 md:py-8"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              <span className="text-[40px] md:text-[52px] font-black leading-none text-white/[0.04] group-hover:text-white/[0.08] transition-colors duration-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h4 className="text-base md:text-lg font-bold text-white mb-1.5 tracking-tight group-hover:text-pink-200 transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-sm text-white/35 leading-relaxed max-w-lg">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-6"
        >
          <motion.button
            onClick={() => setContactOpen(true)}
            className="btn-shimmer inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)", boxShadow: "0 0 30px rgba(236,72,153,0.35), inset 0 1px 0 rgba(255,255,255,0.12)" }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 50px rgba(236,72,153,0.55), inset 0 1px 0 rgba(255,255,255,0.12)" }}
            whileTap={{ scale: 0.97 }}
          >
            {t.cta}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 3L13 8L8 13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </motion.button>
          <span className="text-sm text-white/30">help@pokerlulu.com</span>
        </motion.div>
      </div>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
}
