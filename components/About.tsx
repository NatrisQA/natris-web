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

      {/* ─── Section 2: Values ─── */}
      <div className="relative py-24 md:py-32">
        <div className="px-6 md:px-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.25em] text-emerald-400/60 mb-12 md:mb-16 uppercase"
          >
            CORE VALUES
          </motion.div>

          {t.values.map((val, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="group grid md:grid-cols-[100px_1fr] gap-4 md:gap-10 items-baseline py-8 md:py-12"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              <span className="text-[48px] md:text-[64px] font-black leading-none text-white/[0.04] group-hover:text-white/[0.08] transition-colors duration-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h4 className="text-lg md:text-xl font-bold text-white mb-2 tracking-tight group-hover:text-emerald-200 transition-colors duration-300">{val.title}</h4>
                <p className="text-sm md:text-base text-white/30 leading-relaxed max-w-lg">{val.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── Section 4: Timeline ─── */}
      <div className="relative py-24 md:py-32">
        <div className="px-6 md:px-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.25em] text-emerald-400/60 mb-12 md:mb-16 uppercase"
          >
            MILESTONES
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {t.milestones.map((ms, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.1 }}
                className="rounded-2xl p-5 md:p-6 relative overflow-hidden group"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                {/* Top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background: i === t.milestones.length - 1
                      ? "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)"
                      : "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
                  }}
                />

                <div
                  className="w-2 h-2 rounded-full mb-4"
                  style={{
                    background: i === t.milestones.length - 1 ? "#6366f1" : "rgba(255,255,255,0.12)",
                    boxShadow: i === t.milestones.length - 1 ? "0 0 10px rgba(99,102,241,0.5)" : "none",
                  }}
                />

                <div className="text-xs text-white/20 tracking-wider mb-1.5">{ms.date}</div>
                <div className="text-sm md:text-base font-medium text-white/55">{ms.text}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
