"use client";

import { useLang } from "./LangContext";
import { content } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

export type FeatureIconRenderer = (args: {
  serviceId: string;
  featureIndex: number;
  color: string;
}) => ReactNode;

export const FeatureIconContext = createContext<FeatureIconRenderer | null>(null);

type Item = (typeof content.products.items)[number];
type Lang = "ko" | "en";

const IN_MOTION_IDS = new Set(["pokerlulu", "linkplay"]);

const TIMELINE: Record<string, Record<Lang, string>> = {
  pokerlulu: { ko: "대회 운영 중", en: "Events Running" },
  linkplay: { ko: "2026 Q2", en: "2026 Q2" },
};

const TEASER: Record<string, Record<Lang, string>> = {
  tubelulu: {
    ko: "화면 너머 무엇이 펼쳐질까요?",
    en: "What lies beyond the screen?",
  },
  shuffleup: {
    ko: "어떤 한 판이 준비되고 있을까요?",
    en: "What game is being prepared?",
  },
  gtolulu: {
    ko: "다음 한 수는 무엇일까요?",
    en: "What's the next move?",
  },
};

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

const allItems = content.products.items as Item[];
const motionItems = allItems.filter((i) => IN_MOTION_IDS.has(i.id));
const conceptItems = allItems.filter((i) => !IN_MOTION_IDS.has(i.id));
const ordered = [...motionItems, ...conceptItems];

/* ── Service icon (small) ── */
function IconLogo({ id, color, size = 36 }: { id: string; color: string; size?: number }) {
  const c = color;
  const icons: Record<string, ReactNode> = {
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
  const label = content.products.label[lang];
  const renderFeatureIcon = useContext(FeatureIconContext);

  const [activeIdx, setActiveIdx] = useState(0);
  const active = ordered[activeIdx];
  const isLive = IN_MOTION_IDS.has(active.id);
  const axis = (active as Item & { axis: "game" | "community" | "tech" }).axis;
  const axisColor = AXIS_COLOR[axis];
  const axisLabel = AXIS_LABEL[axis];

  const lastLiveIdxRef = useRef(0);
  useEffect(() => {
    if (isLive) lastLiveIdxRef.current = activeIdx;
  }, [activeIdx, isLive]);
  const bgItem = isLive ? active : ordered[lastLiveIdxRef.current];
  const bgVideo = SERVICE_VIDEO[bgItem.id];
  const activeVideo = SERVICE_VIDEO[active.id];

  const hoveringRef = useRef(false);
  useEffect(() => {
    const timer = setInterval(() => {
      if (hoveringRef.current) return;
      if (!IN_MOTION_IDS.has(ordered[activeIdx].id)) return;
      const liveIdxs = ordered
        .map((it, idx) => (IN_MOTION_IDS.has(it.id) ? idx : -1))
        .filter((v) => v >= 0);
      const pos = liveIdxs.indexOf(activeIdx);
      setActiveIdx(liveIdxs[(pos + 1) % liveIdxs.length]);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeIdx]);

  const seekToStart = (e: React.SyntheticEvent<HTMLVideoElement>, start: number) => {
    const v = e.currentTarget;
    if (start > 0) {
      try { v.currentTime = start; } catch { /* noop */ }
    }
    v.play().catch(() => {});
  };

  const timelineLabel = TIMELINE[active.id]?.[lang];
  const teaserLabel = TEASER[active.id]?.[lang];

  return (
    <section className="relative py-0 overflow-hidden" style={{ background: "#08080f" }}>
      {/* ── Background layer: motion shows bg video, concept shows gradient ── */}
      <div className="absolute inset-0 z-0">
        {isLive && bgVideo ? (
          <video
            key={`bg-${bgItem.id}`}
            src={bgVideo.src}
            autoPlay
            muted
            playsInline
            onLoadedMetadata={(e) => seekToStart(e, bgVideo.startTime ?? 0)}
            onEnded={(e) => seekToStart(e, bgVideo.startTime ?? 0)}
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: "cover", opacity: 0.18 }}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 30% 40%, ${active.color}28, transparent 65%), radial-gradient(ellipse 60% 70% at 75% 70%, ${axisColor}18, transparent 65%)`,
            }}
          />
        )}
        <div
          className="absolute inset-0 transition-colors duration-700"
          style={{ background: `linear-gradient(135deg, ${active.color}18 0%, transparent 50%, #08080f 100%)` }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: "linear-gradient(to bottom, transparent, #08080f)" }} />
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

        {/* Main content: Tab list (left, md+) + Active detail (right) */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-14 items-start">

          {/* ── Left: Service tab groups (hidden below md) ── */}
          <div className="hidden md:block w-full md:w-[300px] lg:w-[340px] flex-shrink-0">
            <TabGroup
              lang={lang}
              label="IN MOTION"
              items={motionItems}
              baseIdx={0}
              activeIdx={activeIdx}
              onSelect={setActiveIdx}
              badgeColor="#3ddc97"
              pulse
            />
            <div className="h-7" />
            <TabGroup
              lang={lang}
              label="IN CONCEPT"
              items={conceptItems}
              baseIdx={motionItems.length}
              activeIdx={activeIdx}
              onSelect={setActiveIdx}
              badgeColor="rgba(255,255,255,0.45)"
            />
          </div>

          {/* ── Right: Active project detail ── */}
          <div className="flex-1 min-w-0 w-full">
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
                {/* Video / ComingSoon visual */}
                <div className="relative" style={{ aspectRatio: "21 / 9", overflow: "hidden" }}>
                  {isLive && activeVideo ? (
                    <video
                      key={active.id}
                      src={activeVideo.src}
                      autoPlay
                      muted
                      playsInline
                      onLoadedMetadata={(e) => seekToStart(e, activeVideo.startTime ?? 0)}
                      onEnded={(e) => seekToStart(e, activeVideo.startTime ?? 0)}
                      className="absolute inset-0 w-full h-full"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <ComingSoonVisual item={active} />
                  )}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `linear-gradient(to top, #14141f 0%, ${active.color}18 30%, transparent 60%)`,
                    }}
                  />
                  <div className="absolute bottom-6 left-8 right-8">
                    <div className="inline-flex gap-2 mb-3">
                      <span
                        className="text-[10px] font-black tracking-[0.16em] px-2.5 py-1 rounded-full"
                        style={{ background: axisColor, color: "#fff" }}
                      >
                        {axisLabel}
                      </span>
                      {timelineLabel && (
                        <span
                          className="text-[10px] font-black tracking-[0.16em] px-2.5 py-1 rounded-full"
                          style={{
                            background: "rgba(255,255,255,0.12)",
                            color: "#f5f5f7",
                            border: "1px solid rgba(255,255,255,0.22)",
                            backdropFilter: "blur(8px)",
                          }}
                        >
                          {timelineLabel}
                        </span>
                      )}
                    </div>
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

                  {/* Feature highlights — only for IN MOTION services */}
                  {isLive && (
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
                  )}

                  {/* CTA: motion → 자세히 보기 Link, concept → teaser + mailto */}
                  {isLive ? (
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
                  ) : (
                    <div className="flex flex-col gap-3 items-start">
                      {teaserLabel && (
                        <div
                          className="text-[13px] italic font-medium"
                          style={{ color: `${active.color}dd`, letterSpacing: "-0.01em" }}
                        >
                          &ldquo;{teaserLabel}&rdquo;
                        </div>
                      )}
                      <a
                        href={`mailto:notify@lulu.ai?subject=${encodeURIComponent(`${active.name} ${lang === "ko" ? "첫 소식 요청" : "notify me"}`)}`}
                        className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-black tracking-wide transition-all duration-300"
                        style={{
                          background: active.color,
                          color: "#fff",
                          boxShadow: `0 8px 30px ${active.color}55`,
                        }}
                      >
                        <BellIcon />
                        <span>{lang === "ko" ? "가장 먼저 만나보기" : "Get notified first"}</span>
                        <span style={{ fontSize: 14 }}>→</span>
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom: page indicators (all services — works as mobile nav too) */}
        <div className="flex justify-center gap-2 mt-5">
          {ordered.map((p, i) => (
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

function TabGroup({
  lang,
  label,
  items,
  baseIdx,
  activeIdx,
  onSelect,
  badgeColor,
  pulse,
}: {
  lang: Lang;
  label: string;
  items: Item[];
  baseIdx: number;
  activeIdx: number;
  onSelect: (idx: number) => void;
  badgeColor: string;
  pulse?: boolean;
}) {
  return (
    <div>
      <div
        className="flex items-center gap-2 text-[10px] font-black tracking-[0.28em] px-2 pb-3"
        style={{ color: badgeColor }}
      >
        <motion.span
          className="inline-block"
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            background: badgeColor,
            boxShadow: pulse ? `0 0 8px ${badgeColor}` : "none",
          }}
          animate={pulse ? { opacity: [1, 0.4, 1] } : {}}
          transition={pulse ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
        />
        {label}
      </div>
      <div className="flex flex-col gap-1">
        {items.map((p, i) => {
          const globalIdx = baseIdx + i;
          const isActive = globalIdx === activeIdx;
          const statusLabel = TIMELINE[p.id]?.[lang];
          const inMotion = IN_MOTION_IDS.has(p.id);
          return (
            <button
              key={p.id}
              onClick={() => onSelect(globalIdx)}
              className="relative w-full text-left rounded-xl px-5 py-4 transition-all duration-300"
              style={{
                background: isActive ? `${p.color}15` : "transparent",
                border: `1px solid ${isActive ? `${p.color}40` : "transparent"}`,
                cursor: "pointer",
              }}
            >
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
                {statusLabel && (
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 transition-all duration-300"
                    style={{
                      background: isActive ? `${p.color}22` : "rgba(255,255,255,0.05)",
                      color: isActive ? p.color : "rgba(255,255,255,0.35)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {statusLabel}
                  </span>
                )}
              </div>

              {/* Progress bar (rotate indicator — motion only) */}
              {isActive && inMotion && (
                <div className="absolute bottom-0 left-5 right-5 h-[2px] rounded-full overflow-hidden" style={{ background: `${p.color}20` }}>
                  <motion.div
                    key={`progress-${globalIdx}`}
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
  );
}

function ComingSoonVisual({ item }: { item: Item }) {
  const color = item.color;
  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: "#08080f" }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 55% 70% at 50% 45%, ${color}40, transparent 70%)`,
        }}
        animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.08, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.08,
          backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      <motion.div
        className="relative"
        style={{
          width: 140,
          height: 140,
          zIndex: 1,
          marginTop: -40,
          filter: `drop-shadow(0 12px 32px ${color}80)`,
        }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <IconLogo id={item.id} color={color} size={140} />
      </motion.div>
    </div>
  );
}

function BellIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}
