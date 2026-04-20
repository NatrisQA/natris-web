"use client";

import { motion } from "framer-motion";

/* Option B — Brand Wall
 * 거대한 LULU.AI 워드마크 + 6개 서비스 색상 그라데이션 블룸 + 타이포그래피 배치
 */
const SERVICES = [
  { name: "PokerLulu", color: "#f59e0b", top: "8%",  left: "12%" },
  { name: "LinkPlay",  color: "#06b6d4", top: "10%", left: "78%" },
  { name: "Moitto",    color: "#10b981", top: "42%", left: "4%" },
  { name: "TubeLulu",  color: "#ec4899", top: "48%", left: "86%" },
  { name: "ShuffleUp", color: "#3b82f6", top: "82%", left: "18%" },
  { name: "GTOlulu",   color: "#8b5cf6", top: "84%", left: "72%" },
];

export default function HeroVisualB() {
  return (
    <div
      className="relative w-full max-w-[560px] mx-auto aspect-square rounded-3xl overflow-hidden"
      style={{
        background: "#0a0a0a",
        boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
      }}
    >
      {/* color bloom background */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 15% 15%, rgba(245,158,11,0.38), transparent 40%),
            radial-gradient(circle at 82% 18%, rgba(6,182,212,0.38), transparent 40%),
            radial-gradient(circle at 8% 55%, rgba(16,185,129,0.32), transparent 40%),
            radial-gradient(circle at 90% 52%, rgba(236,72,153,0.35), transparent 40%),
            radial-gradient(circle at 22% 88%, rgba(59,130,246,0.35), transparent 40%),
            radial-gradient(circle at 75% 85%, rgba(139,92,246,0.35), transparent 40%)
          `,
          filter: "blur(4px)",
        }}
      />

      {/* subtle noise/texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      />

      {/* LULU.AI centerpiece */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        <div
          className="text-[10px] font-black tracking-[0.4em] mb-3"
          style={{ color: "rgba(255,140,66,0.85)" }}
        >
          A BRAND HUB FOR
        </div>
        <div
          className="font-black leading-none"
          style={{
            fontSize: "clamp(48px, 10vw, 86px)",
            letterSpacing: "-0.02em",
            color: "#fff",
            textShadow: "0 6px 40px rgba(230,0,18,0.4)",
          }}
        >
          LULU
          <span style={{ color: "#e60012" }}>.AI</span>
        </div>
        <div
          className="text-[10px] font-bold tracking-[0.32em] mt-3"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          SIX PLATFORMS · ONE COMMUNITY
        </div>
      </motion.div>

      {/* scattered service labels */}
      {SERVICES.map((s, i) => (
        <motion.div
          key={s.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
          className="absolute text-[10px] font-black tracking-[0.14em]"
          style={{
            top: s.top,
            left: s.left,
            transform: "translate(-50%, -50%)",
            color: s.color,
            padding: "4px 10px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.06)",
            border: `1px solid ${s.color}50`,
            backdropFilter: "blur(6px)",
            whiteSpace: "nowrap",
          }}
        >
          {s.name.toUpperCase()}
        </motion.div>
      ))}
    </div>
  );
}
