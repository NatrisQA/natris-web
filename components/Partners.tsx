"use client";

import { useLang } from "./LangContext";
import { content } from "@/lib/i18n";
import { motion } from "framer-motion";

export default function Partners() {
  const { lang } = useLang();
  const t = content.partners[lang];

  // Marquee: double the list for seamless loop
  const marqueeItems = [...t.marquee, ...t.marquee];

  return (
    <section className="py-28 px-6" style={{ background: "#f7f7f7" }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-14">
          <div
            className="text-[11px] font-black tracking-[0.32em] mb-3"
            style={{ color: "var(--brand-red)" }}
          >
            {t.label}
          </div>
          <h2
            className="font-black tracking-tight mb-4"
            style={{ fontSize: "clamp(1.9rem, 4.2vw, 3rem)", color: "#111" }}
          >
            {t.headline}
          </h2>
          <p className="max-w-2xl mx-auto" style={{ fontSize: "15px", color: "#666" }}>
            {t.sub}
          </p>
        </div>

        {/* Marquee */}
        <div
          className="marquee-mask overflow-hidden py-6 mb-14 rounded-2xl"
          style={{ background: "#fff", border: "1px solid #ececec" }}
        >
          <div className="marquee-track">
            {marqueeItems.map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex items-center justify-center px-8 mx-2 rounded-xl"
                style={{
                  minWidth: 200,
                  height: 64,
                  background: "#fafafa",
                  border: "1px solid #ececec",
                  color: "#555",
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  fontSize: 13,
                }}
              >
                {name}
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {t.categories.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="rounded-xl p-5"
              style={{ background: "#fff", border: "1px solid #ececec" }}
            >
              <div
                className="text-[10.5px] font-black tracking-[0.2em] mb-2"
                style={{ color: "var(--brand-red)" }}
              >
                {c.name}
              </div>
              <div className="text-[13px] font-semibold" style={{ color: "#444" }}>
                {c.desc}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="mailto:contact@lulu.ai?subject=Partnership"
            className="inline-block px-7 py-3.5 rounded-full text-sm font-black"
            style={{ background: "var(--brand-red)", color: "#fff" }}
          >
            {t.cta} →
          </a>
        </div>
      </div>
    </section>
  );
}
