"use client";

import { useLang } from "./LangContext";
import { content } from "@/lib/i18n";
import { motion } from "framer-motion";

/* Option C — 비전 스테이트먼트 + 대형 비주얼
 * 감성적인 큰 한 문장 + 6개 서비스가 흐르는 추상 웨이브
 */
export default function AxesVision() {
  const { lang } = useLang();
  const services = content.products.items;

  return (
    <section className="py-28 px-6" style={{ background: "#fafafa" }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Variant label */}
        <div className="text-center mb-8">
          <span
            className="inline-block text-[10px] font-black tracking-[0.24em] px-3 py-1.5 rounded-full"
            style={{ background: "#111", color: "#fff" }}
          >
            방향 C · 비전 스테이트먼트
          </span>
        </div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div
            className="text-[11px] font-black tracking-[0.32em]"
            style={{ color: "var(--brand-red)" }}
          >
            OUR VISION
          </div>
        </motion.div>

        {/* Big vision statement */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center font-black tracking-tight mb-6"
          style={{
            fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)",
            color: "#111",
            lineHeight: 1.12,
          }}
        >
          {lang === "ko" ? (
            <>
              플레이어의 모든 순간을
              <br />
              <span style={{ color: "var(--brand-red)" }}>커뮤니티</span>로 잇습니다
            </>
          ) : (
            <>
              Every player moment,
              <br />
              woven into <span style={{ color: "var(--brand-red)" }}>community</span>
            </>
          )}
        </motion.h2>

        {/* Supporting line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center max-w-2xl mx-auto text-[15px] leading-relaxed mb-16"
          style={{ color: "#555" }}
        >
          {lang === "ko"
            ? "게임을 하고, 관계를 쌓고, 함께 성장하는 여정. 여섯 서비스가 하나의 커뮤니티로 흐릅니다."
            : "Play, connect, grow together. Six services flow as one community."}
        </motion.p>

        {/* Abstract weave visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <svg
            viewBox="0 0 1200 320"
            preserveAspectRatio="xMidYMid meet"
            style={{ width: "100%", height: "auto", display: "block" }}
          >
            <defs>
              <linearGradient id="wave-a" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#e60012" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="wave-b" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.75" />
                <stop offset="50%" stopColor="#ff8c42" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.75" />
              </linearGradient>
              <linearGradient id="wave-c" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#e60012" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.7" />
              </linearGradient>
            </defs>

            {/* Three flowing waves crossing */}
            <path
              d="M0 220 Q 200 80, 400 180 T 800 140 T 1200 200"
              stroke="url(#wave-a)"
              strokeWidth="2.4"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M0 140 Q 220 250, 440 150 T 820 220 T 1200 160"
              stroke="url(#wave-b)"
              strokeWidth="2.4"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M0 180 Q 260 100, 480 220 T 860 140 T 1200 180"
              stroke="url(#wave-c)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* Subtle background waves */}
            <path
              d="M0 240 Q 300 160, 600 220 T 1200 200"
              stroke="#00000008"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M0 100 Q 300 180, 600 120 T 1200 140"
              stroke="#00000008"
              strokeWidth="1"
              fill="none"
            />

            {/* 6 service nodes along the flow — alternating heights */}
            {services.map((s, i) => {
              const x = 100 + i * 200;
              const y = 160 + Math.sin(i * 1.4 + 0.5) * 55;
              return (
                <motion.g
                  key={s.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                >
                  {/* soft halo */}
                  <circle cx={x} cy={y} r="34" fill={`${s.color}18`} />
                  {/* ring */}
                  <circle cx={x} cy={y} r="22" fill="#fff" stroke={s.color} strokeWidth="2" />
                  {/* dot */}
                  <circle cx={x} cy={y} r="9" fill={s.color} />
                  {/* label */}
                  <text
                    x={x}
                    y={y + 48}
                    fontSize="12"
                    textAnchor="middle"
                    fill="#111"
                    fontWeight="900"
                    fontFamily="sans-serif"
                  >
                    {s.name}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 text-[13px] max-w-2xl mx-auto leading-relaxed"
          style={{ color: "#999" }}
        >
          {lang === "ko"
            ? "모이는 순간, 머무는 자리, 성장의 동행. 여섯 서비스는 분리된 제품이 아니라 한 사람의 여정입니다."
            : "The moment we meet, the place we belong, the growth we share. Not six separate products, but one player's journey."}
        </motion.p>
      </div>
    </section>
  );
}
