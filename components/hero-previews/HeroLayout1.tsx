"use client";

import { motion } from "framer-motion";
import HeroVisualEMinimal from "./HeroVisualEMinimal";

/* Layout 1 — 통합안
 * 상단: 단순화한 LULU.AI 워드마크 (브랜드 시그니처 역할)
 * 하단: tag + h1 + sub 그대로 (메시지 주인공)
 */
export default function HeroLayout1() {
  return (
    <div
      className="relative w-full flex flex-col items-center justify-center px-6 py-16 bg-white rounded-xl"
      style={{ minHeight: 680 }}
    >
      {/* Top: brand signature */}
      <div className="w-full mb-14">
        <HeroVisualEMinimal />
      </div>

      {/* Bottom: copy */}
      <div className="text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-[11px] font-bold tracking-[0.18em]"
          style={{
            background: "rgba(230,0,18,0.06)",
            border: "1px solid rgba(230,0,18,0.2)",
            color: "#e60012",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#e60012" }} />
          LULU.AI
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="font-black leading-[1.12] tracking-tight mb-5"
          style={{ fontSize: "clamp(1.7rem, 3.4vw, 2.6rem)", color: "#111" }}
        >
          <span className="block">
            <span style={{ color: "#e63946" }}>모이고</span>,{" "}
            <span style={{ color: "#ff8c42" }}>머물고</span>,{" "}
            <span style={{ color: "#00a3cc" }}>성장하는</span>
          </span>
          <span className="block">커뮤니티를 만듭니다</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          className="whitespace-pre-line leading-relaxed max-w-xl mx-auto"
          style={{ color: "#666", fontSize: "clamp(14px, 1.3vw, 16px)" }}
        >
          {"소셜 포커, 방송 인터랙티브 미니게임,\n소모임·대회 운영, 지식 플랫폼, AI 솔루션.\n플레이어가 모이는 모든 접점을 잇습니다."}
        </motion.p>
      </div>
    </div>
  );
}
