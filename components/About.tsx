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
      {/* ─── Section 1: Statement (fullscreen) ─── */}
      <div
        className="relative flex items-center justify-center"
        style={{ minHeight: "100dvh" }}
      >
        {/* Subtle bg */}
        <div className="absolute inset-0 opacity-[0.012] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "100px 100px" }} />

        <div className="px-6 md:px-16 max-w-6xl mx-auto w-full py-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.3em] text-white/25 mb-10 md:mb-14 uppercase"
          >
            {t.label}
          </motion.div>

          {/* Large statement — each line fades in */}
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
                  className="font-black text-white block leading-[1.1] mb-2"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
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
            <div className="w-12 h-px bg-white/10 mb-8" />
            <p className="text-base md:text-xl text-white/35 leading-relaxed">
              {t.body}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ─── Section 2: Numbers ─── */}
      <div className="relative py-28 md:py-40">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, transparent, rgba(16,185,129,0.02) 50%, transparent)" }} />

        <div className="px-6 md:px-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-0">
            {t.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="text-center py-8 md:py-12 relative"
              >
                {/* Vertical dividers */}
                {i > 0 && (
                  <div className="absolute left-0 top-[20%] bottom-[20%] w-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                )}
                <div className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-3 tracking-tight">
                  <Counter value={stat.value} />
                </div>
                <div className="text-[11px] md:text-xs text-white/25 tracking-wider uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Section 3: Values ─── */}
      <div className="relative py-28 md:py-40">
        <div className="px-6 md:px-16 max-w-6xl mx-auto">
          {t.values.map((val, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="grid md:grid-cols-[120px_1fr] gap-4 md:gap-12 items-baseline py-10 md:py-14"
              style={{ borderBottom: i < t.values.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
            >
              <span className="text-[56px] md:text-[72px] font-black leading-none text-white/[0.04]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h4 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">{val.title}</h4>
                <p className="text-sm md:text-base text-white/30 leading-relaxed max-w-lg whitespace-pre-line">{val.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── Section 4: Timeline ─── */}
      <div className="relative py-28 md:py-40">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, transparent, rgba(99,102,241,0.015) 50%, transparent)" }} />

        <div className="px-6 md:px-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.3em] text-white/25 mb-16 md:mb-20 uppercase"
          >
            MILESTONES
          </motion.div>

          <div className="grid md:grid-cols-4 gap-0">
            {t.milestones.map((ms, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.1 }}
                className="relative py-6 md:py-0 md:pr-8"
              >
                {/* Top line */}
                <div className="w-full h-px mb-6" style={{ background: `linear-gradient(90deg, rgba(255,255,255,${i === t.milestones.length - 1 ? "0.15" : "0.06"}), rgba(255,255,255,0.06))` }} />

                {/* Dot */}
                <div
                  className="w-2 h-2 rounded-full mb-5"
                  style={{
                    background: i === t.milestones.length - 1 ? "#6366f1" : "rgba(255,255,255,0.12)",
                    boxShadow: i === t.milestones.length - 1 ? "0 0 10px rgba(99,102,241,0.5)" : "none",
                  }}
                />

                <div className="text-xs text-white/20 tracking-wider mb-2">{ms.date}</div>
                <div className="text-sm md:text-base font-medium text-white/60">{ms.text}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Section 5: Mission (fullscreen statement) ─── */}
      <div
        className="relative flex items-center justify-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[200px] opacity-[0.04]" style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />
        </div>

        <div className="px-6 md:px-16 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.3em] text-white/20 mb-10 uppercase"
          >
            {t.mission.label}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl lg:text-3xl font-medium text-white/50 leading-relaxed"
          >
            {t.mission.text}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
