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

        {/* ── Core Values — Diagram ── */}
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

          {/* Diagram */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative max-w-3xl mx-auto"
            style={{ aspectRatio: "4/3" }}
          >
            {/* SVG connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300" fill="none" preserveAspectRatio="xMidYMid meet">
              {/* Center → each node */}
              <line x1="200" y1="150" x2="200" y2="38" stroke="rgba(16,185,129,0.2)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="200" y1="150" x2="200" y2="262" stroke="rgba(16,185,129,0.2)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="200" y1="150" x2="55" y2="150" stroke="rgba(16,185,129,0.2)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="200" y1="150" x2="345" y2="150" stroke="rgba(16,185,129,0.2)" strokeWidth="1" strokeDasharray="4 4" />
              {/* Outer ring */}
              <circle cx="200" cy="150" r="120" stroke="rgba(16,185,129,0.06)" strokeWidth="1" fill="none" />
              <circle cx="200" cy="150" r="80" stroke="rgba(16,185,129,0.04)" strokeWidth="1" fill="none" strokeDasharray="6 6" />
            </svg>

            {/* Center hub */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div
                className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center"
                style={{
                  background: "radial-gradient(circle, rgba(16,185,129,0.15), rgba(16,185,129,0.04))",
                  border: "1.5px solid rgba(16,185,129,0.3)",
                  boxShadow: "0 0 30px rgba(16,185,129,0.12)",
                }}
              >
                <span className="text-xs md:text-sm font-black tracking-wider text-emerald-400">lulu.ai</span>
              </div>
            </div>

            {/* Value nodes — positioned at top, right, bottom, left */}
            {(() => {
              const positions = [
                { top: "0%", left: "50%", tx: "-50%", ty: "0" },
                { top: "50%", left: "100%", tx: "-100%", ty: "-50%" },
                { top: "100%", left: "50%", tx: "-50%", ty: "-100%" },
                { top: "50%", left: "0%", tx: "0", ty: "-50%" },
              ];
              const colors = ["#10b981", "#06b6d4", "#8b5cf6", "#f59e0b"];
              return t.values.map((val, i) => {
                const pos = positions[i];
                const c = colors[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                    className="absolute group"
                    style={{ top: pos.top, left: pos.left, transform: `translate(${pos.tx}, ${pos.ty})` }}
                  >
                    <div className="flex flex-col items-center text-center" style={{ width: "min(40vw, 160px)" }}>
                      {/* Node circle */}
                      <div
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform duration-300"
                        style={{
                          background: `radial-gradient(circle, ${c}20, ${c}08)`,
                          border: `1.5px solid ${c}40`,
                          boxShadow: `0 0 16px ${c}15`,
                        }}
                      >
                        <span className="text-lg md:text-xl">{val.icon}</span>
                      </div>
                      <h4 className="text-xs md:text-sm font-bold text-white mb-1">{val.title}</h4>
                      <p className="text-[10px] md:text-[11px] text-white/30 leading-snug whitespace-pre-line hidden md:block">{val.desc}</p>
                    </div>
                  </motion.div>
                );
              });
            })()}
          </motion.div>
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
