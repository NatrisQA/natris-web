"use client";

import { motion } from "framer-motion";
import HeroVisualE from "./HeroVisualE";

/* Layout 2 — 단일 헤로안
 * HeroVisualE 완전체 + tag 배지 + 한 줄 짧은 설명
 * 메시지 전달을 시각 표현에 맡긴 Stripe/Linear 스타일 미니멀 랜딩
 */
export default function HeroLayout2() {
  return (
    <div
      className="relative w-full flex flex-col items-center justify-center px-6 py-16 bg-white rounded-xl"
      style={{ minHeight: 680 }}
    >
      {/* tag */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-10 text-[11px] font-bold tracking-[0.18em]"
        style={{
          background: "rgba(230,0,18,0.06)",
          border: "1px solid rgba(230,0,18,0.2)",
          color: "#e60012",
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#e60012" }} />
        LULU.AI
      </motion.div>

      {/* full kinetic visual */}
      <div className="w-full">
        <HeroVisualE />
      </div>

      {/* one-line tagline */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.5 }}
        className="text-center leading-relaxed max-w-2xl mx-auto mt-10"
        style={{ color: "#666", fontSize: "clamp(14px, 1.3vw, 16px)" }}
      >
        플레이어가 모이고 머물고 성장하는 커뮤니티를 만듭니다.
      </motion.p>
    </div>
  );
}
