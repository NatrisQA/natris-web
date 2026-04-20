"use client";

import { motion } from "framer-motion";

/* Option A — Brand Hub Constellation
 * 중앙 LULU.AI 허브 + 6개 서비스가 궤도에 배치
 */
const SERVICES = [
  { id: "pokerlulu", name: "PokerLulu", color: "#f59e0b" },
  { id: "linkplay",  name: "LinkPlay",  color: "#06b6d4" },
  { id: "moitto",    name: "Moitto",    color: "#10b981" },
  { id: "shuffleup", name: "ShuffleUp", color: "#3b82f6" },
  { id: "tubelulu",  name: "TubeLulu",  color: "#ec4899" },
  { id: "gtolulu",   name: "GTOlulu",   color: "#8b5cf6" },
];

export default function HeroVisualA() {
  const cx = 280;
  const cy = 280;
  const r = 200;
  const angles = [-90, -30, 30, 90, 150, 210];

  return (
    <div className="relative w-full max-w-[560px] mx-auto aspect-square">
      <svg viewBox="0 0 560 560" style={{ width: "100%", height: "auto", display: "block" }}>
        {/* orbital rings */}
        <circle cx={cx} cy={cy} r={r + 30} fill="none" stroke="#eee" strokeWidth="1" strokeDasharray="2 4" />
        <circle cx={cx} cy={cy} r={r - 40} fill="none" stroke="#f3f3f3" strokeWidth="1" />

        {/* connection lines */}
        {SERVICES.map((s, i) => {
          const a = (angles[i] * Math.PI) / 180;
          const x = cx + r * Math.cos(a);
          const y = cy + r * Math.sin(a);
          return (
            <g key={`line-${s.id}`}>
              <defs>
                <linearGradient id={`heroA-grad-${s.id}`} x1={x} y1={y} x2={cx} y2={cy} gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor={s.color} stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#111" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <line
                x1={x} y1={y} x2={cx} y2={cy}
                stroke={`url(#heroA-grad-${s.id})`}
                strokeWidth="1.4"
                strokeDasharray="3 5"
                strokeLinecap="round"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0" to="-16"
                  dur={`${2 + i * 0.15}s`}
                  repeatCount="indefinite"
                />
              </line>
            </g>
          );
        })}

        {/* center LULU.AI hub */}
        <circle cx={cx} cy={cy} r="86" fill="#fff" stroke="#e60012" strokeWidth="1.4" strokeDasharray="2 4" opacity="0.3" />
        <circle cx={cx} cy={cy} r="70" fill="#111" />
        <defs>
          <radialGradient id="heroA-glow" cx="50%" cy="40%">
            <stop offset="0%" stopColor="#e60012" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#e60012" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={cx} cy={cy} r="70" fill="url(#heroA-glow)" />
        <text
          x={cx} y={cy - 2}
          fontSize="20" textAnchor="middle" fill="#fff"
          fontWeight="900" fontFamily="sans-serif" letterSpacing="0.06em"
        >
          LULU.AI
        </text>
        <text
          x={cx} y={cy + 18}
          fontSize="8" textAnchor="middle" fill="#ff8c42"
          fontWeight="800" fontFamily="sans-serif" letterSpacing="0.24em"
        >
          BRAND HUB
        </text>

        {/* service nodes */}
        {SERVICES.map((s, i) => {
          const a = (angles[i] * Math.PI) / 180;
          const x = cx + r * Math.cos(a);
          const y = cy + r * Math.sin(a);
          return (
            <motion.g
              key={`node-${s.id}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
            >
              <circle cx={x} cy={y} r="38" fill="#fff" stroke={s.color} strokeWidth="1.3" opacity="0.3" />
              <circle cx={x} cy={y} r="30" fill={`${s.color}18`} stroke={s.color} strokeWidth="1.6" />
              <text
                x={x} y={y + 3}
                fontSize="9" textAnchor="middle" fill={s.color}
                fontWeight="900" fontFamily="sans-serif" letterSpacing="0.02em"
              >
                {s.name.toUpperCase()}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
