"use client";

import { useLang } from "./LangContext";
import { content } from "@/lib/i18n";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   Ecosystem Canvas
   클러스터: 포커 / 커뮤니티 / 라이브 / 대회 / AI
   사람 실루엣 + 연결선 + 파티클
───────────────────────────────────────────── */
function EcosystemCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    // 5 clusters — each represents a product/community area
    const CLUSTERS = [
      { rx: 0.13, ry: 0.48, color: "#f59e0b", people: 3, icon: "♠", label: "Poker" },
      { rx: 0.38, ry: 0.68, color: "#10b981", people: 5, icon: "★", label: "Community" },
      { rx: 0.70, ry: 0.30, color: "#06b6d4", people: 2, icon: "▶", label: "Live" },
      { rx: 0.87, ry: 0.62, color: "#3b82f6", people: 2, icon: "🏆", label: "Tournament" },
      { rx: 0.52, ry: 0.14, color: "#8b5cf6", people: 1, icon: "⬡", label: "AI" },
    ];

    // Which clusters are connected
    const LINKS = [
      [0, 1], [1, 2], [1, 3], [1, 4],
      [0, 4], [4, 2], [2, 3],
    ];

    // Particles per link
    interface Particle { from: number; to: number; t: number; speed: number; size: number }
    const particles: Particle[] = [];
    LINKS.forEach(([f, t]) => {
      for (let i = 0; i < 4; i++) {
        particles.push({ from: f, to: t, t: Math.random(), speed: 0.0007 + Math.random() * 0.0006, size: 2 + Math.random() * 2 });
      }
    });

    // Draw a simplified person silhouette
    function drawPerson(x: number, y: number, s: number, color: string, alpha: number) {
      ctx.save();
      ctx.globalAlpha = alpha;
      // head
      ctx.beginPath();
      ctx.arc(x, y - s * 1.5, s * 0.72, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      // shoulders arc
      ctx.beginPath();
      ctx.arc(x, y + s * 0.9, s * 1.15, Math.PI * 1.22, Math.PI * 1.78);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    }

    // Quadratic bezier point
    function bezierPoint(t: number, ax: number, ay: number, bx: number, by: number) {
      const mx = (ax + bx) / 2 + (by - ay) * 0.28;
      const my = (ay + by) / 2 - (bx - ax) * 0.28;
      return {
        x: (1 - t) * (1 - t) * ax + 2 * (1 - t) * t * mx + t * t * bx,
        y: (1 - t) * (1 - t) * ay + 2 * (1 - t) * t * my + t * t * by,
      };
    }

    // Chat bubble (for community cluster)
    function drawBubble(x: number, y: number, color: string, alpha: number) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.roundRect(x - 14, y - 10, 28, 16, 5);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.stroke();
      // tail
      ctx.beginPath();
      ctx.moveTo(x - 4, y + 6);
      ctx.lineTo(x - 8, y + 14);
      ctx.lineTo(x + 4, y + 6);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }

    const draw = () => {
      time += 0.014;
      ctx.clearRect(0, 0, W(), H());

      const cx = CLUSTERS.map(c => ({ ...c, px: c.rx * W(), py: c.ry * H() }));

      // ── Connection lines ──
      LINKS.forEach(([a, b]) => {
        const ca = cx[a], cb = cx[b];
        const mx = (ca.px + cb.px) / 2 + (cb.py - ca.py) * 0.28;
        const my = (ca.py + cb.py) / 2 - (cb.px - ca.px) * 0.28;

        const grad = ctx.createLinearGradient(ca.px, ca.py, cb.px, cb.py);
        grad.addColorStop(0, `${ca.color}28`);
        grad.addColorStop(0.5, `${ca.color}18`);
        grad.addColorStop(1, `${cb.color}28`);

        ctx.beginPath();
        ctx.moveTo(ca.px, ca.py);
        ctx.quadraticCurveTo(mx, my, cb.px, cb.py);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // ── Particles along connections ──
      particles.forEach(p => {
        p.t = (p.t + p.speed) % 1;
        const ca = cx[p.from], cb = cx[p.to];
        const pos = bezierPoint(p.t, ca.px, ca.py, cb.px, cb.py);
        const alpha = Math.sin(p.t * Math.PI) * 0.85;

        const grd = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, p.size * 2.5);
        grd.addColorStop(0, `${ca.color}ee`);
        grd.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.globalAlpha = alpha * 0.7;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, p.size * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = ca.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // ── Clusters ──
      cx.forEach((c, ci) => {
        // Ambient glow
        const grd = ctx.createRadialGradient(c.px, c.py, 0, c.px, c.py, 70);
        grd.addColorStop(0, `${c.color}1a`);
        grd.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(c.px, c.py, 70, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Pulsing ring
        const pulse = (Math.sin(time * 1.2 + ci * 1.3) + 1) * 0.5;
        ctx.beginPath();
        ctx.arc(c.px, c.py, 32 + pulse * 12, 0, Math.PI * 2);
        ctx.strokeStyle = `${c.color}${Math.round((0.08 + pulse * 0.12) * 255).toString(16).padStart(2, "0")}`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Inner ring
        ctx.beginPath();
        ctx.arc(c.px, c.py, 20, 0, Math.PI * 2);
        ctx.strokeStyle = `${c.color}30`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // People silhouettes arranged around center
        const angleOffset = time * 0.04 * (ci % 2 === 0 ? 1 : -1);
        for (let i = 0; i < c.people; i++) {
          const angle = (i / c.people) * Math.PI * 2 + angleOffset;
          const r = c.people === 1 ? 0 : 26;
          const px = c.px + Math.cos(angle) * r;
          const py = c.py + Math.sin(angle) * r * 0.75;
          drawPerson(px, py, 5.5, c.color, 0.62);
        }

        // Theme icon above cluster
        ctx.font = `bold 13px sans-serif`;
        ctx.fillStyle = `${c.color}bb`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.globalAlpha = 0.75 + Math.sin(time + ci) * 0.15;
        ctx.fillText(c.icon, c.px, c.py - 52);
        ctx.globalAlpha = 1;

        // Label below cluster
        ctx.font = `600 9px -apple-system, sans-serif`;
        ctx.fillStyle = `${c.color}70`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(c.label, c.px, c.py + 42);

        // Chat bubbles for community cluster
        if (ci === 1) {
          const bubbleAlpha = (Math.sin(time * 1.5) + 1) * 0.25 + 0.15;
          drawBubble(c.px + 38, c.py - 18, c.color, bubbleAlpha);
          drawBubble(c.px - 36, c.py + 10, c.color, bubbleAlpha * 0.7);
        }

        // Card suits for poker cluster
        if (ci === 0) {
          const suits = ["♥", "♦"];
          suits.forEach((s, si) => {
            const ox = si === 0 ? -32 : 32;
            const oy = si === 0 ? -20 : 18;
            ctx.font = "12px serif";
            ctx.fillStyle = `${c.color}80`;
            ctx.globalAlpha = 0.6 + Math.sin(time + si) * 0.2;
            ctx.fillText(s, c.px + ox, c.py + oy);
            ctx.globalAlpha = 1;
          });
        }
      });

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.55 }}
    />
  );
}

/* ── Word reveal ── */
function WordReveal({ text, style, delay = 0 }: { text: string; style?: React.CSSProperties; delay?: number }) {
  const words = text.split(" ");
  return (
    <span style={{ display: "block", ...style }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: i < words.length - 1 ? "0.28em" : 0 }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "105%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: delay + i * 0.08 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ── Hero ── */
export default function Hero() {
  const { lang } = useLang();
  const t = content.hero[lang];

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center overflow-hidden px-6"
      style={{ height: "100dvh", scrollSnapAlign: "start" }}
    >
      {/* Ecosystem background */}
      <EcosystemCanvas />

      {/* Soft gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb-a absolute" style={{ top: "18%", left: "10%", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.14), transparent 65%)", filter: "blur(80px)" }} />
        <div className="orb-b absolute" style={{ bottom: "18%", right: "8%", width: "380px", height: "380px", borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.12), transparent 65%)", filter: "blur(80px)" }} />
      </div>

      {/* Center spotlight to make text readable */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 60% at 50% 50%, rgba(5,5,8,0.75) 0%, rgba(5,5,8,0.35) 60%, transparent 100%)" }} />
      {/* Edge vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, #050508 100%)" }} />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10 text-xs font-medium tracking-widest tag-flicker"
          style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.32)", color: "#a5b4fc", boxShadow: "0 0 22px rgba(99,102,241,0.18), inset 0 0 14px rgba(99,102,241,0.06)" }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          {t.tag}
        </motion.div>

        <h1 className="font-black leading-[0.92] tracking-tight mb-8" style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}>
          <WordReveal
            text={t.headline1}
            delay={0.18}
            style={{ background: "linear-gradient(135deg, #ffffff 0%, #c7d2fe 60%, #a5b4fc 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          />
          <WordReveal
            text={t.headline2}
            delay={0.32}
            style={{ background: "linear-gradient(135deg, #ec4899 0%, #a855f7 45%, #6366f1 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.62 }}
          className="text-base md:text-xl text-white/42 mb-12 whitespace-pre-line leading-relaxed max-w-lg mx-auto"
        >
          {t.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.78 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#products"
            className="btn-shimmer inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 0 28px rgba(99,102,241,0.45), inset 0 1px 0 rgba(255,255,255,0.14)" }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 50px rgba(99,102,241,0.65), inset 0 1px 0 rgba(255,255,255,0.14)" }}
            whileTap={{ scale: 0.97 }}
          >
            {t.cta}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 3L13 8L8 13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </motion.a>
          <motion.a
            href="#partnership"
            className="btn-shimmer inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.13)", color: "rgba(255,255,255,0.7)" }}
            whileHover={{ scale: 1.04, background: "rgba(255,255,255,0.09)" }}
            whileTap={{ scale: 0.97 }}
          >
            {t.cta2}
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: "1px solid rgba(255,255,255,0.13)" }}
        >
          <div className="w-1 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.32)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
