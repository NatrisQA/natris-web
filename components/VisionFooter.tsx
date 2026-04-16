"use client";

import { useLang } from "./LangContext";
import { content } from "@/lib/i18n";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function VisionFooter() {
  const { lang } = useLang();
  const tv = content.vision[lang];
  const tf = content.footer[lang];
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-35, 35]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.96]);

  return (
    <section
      ref={ref}
      id="vision"
      className="relative overflow-hidden flex flex-col"
      style={{ height: "100dvh", scrollSnapAlign: "start" }}
    >
      {/* Parallax orbs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute left-1/4 top-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.11] pointer-events-none"
        aria-hidden
      >
        <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />
      </motion.div>
      <motion.div
        style={{ y: y2 }}
        className="absolute right-1/4 bottom-1/4 w-[380px] h-[380px] rounded-full blur-[140px] opacity-[0.09] pointer-events-none"
        aria-hidden
      >
        <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, #ec4899, transparent)" }} />
      </motion.div>

      {/* Grid + vignette */}
      <div className="absolute inset-0 opacity-[0.022] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 55% at 50% 50%, transparent 25%, #050508 100%)" }} />

      {/* Vision — centered, takes most of space */}
      <motion.div
        style={{ scale }}
        className="relative flex-1 flex flex-col items-center justify-center text-center px-6 pt-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-semibold tracking-[0.25em] text-violet-400 mb-6 uppercase"
        >
          {tv.label}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-black text-white leading-tight mb-8 whitespace-pre-line"
          style={{
            fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
            background: "linear-gradient(135deg, #fff 0%, #a5b4fc 55%, #ec4899 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {tv.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-xl text-white/42 leading-relaxed max-w-2xl"
        >
          {tv.body}
        </motion.p>
      </motion.div>

      {/* Footer strip */}
      <div className="relative px-8 md:px-16 py-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {/* top glow line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.45), transparent)" }} />

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand + links */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black text-white" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 0 10px rgba(99,102,241,0.45)" }}>L</div>
              <span className="text-white/70 text-sm font-semibold">{tf.company}</span>
            </div>
            <div className="hidden md:flex items-center gap-4">
              {tf.links.map((l) => (
                <a key={l.label} href={l.href} className="text-xs text-white/28 hover:text-white/60 transition-colors duration-200">{l.label}</a>
              ))}
            </div>
          </div>

          {/* Contact + rights */}
          <div className="flex items-center gap-6">
            <a href={`mailto:${tf.contact}`} className="text-xs text-white/35 hover:text-white/65 transition-colors duration-200">{tf.contact}</a>
            <span className="text-xs text-white/18">{tf.rights}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
