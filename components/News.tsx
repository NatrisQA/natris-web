"use client";

import { useLang } from "./LangContext";
import { content } from "@/lib/i18n";
import { motion } from "framer-motion";
import Image from "next/image";

export default function News() {
  const { lang } = useLang();
  const t = content.news;
  const items = t.items;

  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "100dvh" }}
    >
      {/* Background */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[200px] opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(circle, #6366f1, transparent)" }}
      />
      <div
        className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full blur-[160px] opacity-[0.05] pointer-events-none"
        style={{ background: "radial-gradient(circle, #06b6d4, transparent)" }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.018] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="h-full flex flex-col px-5 md:px-16 pt-28 pb-12 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.25em] text-cyan-400 mb-4 uppercase"
          >
            {t.label[lang]}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="font-black text-white leading-tight"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
          >
            {t.headline[lang]}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="text-white/35 text-sm md:text-base mt-3"
          >
            {t.sub[lang]}
          </motion.p>
        </div>

        {/* Cards */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 content-start">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-2xl overflow-hidden flex flex-col cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Image area / placeholder */}
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "16 / 10" }}
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title[lang]}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  /* Placeholder with abstract pattern */
                  <div
                    className="w-full h-full flex items-center justify-center relative"
                    style={{ background: `${item.color}0a` }}
                  >
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        background: `radial-gradient(ellipse at 30% 40%, ${item.color}18, transparent 60%), radial-gradient(ellipse at 70% 70%, ${item.color}10, transparent 50%)`,
                      }}
                    />
                    {/* Abstract shapes */}
                    <svg viewBox="0 0 160 100" fill="none" className="w-3/4 h-3/4 opacity-20">
                      <circle cx="40" cy="50" r="25" stroke={item.color} strokeWidth="1" strokeDasharray="4 3" />
                      <circle cx="120" cy="50" r="18" stroke={item.color} strokeWidth="1" />
                      <line x1="65" y1="50" x2="102" y2="50" stroke={item.color} strokeWidth="0.8" strokeDasharray="3 3" />
                      <circle cx="80" cy="30" r="8" fill={`${item.color}20`} />
                    </svg>
                    {/* Category pill on image */}
                    <span
                      className="absolute top-3 left-3 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
                      style={{ background: `${item.color}20`, color: item.color, border: `1px solid ${item.color}30` }}
                    >
                      {item.category[lang]}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 p-4 md:p-5 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-white/40">{item.date}</span>
                </div>
                <h3 className="text-sm md:text-base font-bold text-white leading-snug group-hover:text-cyan-200 transition-colors duration-300">
                  {item.title[lang]}
                </h3>
                <p className="text-xs text-white/35 leading-relaxed line-clamp-3">
                  {item.desc[lang]}
                </p>
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
                style={{ background: `linear-gradient(135deg, ${item.color}08, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
