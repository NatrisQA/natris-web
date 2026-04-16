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
      style={{ height: "100dvh", scrollSnapAlign: "start" }}
    >
      {/* Orbs */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[170px] opacity-[0.08] pointer-events-none" style={{ background: "radial-gradient(circle, #10b981, transparent)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full blur-[150px] opacity-[0.05] pointer-events-none" style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

      <div className="h-full flex flex-col px-8 md:px-16 pt-28 pb-12 max-w-7xl mx-auto w-full">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-semibold tracking-[0.25em] text-emerald-400 mb-8 uppercase"
        >
          {t.label}
        </motion.div>

        {/* Main layout */}
        <div className="flex-1 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left: headline + body */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="font-black text-white leading-tight mb-6 whitespace-pre-line"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
            >
              {t.headline}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="text-white/48 text-base md:text-lg leading-relaxed"
            >
              {t.body}
            </motion.p>
          </div>

          {/* Right: stats + mission */}
          <div className="flex flex-col gap-4">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {t.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.08 * i + 0.28 }}
                  className="rounded-2xl p-5 text-center"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                  whileHover={{ scale: 1.04, background: "rgba(255,255,255,0.055)" }}
                >
                  <div className="text-2xl md:text-3xl font-black text-white mb-1">
                    <Counter value={stat.value} />
                  </div>
                  <div className="text-[11px] text-white/32 leading-snug">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.52 }}
              className="rounded-2xl p-6 relative overflow-hidden"
              style={{ background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.17)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent)" }} />
              <div className="text-xs font-bold tracking-[0.2em] text-indigo-400 mb-2.5 uppercase">{t.mission.label}</div>
              <p className="text-sm text-white/52 leading-relaxed">{t.mission.text}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
