"use client";

import { motion } from "framer-motion";

/* Option C — Venn + Service Tags
 * 기존 GAME/TECH/COMMUNITY 구조 유지 + 각 원 안에 해당 서비스 이름 태그 삽입
 */
export default function HeroVisualC() {
  const AXIS_GAME = "#e63946";
  const AXIS_COMM = "#ff8c42";
  const AXIS_TECH = "#00a3cc";

  return (
    <div className="relative w-full max-w-[560px] mx-auto aspect-[1/0.85] pointer-events-none">
      {/* Venn circles */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
        className="absolute inset-0"
        style={{ mixBlendMode: "multiply" }}
      >
        <div
          className="absolute rounded-full"
          style={{
            left: "8%", top: "8%",
            width: "52%", height: "64%",
            background: AXIS_GAME,
            opacity: 0.78,
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            right: "8%", top: "8%",
            width: "52%", height: "64%",
            background: AXIS_TECH,
            opacity: 0.78,
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            left: "24%", bottom: "0%",
            width: "52%", height: "64%",
            background: AXIS_COMM,
            opacity: 0.88,
          }}
        />
      </motion.div>

      {/* Axis labels — top of each circle */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.0 }}
        className="absolute font-black tracking-[0.22em] text-white/95"
        style={{
          left: "22%", top: "16%",
          transform: "translate(-50%, -50%)",
          fontSize: "clamp(10px, 1.6vw, 12px)",
          textShadow: "0 1px 6px rgba(0,0,0,0.3)",
        }}
      >
        GAME
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute font-black tracking-[0.22em] text-white/95"
        style={{
          left: "78%", top: "16%",
          transform: "translate(-50%, -50%)",
          fontSize: "clamp(10px, 1.6vw, 12px)",
          textShadow: "0 1px 6px rgba(0,0,0,0.3)",
        }}
      >
        TECH
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute font-black tracking-[0.22em] text-white/95"
        style={{
          left: "50%", top: "92%",
          transform: "translate(-50%, -50%)",
          fontSize: "clamp(10px, 1.6vw, 12px)",
          textShadow: "0 1px 6px rgba(0,0,0,0.3)",
        }}
      >
        COMMUNITY
      </motion.div>

      {/* Service tags — inside each circle's unique zone */}
      {/* GAME: PokerLulu, LinkPlay */}
      <motion.div
        initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.3 }}
        className="absolute text-[10px] font-bold tracking-[0.1em]"
        style={{
          left: "18%", top: "32%",
          transform: "translate(-50%, -50%)",
          color: "#fff",
          background: "rgba(0,0,0,0.25)",
          padding: "2px 8px",
          borderRadius: 999,
          backdropFilter: "blur(4px)",
        }}
      >
        PokerLulu
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.4 }}
        className="absolute text-[10px] font-bold tracking-[0.1em]"
        style={{
          left: "22%", top: "46%",
          transform: "translate(-50%, -50%)",
          color: "#fff",
          background: "rgba(0,0,0,0.25)",
          padding: "2px 8px",
          borderRadius: 999,
          backdropFilter: "blur(4px)",
        }}
      >
        LinkPlay
      </motion.div>

      {/* TECH: TubeLulu, GTOlulu */}
      <motion.div
        initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.5 }}
        className="absolute text-[10px] font-bold tracking-[0.1em]"
        style={{
          left: "82%", top: "32%",
          transform: "translate(-50%, -50%)",
          color: "#fff",
          background: "rgba(0,0,0,0.25)",
          padding: "2px 8px",
          borderRadius: 999,
          backdropFilter: "blur(4px)",
        }}
      >
        TubeLulu
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.6 }}
        className="absolute text-[10px] font-bold tracking-[0.1em]"
        style={{
          left: "78%", top: "46%",
          transform: "translate(-50%, -50%)",
          color: "#fff",
          background: "rgba(0,0,0,0.25)",
          padding: "2px 8px",
          borderRadius: 999,
          backdropFilter: "blur(4px)",
        }}
      >
        GTOlulu
      </motion.div>

      {/* COMMUNITY: Moitto, ShuffleUp */}
      <motion.div
        initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.7 }}
        className="absolute text-[10px] font-bold tracking-[0.1em]"
        style={{
          left: "38%", top: "78%",
          transform: "translate(-50%, -50%)",
          color: "#fff",
          background: "rgba(0,0,0,0.25)",
          padding: "2px 8px",
          borderRadius: 999,
          backdropFilter: "blur(4px)",
        }}
      >
        Moitto
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.8 }}
        className="absolute text-[10px] font-bold tracking-[0.1em]"
        style={{
          left: "62%", top: "78%",
          transform: "translate(-50%, -50%)",
          color: "#fff",
          background: "rgba(0,0,0,0.25)",
          padding: "2px 8px",
          borderRadius: 999,
          backdropFilter: "blur(4px)",
        }}
      >
        ShuffleUp
      </motion.div>

      {/* Center LULU.AI badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
      >
        <div
          className="px-4 py-2 rounded-full text-[13px] font-black tracking-[0.12em]"
          style={{
            background: "#fff",
            color: "#111",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
          }}
        >
          LULU.AI
        </div>
      </motion.div>
    </div>
  );
}
