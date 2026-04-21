"use client";

import { LangProvider, useLang } from "@/components/LangContext";
import Nav from "@/components/Nav";
import { content } from "@/lib/i18n";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* WEMADE-style chapter transition sample.
 * Each service = one full-viewport chapter with:
 *   - full-bleed video or color-gradient background
 *   - large wordmark, tagline, feature strip, CTA
 *   - chapter number (01/06) + accent color
 * Left rail shows progress + lets you jump.
 */

type Item = (typeof content.products.items)[number];

const SERVICE_MEDIA: Record<
  string,
  { video?: string; gradient: string; poster?: string }
> = {
  pokerlulu: {
    video: "/videos/pokerlulu-onoff-event.mp4",
    gradient:
      "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,109,31,0.35), transparent 70%), #0a0a12",
  },
  linkplay: {
    gradient:
      "radial-gradient(ellipse 80% 60% at 30% 40%, rgba(6,182,212,0.35), transparent 70%), radial-gradient(ellipse 60% 50% at 80% 70%, rgba(6,182,212,0.18), transparent 70%), #0a0a12",
  },
  moitto: {
    gradient:
      "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(16,185,129,0.32), transparent 70%), #0a0a12",
  },
  shuffleup: {
    gradient:
      "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(59,130,246,0.32), transparent 70%), #0a0a12",
  },
  tubelulu: {
    gradient:
      "radial-gradient(ellipse 80% 60% at 30% 50%, rgba(236,72,153,0.32), transparent 70%), #0a0a12",
  },
  gtolulu: {
    gradient:
      "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(139,92,246,0.32), transparent 70%), #0a0a12",
  },
};

function ChapterNav({
  items,
  activeIndex,
  onJump,
}: {
  items: Item[];
  activeIndex: number;
  onJump: (idx: number) => void;
}) {
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
      {items.map((it, i) => {
        const active = i === activeIndex;
        return (
          <button
            key={it.id}
            onClick={() => onJump(i)}
            className="group flex items-center gap-3"
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: active ? 28 : 10,
                height: 2,
                background: active ? it.color : "rgba(255,255,255,0.35)",
                boxShadow: active ? `0 0 10px ${it.color}99` : "none",
              }}
            />
            <span
              className="text-[10px] font-black tracking-[0.28em] transition-all duration-300"
              style={{
                color: active ? "#f5f5f7" : "rgba(255,255,255,0.4)",
                opacity: active ? 1 : 0.6,
              }}
            >
              {String(i + 1).padStart(2, "0")} · {it.name.toUpperCase()}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function Chapter({
  item,
  index,
  total,
  lang,
}: {
  item: Item;
  index: number;
  total: number;
  lang: "ko" | "en";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const media = SERVICE_MEDIA[item.id] ?? {
    gradient: "#0a0a12",
  };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    container:
      typeof window !== "undefined"
        ? ({
            current: document.getElementById("scroll-container"),
          } as React.RefObject<HTMLElement>)
        : undefined,
  });

  // subtle parallax for content
  const y = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  const chapterLabel = `CHAPTER ${String(index + 1).padStart(2, "0")} / ${String(
    total
  ).padStart(2, "0")}`;

  return (
    <section
      ref={ref}
      id={`chapter-${item.id}`}
      className="relative overflow-hidden"
      style={{ minHeight: "100dvh", background: media.gradient }}
    >
      {/* Background video (if provided) */}
      {media.video && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.55 }}
        >
          <source src={media.video} type="video/mp4" />
        </video>
      )}

      {/* Dark overlay gradient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,18,0.72) 0%, rgba(10,10,18,0.45) 40%, rgba(10,10,18,0.65) 75%, rgba(10,10,18,0.92) 100%)",
        }}
      />

      {/* Accent corner ribbon */}
      <div
        aria-hidden
        className="absolute top-0 left-0 h-[3px]"
        style={{
          width: `${((index + 1) / total) * 100}%`,
          background: `linear-gradient(90deg, transparent, ${item.color} 30%, ${item.color})`,
          boxShadow: `0 0 18px ${item.color}99`,
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-[1200px] mx-auto px-8 md:px-16 py-24 flex flex-col justify-center"
      >
        <div
          className="min-h-[calc(100dvh-48px)] flex flex-col justify-center gap-10"
        >
          {/* chapter meta */}
          <div className="flex items-center gap-4">
            <span
              className="text-[11px] font-black tracking-[0.32em]"
              style={{ color: item.color }}
            >
              {chapterLabel}
            </span>
            <span
              className="h-px flex-1 max-w-[120px]"
              style={{ background: "rgba(255,255,255,0.2)" }}
            />
            <span
              className="text-[11px] font-black tracking-[0.32em]"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              {item.tag[lang].toUpperCase()}
            </span>
          </div>

          {/* Wordmark */}
          <div className="flex flex-col gap-4">
            <div
              className="font-black leading-[0.9] tracking-tight"
              style={{
                fontSize: "clamp(68px, 13vw, 180px)",
                color: "#f5f5f7",
                textShadow: `0 0 40px ${item.color}55`,
              }}
            >
              {item.name}
            </div>
            <div
              className="font-black tracking-tight"
              style={{
                fontSize: "clamp(18px, 1.8vw, 24px)",
                color: item.color,
              }}
            >
              {item.name_ko}
            </div>
          </div>

          {/* Desc (description) */}
          <p
            className="whitespace-pre-line leading-relaxed max-w-2xl"
            style={{
              fontSize: "clamp(16px, 1.4vw, 19px)",
              color: "rgba(255,255,255,0.78)",
            }}
          >
            {item.desc[lang]}
          </p>

          {/* Feature strip */}
          <div className="flex flex-wrap gap-3 max-w-3xl">
            {item.badges[lang].map((b) => (
              <span
                key={b}
                className="text-[11px] font-black tracking-[0.14em] px-4 py-2 rounded-full"
                style={{
                  color: "#f5f5f7",
                  background: "rgba(255,255,255,0.06)",
                  border: `1px solid ${item.color}60`,
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              >
                {b}
              </span>
            ))}
          </div>

          {/* Meta + CTA row */}
          <div className="flex items-center justify-between flex-wrap gap-6 mt-4">
            <div className="flex items-center gap-6">
              <div className="flex flex-col gap-1">
                <span
                  className="text-[10px] font-black tracking-[0.28em]"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  STATUS
                </span>
                <span
                  className="text-[14px] font-bold"
                  style={{ color: "#f5f5f7" }}
                >
                  {item.status[lang]}
                </span>
              </div>
              <div
                className="w-px h-10"
                style={{ background: "rgba(255,255,255,0.15)" }}
              />
              <div className="flex flex-col gap-1">
                <span
                  className="text-[10px] font-black tracking-[0.28em]"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  AXIS
                </span>
                <span
                  className="text-[14px] font-bold uppercase tracking-widest"
                  style={{ color: "#f5f5f7" }}
                >
                  {item.axis}
                </span>
              </div>
            </div>

            <a
              href={`/services/${item.id}`}
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-[13px] font-black tracking-[0.12em] transition-all duration-300"
              style={{
                background: item.color,
                color: "#0a0a12",
                boxShadow: `0 14px 40px ${item.color}55`,
              }}
            >
              {lang === "ko" ? "자세히 보기" : "EXPLORE"}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>

        {/* SCROLL DOWN prompt */}
        {index < total - 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span
              className="text-[10px] font-black tracking-[0.32em]"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              SCROLL
            </span>
            <div
              className="w-px h-8 scroll-hint"
              style={{ background: "rgba(255,255,255,0.35)" }}
            />
          </div>
        )}
      </motion.div>
    </section>
  );
}

function PageContent() {
  const { lang } = useLang();
  const items = content.products.items;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = document.getElementById("scroll-container");
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace("chapter-", "");
            const idx = items.findIndex((it) => it.id === id);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { root: container, threshold: 0.5 }
    );
    items.forEach((it) => {
      const el = document.getElementById(`chapter-${it.id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  const jumpTo = (idx: number) => {
    const container = document.getElementById("scroll-container");
    const target = document.getElementById(`chapter-${items[idx].id}`);
    if (!container || !target) return;
    container.scrollTo({ top: target.offsetTop, behavior: "smooth" });
  };

  return (
    <>
      <div
        id="scroll-container"
        className="relative"
        style={{ height: "100dvh", overflowY: "auto", background: "#0a0a12" }}
      >
        <Nav />

        {/* Intro header */}
        <section
          className="relative flex flex-col items-center justify-center px-6"
          style={{ minHeight: "100dvh", background: "#0a0a12" }}
        >
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(255,90,106,0.14), transparent 60%), radial-gradient(ellipse 70% 50% at 50% 80%, rgba(139,92,246,0.12), transparent 60%)",
            }}
          />
          <div className="relative z-10 max-w-[980px] mx-auto text-center flex flex-col gap-6">
            <span
              className="text-[11px] font-black tracking-[0.32em]"
              style={{ color: "#ff5a6a" }}
            >
              SERVICES · SIX CHAPTERS
            </span>
            <h1
              className="font-black tracking-tight whitespace-pre-line"
              style={{
                fontSize: "clamp(40px, 7vw, 88px)",
                color: "#f5f5f7",
                lineHeight: 1.05,
              }}
            >
              {lang === "ko"
                ? "여섯 개의 플랫폼,\n하나의 커뮤니티"
                : "Six platforms,\none community"}
            </h1>
            <p
              className="leading-relaxed max-w-2xl mx-auto"
              style={{
                fontSize: "clamp(15px, 1.3vw, 17px)",
                color: "rgba(255,255,255,0.62)",
              }}
            >
              {lang === "ko"
                ? "스크롤을 내리면 각 서비스의 챕터가 시작됩니다. 좌측 인디케이터로 이동할 수 있어요."
                : "Scroll to enter each service's chapter. Use the left rail to jump."}
            </p>
            <div className="flex flex-col items-center gap-2 mt-10">
              <span
                className="text-[10px] font-black tracking-[0.32em]"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                SCROLL DOWN
              </span>
              <div
                className="w-px h-8 scroll-hint"
                style={{ background: "rgba(255,255,255,0.35)" }}
              />
            </div>
          </div>
        </section>

        {items.map((item, i) => (
          <Chapter
            key={item.id}
            item={item}
            index={i}
            total={items.length}
            lang={lang}
          />
        ))}

        {/* Outro CTA */}
        <section
          className="relative flex items-center justify-center px-6 py-28"
          style={{ minHeight: "60dvh", background: "#06060c" }}
        >
          <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col gap-6">
            <span
              className="text-[11px] font-black tracking-[0.32em]"
              style={{ color: "#ff5a6a" }}
            >
              FIN.
            </span>
            <h2
              className="font-black tracking-tight"
              style={{
                fontSize: "clamp(28px, 4.4vw, 48px)",
                color: "#f5f5f7",
              }}
            >
              {lang === "ko"
                ? "하나의 커뮤니티로 이어집니다"
                : "Woven into one community"}
            </h2>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[13px] font-black tracking-[0.12em] mx-auto"
              style={{
                background: "#ff5a6a",
                color: "#0a0a12",
                boxShadow: "0 14px 40px rgba(255,90,106,0.35)",
              }}
            >
              {lang === "ko" ? "메인으로 돌아가기" : "BACK TO HOME"} →
            </a>
          </div>
        </section>
      </div>

      <ChapterNav items={items} activeIndex={activeIndex} onJump={jumpTo} />
    </>
  );
}

export default function ChapterPreview() {
  return (
    <LangProvider>
      <PageContent />
    </LangProvider>
  );
}
