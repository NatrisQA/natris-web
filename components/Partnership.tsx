"use client";

import { useLang } from "./LangContext";
import { content } from "@/lib/i18n";
import { motion } from "framer-motion";

export default function Partnership() {
  const { lang } = useLang();
  const t = content.partnership[lang];

  return (
    <section
      id="partnership"
      className="relative overflow-hidden"
      style={{ height: "100dvh", scrollSnapAlign: "start" }}
    >
      {/* Orbs */}
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[400px] blur-[170px] opacity-[0.08] pointer-events-none" style={{ background: "radial-gradient(ellipse, #ec4899, transparent)" }} />
      <div className="absolute top-0 right-1/3 w-[400px] h-[300px] blur-[150px] opacity-[0.06] pointer-events-none" style={{ background: "radial-gradient(ellipse, #8b5cf6, transparent)" }} />

      <div className="h-full flex flex-col px-8 md:px-16 pt-28 pb-12 max-w-6xl mx-auto w-full">
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

        {/* Cards grid — takes remaining space */}
        <div className="flex-1 grid grid-cols-2 gap-4 content-start">
          {t.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="card-trace group relative rounded-2xl p-6 md:p-8 flex flex-col gap-3 overflow-hidden cursor-pointer"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(236,72,153,0.07), rgba(139,92,246,0.05))" }} />
              <div className="relative z-10">
                <div
                  className="text-2xl mb-3 w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-pink-200 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-white/42 leading-relaxed">{item.desc}</p>
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
          className="pt-8 flex items-center gap-6"
        >
          <motion.a
            href="mailto:contact@lulu.ai"
            className="btn-shimmer inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)", boxShadow: "0 0 30px rgba(236,72,153,0.35), inset 0 1px 0 rgba(255,255,255,0.12)" }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 50px rgba(236,72,153,0.55), inset 0 1px 0 rgba(255,255,255,0.12)" }}
            whileTap={{ scale: 0.97 }}
          >
            {t.cta}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 3L13 8L8 13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </motion.a>
          <span className="text-sm text-white/30">{lang === "ko" ? "contact@lulu.ai" : "contact@lulu.ai"}</span>
        </motion.div>
      </div>
    </section>
  );
}
