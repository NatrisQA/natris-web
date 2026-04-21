"use client";

import { motion } from "framer-motion";

/* Minimal variant of Option E — 워드마크 + 얇은 데코 라인만 유지
 * 아래 h1/sub가 주인공 역할을 하도록 eyebrow/caption/ticker 제거
 */
const SERVICES = [
  { color: "#FF6D1F" },
  { color: "#06b6d4" },
  { color: "#10b981" },
  { color: "#3b82f6" },
  { color: "#ec4899" },
  { color: "#8b5cf6" },
];

export default function HeroVisualEMinimal() {
  const gradientStops = SERVICES.map((s) => s.color).join(", ");
  const gradient = `linear-gradient(90deg, ${gradientStops}, ${SERVICES[0].color})`;

  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      <style>{`
        @keyframes lulu-flow-min {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .lulu-kinetic-min {
          background: ${gradient};
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: lulu-flow-min 8s linear infinite;
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="lulu-kinetic-min font-black leading-none"
        style={{
          fontSize: "clamp(64px, 13vw, 132px)",
          letterSpacing: "-0.035em",
          textAlign: "center",
        }}
      >
        LULU.AI
      </motion.div>

      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: 56 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        style={{
          height: 2,
          background: gradient,
          borderRadius: 999,
          marginTop: 20,
        }}
      />
    </div>
  );
}
