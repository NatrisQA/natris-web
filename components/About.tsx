"use client";

import { useLang } from "./LangContext";
import { content } from "@/lib/i18n";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ value }: { value: string }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(triggerRef, { once: true });
  const match = value.match(/^([\d,.]+)(.*)$/);
  const raw = match ? parseFloat(match[1].replace(/,/g, "")) : null;
  const suffix = match ? match[2] : "";
  const count = useMotionValue(0);

  useEffect(() => {
    if (!inView || raw === null) return;
    const ctrl = animate(count, raw, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => {
        if (!spanRef.current) return;
        spanRef.current.textContent =
          raw >= 1000 ? Math.round(v).toLocaleString() : Math.round(v).toString();
      },
    });
    return () => ctrl.stop();
  }, [inView, raw]);

  if (raw === null) return <span>{value}</span>;
  return (
    <span ref={triggerRef} className="tabular">
      <span ref={spanRef}>0</span>{suffix}
    </span>
  );
}

export default function About() {
  const { lang } = useLang();
  const t = content.about[lang];

  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{ minHeight: "100dvh", scrollSnapAlign: "start" }}
    >
      {/* Orbs */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full blur-[170px] opacity-[0.08] pointer-events-none" style={{ background: "radial-gradient(circle, #10b981, transparent)" }} />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[300px] rounded-full blur-[150px] opacity-[0.05] pointer-events-none" style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />
      <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[200px] opacity-[0.04] pointer-events-none" style={{ background: "radial-gradient(circle, #ec4899, transparent)" }} />
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

      <div className="flex flex-col px-6 md:px-12 lg:px-16 pt-28 pb-20 max-w-7xl mx-auto w-full">

        {/* ── Hero area ── */}
        <div className="mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.25em] text-emerald-400 mb-6 uppercase"
          >
            {t.label}
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-start">
            <motion.h2
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="font-black text-white leading-tight whitespace-pre-line"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
            >
              {t.headline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="text-white/45 text-base md:text-lg leading-relaxed md:pt-3"
            >
              {t.body}
            </motion.p>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-3 gap-3 md:gap-5 mb-20 md:mb-28">
          {t.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 * i + 0.1 }}
              className="rounded-2xl p-6 md:p-8 text-center relative overflow-hidden group"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(circle at 50% 50%, rgba(16,185,129,0.06), transparent 70%)" }} />
              <div className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 relative z-10">
                <Counter value={stat.value} />
              </div>
              <div className="text-[11px] md:text-xs text-white/30 leading-snug relative z-10">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* ── Core Values — Flow ── */}
        <div className="mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.25em] text-emerald-400/60 mb-4 uppercase"
          >
            CORE VALUES
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className="text-2xl md:text-3xl font-black text-white mb-12 md:mb-16"
          >
            {lang === "ko" ? "우리가 일하는 방식" : "How We Work"}
          </motion.h3>

          <div className="grid grid-cols-2 md:grid-cols-4 relative">
            {/* Horizontal connecting line (desktop) */}
            <div className="hidden md:block absolute top-[28px] left-[12.5%] right-[12.5%] h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.2) 15%, rgba(16,185,129,0.2) 85%, transparent)" }} />

            {t.values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.15 }}
                className="relative flex flex-col items-center text-center px-3 py-6 md:py-0"
              >
                {/* Number node */}
                <div className="relative mb-5">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center relative z-10"
                    style={{
                      background: "rgba(16,185,129,0.06)",
                      border: "1px solid rgba(16,185,129,0.2)",
                    }}
                  >
                    <span className="text-lg font-black text-emerald-400/80">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-sm md:text-base font-bold text-white mb-2 tracking-tight">
                  {val.title}
                </h4>

                {/* Thin separator */}
                <div className="w-6 h-px mb-3" style={{ background: "rgba(16,185,129,0.3)" }} />

                {/* Desc */}
                <p className="text-[11px] md:text-xs text-white/30 leading-relaxed whitespace-pre-line max-w-[140px]">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Timeline ── */}
        <div className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.25em] text-emerald-400/60 mb-4 uppercase"
          >
            MILESTONES
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className="text-2xl md:text-3xl font-black text-white mb-10 md:mb-14"
          >
            {lang === "ko" ? "여정" : "Our Journey"}
          </motion.h3>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-px" style={{ background: "linear-gradient(to bottom, rgba(16,185,129,0.4), rgba(16,185,129,0.08))" }} />

            <div className="flex flex-col gap-8 md:gap-10">
              {t.milestones.map((ms, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.1 }}
                  className="flex items-start gap-5 md:gap-8"
                >
                  {/* Dot */}
                  <div className="relative flex-shrink-0 mt-1.5">
                    <div
                      className="w-[15px] h-[15px] md:w-[19px] md:h-[19px] rounded-full"
                      style={{
                        background: i === 0 ? "#10b981" : "rgba(16,185,129,0.2)",
                        border: `2px solid ${i === 0 ? "#10b981" : "rgba(16,185,129,0.35)"}`,
                        boxShadow: i === 0 ? "0 0 12px rgba(16,185,129,0.5)" : "none",
                      }}
                    />
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-emerald-400/70 mb-1 tracking-wide">{ms.date}</div>
                    <div className="text-sm md:text-base font-medium text-white/70">{ms.text}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Mission ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-8 md:p-10 relative overflow-hidden"
          style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)" }}
        >
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)" }} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] rounded-full blur-[100px] opacity-[0.08] pointer-events-none" style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="text-xs font-bold tracking-[0.25em] text-indigo-400 mb-4 uppercase">{t.mission.label}</div>
            <p className="text-base md:text-lg text-white/55 leading-relaxed">{t.mission.text}</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
