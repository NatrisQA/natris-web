"use client";

import { content } from "@/lib/i18n";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

type Item = (typeof content.products.items)[number];

const items = content.products.items as Item[];
const IN_MOTION_IDS = new Set(["linkplay", "pokerlulu"]);

const TIMELINE: Record<string, string> = {
  pokerlulu: "대회 운영 중",
  linkplay: "2026 Q2 런칭",
  moitto: "2026 Q3",
  tubelulu: "2026 Q4",
  shuffleup: "2027 Q1",
  gtolulu: "2027 Q2",
};

const TEASER: Record<string, string> = {
  moitto: "어떤 모임이 기다리고 있을까요?",
  tubelulu: "화면 너머 무엇이 펼쳐질까요?",
  shuffleup: "어떤 한 판이 준비되고 있을까요?",
  gtolulu: "다음 한 수는 무엇일까요?",
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

const SERVICE_VIDEO: Record<string, { src: string; startTime?: number }> = {
  linkplay: { src: "/videos/linkplay-play.mp4", startTime: 2 },
  pokerlulu: { src: "/videos/pokerlulu-onoff-event.mp4" },
};

const motionItems = items.filter((i) => IN_MOTION_IDS.has(i.id));
const conceptItems = items.filter((i) => !IN_MOTION_IDS.has(i.id));
const ordered = [...motionItems, ...conceptItems];

export default function ServiceIdlePreviewV2() {
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
      try {
        v.currentTime = start;
      } catch {
        /* noop */
      }
    }
    v.play().catch(() => {});
  };

  return (
    <div style={{ background: "#08080f", minHeight: "100vh", color: "#f5f5f7" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 8px" }}>
        <Link
          href="/"
          style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 700, letterSpacing: "0.12em" }}
        >
          ← LULU.AI
        </Link>
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.32em",
            fontWeight: 900,
            color: "#ff5a6a",
            marginTop: 18,
            marginBottom: 8,
          }}
        >
          PREVIEW · SERVICES SECTION V2
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 12, lineHeight: 1.15 }}>
          10점 시안 — 진행중/구상중 분리 + 구상중 전용 CTA/teaser
        </h1>
        <ul
          style={{
            color: "rgba(255,255,255,0.62)",
            fontSize: 13,
            lineHeight: 1.9,
            paddingLeft: 18,
            marginBottom: 6,
            maxWidth: 920,
          }}
        >
          <li>① 그룹 라벨 재설계: 진행 중(IN MOTION) / 구상 중(IN CONCEPT) — pokerlulu·linkplay도 기술적으론 개발중인 점 반영</li>
          <li>② 구분 뱃지: pokerlulu &quot;대회 운영 중&quot;, linkplay &quot;2026 Q2 런칭&quot;, 나머지는 분기 타임라인</li>
          <li>③ 구상중 탭 활성 시 bg 영상 → 정적 gradient (pokerlulu 영상 누수 차단)</li>
          <li>④ 구상중 CTA 통일: 단일 &quot;가장 먼저 만나보기 →&quot; + 서비스별 궁금증 teaser 한 줄</li>
          <li>⑤ 자동 rotate는 진행중 그룹 내에서만 순환</li>
        </ul>
      </div>

      <section className="relative overflow-hidden" style={{ background: "#08080f" }}>
        {/* Background layer */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          {isLive && bgVideo ? (
            <video
              key={`bg-${bgItem.id}`}
              src={bgVideo.src}
              autoPlay
              muted
              playsInline
              onLoadedMetadata={(e) => seekToStart(e, bgVideo.startTime ?? 0)}
              onEnded={(e) => seekToStart(e, bgVideo.startTime ?? 0)}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.18,
              }}
            />
          ) : (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `radial-gradient(ellipse 80% 60% at 30% 40%, ${active.color}28, transparent 65%), radial-gradient(ellipse 60% 70% at 75% 70%, ${axisColor}18, transparent 65%)`,
              }}
            />
          )}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(135deg, ${active.color}18 0%, transparent 50%, #08080f 100%)`,
              transition: "background 0.7s",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 160,
              background: "linear-gradient(to bottom, transparent, #08080f)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 96,
              background: "linear-gradient(to top, transparent, #08080f)",
            }}
          />
        </div>

        <div
          className="relative z-10"
          style={{ maxWidth: 1400, margin: "0 auto", padding: "64px 24px 96px" }}
          onMouseEnter={() => {
            hoveringRef.current = true;
          }}
          onMouseLeave={() => {
            hoveringRef.current = false;
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.32em",
              fontWeight: 900,
              color: "#ff5a6a",
              marginBottom: 40,
            }}
          >
            SERVICES
          </div>

          <div style={{ display: "flex", flexDirection: "row", gap: 48, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ width: 340, flexShrink: 0 }}>
              <TabGroup
                label="IN MOTION · 진행 중"
                items={motionItems}
                baseIdx={0}
                activeIdx={activeIdx}
                onSelect={setActiveIdx}
                badgeColor="#3ddc97"
                pulse
              />
              <div style={{ height: 28 }} />
              <TabGroup
                label="IN CONCEPT · 구상 중"
                items={conceptItems}
                baseIdx={motionItems.length}
                activeIdx={activeIdx}
                onSelect={setActiveIdx}
                badgeColor="rgba(255,255,255,0.45)"
              />
            </div>

            <div style={{ flex: 1, minWidth: 320 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    position: "relative",
                    background: "#14141f",
                    border: `1px solid ${active.color}30`,
                    boxShadow: `0 40px 80px ${active.color}15, 0 0 120px ${active.color}08`,
                  }}
                >
                  <div style={{ position: "relative", aspectRatio: "21 / 9", overflow: "hidden" }}>
                    {isLive && activeVideo ? (
                      <video
                        key={active.id}
                        src={activeVideo.src}
                        autoPlay
                        muted
                        playsInline
                        onLoadedMetadata={(e) => seekToStart(e, activeVideo.startTime ?? 0)}
                        onEnded={(e) => seekToStart(e, activeVideo.startTime ?? 0)}
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <ComingSoonVisual item={active} />
                    )}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: `linear-gradient(to top, #14141f 0%, ${active.color}18 30%, transparent 60%)`,
                        pointerEvents: "none",
                      }}
                    />
                    <div style={{ position: "absolute", bottom: 24, left: 32, right: 32 }}>
                      <div style={{ display: "inline-flex", gap: 8, marginBottom: 12 }}>
                        <span
                          style={{
                            fontSize: 10,
                            letterSpacing: "0.16em",
                            fontWeight: 900,
                            padding: "4px 10px",
                            borderRadius: 999,
                            background: axisColor,
                            color: "#fff",
                          }}
                        >
                          {axisLabel}
                        </span>
                        {TIMELINE[active.id] && (
                          <span
                            style={{
                              fontSize: 10,
                              letterSpacing: "0.16em",
                              fontWeight: 900,
                              padding: "4px 10px",
                              borderRadius: 999,
                              background: "rgba(255,255,255,0.12)",
                              color: "#f5f5f7",
                              border: "1px solid rgba(255,255,255,0.22)",
                              backdropFilter: "blur(8px)",
                            }}
                          >
                            {TIMELINE[active.id]}
                          </span>
                        )}
                      </div>
                      <h3
                        style={{
                          fontSize: "clamp(2rem, 4vw, 3.2rem)",
                          fontWeight: 900,
                          color: "#fff",
                          lineHeight: 1.1,
                          textShadow: "0 2px 20px rgba(0,0,0,0.6)",
                        }}
                      >
                        {active.name}
                      </h3>
                      <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4, color: `${active.color}dd` }}>
                        {active.tag.ko}
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: 24 }}>
                    <p
                      style={{
                        fontSize: 15,
                        lineHeight: 1.7,
                        marginBottom: 16,
                        whiteSpace: "pre-line",
                        maxWidth: 580,
                        color: "rgba(255,255,255,0.8)",
                      }}
                    >
                      {active.desc.ko}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                      {active.badges.ko.map((b) => (
                        <span
                          key={b}
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            padding: "4px 10px",
                            borderRadius: 999,
                            background: `${active.color}18`,
                            color: active.color,
                            border: `1px solid ${active.color}30`,
                          }}
                        >
                          #{b}
                        </span>
                      ))}
                    </div>

                    {isLive ? (
                      <Link
                        href={`/services/${active.id}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "12px 24px",
                          borderRadius: 999,
                          fontSize: 13,
                          fontWeight: 900,
                          letterSpacing: "0.04em",
                          background: active.color,
                          color: "#fff",
                          boxShadow: `0 8px 30px ${active.color}55`,
                        }}
                      >
                        자세히 보기 →
                      </Link>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
                        {TEASER[active.id] && (
                          <div
                            style={{
                              fontSize: 13,
                              fontStyle: "italic",
                              color: `${active.color}dd`,
                              fontWeight: 500,
                              letterSpacing: "-0.01em",
                            }}
                          >
                            &ldquo;{TEASER[active.id]}&rdquo;
                          </div>
                        )}
                        <a
                          href={`mailto:notify@lulu.ai?subject=${encodeURIComponent(`${active.name} 첫 소식 요청`)}`}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "12px 24px",
                            borderRadius: 999,
                            fontSize: 13,
                            fontWeight: 900,
                            letterSpacing: "0.04em",
                            background: active.color,
                            color: "#fff",
                            boxShadow: `0 8px 30px ${active.color}55`,
                          }}
                        >
                          <BellIcon /> 가장 먼저 만나보기 →
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function TabGroup({
  label,
  items,
  baseIdx,
  activeIdx,
  onSelect,
  badgeColor,
  pulse,
}: {
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
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 10,
          letterSpacing: "0.28em",
          fontWeight: 900,
          color: badgeColor,
          padding: "0 8px 12px",
        }}
      >
        <motion.span
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            background: badgeColor,
            boxShadow: pulse ? `0 0 8px ${badgeColor}` : "none",
            display: "inline-block",
          }}
          animate={pulse ? { opacity: [1, 0.4, 1] } : {}}
          transition={pulse ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
        />
        {label}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {items.map((p, i) => {
          const globalIdx = baseIdx + i;
          const isActive = globalIdx === activeIdx;
          const statusLabel = TIMELINE[p.id] ?? p.status.ko;
          return (
            <button
              key={p.id}
              onClick={() => onSelect(globalIdx)}
              style={{
                position: "relative",
                textAlign: "left",
                padding: "16px 20px",
                borderRadius: 12,
                background: isActive ? `${p.color}15` : "transparent",
                border: `1px solid ${isActive ? `${p.color}40` : "transparent"}`,
                transition: "all 0.3s ease",
                cursor: "pointer",
                width: "100%",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 12,
                  bottom: 12,
                  width: 3,
                  borderRadius: 999,
                  background: isActive ? p.color : "transparent",
                  boxShadow: isActive ? `0 0 12px ${p.color}88` : "none",
                }}
              />
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <IconLogo id={p.id} color={p.color} size={32} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 900,
                      color: isActive ? "#f5f5f7" : "rgba(255,255,255,0.45)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {p.name}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: isActive ? `${p.color}cc` : "rgba(255,255,255,0.25)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {p.tag.ko}
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: 999,
                    background: isActive ? `${p.color}22` : "rgba(255,255,255,0.05)",
                    color: isActive ? p.color : "rgba(255,255,255,0.35)",
                    flexShrink: 0,
                    letterSpacing: "0.04em",
                  }}
                >
                  {statusLabel}
                </span>
              </div>
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
      style={{
        position: "absolute",
        inset: 0,
        background: "#08080f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 55% 70% at 50% 45%, ${color}40, transparent 70%)`,
        }}
        animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.08, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.08,
          backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      <motion.div
        style={{
          position: "relative",
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

function IconLogo({ id, color, size = 32 }: { id: string; color: string; size?: number }) {
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
    moitto: (
      <div style={{ width: "100%", height: "100%", borderRadius: 8, overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logos/moitto.png"
          alt="Moitto"
          style={{ width: "100%", height: "100%", display: "block", objectFit: "contain" }}
        />
      </div>
    ),
    tubelulu: (
      <svg viewBox="0 0 40 40" fill="none">
        <rect x="6" y="10" width="28" height="20" rx="4" fill={`${color}22`} stroke={color} strokeWidth="1.4" />
        <path d="M18 16 L18 24 L26 20 Z" fill={color} />
      </svg>
    ),
    shuffleup: (
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M13 7 L27 7 L25 21 Q20 25 20 25 Q20 25 15 21 Z" fill={`${color}30`} stroke={color} strokeWidth="1.4" />
        <text x="20" y="20" fontSize="11" textAnchor="middle" fill={color} fontFamily="sans-serif">
          ★
        </text>
        <rect x="12" y="31" width="16" height="4" rx="2" fill={color} />
      </svg>
    ),
    gtolulu: (
      <svg viewBox="0 0 40 40" fill="none">
        <path
          d="M6 32 L14 18 L20 24 L28 10 L34 32"
          stroke={color}
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="14" cy="18" r="2.5" fill={color} />
        <circle cx="28" cy="10" r="2.5" fill={color} />
        <text
          x="20"
          y="37"
          fontSize="6"
          textAnchor="middle"
          fill={`${color}dd`}
          fontWeight="800"
          fontFamily="sans-serif"
        >
          GTO
        </text>
      </svg>
    ),
  };
  return <div style={{ width: size, height: size, flexShrink: 0 }}>{icons[id]}</div>;
}

function BellIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}
