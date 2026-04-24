"use client";

import { useLang } from "./LangContext";
import { content } from "@/lib/i18n";
import { motion } from "framer-motion";
import Image from "next/image";

export default function News() {
  const { lang } = useLang();
  const t = content.news;
  const items = t.items.slice(0, 3);

  return (
    <section className="py-28 px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32" style={{ background: "#08080f" }}>
      <div className="max-w-[1680px] mx-auto">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="text-[11px] font-black tracking-[0.32em] mb-3" style={{ color: "#ff5a6a" }}>
              {t.label[lang]}
            </div>
            <h2
              className="font-black tracking-tight mb-3"
              style={{ fontSize: "clamp(2rem, 5.2vw, 4.2rem)", color: "#f5f5f7", lineHeight: 1.15 }}
            >
              {t.headline[lang]}
            </h2>
            <p style={{ fontSize: "clamp(15px, 1.35vw, 19px)", color: "rgba(255,255,255,0.62)" }}>{t.sub[lang]}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="light-card rounded-2xl overflow-hidden flex flex-col"
              style={{ background: "#14141f", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {/* Visual area */}
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "16 / 9", background: "#0a0a12" }}
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title[lang]}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={item.date === "2026.05" ? { transform: "scale(1.3)" } : undefined}
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center relative"
                    style={{ background: `${item.color}18` }}
                  >
                    <svg viewBox="0 0 160 90" fill="none" className="w-3/4 h-3/4 opacity-80">
                      <circle cx="50" cy="45" r="22" stroke={item.color} strokeWidth="1" strokeDasharray="4 3" />
                      <circle cx="110" cy="45" r="16" stroke={item.color} strokeWidth="1" />
                      <line x1="72" y1="45" x2="94" y2="45" stroke={item.color} strokeWidth="0.8" strokeDasharray="3 3" />
                      <circle cx="80" cy="25" r="6" fill={`${item.color}40`} />
                    </svg>
                    <span
                      className="absolute top-3 left-3 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
                      style={{
                        background: "rgba(10,10,18,0.75)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        color: item.color,
                        border: `1px solid ${item.color}60`,
                      }}
                    >
                      {item.category[lang]}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col gap-2 flex-1">
                <span className="text-[11px] font-bold" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {item.date}
                </span>
                <h3 className="text-base font-black leading-snug" style={{ color: "#f5f5f7" }}>
                  {item.title[lang]}
                </h3>
                <p className="text-[13px] leading-relaxed line-clamp-3 whitespace-pre-line" style={{ color: "rgba(255,255,255,0.62)" }}>
                  {item.desc[lang]}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
