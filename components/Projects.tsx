"use client";

import { useLang } from "./LangContext";
import { content } from "@/lib/i18n";
import { motion } from "framer-motion";
import Link from "next/link";
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

/* When real hero images arrive, drop them under /public/images/{id}/hero.{ext}
   and set the path here. Abstract SVG fallback is rendered otherwise. */
const HERO_IMAGES: Record<string, string | undefined> = {
  // pokerlulu: "/images/pokerlulu/hero.png",
  // linkplay: "/images/linkplay/hero.png",
  // moitto: "/images/moitto/hero.png",
  // shuffleup: "/images/shuffleup/hero.png",
  // tubelulu: "/images/tubelulu/hero.png",
  // gtolulu: "/images/gtolulu/hero.png",
};

/* ── Service visual (card top area) ── */
function ServiceVisual({ id, color, imageSrc }: { id: string; color: string; imageSrc?: string }) {
  if (imageSrc) {
    return (
      <div className="relative w-full" style={{ aspectRatio: "16 / 9", overflow: "hidden", background: "#f5f5f5" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageSrc} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
    );
  }

  const c = color;
  const patterns: Record<string, React.ReactNode> = {
    pokerlulu: (
      <svg viewBox="0 0 300 170" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <circle cx="220" cy="115" r="46" fill={`${c}22`} />
        <circle cx="220" cy="115" r="32" fill={`${c}3a`} />
        <circle cx="220" cy="115" r="18" fill={c} opacity="0.85" />
        <circle cx="262" cy="62" r="20" fill={`${c}32`} />
        <circle cx="176" cy="58" r="16" fill={`${c}50`} />
        <text x="48" y="90" fontSize="38" fill={`${c}aa`} fontWeight="900" fontFamily="serif">♠</text>
        <text x="92" y="128" fontSize="26" fill={`${c}66`} fontWeight="900" fontFamily="serif">♥</text>
      </svg>
    ),
    linkplay: (
      <svg viewBox="0 0 300 170" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <circle cx="72" cy="85" r="40" fill={`${c}18`} />
        <circle cx="72" cy="85" r="28" fill={`${c}28`} />
        <image href="/logos/linkplay.svg" x="48" y="61" width="48" height="48" preserveAspectRatio="xMidYMid meet" />
        <path d="M120 85 Q145 60, 170 85 T220 85" stroke={`${c}aa`} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M120 85 Q150 45, 180 85 T240 85" stroke={`${c}66`} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M120 85 Q155 30, 190 85 T260 85" stroke={`${c}35`} strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="258" cy="85" r="5" fill={c} />
      </svg>
    ),
    moitto: (
      <svg viewBox="0 0 300 170" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <circle cx="80" cy="65" r="18" fill={`${c}55`} />
        <circle cx="60" cy="100" r="16" fill={`${c}40`} />
        <circle cx="100" cy="100" r="16" fill={`${c}45`} />
        <path d="M38 148 Q80 110, 122 148 Z" fill={`${c}32`} />
        <circle cx="180" cy="55" r="14" fill={`${c}45`} />
        <circle cx="220" cy="75" r="20" fill={`${c}38`} />
        <circle cx="250" cy="50" r="12" fill={`${c}55`} />
        <path d="M160 148 Q220 105, 280 148 Z" fill={`${c}28`} />
      </svg>
    ),
    shuffleup: (
      <svg viewBox="0 0 300 170" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <path d="M30 40 L70 40 L70 70 L120 70" stroke={`${c}cc`} strokeWidth="2" fill="none" />
        <path d="M30 100 L70 100 L70 70" stroke={`${c}cc`} strokeWidth="2" fill="none" />
        <path d="M30 130 L60 130" stroke={`${c}70`} strokeWidth="2" fill="none" />
        <path d="M120 70 L180 70" stroke={c} strokeWidth="2.5" fill="none" />
        <path d="M228 58 L272 58 L266 92 Q250 104, 250 104 Q250 104, 234 92 Z" fill={`${c}30`} stroke={c} strokeWidth="1.6" />
        <text x="250" y="85" fontSize="16" textAnchor="middle" fill={c} fontWeight="900" fontFamily="sans-serif">★</text>
        <rect x="244" y="110" width="12" height="16" rx="1" fill={`${c}80`} />
        <rect x="236" y="128" width="28" height="4" rx="1" fill={c} />
      </svg>
    ),
    tubelulu: (
      <svg viewBox="0 0 300 170" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <rect x="34" y="38" width="140" height="88" rx="10" fill={`${c}18`} stroke={`${c}80`} strokeWidth="1.5" />
        <path d="M92 68 L92 96 L124 82 Z" fill={c} />
        <rect x="48" y="138" width="60" height="4" rx="2" fill={`${c}50`} />
        <rect x="48" y="148" width="40" height="3" rx="1.5" fill={`${c}35`} />
        <path d="M198 80 L204 60 L210 100 L216 50 L222 95 L228 65 L234 90 L240 58 L246 88 L252 70"
          stroke={`${c}bb`} strokeWidth="1.6" fill="none" strokeLinejoin="round" />
        <circle cx="224" cy="124" r="14" fill={`${c}25`} stroke={c} strokeWidth="1.5" />
        <path d="M220 118 L220 130 L232 124 Z" fill={c} />
      </svg>
    ),
    gtolulu: (
      <svg viewBox="0 0 300 170" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <line x1="40" y1="140" x2="280" y2="140" stroke={`${c}25`} strokeWidth="1" />
        <line x1="40" y1="30" x2="40" y2="140" stroke={`${c}25`} strokeWidth="1" />
        <line x1="40" y1="100" x2="280" y2="100" stroke={`${c}18`} strokeWidth="1" strokeDasharray="2 3" />
        <line x1="40" y1="65" x2="280" y2="65" stroke={`${c}18`} strokeWidth="1" strokeDasharray="2 3" />
        <path d="M40 120 L78 85 L118 98 L156 52 L196 68 L234 34 L272 50"
          stroke={c} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="78" cy="85" r="4" fill={c} />
        <circle cx="118" cy="98" r="4" fill={c} />
        <circle cx="156" cy="52" r="5" fill={c} />
        <circle cx="196" cy="68" r="4" fill={c} />
        <circle cx="234" cy="34" r="5" fill={c} />
        <rect x="226" y="108" width="46" height="22" rx="5" fill={`${c}18`} stroke={c} strokeWidth="1" />
        <text x="249" y="124" fontSize="11" textAnchor="middle" fill={c} fontWeight="900" fontFamily="sans-serif">AI</text>
      </svg>
    ),
  };

  return (
    <div
      className="relative w-full"
      style={{
        aspectRatio: "16 / 9",
        background: `linear-gradient(135deg, ${c}1c 0%, ${c}06 55%, #fafafa 100%)`,
        overflow: "hidden",
      }}
    >
      {patterns[id]}
    </div>
  );
}

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
      <div style={{ width: "100%", height: "100%", borderRadius: 8, overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logos/linkplay.svg"
          alt="LinkPlay"
          style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
        />
      </div>
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
                  minHeight: 540,
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

                {/* Hero visual (abstract graphic or image) */}
                <div
                  className="-mx-7 -mt-7 mb-6 relative"
                  style={{
                    transform: isActive ? "scale(1.02)" : "scale(1)",
                    transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
                    transformOrigin: "center top",
                  }}
                >
                  <ServiceVisual id={p.id} color={p.color} imageSrc={HERO_IMAGES[p.id]} />
                  {/* Bottom fade for smoother handoff to white card body */}
                  <div
                    aria-hidden
                    className="absolute left-0 right-0 bottom-0 pointer-events-none"
                    style={{ height: 28, background: "linear-gradient(to bottom, transparent, #fff)" }}
                  />
                </div>

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

                {/* "자세히 보기" button */}
                <Link
                  href={`/services/${p.id}`}
                  className="mt-5 inline-flex items-center justify-between w-full rounded-full py-2.5 px-4 text-[12.5px] font-black tracking-wide relative"
                  style={{
                    background: isActive ? p.color : "#fafafa",
                    color: isActive ? "#fff" : "#111",
                    border: `1px solid ${isActive ? p.color : "#e5e5e5"}`,
                    transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease",
                  }}
                >
                  <span>{lang === "ko" ? "자세히 보기" : "View Details"}</span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 22,
                      height: 22,
                      borderRadius: 999,
                      background: isActive ? "rgba(255,255,255,0.22)" : p.color,
                      color: "#fff",
                      fontSize: 12,
                      transform: isActive ? "translateX(3px)" : "translateX(0)",
                      transition: "transform 0.3s ease, background 0.3s ease",
                    }}
                  >
                    →
                  </span>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
