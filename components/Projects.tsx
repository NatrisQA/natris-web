"use client";

import { useLang } from "./LangContext";
import { content } from "@/lib/i18n";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const AXIS_COLOR: Record<string, string> = {
  game: "#e63946",
  community: "#ff8c42",
  tech: "#00a3cc",
};
const AXIS_LABEL: Record<string, string> = {
  game: "GAME",
  community: "COMMUNITY",
  tech: "TECH",
};

/* ── Service icon ── */
function IconLogo({ id, color, size = 48 }: { id: string; color: string; size?: number }) {
  const c = color;
  const icons: Record<string, React.ReactNode> = {
    pokerlulu: (
      <div style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative", borderRadius: 8 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-pokerlulu.png"
          alt="PokerLulu"
          style={{
            position: "absolute",
            width: "auto",
            height: "185%",
            top: "-8%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </div>
    ),
    linkplay: (
      <svg viewBox="0 0 40 40" fill="none">
        <rect x="5" y="12" width="20" height="16" rx="3" fill={`${c}22`} stroke={`${c}70`} strokeWidth="1.4" />
        <path d="M11 16 L11 24 L20 20 Z" fill={c} />
        <circle cx="28" cy="14" r="3" fill={c} />
        <path d="M30 8 Q38 20 30 32" stroke={`${c}55`} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </svg>
    ),
    moitto: (
      <svg viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="14" r="6" fill={`${c}55`} stroke={c} strokeWidth="1.2" />
        <circle cx="10" cy="16" r="5" fill={`${c}35`} />
        <circle cx="30" cy="16" r="5" fill={`${c}35`} />
        <path d="M12 32 Q20 22 28 32" fill={`${c}55`} />
        <path d="M4 32 Q10 26 16 32" fill={`${c}30`} />
        <path d="M24 32 Q30 26 36 32" fill={`${c}30`} />
      </svg>
    ),
    tubelulu: (
      <svg viewBox="0 0 40 40" fill="none">
        <rect x="6" y="10" width="28" height="20" rx="4" fill={`${c}22`} stroke={c} strokeWidth="1.4" />
        <path d="M18 16 L18 24 L26 20 Z" fill={c} />
        <circle cx="10" cy="32" r="2" fill={`${c}99`} />
        <circle cx="16" cy="32" r="2" fill={`${c}66`} />
      </svg>
    ),
    shuffleup: (
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M13 7 L27 7 L25 21 Q20 25 20 25 Q20 25 15 21 Z" fill={`${c}30`} stroke={c} strokeWidth="1.4" />
        <text x="20" y="20" fontSize="11" textAnchor="middle" fill={c} fontFamily="sans-serif">★</text>
        <rect x="12" y="31" width="16" height="4" rx="2" fill={c} />
      </svg>
    ),
    gtolulu: (
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M6 32 L14 18 L20 24 L28 10 L34 32" stroke={c} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="14" cy="18" r="2.5" fill={c} />
        <circle cx="20" cy="24" r="2.5" fill={c} />
        <circle cx="28" cy="10" r="2.5" fill={c} />
        <text x="20" y="37" fontSize="6" textAnchor="middle" fill={`${c}dd`} fontWeight="800" fontFamily="sans-serif">GTO</text>
      </svg>
    ),
  };
  return (
    <div style={{ width: size, height: size, flexShrink: 0 }}>
      {icons[id] ?? (
        <svg viewBox="0 0 40 40" fill="none">
          <rect x="4" y="4" width="32" height="32" rx="8" fill={`${c}28`} />
          <text x="20" y="27" fontSize="18" textAnchor="middle" fill={c} fontWeight="bold" fontFamily="sans-serif">
            {id[0].toUpperCase()}
          </text>
        </svg>
      )}
    </div>
  );
}

export default function Projects() {
  const { lang } = useLang();
  const items = content.products.items;
  const headline = content.products.headline[lang];
  const sub = content.products.sub[lang];
  const label = content.products.label[lang];

  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [centerId, setCenterId] = useState<string | null>(null);

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  /* Track which card is closest to the scroller center — used for mobile active state */
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const pickCenter = () => {
      const cards = Array.from(scroller.querySelectorAll<HTMLElement>("[data-card]"));
      if (cards.length === 0) return;
      const scRect = scroller.getBoundingClientRect();
      const scCenter = scRect.left + scRect.width / 2;
      let bestId = "";
      let bestDist = Infinity;
      for (const c of cards) {
        const r = c.getBoundingClientRect();
        const cCenter = r.left + r.width / 2;
        const dist = Math.abs(cCenter - scCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = c.dataset.id || "";
        }
      }
      if (bestId) setCenterId(bestId);
    };

    pickCenter();
    scroller.addEventListener("scroll", pickCenter, { passive: true });
    window.addEventListener("resize", pickCenter);
    return () => {
      scroller.removeEventListener("scroll", pickCenter);
      window.removeEventListener("resize", pickCenter);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="py-28 px-6" style={{ background: "#fff" }}>
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
          <div>
            <div className="text-[11px] font-black tracking-[0.32em] mb-3" style={{ color: "var(--brand-red)" }}>
              {label}
            </div>
            <h2 className="font-black tracking-tight mb-3" style={{ fontSize: "clamp(1.9rem, 4.2vw, 3rem)", color: "#111" }}>
              {headline}
            </h2>
            <p className="max-w-2xl leading-relaxed" style={{ fontSize: "15px", color: "#666" }}>
              {sub}
            </p>
          </div>

          {/* Prev/Next */}
          <div className="flex gap-2">
            <button
              onClick={() => scrollBy(-1)}
              disabled={atStart}
              aria-label="Previous"
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all"
              style={{
                background: "#fff",
                border: "1px solid #dcdcdc",
                color: "#111",
                opacity: atStart ? 0.3 : 1,
                cursor: atStart ? "default" : "pointer",
              }}
            >
              ←
            </button>
            <button
              onClick={() => scrollBy(1)}
              disabled={atEnd}
              aria-label="Next"
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all"
              style={{
                background: "#111",
                color: "#fff",
                opacity: atEnd ? 0.3 : 1,
                cursor: atEnd ? "default" : "pointer",
              }}
            >
              →
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollerRef}
          className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory"
          style={{ scrollPaddingLeft: 0 }}
        >
          {items.map((p, i) => {
            const axis = (p as typeof p & { axis: "game" | "community" | "tech" }).axis;
            const axisColor = AXIS_COLOR[axis];
            const axisLabel = AXIS_LABEL[axis];
            const isActive = (hoveredId ?? centerId) === p.id;
            return (
              <motion.article
                key={p.id}
                data-card
                data-id={p.id}
                data-active={isActive || undefined}
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId((h) => (h === p.id ? null : h))}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className="rounded-2xl flex-shrink-0 snap-start p-7 flex flex-col relative overflow-hidden"
                style={{
                  background: "#fff",
                  border: `1px solid ${isActive ? `${p.color}80` : "#ececec"}`,
                  width: "min(88vw, 340px)",
                  minHeight: 420,
                  boxShadow: isActive
                    ? `0 24px 60px ${p.color}30, 0 10px 28px rgba(0,0,0,0.08)`
                    : "0 2px 8px rgba(0,0,0,0.03)",
                  transform: isActive ? "translateY(-6px)" : "translateY(0)",
                  transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.3s ease",
                  cursor: "pointer",
                }}
              >
                {/* Corner glow (active only) */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.4s ease",
                    background: `radial-gradient(600px circle at 0% 0%, ${p.color}14, transparent 40%), radial-gradient(600px circle at 100% 100%, ${axisColor}10, transparent 40%)`,
                  }}
                />

                {/* Axis badge + status */}
                <div className="flex items-center justify-between mb-6 relative">
                  <span
                    className="text-[10px] font-black tracking-[0.16em] px-2.5 py-1 rounded-full"
                    style={{
                      background: isActive ? axisColor : `${axisColor}15`,
                      color: isActive ? "#fff" : axisColor,
                      border: `1px solid ${isActive ? axisColor : `${axisColor}40`}`,
                      transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease",
                    }}
                  >
                    {axisLabel}
                  </span>
                  <span className="text-[11px] font-bold" style={{ color: isActive ? "#111" : "#999", transition: "color 0.3s ease" }}>
                    {p.status[lang]}
                  </span>
                </div>

                {/* Icon + name */}
                <div className="flex items-center gap-3 mb-4 relative">
                  <div
                    style={{
                      transform: isActive ? "scale(1.08) rotate(-2deg)" : "scale(1) rotate(0)",
                      transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    <IconLogo id={p.id} color={p.color} size={44} />
                  </div>
                  <div>
                    <h3
                      className="text-lg font-black leading-none mb-1"
                      style={{
                        color: isActive ? p.color : "#111",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {p.name}
                    </h3>
                    <div className="text-[11px] font-semibold" style={{ color: "#888" }}>
                      {p.tag[lang]}
                    </div>
                  </div>
                </div>

                <p className="text-[14px] leading-relaxed flex-1 mb-5 relative" style={{ color: isActive ? "#333" : "#555", transition: "color 0.3s ease" }}>
                  {p.desc[lang]}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 relative">
                  {p.badges[lang].slice(0, 3).map((b) => (
                    <span
                      key={b}
                      className="text-[10.5px] font-semibold px-2 py-1 rounded"
                      style={{
                        background: isActive ? `${p.color}12` : "#f5f5f5",
                        color: isActive ? p.color : "#555",
                        transition: "background 0.3s ease, color 0.3s ease",
                      }}
                    >
                      #{b}
                    </span>
                  ))}
                </div>

                {/* Service color accent bar — grows on active */}
                <div
                  className="rounded-full mt-5 relative"
                  style={{
                    height: isActive ? 3 : 1.5,
                    background: `linear-gradient(90deg, ${p.color}, ${p.color}55)`,
                    boxShadow: isActive ? `0 0 14px ${p.color}70` : "none",
                    transition: "height 0.35s ease, box-shadow 0.35s ease",
                  }}
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
