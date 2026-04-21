"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  { id: "hero",     label: { ko: "홈",      en: "Home" } },
  { id: "axes",     label: { ko: "3축",     en: "Axes" } },
  { id: "products", label: { ko: "서비스",  en: "Services" } },
  { id: "about",    label: { ko: "소개",    en: "About" } },
  { id: "news",     label: { ko: "소식",    en: "News" } },
];

export default function ScrollDots({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const container = document.getElementById("scroll-container");
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = SECTIONS.findIndex((s) => s.id === entry.target.id);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { root: container, threshold: 0.4 }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const container = document.getElementById("scroll-container");
    const target = document.getElementById(id);
    if (!container || !target) return;
    const offset = id === "hero" ? 0 : 72;
    container.scrollTo({ top: target.offsetTop - offset, behavior: "smooth" });
  };

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3">
      <div
        className="absolute right-[7px] top-3 bottom-3 w-px pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.18), transparent)" }}
      />

      {SECTIONS.map((s, i) => {
        const isActive = active === i;
        const isHovered = hovered === i;

        return (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="relative flex items-center gap-2.5 justify-end"
            aria-label={s.label[lang]}
          >
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  transition={{ duration: 0.18 }}
                  className="text-[11px] font-bold whitespace-nowrap"
                  style={{ color: isActive ? "#ff5a6a" : "rgba(255,255,255,0.72)" }}
                >
                  {s.label[lang]}
                </motion.span>
              )}
            </AnimatePresence>

            <motion.div
              animate={{
                scale: isActive ? 1 : isHovered ? 0.85 : 0.6,
                opacity: isActive ? 1 : isHovered ? 0.8 : 0.35,
              }}
              transition={{ duration: 0.2 }}
              className="rounded-full flex-shrink-0"
              style={{
                width: 8,
                height: 8,
                background: isActive ? "#ff5a6a" : "rgba(255,255,255,0.5)",
                boxShadow: isActive ? "0 0 0 4px rgba(255,90,106,0.2)" : "none",
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
