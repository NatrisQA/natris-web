"use client";

import { useLang } from "./LangContext";
import { content } from "@/lib/i18n";
import { motion } from "framer-motion";

/* Drop logos at /public/logos/{serviceId}.svg (or .png) and
   uncomment the matching line. If undefined, the service initial
   letter renders inside the colored dot. */
const SERVICE_LOGOS: Record<string, string | undefined> = {
  // pokerlulu: "/logos/pokerlulu.svg",
  linkplay: "/logos/linkplay.svg",
  // moitto: "/logos/moitto.svg",
  // shuffleup: "/logos/shuffleup.svg",
  // tubelulu: "/logos/tubelulu.svg",
  // gtolulu: "/logos/gtolulu.svg",
};

/* Option A — 유기적 연결 다이어그램
 * 중앙 'COMMUNITY' 허브 + 6개 서비스가 원형 궤도에 배치
 * 각 서비스 → 커뮤니티로 연결선이 흐르는 구조
 */
export default function AxesConnection() {
  const { lang } = useLang();
  const services = content.products.items;

  /* geometry */
  const cx = 400;
  const cy = 280;
  const r = 220;
  /* clockwise from top-right: pokerlulu, linkplay, moitto, shuffleup, tubelulu, gtolulu */
  const angles = [-70, -20, 45, 135, 200, -110];

  return (
    <section className="py-28 px-6" style={{ background: "#fff" }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="text-[11px] font-black tracking-[0.32em] mb-4"
            style={{ color: "var(--brand-red)" }}
          >
            CONNECTED BY COMMUNITY
          </div>
          <h2
            className="font-black tracking-tight mb-4"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "#111",
              whiteSpace: "pre-line",
              lineHeight: 1.2,
            }}
          >
            {lang === "ko"
              ? "서로 다른 서비스가\n하나의 커뮤니티로 이어집니다"
              : "Different services,\nwoven into one community"}
          </h2>
          <p className="text-[15px] max-w-2xl mx-auto leading-relaxed" style={{ color: "#666" }}>
            {lang === "ko"
              ? "여섯 개의 플랫폼은 각자의 역할을 하면서도, 커뮤니티라는 결을 따라 자연스럽게 서로를 엮어갑니다."
              : "Six platforms each play their role, tied together by the thread of community."}
          </p>
        </div>

        {/* Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: 920, margin: "0 auto" }}
        >
          <svg viewBox="0 0 800 600" style={{ width: "100%", height: "auto", display: "block" }}>
            {/* Subtle background circles */}
            <circle cx={cx} cy={cy} r={r + 40} fill="none" stroke="#eee" strokeWidth="1" strokeDasharray="2 4" />
            <circle cx={cx} cy={cy} r={r - 60} fill="none" stroke="#f3f3f3" strokeWidth="1" />

            {/* Connecting lines — with flowing dash animation */}
            {services.map((s, i) => {
              const a = (angles[i] * Math.PI) / 180;
              const x = cx + r * Math.cos(a);
              const y = cy + r * Math.sin(a);
              return (
                <g key={`line-${s.id}`}>
                  <defs>
                    <linearGradient id={`grad-${s.id}`} x1={x} y1={y} x2={cx} y2={cy} gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor={s.color} stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#e60012" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  <line
                    x1={x}
                    y1={y}
                    x2={cx}
                    y2={cy}
                    stroke={`url(#grad-${s.id})`}
                    strokeWidth="1.6"
                    strokeDasharray="3 6"
                    strokeLinecap="round"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-18"
                      dur={`${2.2 + i * 0.15}s`}
                      repeatCount="indefinite"
                    />
                  </line>
                </g>
              );
            })}

            {/* Center community node */}
            <circle cx={cx} cy={cy} r="78" fill="#fff" stroke="#e60012" strokeWidth="1.4" strokeDasharray="2 4" opacity="0.35" />
            <circle cx={cx} cy={cy} r="62" fill="#111" />
            <circle cx={cx} cy={cy} r="62" fill="url(#centerGlow)" />
            <defs>
              <radialGradient id="centerGlow" cx="50%" cy="40%">
                <stop offset="0%" stopColor="#e60012" stopOpacity="0.35" />
                <stop offset="70%" stopColor="#e60012" stopOpacity="0" />
              </radialGradient>
            </defs>
            <text
              x={cx}
              y={cy - 4}
              fontSize="13"
              textAnchor="middle"
              fill="#fff"
              fontWeight="900"
              fontFamily="sans-serif"
              letterSpacing="0.18em"
            >
              COMMUNITY
            </text>
            <text
              x={cx}
              y={cy + 16}
              fontSize="9"
              textAnchor="middle"
              fill="#ff8c42"
              fontWeight="800"
              fontFamily="sans-serif"
              letterSpacing="0.2em"
            >
              WOVEN TOGETHER
            </text>

            {/* Service nodes */}
            {services.map((s, i) => {
              const a = (angles[i] * Math.PI) / 180;
              const x = cx + r * Math.cos(a);
              const y = cy + r * Math.sin(a);
              const logo = SERVICE_LOGOS[s.id];
              return (
                <motion.g
                  key={`node-${s.id}`}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.08 }}
                >
                  {/* Outer ring */}
                  <circle cx={x} cy={y} r="42" fill="#fff" stroke={s.color} strokeWidth="1.4" opacity="0.3" />

                  {logo ? (
                    <>
                      {/* Logo plate (white bg + colored ring) */}
                      <circle cx={x} cy={y} r="32" fill="#fff" stroke={s.color} strokeWidth="1.8" />
                      <defs>
                        <clipPath id={`logo-clip-${s.id}`}>
                          <circle cx={x} cy={y} r="28" />
                        </clipPath>
                      </defs>
                      <image
                        href={logo}
                        x={x - 28}
                        y={y - 28}
                        width="56"
                        height="56"
                        clipPath={`url(#logo-clip-${s.id})`}
                        preserveAspectRatio="xMidYMid meet"
                      />
                    </>
                  ) : (
                    <>
                      {/* Fallback: service name fits inside outer ring */}
                      <circle cx={x} cy={y} r="32" fill={`${s.color}15`} stroke={s.color} strokeWidth="1.6" />
                      <text
                        x={x}
                        y={y + 4}
                        fontSize="9.5"
                        textAnchor="middle"
                        fill={s.color}
                        fontWeight="900"
                        fontFamily="sans-serif"
                        letterSpacing="0.02em"
                      >
                        {s.name.toUpperCase()}
                      </text>
                    </>
                  )}
                </motion.g>
              );
            })}
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
