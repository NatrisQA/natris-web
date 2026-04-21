"use client";

import { motion } from "framer-motion";
import { useLang } from "../LangContext";

/* Option E — Kinetic Typography
 * 레퍼런스: Stripe, Linear, Framer
 * 거대한 LULU.AI 워드마크 + 6개 서비스 색상 그라데이션 플로우 + 서비스명 티커
 * 하단 캡션: 메인 헤드라인 (lang-aware)
 */
const SERVICES = [
  { name: "PokerLulu", color: "#FF6D1F" },
  { name: "LinkPlay",  color: "#06b6d4" },
  { name: "Moitto",    color: "#10b981" },
  { name: "ShuffleUp", color: "#3b82f6" },
  { name: "TubeLulu",  color: "#ec4899" },
  { name: "GTOlulu",   color: "#8b5cf6" },
];

const VERB_COLORS = {
  gather: "#e63946",
  stay: "#ff8c42",
  grow: "#00a3cc",
};

export default function HeroVisualE() {
  const { lang } = useLang();
  const gradientStops = SERVICES.map((s) => s.color).join(", ");
  const gradient = `linear-gradient(90deg, ${gradientStops}, ${SERVICES[0].color})`;

  const renderHeadlineCaption = () => {
    if (lang === "ko") {
      return (
        <>
          <span style={{ display: "block" }}>
            <span style={{ color: VERB_COLORS.gather }}>모이고</span>
            <span style={{ color: "#111" }}>, </span>
            <span style={{ color: VERB_COLORS.stay }}>머물고</span>
            <span style={{ color: "#111" }}>, </span>
            <span style={{ color: VERB_COLORS.grow }}>성장하는</span>
          </span>
          <span style={{ display: "block", color: "#111" }}>커뮤니티를 만듭니다</span>
        </>
      );
    }
    return (
      <>
        <span style={{ display: "block" }}>
          <span style={{ color: VERB_COLORS.gather }}>Gather</span>
          <span style={{ color: "#111" }}>, </span>
          <span style={{ color: VERB_COLORS.stay }}>Stay</span>
          <span style={{ color: "#111" }}>, and </span>
          <span style={{ color: VERB_COLORS.grow }}>Grow</span>
        </span>
        <span style={{ display: "block", color: "#111" }}>We build the community</span>
      </>
    );
  };

  return (
    <div
      className="relative w-full max-w-[720px] mx-auto flex flex-col items-center justify-center"
      style={{ padding: "32px 24px" }}
    >
      <style>{`
        @keyframes lulu-flow {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes lulu-ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .lulu-kinetic {
          background: ${gradient};
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: lulu-flow 8s linear infinite;
        }
      `}</style>

      {/* eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-[11px] font-black tracking-[0.42em]"
        style={{ color: "#999", marginBottom: 20 }}
      >
        A BRAND FAMILY OF
      </motion.div>

      {/* massive wordmark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="lulu-kinetic font-black leading-none"
        style={{
          fontSize: "clamp(72px, 15vw, 152px)",
          letterSpacing: "-0.035em",
          textAlign: "center",
        }}
      >
        LULU.AI
      </motion.div>

      {/* decorative line */}
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: 64 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        style={{
          height: 2,
          background: gradient,
          borderRadius: 999,
          marginTop: 28,
          marginBottom: 24,
        }}
      />

      {/* service ticker */}
      <div
        style={{
          width: "100%",
          maxWidth: 560,
          overflow: "hidden",
          maskImage: "linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)",
        }}
      >
        <div
          className="flex gap-8"
          style={{
            whiteSpace: "nowrap",
            animation: "lulu-ticker 22s linear infinite",
            width: "max-content",
          }}
        >
          {[...SERVICES, ...SERVICES].map((s, i) => (
            <span
              key={i}
              className="text-[12px] font-black tracking-[0.22em] flex items-center gap-3"
              style={{ color: "#666" }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: s.color,
                }}
              />
              {s.name.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* headline caption — replaces "SIX PLATFORMS · ONE COMMUNITY" */}
      <motion.div
        key={lang}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.3 }}
        className="font-black tracking-tight text-center mt-10"
        style={{
          fontSize: "clamp(18px, 2.4vw, 26px)",
          lineHeight: 1.25,
        }}
      >
        {renderHeadlineCaption()}
      </motion.div>
    </div>
  );
}
