"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLang, LangProvider } from "@/components/LangContext";
import { content } from "@/lib/i18n";

/* ────────────────────────────────────────────────────────── */
/*  /style-compare — Dark Full-Page Preview                   */
/*  · 배경 다크 (#0a0a12)                                     */
/*  · 카드 세로 비율 + 기존 lulu.ai 카드 아나토미 보존         */
/*  · CTA pill 유지 (색 스왑 + 화살표 원)                     */
/*  · 호버 시 더 큰 스케일 (scale 1.04 + -10px lift)          */
/* ────────────────────────────────────────────────────────── */

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

const DARK_BG = "#0a0a12";
const CARD_BG = "#14141f";
const BORDER = "rgba(255,255,255,0.08)";
const TEXT = "#f5f5f7";
const TEXT_MUTED = "rgba(255,255,255,0.62)";
const TEXT_DIM = "rgba(255,255,255,0.4)";

export default function StyleComparePage() {
  return (
    <LangProvider>
      <div style={{ background: DARK_BG, minHeight: "100vh", color: TEXT }}>
        <TopBar />
        <DarkHero />
        <DarkAbout />
        <DarkProjects />
        <DarkAxes />
        <DarkNews />
        <DarkCTA />
        <FooterNote />
      </div>
    </LangProvider>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  Top Bar                                                   */
/* ────────────────────────────────────────────────────────── */
function TopBar() {
  return (
    <div
      className="sticky top-0 z-50 px-6 py-3 flex items-center justify-between"
      style={{
        background: "rgba(10,10,18,0.82)",
        backdropFilter: "blur(14px)",
        borderBottom: `1px solid ${BORDER}`,
      }}
    >
      <div className="flex items-center gap-4">
        <div className="text-[12px] font-black tracking-[0.3em]" style={{ color: TEXT }}>
          STYLE COMPARE · DARK
        </div>
        <span
          className="text-[10px] font-black tracking-[0.22em] px-2 py-1 rounded-full"
          style={{ background: "rgba(255,90,106,0.14)", color: "#ff5a6a", border: "1px solid rgba(255,90,106,0.3)" }}
        >
          PREVIEW
        </span>
      </div>
      <Link href="/" className="text-[12px] font-bold" style={{ color: TEXT_MUTED }}>
        ← lulu.ai
      </Link>
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  Hero                                                      */
/* ────────────────────────────────────────────────────────── */
function DarkHero() {
  const { lang } = useLang();
  const t = content.hero[lang];

  const SERVICES_COLORS = ["#FF6D1F", "#06b6d4", "#10b981", "#3b82f6", "#ec4899", "#8b5cf6"];
  const gradient = `linear-gradient(90deg, ${SERVICES_COLORS.join(", ")}, ${SERVICES_COLORS[0]})`;

  return (
    <section className="relative overflow-hidden px-6" style={{ paddingTop: 120, paddingBottom: 140 }}>
      {/* Ambient glows */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: -120,
          left: -120,
          width: 520,
          height: 520,
          background: "radial-gradient(circle, rgba(255,109,31,0.18), transparent 60%)",
          filter: "blur(20px)",
        }}
      />
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          bottom: -140,
          right: -100,
          width: 560,
          height: 560,
          background: "radial-gradient(circle, rgba(139,92,246,0.18), transparent 60%)",
          filter: "blur(20px)",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-black tracking-[0.42em] mb-8"
            style={{ color: TEXT_DIM }}
          >
            A BRAND FAMILY OF
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="font-black leading-none"
            style={{
              fontSize: "clamp(72px, 14vw, 160px)",
              letterSpacing: "-0.04em",
              background: gradient,
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            LULU.AI
          </motion.div>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 72 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ height: 2, background: gradient, borderRadius: 999, marginTop: 28, marginBottom: 28 }}
          />

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="font-black tracking-tight"
            style={{ fontSize: "clamp(24px, 3vw, 38px)", lineHeight: 1.25 }}
          >
            <span style={{ display: "block" }}>
              <span style={{ color: "#e63946" }}>
                {lang === "ko" ? "모이고" : "Gather"}
              </span>
              <span style={{ color: TEXT }}>, </span>
              <span style={{ color: "#ff8c42" }}>
                {lang === "ko" ? "머물고" : "Stay"}
              </span>
              <span style={{ color: TEXT }}>{lang === "ko" ? ", " : ", and "}</span>
              <span style={{ color: "#00a3cc" }}>
                {lang === "ko" ? "성장하는" : "Grow"}
              </span>
            </span>
            <span style={{ display: "block", color: TEXT }}>
              {lang === "ko" ? "커뮤니티를 만듭니다" : "We build the community"}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-6 max-w-xl text-[13px] leading-relaxed"
            style={{ color: TEXT_MUTED }}
          >
            {t.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="flex gap-3 mt-10"
          >
            <button
              className="px-7 py-3.5 rounded-full text-[13px] font-black"
              style={{ background: "#fff", color: "#111" }}
            >
              {t.cta} →
            </button>
            <button
              className="px-7 py-3.5 rounded-full text-[13px] font-black"
              style={{ background: "transparent", color: TEXT, border: `1px solid ${BORDER}` }}
            >
              {t.cta2}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  About                                                     */
/* ────────────────────────────────────────────────────────── */
function DarkAbout() {
  const { lang } = useLang();
  const t = content.about[lang];

  return (
    <section className="py-28 px-6" style={{ background: DARK_BG, borderTop: `1px solid ${BORDER}` }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-14">
          <div className="text-[11px] font-black tracking-[0.32em] mb-4" style={{ color: "#ff5a6a" }}>
            {t.label}
          </div>
          <h2
            className="font-black tracking-tight mb-6 whitespace-pre-line"
            style={{ fontSize: "clamp(1.9rem, 4.2vw, 3rem)", color: TEXT, lineHeight: 1.2 }}
          >
            {t.headline}
          </h2>
          <p className="max-w-3xl mx-auto leading-relaxed" style={{ fontSize: "clamp(14px, 1.2vw, 16px)", color: TEXT_MUTED }}>
            {t.body}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <p
            className="whitespace-pre-line font-black tracking-tight"
            style={{ fontSize: "clamp(20px, 2.4vw, 30px)", color: TEXT, lineHeight: 1.4 }}
          >
            {t.mission.text}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  Projects — 세로 카드 + 기존 아나토미 유지                  */
/* ────────────────────────────────────────────────────────── */
function DarkProjects() {
  const { lang } = useLang();
  const t = content.products;
  const items = t.items;

  return (
    <section className="py-28 px-6" style={{ background: "#08080f", borderTop: `1px solid ${BORDER}` }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-14">
          <div className="text-[11px] font-black tracking-[0.32em] mb-4" style={{ color: "#ff5a6a" }}>
            {t.label[lang]}
          </div>
          <h2
            className="font-black tracking-tight mb-4"
            style={{ fontSize: "clamp(1.9rem, 4.2vw, 3rem)", color: TEXT, lineHeight: 1.15 }}
          >
            {t.headline[lang]}
          </h2>
          <p className="max-w-2xl mx-auto leading-relaxed" style={{ fontSize: "15px", color: TEXT_MUTED }}>
            {t.sub[lang]}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p, i) => {
            const axis = (p as typeof p & { axis: "game" | "community" | "tech" }).axis;
            return <DarkVerticalCard key={p.id} item={p} axis={axis} index={i} lang={lang} />;
          })}
        </div>
      </div>
    </section>
  );
}

type ProductItem = (typeof content.products.items)[number];

function DarkVerticalCard({
  item: p,
  axis,
  index,
  lang,
}: {
  item: ProductItem;
  axis: "game" | "community" | "tech";
  index: number;
  lang: "ko" | "en";
}) {
  const [hover, setHover] = useState(false);
  const axisColor = AXIS_COLOR[axis];
  const axisLabel = AXIS_LABEL[axis];
  const isActive = hover;

  return (
    <motion.article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      className="rounded-2xl p-7 flex flex-col relative overflow-hidden cursor-pointer"
      style={{
        background: CARD_BG,
        border: `1px solid ${isActive ? `${p.color}90` : BORDER}`,
        minHeight: 620,
        boxShadow: isActive
          ? `0 40px 90px ${p.color}45, 0 20px 40px rgba(0,0,0,0.5)`
          : "0 2px 10px rgba(0,0,0,0.3)",
        transform: isActive ? "translateY(-10px) scale(1.04)" : "translateY(0) scale(1)",
        transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease, border-color 0.3s ease",
        zIndex: isActive ? 10 : 1,
      }}
    >
      {/* Corner glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          opacity: isActive ? 1 : 0,
          transition: "opacity 0.4s ease",
          background: `radial-gradient(600px circle at 0% 0%, ${p.color}26, transparent 40%), radial-gradient(600px circle at 100% 100%, ${axisColor}1c, transparent 40%)`,
        }}
      />

      {/* Hero visual */}
      <div
        className="-mx-7 -mt-7 mb-6 relative"
        style={{
          transform: isActive ? "scale(1.03)" : "scale(1)",
          transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
          transformOrigin: "center top",
        }}
      >
        <DarkServiceVisual id={p.id} color={p.color} />
        {/* Bottom fade to card bg */}
        <div
          aria-hidden
          className="absolute left-0 right-0 bottom-0 pointer-events-none"
          style={{ height: 32, background: `linear-gradient(to bottom, transparent, ${CARD_BG})` }}
        />
      </div>

      {/* Axis badge + status */}
      <div className="flex items-center justify-between mb-6 relative">
        <span
          className="text-[10px] font-black tracking-[0.16em] px-2.5 py-1 rounded-full"
          style={{
            background: isActive ? axisColor : `${axisColor}22`,
            color: isActive ? "#fff" : axisColor,
            border: `1px solid ${isActive ? axisColor : `${axisColor}55`}`,
            transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease",
          }}
        >
          {axisLabel}
        </span>
        <span className="text-[11px] font-bold" style={{ color: isActive ? TEXT : TEXT_DIM, transition: "color 0.3s ease" }}>
          {p.status[lang]}
        </span>
      </div>

      {/* Icon + name */}
      <div className="flex items-center gap-3 mb-4 relative">
        <div
          style={{
            transform: isActive ? "scale(1.12) rotate(-3deg)" : "scale(1) rotate(0)",
            transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <DarkIconLogo id={p.id} color={p.color} size={44} />
        </div>
        <div>
          <h3
            className="text-lg font-black leading-none mb-1"
            style={{
              color: isActive ? p.color : TEXT,
              transition: "color 0.3s ease",
            }}
          >
            {p.name}
          </h3>
          <div className="text-[11px] font-semibold" style={{ color: TEXT_DIM }}>
            {p.tag[lang]}
          </div>
        </div>
      </div>

      <p
        className="text-[14px] leading-relaxed flex-1 mb-5 relative whitespace-pre-line"
        style={{ color: isActive ? "rgba(255,255,255,0.85)" : TEXT_MUTED, transition: "color 0.3s ease" }}
      >
        {p.desc[lang]}
      </p>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5 relative">
        {p.badges[lang].slice(0, 3).map((b) => (
          <span
            key={b}
            className="text-[10.5px] font-semibold px-2 py-1 rounded"
            style={{
              background: isActive ? `${p.color}22` : "rgba(255,255,255,0.06)",
              color: isActive ? p.color : "rgba(255,255,255,0.75)",
              transition: "background 0.3s ease, color 0.3s ease",
            }}
          >
            #{b}
          </span>
        ))}
      </div>

      {/* Accent bar */}
      <div
        className="rounded-full mt-5 relative"
        style={{
          height: isActive ? 3 : 1.5,
          background: `linear-gradient(90deg, ${p.color}, ${p.color}55)`,
          boxShadow: isActive ? `0 0 18px ${p.color}aa` : "none",
          transition: "height 0.35s ease, box-shadow 0.35s ease",
        }}
      />

      {/* CTA pill — 기존 형태 유지 */}
      <Link
        href={`/services/${p.id}`}
        className="mt-5 inline-flex items-center justify-between w-full rounded-full py-2.5 px-4 text-[12.5px] font-black tracking-wide relative"
        style={{
          background: isActive ? p.color : "rgba(255,255,255,0.04)",
          color: isActive ? "#fff" : TEXT,
          border: `1px solid ${isActive ? p.color : "rgba(255,255,255,0.12)"}`,
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
            transform: isActive ? "translateX(4px)" : "translateX(0)",
            transition: "transform 0.3s ease, background 0.3s ease",
          }}
        >
          →
        </span>
      </Link>
    </motion.article>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  Dark ServiceVisual — 배경을 다크 톤으로 재조정            */
/* ────────────────────────────────────────────────────────── */
function DarkServiceVisual({ id, color: c }: { id: string; color: string }) {
  const patterns: Record<string, React.ReactNode> = {
    pokerlulu: (
      <svg viewBox="0 0 300 170" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <circle cx="220" cy="115" r="46" fill={`${c}35`} />
        <circle cx="220" cy="115" r="32" fill={`${c}55`} />
        <circle cx="220" cy="115" r="18" fill={c} />
        <circle cx="262" cy="62" r="20" fill={`${c}40`} />
        <circle cx="176" cy="58" r="16" fill={`${c}65`} />
        <text x="48" y="90" fontSize="38" fill={`${c}cc`} fontWeight="900" fontFamily="serif">♠</text>
        <text x="92" y="128" fontSize="26" fill={`${c}88`} fontWeight="900" fontFamily="serif">♥</text>
      </svg>
    ),
    linkplay: (
      <svg viewBox="0 0 300 170" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <circle cx="72" cy="85" r="40" fill={`${c}22`} />
        <circle cx="72" cy="85" r="28" fill={`${c}3a`} />
        <image href="/logos/linkplay.svg" x="48" y="61" width="48" height="48" preserveAspectRatio="xMidYMid meet" />
        <path d="M120 85 Q145 60, 170 85 T220 85" stroke={`${c}cc`} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M120 85 Q150 45, 180 85 T240 85" stroke={`${c}88`} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M120 85 Q155 30, 190 85 T260 85" stroke={`${c}48`} strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="258" cy="85" r="5" fill={c} />
      </svg>
    ),
    moitto: (
      <svg viewBox="0 0 300 170" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <circle cx="80" cy="65" r="18" fill={`${c}70`} />
        <circle cx="60" cy="100" r="16" fill={`${c}55`} />
        <circle cx="100" cy="100" r="16" fill={`${c}5c`} />
        <path d="M38 148 Q80 110, 122 148 Z" fill={`${c}42`} />
        <circle cx="180" cy="55" r="14" fill={`${c}58`} />
        <circle cx="220" cy="75" r="20" fill={`${c}48`} />
        <circle cx="250" cy="50" r="12" fill={`${c}70`} />
        <path d="M160 148 Q220 105, 280 148 Z" fill={`${c}38`} />
      </svg>
    ),
    shuffleup: (
      <svg viewBox="0 0 300 170" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <path d="M30 40 L70 40 L70 70 L120 70" stroke={`${c}dd`} strokeWidth="2" fill="none" />
        <path d="M30 100 L70 100 L70 70" stroke={`${c}dd`} strokeWidth="2" fill="none" />
        <path d="M30 130 L60 130" stroke={`${c}80`} strokeWidth="2" fill="none" />
        <path d="M120 70 L180 70" stroke={c} strokeWidth="2.5" fill="none" />
        <path d="M228 58 L272 58 L266 92 Q250 104, 250 104 Q250 104, 234 92 Z" fill={`${c}45`} stroke={c} strokeWidth="1.6" />
        <text x="250" y="85" fontSize="16" textAnchor="middle" fill={c} fontWeight="900" fontFamily="sans-serif">★</text>
        <rect x="244" y="110" width="12" height="16" rx="1" fill={`${c}95`} />
        <rect x="236" y="128" width="28" height="4" rx="1" fill={c} />
      </svg>
    ),
    tubelulu: (
      <svg viewBox="0 0 300 170" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <rect x="34" y="38" width="140" height="88" rx="10" fill={`${c}28`} stroke={`${c}95`} strokeWidth="1.5" />
        <path d="M92 68 L92 96 L124 82 Z" fill={c} />
        <rect x="48" y="138" width="60" height="4" rx="2" fill={`${c}70`} />
        <rect x="48" y="148" width="40" height="3" rx="1.5" fill={`${c}45`} />
        <path d="M198 80 L204 60 L210 100 L216 50 L222 95 L228 65 L234 90 L240 58 L246 88 L252 70"
          stroke={`${c}dd`} strokeWidth="1.6" fill="none" strokeLinejoin="round" />
        <circle cx="224" cy="124" r="14" fill={`${c}38`} stroke={c} strokeWidth="1.5" />
        <path d="M220 118 L220 130 L232 124 Z" fill={c} />
      </svg>
    ),
    gtolulu: (
      <svg viewBox="0 0 300 170" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <line x1="40" y1="140" x2="280" y2="140" stroke={`${c}38`} strokeWidth="1" />
        <line x1="40" y1="30" x2="40" y2="140" stroke={`${c}38`} strokeWidth="1" />
        <line x1="40" y1="100" x2="280" y2="100" stroke={`${c}22`} strokeWidth="1" strokeDasharray="2 3" />
        <line x1="40" y1="65" x2="280" y2="65" stroke={`${c}22`} strokeWidth="1" strokeDasharray="2 3" />
        <path d="M40 120 L78 85 L118 98 L156 52 L196 68 L234 34 L272 50"
          stroke={c} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="78" cy="85" r="4" fill={c} />
        <circle cx="118" cy="98" r="4" fill={c} />
        <circle cx="156" cy="52" r="5" fill={c} />
        <circle cx="196" cy="68" r="4" fill={c} />
        <circle cx="234" cy="34" r="5" fill={c} />
        <rect x="226" y="108" width="46" height="22" rx="5" fill={`${c}28`} stroke={c} strokeWidth="1" />
        <text x="249" y="124" fontSize="11" textAnchor="middle" fill={c} fontWeight="900" fontFamily="sans-serif">AI</text>
      </svg>
    ),
  };

  return (
    <div
      className="relative w-full"
      style={{
        aspectRatio: "16 / 9",
        background: `linear-gradient(135deg, ${c}35 0%, ${c}10 55%, #0a0a12 100%)`,
        overflow: "hidden",
      }}
    >
      {patterns[id]}
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  Dark IconLogo — Projects.tsx 동일 구조                     */
/* ────────────────────────────────────────────────────────── */
function DarkIconLogo({ id, color: c, size = 44 }: { id: string; color: string; size?: number }) {
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
  return <div style={{ width: size, height: size, flexShrink: 0 }}>{icons[id]}</div>;
}

/* ────────────────────────────────────────────────────────── */
/*  Axes Connection — dark                                    */
/* ────────────────────────────────────────────────────────── */
function DarkAxes() {
  const { lang } = useLang();
  const t = content.axes[lang];

  return (
    <section className="py-28 px-6" style={{ background: DARK_BG, borderTop: `1px solid ${BORDER}` }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-14">
          <div className="text-[11px] font-black tracking-[0.32em] mb-4" style={{ color: "#ff5a6a" }}>
            {t.label}
          </div>
          <h2
            className="font-black tracking-tight mb-6 whitespace-pre-line"
            style={{ fontSize: "clamp(1.9rem, 4.2vw, 3rem)", color: TEXT, lineHeight: 1.2 }}
          >
            {t.headline}
          </h2>
          <p className="max-w-3xl mx-auto leading-relaxed" style={{ fontSize: "clamp(14px, 1.2vw, 16px)", color: TEXT_MUTED }}>
            {t.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.items.map((ax, i) => (
            <motion.div
              key={ax.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="p-7 rounded-2xl"
              style={{
                background: CARD_BG,
                border: `1px solid ${BORDER}`,
                borderTop: `3px solid ${ax.color}`,
              }}
            >
              <div className="text-[11px] font-black tracking-[0.28em] mb-3" style={{ color: ax.color }}>
                {ax.name}
              </div>
              <h3 className="text-[20px] font-black mb-3" style={{ color: TEXT }}>
                {ax.title}
              </h3>
              <p className="text-[13.5px] leading-relaxed mb-5" style={{ color: TEXT_MUTED }}>
                {ax.desc}
              </p>
              <div className="flex gap-2 flex-wrap">
                {ax.services.map((s) => (
                  <span
                    key={s}
                    className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: `${ax.color}22`, color: ax.color, border: `1px solid ${ax.color}50` }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  News — dark                                               */
/* ────────────────────────────────────────────────────────── */
function DarkNews() {
  const { lang } = useLang();
  const t = content.news;
  const items = t.items.slice(0, 3);

  return (
    <section className="py-28 px-6" style={{ background: "#08080f", borderTop: `1px solid ${BORDER}` }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-12">
          <div className="text-[11px] font-black tracking-[0.32em] mb-4" style={{ color: "#ff5a6a" }}>
            {t.label[lang]}
          </div>
          <h2
            className="font-black tracking-tight mb-3"
            style={{ fontSize: "clamp(1.8rem, 3.8vw, 2.6rem)", color: TEXT, lineHeight: 1.2 }}
          >
            {t.headline[lang]}
          </h2>
          <p style={{ fontSize: "15px", color: TEXT_MUTED }}>{t.sub[lang]}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((n, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: CARD_BG,
                border: `1px solid ${BORDER}`,
                transition: "transform 0.35s ease, box-shadow 0.35s ease",
              }}
            >
              {/* Visual */}
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
                {n.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={n.image}
                    alt={n.title[lang]}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center relative"
                    style={{ background: `${n.color}18` }}
                  >
                    <svg viewBox="0 0 160 90" fill="none" className="w-3/4 h-3/4 opacity-80">
                      <circle cx="50" cy="45" r="22" stroke={n.color} strokeWidth="1" strokeDasharray="4 3" />
                      <circle cx="110" cy="45" r="16" stroke={n.color} strokeWidth="1" />
                      <line x1="72" y1="45" x2="94" y2="45" stroke={n.color} strokeWidth="0.8" strokeDasharray="3 3" />
                      <circle cx="80" cy="25" r="6" fill={`${n.color}55`} />
                    </svg>
                    <span
                      className="absolute top-3 left-3 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
                      style={{
                        background: "rgba(10,10,18,0.7)",
                        color: n.color,
                        border: `1px solid ${n.color}60`,
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      {n.category[lang]}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col gap-2 flex-1">
                <span className="text-[11px] font-bold" style={{ color: TEXT_DIM }}>
                  {n.date}
                </span>
                <h3 className="text-base font-black leading-snug" style={{ color: TEXT }}>
                  {n.title[lang]}
                </h3>
                <p
                  className="text-[13px] leading-relaxed line-clamp-3 whitespace-pre-line"
                  style={{ color: TEXT_MUTED }}
                >
                  {n.desc[lang]}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  CTA strip                                                 */
/* ────────────────────────────────────────────────────────── */
function DarkCTA() {
  const { lang } = useLang();
  return (
    <section className="py-20 px-6" style={{ background: DARK_BG, borderTop: `1px solid ${BORDER}` }}>
      <div className="max-w-[1200px] mx-auto">
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-8 py-10 rounded-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(255,109,31,0.12), rgba(139,92,246,0.12))",
            border: `1px solid ${BORDER}`,
          }}
        >
          <div>
            <div className="text-[11px] font-black tracking-[0.3em] mb-3" style={{ color: "#ff5a6a" }}>
              JOIN THE PLATFORM
            </div>
            <h3 className="font-black mb-2" style={{ fontSize: "clamp(22px, 2.4vw, 28px)", color: TEXT }}>
              {lang === "ko" ? "함께 만들어갈 파트너를 찾습니다" : "Looking for partners to build with"}
            </h3>
            <p className="text-[13.5px]" style={{ color: TEXT_MUTED }}>
              {lang === "ko" ? "제휴·투자·콘텐츠 협업 언제든 환영합니다." : "Partnership · Investment · Content — always open."}
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button className="px-6 py-3 rounded-full text-[13px] font-black" style={{ background: "#fff", color: "#111" }}>
              {lang === "ko" ? "제휴 문의" : "Partner With Us"} →
            </button>
            <button
              className="px-6 py-3 rounded-full text-[13px] font-black"
              style={{ background: "transparent", color: TEXT, border: `1px solid ${BORDER}` }}
            >
              {lang === "ko" ? "전체 서비스" : "All Services"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  Footer note                                               */
/* ────────────────────────────────────────────────────────── */
function FooterNote() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16 text-[13px] leading-relaxed" style={{ color: TEXT_MUTED }}>
      <p className="mb-2 font-bold" style={{ color: TEXT }}>
        다크 톤 · 세로 카드 · 기존 lulu.ai 카드 아나토미(ServiceVisual + 아이콘 + 축 뱃지 + 설명 + 해시태그 + 액센트 바 + CTA pill) 유지.
      </p>
      <p>마우스 오버 시 scale 1.04 + translateY(-10px) + 색상 글로우로 변경되어 기존보다 더 강한 리프트 효과. 이 방향이 좋으면 실제 페이지에 적용하겠습니다.</p>
    </div>
  );
}
