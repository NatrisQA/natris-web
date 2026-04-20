"use client";

import { useLang } from "./LangContext";
import { content } from "@/lib/i18n";
import { motion } from "framer-motion";

export default function Axes() {
  const { lang } = useLang();
  const t = content.axes[lang];

  return (
    <section className="py-28 px-6" style={{ background: "#fff" }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <div className="text-[11px] font-black tracking-[0.32em] mb-4" style={{ color: "var(--brand-red)" }}>
            {t.label}
          </div>
          <h2
            className="font-black tracking-tight mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#111" }}
          >
            {t.headline}
          </h2>
          <p className="text-[15px]" style={{ color: "#666" }}>
            {t.sub}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-end">
          {t.items.map((axis, i) => {
            const isCommunity = axis.key === "community";
            return (
              <motion.div
                key={axis.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="light-card rounded-2xl p-7 relative"
                style={{
                  background: isCommunity ? axis.color : "#fff",
                  color: isCommunity ? "#fff" : "#111",
                  border: `1px solid ${isCommunity ? axis.color : "#ececec"}`,
                  transform: isCommunity ? "translateY(-16px)" : "none",
                  boxShadow: isCommunity
                    ? `0 20px 50px ${axis.color}55`
                    : "0 2px 12px rgba(0,0,0,0.03)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full mb-6 flex items-center justify-center font-black text-sm"
                  style={{
                    background: isCommunity ? "rgba(255,255,255,0.22)" : axis.color,
                    color: "#fff",
                  }}
                >
                  {i + 1}
                </div>

                <div
                  className="text-[11px] font-black tracking-[0.2em] mb-3"
                  style={{ color: isCommunity ? "rgba(255,255,255,0.85)" : axis.color }}
                >
                  {axis.name}
                </div>

                <h3 className="text-2xl font-black mb-3 leading-tight">{axis.title}</h3>

                <p
                  className="text-[14px] leading-relaxed mb-6"
                  style={{ color: isCommunity ? "rgba(255,255,255,0.88)" : "#666" }}
                >
                  {axis.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {axis.services.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                      style={{
                        background: isCommunity ? "rgba(255,255,255,0.2)" : "#f2f2f2",
                        color: isCommunity ? "#fff" : "#444",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-[13px] mt-10" style={{ color: "#999" }}>
          {lang === "ko"
            ? "각 서비스는 하나의 축에만 속하지 않고, 세 축의 교차점에 존재합니다."
            : "Each service sits not on a single axis, but at the intersection of all three."}
        </p>
      </div>
    </section>
  );
}
