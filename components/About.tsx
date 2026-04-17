"use client";

import { useLang } from "./LangContext";
import { content } from "@/lib/i18n";
import { motion } from "framer-motion";

export default function About() {
  const { lang } = useLang();
  const t = content.about[lang];

  return (
    <section
      className="relative overflow-hidden"
    >
      {/* Global background — matches other sections */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] right-0 w-[500px] h-[500px] rounded-full blur-[170px] opacity-[0.07]" style={{ background: "radial-gradient(circle, #10b981, transparent)" }} />
        <div className="absolute bottom-[20%] left-0 w-[400px] h-[400px] rounded-full blur-[150px] opacity-[0.05]" style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[500px] h-[400px] rounded-full blur-[200px] opacity-[0.03]" style={{ background: "radial-gradient(circle, #ec4899, transparent)" }} />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "70px 70px" }} />
      </div>

      {/* ─── Section 1: Statement (fullscreen) ─── */}
      <div
        className="relative flex items-center justify-center"
        style={{ minHeight: "100dvh" }}
      >
        <div className="px-6 md:px-16 max-w-6xl mx-auto w-full py-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.25em] text-emerald-400 mb-10 md:mb-14 uppercase"
          >
            {t.label}
          </motion.div>

          {/* Large statement */}
          <div className="mb-10 md:mb-12">
            {t.headline.split("\n").map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className="font-black block leading-[1.1] mb-2"
                  style={{
                    fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                    background: "linear-gradient(135deg, #ffffff 0%, #c7d2fe 60%, #a5b4fc 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {line}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Mission — directly under headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-lg md:text-2xl text-white/35 leading-relaxed max-w-3xl mb-14 md:mb-16 whitespace-pre-line"
          >
            {t.mission.text}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-2xl"
          >
            <div className="w-12 h-px mb-8" style={{ background: "linear-gradient(90deg, rgba(16,185,129,0.4), transparent)" }} />
            <p className="text-sm md:text-base text-white/30 leading-relaxed">
              {t.body}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ─── Section 2: Values + Milestones (compact) ─── */}
      <div className="relative py-16 md:py-24">
        <div className="px-6 md:px-16 max-w-6xl mx-auto">
          {/* Values — inline row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.25em] text-emerald-400/60 mb-8 uppercase"
          >
            CORE VALUES
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5 mb-16 md:mb-20">
            {t.values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <h4 className="text-sm md:text-base font-bold text-white mb-1 tracking-tight">{val.title}</h4>
                <p className="text-xs md:text-sm text-white/30 leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Milestones — compact inline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.25em] text-emerald-400/60 mb-8 uppercase"
          >
            MILESTONES
          </motion.div>

          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {t.milestones.map((ms, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-3"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{
                    background: i === t.milestones.length - 1 ? "#6366f1" : "rgba(255,255,255,0.15)",
                    boxShadow: i === t.milestones.length - 1 ? "0 0 8px rgba(99,102,241,0.5)" : "none",
                  }}
                />
                <span className="text-xs text-white/25 tracking-wider">{ms.date}</span>
                <span className="text-sm text-white/50">{ms.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
