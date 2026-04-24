"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLang, LangProvider } from "@/components/LangContext";
import { content } from "@/lib/i18n";

/* ────────────────────────────────────────────────────────── */
/*  /style-compare — Full-fidelity Dark Preview               */
/*  메인 페이지(/) 의 섹션 순서·컴포넌트 구성 그대로,          */
/*  색만 다크 톤으로 바꿔 비교 용도로 렌더링                   */
/* ────────────────────────────────────────────────────────── */

const DARK_BG = "#0a0a12";
const DARK_BG_ALT = "#08080f";
const CARD_BG = "#14141f";
const BORDER = "rgba(255,255,255,0.08)";
const BORDER_STRONG = "rgba(255,255,255,0.14)";
const TEXT = "#f5f5f7";
const TEXT_MUTED = "rgba(255,255,255,0.62)";
const TEXT_DIM = "rgba(255,255,255,0.4)";
const BRAND = "#ff5a6a";

const AXIS_COLOR: Record<string, string> = {
  game: "#e63946",
  community: "#ff8c42",
  tech: "#00a3cc",
};
const AXIS_LABEL: Record<string, string> = {
  game: "GAME",
  community: "COMMUNITY",
  tech: "TECH",
};

const sectionReveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

export default function StyleComparePage() {
  return (
    <LangProvider>
      <PreviewShell />
    </LangProvider>
  );
}

function PreviewShell() {
  const { lang } = useLang();
  return (
    <>
      <div
        id="scroll-container"
        className="relative"
        style={{ height: "100dvh", overflowY: "auto", background: DARK_BG }}
      >
        <PreviewBanner />
        <DarkNav />
        <DarkHero />
        <motion.section id="axes" {...sectionReveal}>
          <DarkAxesConnection />
        </motion.section>
        <motion.section id="products" {...sectionReveal}>
          <DarkProjects />
        </motion.section>
        <motion.section id="about" {...sectionReveal}>
          <DarkAbout />
        </motion.section>
        <motion.section id="news" {...sectionReveal}>
          <DarkNews />
        </motion.section>
        <DarkFooter />
      </div>
      <DarkScrollDots lang={lang} />
    </>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  Preview banner — 현재 프리뷰 라벨 + "메인 페이지로" 링크  */
/* ────────────────────────────────────────────────────────── */
function PreviewBanner() {
  return (
    <div
      className="sticky top-0 z-[60] flex items-center justify-between px-6 py-2"
      style={{
        background: "linear-gradient(90deg, rgba(255,109,31,0.14), rgba(139,92,246,0.14))",
        borderBottom: `1px solid ${BORDER}`,
        backdropFilter: "blur(14px)",
      }}
    >
      <div className="flex items-center gap-3">
        <span
          className="text-[10px] font-black tracking-[0.22em] px-2 py-1 rounded-full"
          style={{ background: "rgba(255,90,106,0.18)", color: BRAND, border: `1px solid ${BRAND}55` }}
        >
          DARK PREVIEW
        </span>
        <span className="text-[11px]" style={{ color: TEXT_MUTED }}>
          메인 페이지(/) 구조 · 컬러만 다크 톤으로 렌더
        </span>
      </div>
      <Link href="/" className="text-[11px] font-bold" style={{ color: TEXT }}>
        → 기존 페이지 보기 (/)
      </Link>
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  Dark Nav                                                  */
/* ────────────────────────────────────────────────────────── */
function DarkNav() {
  const { lang, toggle } = useLang();
  const t = content.nav[lang];
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const c = document.getElementById("scroll-container");
    if (!c) return;
    const onScroll = () => setElevated(c.scrollTop > 16);
    c.addEventListener("scroll", onScroll, { passive: true });
    return () => c.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#products", label: t.products },
    { href: "#about", label: t.about },
    { href: "#news", label: lang === "ko" ? "소식" : "News" },
  ];

  const handleNav = (href: string) => {
    if (!href.startsWith("#")) return;
    const container = document.getElementById("scroll-container");
    const target = document.getElementById(href.slice(1));
    if (container && target) container.scrollTo({ top: target.offsetTop - 72, behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{
          background: elevated ? "rgba(10,10,18,0.78)" : "rgba(10,10,18,0.4)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: elevated ? `1px solid ${BORDER}` : "1px solid transparent",
          transition: "border-color 0.3s, background 0.3s",
        }}
      >
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            const c = document.getElementById("scroll-container");
            if (c) c.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2"
        >
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-black"
            style={{ background: BRAND, color: "#fff" }}
          >
            L
          </div>
          <span className="font-black tracking-[0.02em] text-[15px]" style={{ color: TEXT }}>
            LULU.AI
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNav(item.href);
              }}
              className="text-sm font-semibold"
              style={{ color: TEXT_MUTED }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold"
            style={{ border: `1px solid ${BORDER_STRONG}`, color: TEXT_MUTED }}
          >
            <span style={{ color: lang === "ko" ? TEXT : TEXT_DIM }}>KO</span>
            <span style={{ color: TEXT_DIM }}>|</span>
            <span style={{ color: lang === "en" ? TEXT : TEXT_DIM }}>EN</span>
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col items-center justify-center w-8 h-8 gap-[5px]"
            aria-label="Menu"
          >
            <span
              className="block w-5 h-[1.5px] transition-all duration-300"
              style={{ background: TEXT, ...(open ? { transform: "translateY(3.25px) rotate(45deg)" } : {}) }}
            />
            <span
              className="block w-5 h-[1.5px] transition-all duration-300"
              style={{ background: TEXT, ...(open ? { transform: "translateY(-3.25px) rotate(-45deg)" } : {}) }}
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
            style={{ background: "rgba(10,10,18,0.97)", backdropFilter: "blur(24px)" }}
          >
            {links.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ delay: 0.06 * i }}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  handleNav(item.href);
                }}
                className="text-2xl font-black"
                style={{ color: TEXT }}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  Dark Hero — 실제 Hero와 동일 구조 (HeroVisualE 재사용)    */
/* ────────────────────────────────────────────────────────── */
function DarkHero() {
  const { lang } = useLang();
  const t = content.hero[lang];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const container = document.getElementById("scroll-container");
    if (!container) return;
    const onScroll = () => setScrolled(container.scrollTop > 80);
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center overflow-hidden px-6"
      style={{ minHeight: "100dvh", background: DARK_BG }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,109,31,0.08), transparent 60%), radial-gradient(ellipse 80% 60% at 50% 100%, rgba(139,92,246,0.1), transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-[1200px] w-full mx-auto flex flex-col items-center gap-10 pt-20 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.18em]"
          style={{
            background: "rgba(255,90,106,0.12)",
            border: `1px solid ${BRAND}55`,
            color: BRAND,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: BRAND }} />
          {t.tag.toUpperCase()}
        </motion.div>

        {/* Kinetic brand typography — 기존 HeroVisualE 는 라이트 톤 전용 (color: #111 하드코딩)이라
            다크 전용 인라인 래퍼로 교체 */}
        <div className="w-full flex items-center justify-center">
          <DarkHeroVisual />
        </div>

        <motion.p
          key={lang}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.6 }}
          className="whitespace-pre-line leading-relaxed max-w-2xl mx-auto text-center"
          style={{ color: TEXT_MUTED, fontSize: "clamp(15px, 1.4vw, 17px)" }}
        >
          {t.sub}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ delay: scrolled ? 0 : 1.4, duration: 0.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] font-bold tracking-[0.3em]" style={{ color: TEXT_DIM }}>
          SCROLL
        </span>
        <div className="w-px h-8" style={{ background: TEXT_DIM }} />
      </motion.div>
    </section>
  );
}

/* Dark variant of HeroVisualE — 기존과 동일 애니메이션/타이포, 다크 톤으로 재색상 */
function DarkHeroVisual() {
  const { lang } = useLang();
  const SERVICES = [
    { name: "PokerLulu", color: "#FF6D1F" },
    { name: "LinkPlay", color: "#06b6d4" },
    { name: "ShuffleUp", color: "#3b82f6" },
    { name: "TubeLulu", color: "#ec4899" },
    { name: "GTOlulu", color: "#8b5cf6" },
  ];
  const VERB_COLORS = { gather: "#ff6b7a", stay: "#ffa258", grow: "#4dd4e8" };
  const gradient = `linear-gradient(90deg, ${SERVICES.map((s) => s.color).join(", ")}, ${SERVICES[0].color})`;

  return (
    <div className="relative w-full max-w-[720px] mx-auto flex flex-col items-center justify-center" style={{ padding: "32px 24px" }}>
      <style>{`
        @keyframes lulu-flow-dark { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        @keyframes lulu-ticker-dark { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .lulu-kinetic-dark {
          background: ${gradient};
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: lulu-flow-dark 8s linear infinite;
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-[11px] font-black tracking-[0.42em]"
        style={{ color: TEXT_DIM, marginBottom: 20 }}
      >
        A BRAND FAMILY OF
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="lulu-kinetic-dark font-black leading-none"
        style={{ fontSize: "clamp(72px, 15vw, 152px)", letterSpacing: "-0.035em", textAlign: "center" }}
      >
        LULU.AI
      </motion.div>

      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: 64 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        style={{ height: 2, background: gradient, borderRadius: 999, marginTop: 28, marginBottom: 24 }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: 560,
          overflow: "hidden",
          maskImage: "linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)",
        }}
      >
        <div
          className="flex gap-8"
          style={{ whiteSpace: "nowrap", animation: "lulu-ticker-dark 22s linear infinite", width: "max-content" }}
        >
          {[...SERVICES, ...SERVICES].map((s, i) => (
            <span
              key={i}
              className="text-[12px] font-black tracking-[0.22em] flex items-center gap-3"
              style={{ color: TEXT_MUTED }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: s.color,
                }}
              />
              {s.name.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      <motion.div
        key={lang}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.3 }}
        className="font-black tracking-tight text-center mt-10"
        style={{ fontSize: "clamp(18px, 2.4vw, 26px)", lineHeight: 1.25 }}
      >
        {lang === "ko" ? (
          <>
            <span style={{ display: "block" }}>
              <span style={{ color: VERB_COLORS.gather }}>모이고</span>
              <span style={{ color: TEXT }}>, </span>
              <span style={{ color: VERB_COLORS.stay }}>머물고</span>
              <span style={{ color: TEXT }}>, </span>
              <span style={{ color: VERB_COLORS.grow }}>성장하는</span>
            </span>
            <span style={{ display: "block", color: TEXT }}>커뮤니티를 만듭니다</span>
          </>
        ) : (
          <>
            <span style={{ display: "block" }}>
              <span style={{ color: VERB_COLORS.gather }}>Gather</span>
              <span style={{ color: TEXT }}>, </span>
              <span style={{ color: VERB_COLORS.stay }}>Stay</span>
              <span style={{ color: TEXT }}>, and </span>
              <span style={{ color: VERB_COLORS.grow }}>Grow</span>
            </span>
            <span style={{ display: "block", color: TEXT }}>We build the community</span>
          </>
        )}
      </motion.div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  Dark AxesConnection — 동일 다이어그램, 다크 톤             */
/* ────────────────────────────────────────────────────────── */
function DarkAxesConnection() {
  const { lang } = useLang();
  const services = content.products.items;
  const cx = 400;
  const cy = 280;
  const r = 220;
  const angles = [-70, -20, 45, 135, 200, -110];

  return (
    <section className="py-28 px-6" style={{ background: DARK_BG }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <div className="text-[11px] font-black tracking-[0.32em] mb-4" style={{ color: BRAND }}>
            CONNECTED BY COMMUNITY
          </div>
          <h2
            className="font-black tracking-tight mb-4"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: TEXT,
              whiteSpace: "pre-line",
              lineHeight: 1.2,
            }}
          >
            {lang === "ko"
              ? "서로 다른 서비스가\n하나의 커뮤니티로 이어집니다"
              : "Different services,\nwoven into one community"}
          </h2>
          <p className="text-[15px] max-w-2xl mx-auto leading-relaxed" style={{ color: TEXT_MUTED }}>
            {lang === "ko"
              ? "여섯 개의 플랫폼은 각자의 역할을 하면서도, 커뮤니티라는 결을 따라 자연스럽게 서로를 엮어갑니다."
              : "Six platforms each play their role, tied together by the thread of community."}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: 920, margin: "0 auto" }}
        >
          <svg viewBox="0 0 800 600" style={{ width: "100%", height: "auto", display: "block" }}>
            <circle cx={cx} cy={cy} r={r + 40} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="2 4" />
            <circle cx={cx} cy={cy} r={r - 60} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

            {services.map((s, i) => {
              const a = (angles[i] * Math.PI) / 180;
              const x = cx + r * Math.cos(a);
              const y = cy + r * Math.sin(a);
              return (
                <g key={`line-${s.id}`}>
                  <defs>
                    <linearGradient id={`grad-dark-${s.id}`} x1={x} y1={y} x2={cx} y2={cy} gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor={s.color} stopOpacity="1" />
                      <stop offset="100%" stopColor={BRAND} stopOpacity="0.35" />
                    </linearGradient>
                  </defs>
                  <line
                    x1={x}
                    y1={y}
                    x2={cx}
                    y2={cy}
                    stroke={`url(#grad-dark-${s.id})`}
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

            <circle cx={cx} cy={cy} r="78" fill="none" stroke={BRAND} strokeWidth="1.4" strokeDasharray="2 4" opacity="0.55" />
            <circle cx={cx} cy={cy} r="62" fill="#0f0f1c" />
            <circle cx={cx} cy={cy} r="62" fill="url(#centerGlowDark)" />
            <defs>
              <radialGradient id="centerGlowDark" cx="50%" cy="40%">
                <stop offset="0%" stopColor={BRAND} stopOpacity="0.6" />
                <stop offset="70%" stopColor={BRAND} stopOpacity="0" />
              </radialGradient>
            </defs>
            <text
              x={cx}
              y={cy - 4}
              fontSize="13"
              textAnchor="middle"
              fill={TEXT}
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
              fill="#ffa258"
              fontWeight="800"
              fontFamily="sans-serif"
              letterSpacing="0.2em"
            >
              WOVEN TOGETHER
            </text>

            {services.map((s, i) => {
              const a = (angles[i] * Math.PI) / 180;
              const x = cx + r * Math.cos(a);
              const y = cy + r * Math.sin(a);
              return (
                <motion.g
                  key={`node-${s.id}`}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.08 }}
                >
                  <circle cx={x} cy={y} r="42" fill="none" stroke={s.color} strokeWidth="1.4" opacity="0.45" />
                  <circle cx={x} cy={y} r="32" fill={`${s.color}25`} stroke={s.color} strokeWidth="1.6" />
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
                </motion.g>
              );
            })}
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  Dark Projects — 기존 Projects 와 동일 (carousel + 카드)   */
/*  변경점: 배경 다크, 호버시 scale(1.04) + translateY(-10)    */
/* ────────────────────────────────────────────────────────── */
function DarkProjects() {
  const { lang } = useLang();
  const items = content.products.items;
  const headline = content.products.headline[lang];
  const sub = content.products.sub[lang];
  const label = content.products.label[lang];

  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [centerId, setCenterId] = useState<string | null>(null);

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const pickCenter = () => {
      const cards = Array.from(scroller.querySelectorAll<HTMLElement>("[data-card]"));
      if (cards.length === 0) return;
      const scRect = scroller.getBoundingClientRect();
      const scCenter = scRect.left + scRect.width / 2;
      let bestId = "";
      let bestDist = Infinity;
      for (const c of cards) {
        const r = c.getBoundingClientRect();
        const cCenter = r.left + r.width / 2;
        const dist = Math.abs(cCenter - scCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = c.dataset.id || "";
        }
      }
      if (bestId) setCenterId(bestId);
    };
    pickCenter();
    scroller.addEventListener("scroll", pickCenter, { passive: true });
    window.addEventListener("resize", pickCenter);
    return () => {
      scroller.removeEventListener("scroll", pickCenter);
      window.removeEventListener("resize", pickCenter);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="py-28 px-6" style={{ background: DARK_BG_ALT }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
          <div>
            <div className="text-[11px] font-black tracking-[0.32em] mb-3" style={{ color: BRAND }}>
              {label}
            </div>
            <h2 className="font-black tracking-tight mb-3" style={{ fontSize: "clamp(1.9rem, 4.2vw, 3rem)", color: TEXT }}>
              {headline}
            </h2>
            <p className="max-w-2xl leading-relaxed" style={{ fontSize: "15px", color: TEXT_MUTED }}>
              {sub}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => scrollBy(-1)}
              disabled={atStart}
              aria-label="Previous"
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all"
              style={{
                background: "transparent",
                border: `1px solid ${BORDER_STRONG}`,
                color: TEXT,
                opacity: atStart ? 0.3 : 1,
                cursor: atStart ? "default" : "pointer",
              }}
            >
              ←
            </button>
            <button
              onClick={() => scrollBy(1)}
              disabled={atEnd}
              aria-label="Next"
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all"
              style={{
                background: "#fff",
                color: "#111",
                opacity: atEnd ? 0.3 : 1,
                cursor: atEnd ? "default" : "pointer",
              }}
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory"
          style={{ scrollPaddingLeft: 0 }}
        >
          {items.map((p, i) => {
            const axis = (p as typeof p & { axis: "game" | "community" | "tech" }).axis;
            const axisColor = AXIS_COLOR[axis];
            const axisLabel = AXIS_LABEL[axis];
            const isActive = (hoveredId ?? centerId) === p.id;
            return (
              <motion.article
                key={p.id}
                data-card
                data-id={p.id}
                data-active={isActive || undefined}
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId((h) => (h === p.id ? null : h))}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className="rounded-2xl flex-shrink-0 snap-start p-7 flex flex-col relative overflow-hidden"
                style={{
                  background: CARD_BG,
                  border: `1px solid ${isActive ? `${p.color}90` : BORDER}`,
                  width: "min(88vw, 340px)",
                  minHeight: 620,
                  boxShadow: isActive
                    ? `0 40px 90px ${p.color}45, 0 20px 40px rgba(0,0,0,0.5)`
                    : "0 2px 10px rgba(0,0,0,0.3)",
                  transform: isActive ? "translateY(-10px) scale(1.04)" : "translateY(0) scale(1)",
                  transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease, border-color 0.3s ease",
                  cursor: "pointer",
                  zIndex: isActive ? 10 : 1,
                }}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.4s ease",
                    background: `radial-gradient(600px circle at 0% 0%, ${p.color}22, transparent 40%), radial-gradient(600px circle at 100% 100%, ${axisColor}18, transparent 40%)`,
                  }}
                />

                <div
                  className="-mx-7 -mt-7 mb-6 relative"
                  style={{
                    transform: isActive ? "scale(1.03)" : "scale(1)",
                    transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
                    transformOrigin: "center top",
                  }}
                >
                  <DarkServiceVisual id={p.id} color={p.color} />
                  <div
                    aria-hidden
                    className="absolute left-0 right-0 bottom-0 pointer-events-none"
                    style={{ height: 32, background: `linear-gradient(to bottom, transparent, ${CARD_BG})` }}
                  />
                </div>

                <div className="flex items-center justify-between mb-6 relative">
                  <span
                    className="text-[10px] font-black tracking-[0.16em] px-2.5 py-1 rounded-full"
                    style={{
                      background: isActive ? axisColor : `${axisColor}22`,
                      color: isActive ? "#fff" : axisColor,
                      border: `1px solid ${isActive ? axisColor : `${axisColor}55`}`,
                      transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease",
                    }}
                  >
                    {axisLabel}
                  </span>
                  <span
                    className="text-[11px] font-bold"
                    style={{ color: isActive ? TEXT : TEXT_DIM, transition: "color 0.3s ease" }}
                  >
                    {p.status[lang]}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4 relative">
                  <div
                    style={{
                      transform: isActive ? "scale(1.12) rotate(-3deg)" : "scale(1) rotate(0)",
                      transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    <DarkIconLogo id={p.id} color={p.color} size={44} />
                  </div>
                  <div>
                    <h3
                      className="text-lg font-black leading-none mb-1"
                      style={{ color: isActive ? p.color : TEXT, transition: "color 0.3s ease" }}
                    >
                      {p.name}
                    </h3>
                    <div className="text-[11px] font-semibold" style={{ color: TEXT_DIM }}>
                      {p.tag[lang]}
                    </div>
                  </div>
                </div>

                <p
                  className="text-[14px] leading-relaxed flex-1 mb-5 relative whitespace-pre-line"
                  style={{ color: isActive ? "rgba(255,255,255,0.85)" : TEXT_MUTED, transition: "color 0.3s ease" }}
                >
                  {p.desc[lang]}
                </p>

                <div className="flex flex-wrap gap-1.5 relative">
                  {p.badges[lang].slice(0, 3).map((b) => (
                    <span
                      key={b}
                      className="text-[10.5px] font-semibold px-2 py-1 rounded"
                      style={{
                        background: isActive ? `${p.color}22` : "rgba(255,255,255,0.06)",
                        color: isActive ? p.color : "rgba(255,255,255,0.75)",
                        transition: "background 0.3s ease, color 0.3s ease",
                      }}
                    >
                      #{b}
                    </span>
                  ))}
                </div>

                <div
                  className="rounded-full mt-5 relative"
                  style={{
                    height: isActive ? 3 : 1.5,
                    background: `linear-gradient(90deg, ${p.color}, ${p.color}55)`,
                    boxShadow: isActive ? `0 0 18px ${p.color}aa` : "none",
                    transition: "height 0.35s ease, box-shadow 0.35s ease",
                  }}
                />

                <Link
                  href={`/services/${p.id}`}
                  className="mt-5 inline-flex items-center justify-between w-full rounded-full py-2.5 px-4 text-[12.5px] font-black tracking-wide relative"
                  style={{
                    background: isActive ? p.color : "rgba(255,255,255,0.04)",
                    color: isActive ? "#fff" : TEXT,
                    border: `1px solid ${isActive ? p.color : "rgba(255,255,255,0.12)"}`,
                    transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease",
                  }}
                >
                  <span>{lang === "ko" ? "자세히 보기" : "View Details"}</span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 22,
                      height: 22,
                      borderRadius: 999,
                      background: isActive ? "rgba(255,255,255,0.22)" : p.color,
                      color: "#fff",
                      fontSize: 12,
                      transform: isActive ? "translateX(4px)" : "translateX(0)",
                      transition: "transform 0.3s ease, background 0.3s ease",
                    }}
                  >
                    →
                  </span>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* Dark ServiceVisual — 기존 패턴 동일, 배경을 다크로 */
function DarkServiceVisual({ id, color: c }: { id: string; color: string }) {
  const patterns: Record<string, React.ReactNode> = {
    pokerlulu: (
      <svg viewBox="0 0 300 170" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <circle cx="220" cy="115" r="46" fill={`${c}35`} />
        <circle cx="220" cy="115" r="32" fill={`${c}55`} />
        <circle cx="220" cy="115" r="18" fill={c} />
        <circle cx="262" cy="62" r="20" fill={`${c}40`} />
        <circle cx="176" cy="58" r="16" fill={`${c}65`} />
        <text x="48" y="90" fontSize="38" fill={`${c}cc`} fontWeight="900" fontFamily="serif">♠</text>
        <text x="92" y="128" fontSize="26" fill={`${c}88`} fontWeight="900" fontFamily="serif">♥</text>
      </svg>
    ),
    linkplay: (
      <svg viewBox="0 0 300 170" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <circle cx="72" cy="85" r="40" fill={`${c}22`} />
        <circle cx="72" cy="85" r="28" fill={`${c}3a`} />
        <image href="/logos/linkplay.svg" x="48" y="61" width="48" height="48" preserveAspectRatio="xMidYMid meet" />
        <path d="M120 85 Q145 60, 170 85 T220 85" stroke={`${c}cc`} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M120 85 Q150 45, 180 85 T240 85" stroke={`${c}88`} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M120 85 Q155 30, 190 85 T260 85" stroke={`${c}48`} strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="258" cy="85" r="5" fill={c} />
      </svg>
    ),
    shuffleup: (
      <svg viewBox="0 0 300 170" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <path d="M30 40 L70 40 L70 70 L120 70" stroke={`${c}dd`} strokeWidth="2" fill="none" />
        <path d="M30 100 L70 100 L70 70" stroke={`${c}dd`} strokeWidth="2" fill="none" />
        <path d="M30 130 L60 130" stroke={`${c}80`} strokeWidth="2" fill="none" />
        <path d="M120 70 L180 70" stroke={c} strokeWidth="2.5" fill="none" />
        <path d="M228 58 L272 58 L266 92 Q250 104, 250 104 Q250 104, 234 92 Z" fill={`${c}45`} stroke={c} strokeWidth="1.6" />
        <text x="250" y="85" fontSize="16" textAnchor="middle" fill={c} fontWeight="900" fontFamily="sans-serif">★</text>
        <rect x="244" y="110" width="12" height="16" rx="1" fill={`${c}95`} />
        <rect x="236" y="128" width="28" height="4" rx="1" fill={c} />
      </svg>
    ),
    tubelulu: (
      <svg viewBox="0 0 300 170" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <rect x="34" y="38" width="140" height="88" rx="10" fill={`${c}28`} stroke={`${c}95`} strokeWidth="1.5" />
        <path d="M92 68 L92 96 L124 82 Z" fill={c} />
        <rect x="48" y="138" width="60" height="4" rx="2" fill={`${c}70`} />
        <rect x="48" y="148" width="40" height="3" rx="1.5" fill={`${c}45`} />
        <path d="M198 80 L204 60 L210 100 L216 50 L222 95 L228 65 L234 90 L240 58 L246 88 L252 70"
          stroke={`${c}dd`} strokeWidth="1.6" fill="none" strokeLinejoin="round" />
        <circle cx="224" cy="124" r="14" fill={`${c}38`} stroke={c} strokeWidth="1.5" />
        <path d="M220 118 L220 130 L232 124 Z" fill={c} />
      </svg>
    ),
    gtolulu: (
      <svg viewBox="0 0 300 170" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <line x1="40" y1="140" x2="280" y2="140" stroke={`${c}38`} strokeWidth="1" />
        <line x1="40" y1="30" x2="40" y2="140" stroke={`${c}38`} strokeWidth="1" />
        <line x1="40" y1="100" x2="280" y2="100" stroke={`${c}22`} strokeWidth="1" strokeDasharray="2 3" />
        <line x1="40" y1="65" x2="280" y2="65" stroke={`${c}22`} strokeWidth="1" strokeDasharray="2 3" />
        <path d="M40 120 L78 85 L118 98 L156 52 L196 68 L234 34 L272 50"
          stroke={c} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="78" cy="85" r="4" fill={c} />
        <circle cx="118" cy="98" r="4" fill={c} />
        <circle cx="156" cy="52" r="5" fill={c} />
        <circle cx="196" cy="68" r="4" fill={c} />
        <circle cx="234" cy="34" r="5" fill={c} />
        <rect x="226" y="108" width="46" height="22" rx="5" fill={`${c}28`} stroke={c} strokeWidth="1" />
        <text x="249" y="124" fontSize="11" textAnchor="middle" fill={c} fontWeight="900" fontFamily="sans-serif">AI</text>
      </svg>
    ),
  };

  return (
    <div
      className="relative w-full"
      style={{
        aspectRatio: "16 / 9",
        background: `linear-gradient(135deg, ${c}35 0%, ${c}10 55%, ${CARD_BG} 100%)`,
        overflow: "hidden",
      }}
    >
      {patterns[id]}
    </div>
  );
}

function DarkIconLogo({ id, color: c, size = 44 }: { id: string; color: string; size?: number }) {
  const icons: Record<string, React.ReactNode> = {
    pokerlulu: (
      <div style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative", borderRadius: 8 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-pokerlulu.png"
          alt="PokerLulu"
          style={{
            position: "absolute",
            width: "auto",
            height: "185%",
            top: "-8%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </div>
    ),
    linkplay: (
      <div style={{ width: "100%", height: "100%", borderRadius: 8, overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logos/linkplay.svg"
          alt="LinkPlay"
          style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
        />
      </div>
    ),
    tubelulu: (
      <svg viewBox="0 0 40 40" fill="none">
        <rect x="6" y="10" width="28" height="20" rx="4" fill={`${c}22`} stroke={c} strokeWidth="1.4" />
        <path d="M18 16 L18 24 L26 20 Z" fill={c} />
        <circle cx="10" cy="32" r="2" fill={`${c}99`} />
        <circle cx="16" cy="32" r="2" fill={`${c}66`} />
      </svg>
    ),
    shuffleup: (
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M13 7 L27 7 L25 21 Q20 25 20 25 Q20 25 15 21 Z" fill={`${c}30`} stroke={c} strokeWidth="1.4" />
        <text x="20" y="20" fontSize="11" textAnchor="middle" fill={c} fontFamily="sans-serif">★</text>
        <rect x="12" y="31" width="16" height="4" rx="2" fill={c} />
      </svg>
    ),
    gtolulu: (
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M6 32 L14 18 L20 24 L28 10 L34 32" stroke={c} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="14" cy="18" r="2.5" fill={c} />
        <circle cx="20" cy="24" r="2.5" fill={c} />
        <circle cx="28" cy="10" r="2.5" fill={c} />
        <text x="20" y="37" fontSize="6" textAnchor="middle" fill={`${c}dd`} fontWeight="800" fontFamily="sans-serif">GTO</text>
      </svg>
    ),
  };
  return <div style={{ width: size, height: size, flexShrink: 0 }}>{icons[id]}</div>;
}

/* ────────────────────────────────────────────────────────── */
/*  Dark About — Mission + History Timeline                   */
/* ────────────────────────────────────────────────────────── */
function DarkAbout() {
  const { lang } = useLang();
  const t = content.about[lang];

  return (
    <section className="py-28 px-6" style={{ background: DARK_BG }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <div className="text-[11px] font-black tracking-[0.32em] mb-4" style={{ color: BRAND }}>
            {t.label}
          </div>
          <h2
            className="font-black tracking-tight mb-6 whitespace-pre-line"
            style={{ fontSize: "clamp(1.9rem, 4.2vw, 3rem)", color: TEXT, lineHeight: 1.2 }}
          >
            {t.headline}
          </h2>
          <p className="max-w-3xl mx-auto leading-relaxed" style={{ fontSize: "clamp(14px, 1.2vw, 16px)", color: TEXT_MUTED }}>
            {t.body}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 max-w-3xl mx-auto text-center"
        >
          <p
            className="whitespace-pre-line font-black tracking-tight"
            style={{ fontSize: "clamp(20px, 2.4vw, 30px)", color: TEXT, lineHeight: 1.4 }}
          >
            {t.mission.text}
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <div className="text-[11px] font-black tracking-[0.28em] mb-10 text-center" style={{ color: TEXT_DIM }}>
            HISTORY
          </div>
          <div className="relative">
            <div
              className="absolute left-[7px] top-2 bottom-2 w-px"
              style={{ background: "rgba(255,255,255,0.12)" }}
            />
            {t.milestones.map((ms, i) => {
              const isLast = i === t.milestones.length - 1;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="relative pl-10 pb-8 last:pb-0"
                >
                  <div
                    className="absolute left-0 top-1 w-[15px] h-[15px] rounded-full"
                    style={{
                      background: isLast ? BRAND : CARD_BG,
                      border: `2px solid ${isLast ? BRAND : BORDER_STRONG}`,
                      boxShadow: isLast ? `0 0 0 4px rgba(255,90,106,0.18)` : "none",
                    }}
                  />
                  <div
                    className="text-[11px] font-black tracking-[0.12em] mb-1"
                    style={{ color: isLast ? BRAND : TEXT_DIM }}
                  >
                    {ms.date}
                  </div>
                  <div className="text-[15px] font-bold" style={{ color: TEXT }}>
                    {ms.text}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  Dark News — 실제 News 와 동일 구조                         */
/* ────────────────────────────────────────────────────────── */
function DarkNews() {
  const { lang } = useLang();
  const t = content.news;
  const items = t.items.slice(0, 3);

  return (
    <section className="py-28 px-6" style={{ background: DARK_BG_ALT }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="text-[11px] font-black tracking-[0.32em] mb-3" style={{ color: BRAND }}>
              {t.label[lang]}
            </div>
            <h2 className="font-black tracking-tight mb-3" style={{ fontSize: "clamp(1.9rem, 4.2vw, 3rem)", color: TEXT }}>
              {t.headline[lang]}
            </h2>
            <p style={{ fontSize: "15px", color: TEXT_MUTED }}>{t.sub[lang]}</p>
          </div>
          <a href="#news" className="text-[13px] font-bold self-end" style={{ color: TEXT }}>
            {lang === "ko" ? "전체보기 →" : "View all →"}
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}
            >
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt={item.title[lang]}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center relative"
                    style={{ background: `${item.color}18` }}
                  >
                    <svg viewBox="0 0 160 90" fill="none" className="w-3/4 h-3/4 opacity-80">
                      <circle cx="50" cy="45" r="22" stroke={item.color} strokeWidth="1" strokeDasharray="4 3" />
                      <circle cx="110" cy="45" r="16" stroke={item.color} strokeWidth="1" />
                      <line x1="72" y1="45" x2="94" y2="45" stroke={item.color} strokeWidth="0.8" strokeDasharray="3 3" />
                      <circle cx="80" cy="25" r="6" fill={`${item.color}55`} />
                    </svg>
                    <span
                      className="absolute top-3 left-3 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
                      style={{
                        background: "rgba(10,10,18,0.75)",
                        color: item.color,
                        border: `1px solid ${item.color}60`,
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      {item.category[lang]}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col gap-2 flex-1">
                <span className="text-[11px] font-bold" style={{ color: TEXT_DIM }}>
                  {item.date}
                </span>
                <h3 className="text-base font-black leading-snug" style={{ color: TEXT }}>
                  {item.title[lang]}
                </h3>
                <p
                  className="text-[13px] leading-relaxed line-clamp-3 whitespace-pre-line"
                  style={{ color: TEXT_MUTED }}
                >
                  {item.desc[lang]}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  Dark Footer                                               */
/* ────────────────────────────────────────────────────────── */
function DarkFooter() {
  const { lang } = useLang();
  const tf = content.footer[lang];

  return (
    <footer
      id="footer"
      className="relative flex-shrink-0"
      style={{ background: "#06060c", borderTop: `1px solid ${BORDER}` }}
    >
      <div className="px-6 md:px-12 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-black"
                style={{ background: BRAND, color: "#fff" }}
              >
                L
              </div>
              <div>
                <div className="text-sm font-black" style={{ color: TEXT }}>
                  {tf.company}
                </div>
                <div className="text-[11px]" style={{ color: TEXT_DIM }}>
                  {tf.tagline}
                </div>
              </div>
            </div>
            <div className="flex items-center flex-wrap gap-4">
              {tf.links.map((l) =>
                l.href.startsWith("/") ? (
                  <Link key={l.label} href={l.href} className="text-[12.5px] font-semibold" style={{ color: TEXT_MUTED }}>
                    {l.label}
                  </Link>
                ) : (
                  <a key={l.label} href={l.href} className="text-[12.5px] font-semibold" style={{ color: TEXT_MUTED }}>
                    {l.label}
                  </a>
                )
              )}
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-1">
            <a href={`mailto:${tf.contact}`} className="text-[13px] font-bold" style={{ color: TEXT }}>
              {tf.contact_label}: {tf.contact}
            </a>
            <span className="text-[11px]" style={{ color: TEXT_DIM }}>
              {tf.rights.replace("2026", String(new Date().getFullYear()))}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  Dark ScrollDots                                           */
/* ────────────────────────────────────────────────────────── */
const SECTIONS = [
  { id: "hero", label: { ko: "홈", en: "Home" } },
  { id: "axes", label: { ko: "3축", en: "Axes" } },
  { id: "products", label: { ko: "서비스", en: "Services" } },
  { id: "about", label: { ko: "소개", en: "About" } },
  { id: "news", label: { ko: "소식", en: "News" } },
];

function DarkScrollDots({ lang }: { lang: "ko" | "en" }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const container = document.getElementById("scroll-container");
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = SECTIONS.findIndex((s) => s.id === entry.target.id);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { root: container, threshold: 0.4 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const container = document.getElementById("scroll-container");
    const target = document.getElementById(id);
    if (!container || !target) return;
    const offset = id === "hero" ? 0 : 72;
    container.scrollTo({ top: target.offsetTop - offset, behavior: "smooth" });
  };

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3">
      <div
        className="absolute right-[7px] top-3 bottom-3 w-px pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.14), transparent)" }}
      />
      {SECTIONS.map((s, i) => {
        const isActive = active === i;
        const isHovered = hovered === i;
        return (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="relative flex items-center gap-2.5 justify-end"
            aria-label={s.label[lang]}
          >
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  transition={{ duration: 0.18 }}
                  className="text-[11px] font-bold whitespace-nowrap"
                  style={{ color: isActive ? BRAND : TEXT_MUTED }}
                >
                  {s.label[lang]}
                </motion.span>
              )}
            </AnimatePresence>
            <motion.div
              animate={{
                scale: isActive ? 1 : isHovered ? 0.85 : 0.6,
                opacity: isActive ? 1 : isHovered ? 0.8 : 0.35,
              }}
              transition={{ duration: 0.2 }}
              className="rounded-full flex-shrink-0"
              style={{
                width: 8,
                height: 8,
                background: isActive ? BRAND : "#888",
                boxShadow: isActive ? `0 0 0 4px rgba(255,90,106,0.2)` : "none",
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
