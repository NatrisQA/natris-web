"use client";

import { useLang } from "./LangContext";
import { content } from "@/lib/i18n";
import { motion } from "framer-motion";

export default function About() {
  const { lang } = useLang();
  const t = content.about[lang];

  return (
    <section className="py-28 px-6" style={{ background: "#fafafa" }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="text-[11px] font-black tracking-[0.32em] mb-4"
            style={{ color: "var(--brand-red)" }}
          >
            {t.label}
          </div>
          <h2
            className="font-black tracking-tight mb-6 whitespace-pre-line"
            style={{ fontSize: "clamp(1.9rem, 4.2vw, 3rem)", color: "#111", lineHeight: 1.2 }}
          >
            {t.headline}
          </h2>
          <p
            className="max-w-3xl mx-auto leading-relaxed"
            style={{ fontSize: "clamp(14px, 1.2vw, 16px)", color: "#666" }}
          >
            {t.body}
          </p>
        </div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl p-8 md:p-10 mb-20 max-w-3xl mx-auto"
          style={{ background: "#fff", border: "1px solid #ececec", boxShadow: "0 2px 12px rgba(0,0,0,0.03)" }}
        >
          <div
            className="text-[11px] font-black tracking-[0.28em] mb-4"
            style={{ color: "var(--axis-community)" }}
          >
            {t.mission.label}
          </div>
          <p
            className="whitespace-pre-line font-bold leading-relaxed"
            style={{ fontSize: "clamp(17px, 1.8vw, 22px)", color: "#222" }}
          >
            {t.mission.text}
          </p>
        </motion.div>

        {/* History Timeline (vertical) */}
        <div className="max-w-2xl mx-auto">
          <div
            className="text-[11px] font-black tracking-[0.28em] mb-10 text-center"
            style={{ color: "#999" }}
          >
            HISTORY
          </div>
          <div className="relative">
            <div
              className="absolute left-[7px] top-2 bottom-2 w-px"
              style={{ background: "#e5e5e5" }}
            />
            {t.milestones.map((ms, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="relative pl-10 pb-8 last:pb-0"
              >
                <div
                  className="absolute left-0 top-1 w-[15px] h-[15px] rounded-full"
                  style={{
                    background: i === t.milestones.length - 1 ? "var(--brand-red)" : "#fff",
                    border: `2px solid ${i === t.milestones.length - 1 ? "var(--brand-red)" : "#ccc"}`,
                  }}
                />
                <div
                  className="text-[11px] font-black tracking-[0.12em] mb-1"
                  style={{ color: i === t.milestones.length - 1 ? "var(--brand-red)" : "#999" }}
                >
                  {ms.date}
                </div>
                <div className="text-[15px] font-bold" style={{ color: "#111" }}>
                  {ms.text}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
