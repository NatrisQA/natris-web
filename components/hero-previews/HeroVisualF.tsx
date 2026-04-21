"use client";

import { motion } from "framer-motion";

/* Option F — Logo Mark + Service Aura
 * 레퍼런스: Airbnb Bélo, Figma multi-color mark, Spotify wave
 * 커스텀 LULU 로고마크 중앙 + 6개 서비스 색상 halo 회전
 */
const SERVICES = [
  { name: "PokerLulu", color: "#FF6D1F" },
  { name: "LinkPlay",  color: "#06b6d4" },
  { name: "Moitto",    color: "#10b981" },
  { name: "ShuffleUp", color: "#3b82f6" },
  { name: "TubeLulu",  color: "#ec4899" },
  { name: "GTOlulu",   color: "#8b5cf6" },
];

export default function HeroVisualF() {
  const conic = `conic-gradient(from 0deg,
    ${SERVICES[0].color},
    ${SERVICES[1].color},
    ${SERVICES[2].color},
    ${SERVICES[3].color},
    ${SERVICES[4].color},
    ${SERVICES[5].color},
    ${SERVICES[0].color})`;

  return (
    <div
      className="relative w-full max-w-[560px] mx-auto aspect-square flex items-center justify-center"
    >
      <style>{`
        @keyframes lulu-halo-spin {
          100% { transform: rotate(360deg); }
        }
        @keyframes lulu-halo-spin-rev {
          100% { transform: rotate(-360deg); }
        }
        @keyframes lulu-pulse {
          0%,100% { transform: scale(1); opacity: 0.9; }
          50%    { transform: scale(1.04); opacity: 1; }
        }
      `}</style>

      {/* Outer orbit ring with service dots */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
        style={{ animation: "lulu-halo-spin 40s linear infinite" }}
      >
        <div
          className="absolute rounded-full"
          style={{
            inset: "4%",
            border: "1px dashed #e5e5e5",
          }}
        />
        {SERVICES.map((s, i) => {
          const angle = (i * 60 - 90) * (Math.PI / 180);
          const radius = 46; /* % from center */
          const x = 50 + radius * Math.cos(angle);
          const y = 50 + radius * Math.sin(angle);
          return (
            <div
              key={s.name}
              className="absolute rounded-full"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: 10,
                height: 10,
                transform: "translate(-50%, -50%)",
                background: s.color,
                boxShadow: `0 0 0 4px ${s.color}22, 0 0 12px ${s.color}66`,
              }}
            />
          );
        })}
      </motion.div>

      {/* Conic aura — blurred service color halo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="absolute rounded-full"
        style={{
          width: "62%",
          height: "62%",
          background: conic,
          filter: "blur(26px)",
          opacity: 0.85,
          animation: "lulu-halo-spin-rev 28s linear infinite",
        }}
      />

      {/* Crisp conic ring — sharper secondary layer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.25 }}
        className="absolute rounded-full"
        style={{
          width: "48%",
          height: "48%",
          background: conic,
          opacity: 0.85,
          animation: "lulu-halo-spin 22s linear infinite",
          mask: "radial-gradient(circle, transparent 58%, #000 60%, #000 70%, transparent 72%)",
          WebkitMask: "radial-gradient(circle, transparent 58%, #000 60%, #000 70%, transparent 72%)",
        }}
      />

      {/* White disc — breathing space for logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-full flex flex-col items-center justify-center"
        style={{
          width: "40%",
          height: "40%",
          background: "#fff",
          boxShadow: "0 20px 60px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(0,0,0,0.04)",
          animation: "lulu-pulse 4s ease-in-out infinite",
        }}
      >
        {/* Custom logo glyph: rounded L with accent dot */}
        <svg
          width="46%"
          viewBox="0 0 80 80"
          fill="none"
          style={{ marginBottom: 6 }}
        >
          <defs>
            <linearGradient id="heroF-grad" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#111" />
              <stop offset="100%" stopColor="#333" />
            </linearGradient>
          </defs>
          <path
            d="M18 14 Q18 10 22 10 L30 10 Q34 10 34 14 L34 52 Q34 56 38 56 L58 56 Q62 56 62 60 L62 66 Q62 70 58 70 L22 70 Q18 70 18 66 Z"
            fill="url(#heroF-grad)"
          />
          <circle cx="62" cy="18" r="7" fill="#e60012" />
        </svg>
        <div
          className="font-black"
          style={{
            fontSize: "clamp(13px, 2.4vw, 18px)",
            letterSpacing: "0.08em",
            color: "#111",
          }}
        >
          LULU<span style={{ color: "#e60012" }}>.AI</span>
        </div>
        <div
          className="text-[8px] font-bold tracking-[0.3em] mt-1"
          style={{ color: "#999" }}
        >
          BRAND HUB
        </div>
      </motion.div>
    </div>
  );
}
