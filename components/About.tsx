"use client";

import { useLang } from "./LangContext";
import { content } from "@/lib/i18n";
import { motion } from "framer-motion";

export default function About() {
  const { lang } = useLang();
  const t = content.about[lang];

  return (
    <section className="py-28 px-6" style={{ background: "#0a0a12" }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="text-[11px] font-black tracking-[0.32em] mb-4"
            style={{ color: "#ff5a6a" }}
          >
            {t.label}
          </div>
          <h2
            className="font-black tracking-tight mb-6 whitespace-pre-line"
            style={{ fontSize: "clamp(1.9rem, 4.2vw, 3rem)", color: "#f5f5f7", lineHeight: 1.2 }}
          >
            {t.headline}
          </h2>
          <p
            className="max-w-3xl mx-auto leading-relaxed"
            style={{ fontSize: "clamp(14px, 1.2vw, 16px)", color: "rgba(255,255,255,0.62)" }}
          >
            {t.body}
          </p>
        </div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 max-w-3xl mx-auto text-center"
        >
          <p
            className="whitespace-pre-line font-black tracking-tight"
            style={{ fontSize: "clamp(20px, 2.4vw, 30px)", color: "#f5f5f7", lineHeight: 1.4 }}
          >
            {t.mission.text}
          </p>
        </motion.div>

        {/* History Timeline (vertical) */}
        <div className="max-w-2xl mx-auto">
          <div
            className="text-[11px] font-black tracking-[0.28em] mb-10 text-center"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            HISTORY
          </div>
          <div className="relative">
            <div
              className="absolute left-[7px] top-2 bottom-2 w-px"
              style={{ background: "rgba(255,255,255,0.12)" }}
            />
            {t.milestones.map((ms, i) => {
              const isLast = i === t.milestones.length - 1;
              return (
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
                      background: isLast ? "#ff5a6a" : "#14141f",
                      border: `2px solid ${isLast ? "#ff5a6a" : "rgba(255,255,255,0.22)"}`,
                      boxShadow: isLast ? "0 0 0 4px rgba(255,90,106,0.18)" : "none",
                    }}
                  />
                  <div
                    className="text-[11px] font-black tracking-[0.12em] mb-1"
                    style={{ color: isLast ? "#ff5a6a" : "rgba(255,255,255,0.4)" }}
                  >
                    {ms.date}
                  </div>
                  <div className="text-[15px] font-bold" style={{ color: "#f5f5f7" }}>
                    {ms.text}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
