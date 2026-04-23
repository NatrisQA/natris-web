"use client";

import { useLang } from "./LangContext";
import { content } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

export type FeatureIconRenderer = (args: {
  serviceId: string;
  featureIndex: number;
  color: string;
}) => ReactNode;

export const FeatureIconContext = createContext<FeatureIconRenderer | null>(null);

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
type ServiceVideo = { src: string; startTime?: number };
const SERVICE_VIDEO: Record<string, ServiceVideo> = {
  linkplay: { src: "/videos/linkplay-play.mp4", startTime: 2 },
  pokerlulu: { src: "/videos/pokerlulu-onoff-event.mp4" },
};
const DEFAULT_VIDEO: ServiceVideo = { src: "/videos/pokerlulu-onoff-event.mp4" };

/* ── Service icon (small) ── */
function IconLogo({ id, color, size = 36 }: { id: string; color: string; size?: number }) {
  const c = color;
  const icons: Record<string, React.ReactNode> = {
    pokerlulu: (
      <div style={{ width: "100%", height: "100%", borderRadius: 8, overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logos/pokerlulu.svg"
          alt="PokerLulu"
          style={{ width: "100%", height: "100%", display: "block", objectFit: "contain" }}
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
    tubelulu: (
      <svg viewBox="0 0 40 40" fill="none">
        <rect x="6" y="10" width="28" height="20" rx="4" fill={`${c}22`} stroke={c} strokeWidth="1.4" />
        <path d="M18 16 L18 24 L26 20 Z" fill={c} />
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
  const renderFeatureIcon = useContext(FeatureIconContext);

  const [activeIdx, setActiveIdx] = useState(0);
  const active = items[activeIdx];
  const axis = (active as typeof active & { axis: "game" | "community" | "tech" }).axis;
  const axisColor = AXIS_COLOR[axis];
  const axisLabel = AXIS_LABEL[axis];
  const activeVideo = SERVICE_VIDEO[active.id] ?? DEFAULT_VIDEO;
  const videoStart = activeVideo.startTime ?? 0;
  const seekToStart = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    if (videoStart > 0) {
      try { v.currentTime = videoStart; } catch { /* noop */ }
    }
    v.play().catch(() => {});
  };

  /* Auto-rotate every 6s, pause on hover */
  const hoveringRef = useRef(false);
  useEffect(() => {
    const timer = setInterval(() => {
      if (!hoveringRef.current) {
        setActiveIdx((prev) => (prev + 1) % items.length);
      }
    }, 6000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <section className="relative py-0 overflow-hidden" style={{ background: "#08080f" }}>
      {/* ── Background video (full-bleed, loops for all projects) ── */}
      <div className="absolute inset-0 z-0">
        <video
          key={`bg-${active.id}`}
          src={activeVideo.src}
          autoPlay
          muted
          playsInline
          onLoadedMetadata={seekToStart}
          onEnded={seekToStart}
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover", opacity: 0.18 }}
        />
        {/* Color overlay tinted to active service */}
        <div
          className="absolute inset-0 transition-colors duration-700"
          style={{ background: `linear-gradient(135deg, ${active.color}18 0%, transparent 50%, #08080f 100%)` }}
        />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: "linear-gradient(to bottom, transparent, #08080f)" }} />
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-24" style={{ background: "linear-gradient(to top, transparent, #08080f)" }} />
      </div>

      <div
        className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-28 md:py-36"
        onMouseEnter={() => { hoveringRef.current = true; }}
        onMouseLeave={() => { hoveringRef.current = false; }}
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="text-[11px] font-black tracking-[0.32em]" style={{ color: "#ff5a6a" }}>
            {label}
          </div>
        </motion.div>

        {/* Main content: Tab list (left) + Active detail (right) */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-start">

          {/* ── Left: Service tab list ── */}
          <div className="w-full lg:w-[340px] flex-shrink-0">
            <div className="flex flex-col gap-1">
              {items.map((p, i) => {
                const isActive = i === activeIdx;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActiveIdx(i)}
                    className="relative w-full text-left rounded-xl px-5 py-4 transition-all duration-300 group"
                    style={{
                      background: isActive ? `${p.color}15` : "transparent",
                      border: `1px solid ${isActive ? `${p.color}40` : "transparent"}`,
                    }}
                  >
                    {/* Active indicator bar */}
                    <div
                      className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full transition-all duration-300"
                      style={{
                        background: isActive ? p.color : "transparent",
                        boxShadow: isActive ? `0 0 12px ${p.color}88` : "none",
                      }}
                    />
                    <div className="flex items-center gap-3">
                      <IconLogo id={p.id} color={p.color} size={32} />
                      <div className="flex-1 min-w-0">
                        <div
                          className="text-[15px] font-black truncate transition-colors duration-300"
                          style={{ color: isActive ? "#f5f5f7" : "rgba(255,255,255,0.45)" }}
                        >
                          {p.name}
                        </div>
                        <div
                          className="text-[11px] truncate transition-colors duration-300"
                          style={{ color: isActive ? `${p.color}cc` : "rgba(255,255,255,0.25)" }}
                        >
                          {p.tag[lang]}
                        </div>
                      </div>
                      {/* Status */}
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 transition-all duration-300"
                        style={{
                          background: isActive ? `${p.color}22` : "rgba(255,255,255,0.05)",
                          color: isActive ? p.color : "rgba(255,255,255,0.3)",
                        }}
                      >
                        {p.status[lang]}
                      </span>
                    </div>

                    {/* Progress bar (auto-rotate indicator) */}
                    {isActive && (
                      <div className="absolute bottom-0 left-5 right-5 h-[2px] rounded-full overflow-hidden" style={{ background: `${p.color}20` }}>
                        <motion.div
                          key={`progress-${i}`}
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 6, ease: "linear" }}
                          style={{ height: "100%", background: p.color, borderRadius: 999 }}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Right: Active project detail ── */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl overflow-hidden relative"
                style={{
                  background: "#14141f",
                  border: `1px solid ${active.color}30`,
                  boxShadow: `0 40px 80px ${active.color}15, 0 0 120px ${active.color}08`,
                }}
              >
                {/* Video section inside card */}
                <div className="relative" style={{ aspectRatio: "21 / 9", overflow: "hidden" }}>
                  <video
                    key={active.id}
                    src={activeVideo.src}
                    autoPlay
                    muted
                    playsInline
                    onLoadedMetadata={seekToStart}
                    onEnded={seekToStart}
                    className="absolute inset-0 w-full h-full"
                    style={{ objectFit: "cover" }}
                  />
                  {/* Service color gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, #14141f 0%, ${active.color}18 30%, transparent 60%)`,
                    }}
                  />
                  {/* Service logo overlay on video */}
                  <div className="absolute bottom-6 left-8 right-8 flex items-end justify-between">
                    <div>
                      <span
                        className="text-[10px] font-black tracking-[0.16em] px-2.5 py-1 rounded-full inline-block mb-3"
                        style={{
                          background: axisColor,
                          color: "#fff",
                        }}
                      >
                        {axisLabel}
                      </span>
                      <h3
                        className="font-black"
                        style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#fff", lineHeight: 1.1, textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}
                      >
                        {active.name}
                      </h3>
                      <div className="text-[13px] font-semibold mt-1" style={{ color: `${active.color}dd` }}>
                        {active.tag[lang]}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info section */}
                <div className="p-6">
                  <p className="text-[15px] leading-relaxed mb-4 whitespace-pre-line max-w-xl" style={{ color: "rgba(255,255,255,0.8)" }}>
                    {active.desc[lang]}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {active.badges[lang].map((b) => (
                      <span
                        key={b}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                        style={{
                          background: `${active.color}18`,
                          color: active.color,
                          border: `1px solid ${active.color}30`,
                        }}
                      >
                        #{b}
                      </span>
                    ))}
                  </div>

                  {/* Feature highlights (2x2 grid) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {active.features.slice(0, 4).map((f, fi) => (
                      <div
                        key={fi}
                        className="rounded-xl px-4 py-3"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          {(() => {
                            const lucide = renderFeatureIcon?.({
                              serviceId: active.id,
                              featureIndex: fi,
                              color: active.color,
                            });
                            return lucide ?? <span className="text-[16px]">{f.icon}</span>;
                          })()}
                          <span className="text-[13px] font-bold" style={{ color: "#f5f5f7" }}>{f.title[lang]}</span>
                        </div>
                        <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                          {f.desc[lang]}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/services/${active.id}`}
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-black tracking-wide transition-all duration-300"
                    style={{
                      background: active.color,
                      color: "#fff",
                      boxShadow: `0 8px 30px ${active.color}55`,
                    }}
                  >
                    <span>{lang === "ko" ? "자세히 보기" : "View Details"}</span>
                    <span style={{ fontSize: 14 }}>→</span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom: page indicators */}
        <div className="flex justify-center gap-2 mt-5">
          {items.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActiveIdx(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIdx ? 28 : 8,
                height: 8,
                background: i === activeIdx ? p.color : "rgba(255,255,255,0.15)",
                boxShadow: i === activeIdx ? `0 0 10px ${p.color}88` : "none",
              }}
              aria-label={p.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
