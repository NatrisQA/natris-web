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
      style={{ scrollSnapAlign: "start" }}
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
          <div className="mb-16 md:mb-20">
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

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl"
          >
            <div className="w-12 h-px mb-8" style={{ background: "linear-gradient(90deg, rgba(16,185,129,0.4), transparent)" }} />
            <p className="text-base md:text-xl text-white/40 leading-relaxed">
              {t.body}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ─── Section 2: Numbers ─── */}
      <div className="relative py-24 md:py-32">
        <div className="px-6 md:px-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-3 md:gap-5">
            {t.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="rounded-2xl py-8 md:py-12 text-center relative overflow-hidden group"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(circle at 50% 50%, rgba(16,185,129,0.05), transparent 70%)" }} />
                <div className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-3 tracking-tight relative z-10">
                  <Counter value={stat.value} />
                </div>
                <div className="text-[11px] md:text-xs text-white/25 tracking-wider uppercase relative z-10">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Section 3: Values ─── */}
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
                <p className="text-sm md:text-base text-white/30 leading-relaxed max-w-lg whitespace-pre-line">{val.desc}</p>
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

      {/* ─── Section 5: Mission ─── */}
      <div className="relative py-24 md:py-32">
        <div className="px-6 md:px-16 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-8 md:p-12 relative overflow-hidden text-center"
            style={{ background: "rgba(99,102,241,0.05)", border: "1px solid rgba(99,102,241,0.12)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)" }} />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] rounded-full blur-[100px] opacity-[0.06] pointer-events-none" style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />

            <div className="relative z-10">
              <div className="text-xs font-bold tracking-[0.25em] text-indigo-400/70 mb-6 uppercase">{t.mission.label}</div>
              <p className="text-lg md:text-xl lg:text-2xl font-medium text-white/45 leading-relaxed">
                {t.mission.text}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
