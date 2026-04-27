"use client";

import { LangProvider, useLang } from "@/components/LangContext";
import { content } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

function PreviewA() {
  const { lang } = useLang();
  const pokerlulu = content.products.items.find((s) => s.id === "pokerlulu")!;
  const upcoming = content.products.items.filter((s) => s.id !== "pokerlulu");

  return (
    <div style={{ background: "#0a0a12", minHeight: "100dvh", color: "#f5f5f7" }}>
      {/* Banner */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-3 text-xs"
        style={{ background: "#ff5a6a", color: "#fff" }}
      >
        <span className="font-bold tracking-wider">시안 A안 — PokerLulu 중심 재구성</span>
        <Link href="/preview/b" className="underline opacity-90 hover:opacity-100">
          B안 보기 →
        </Link>
      </div>

      {/* Top bar (간소화) */}
      <header
        className="flex items-center justify-between px-6 md:px-10 lg:px-16 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <Image src="/lulu-ai-logo.png" alt="Lulu AI" width={240} height={80} className="h-14 w-48 object-cover" style={{ objectPosition: "center 52%" }} />
        <span className="text-[11px] tracking-[0.2em] text-white/40 uppercase">Preview · A안</span>
      </header>

      {/* HERO — PokerLulu 첫 챕터 메시지 */}
      <section className="relative overflow-hidden px-6 md:px-10 lg:px-16 py-32 md:py-40">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] blur-[180px] opacity-[0.12]" style={{ background: "radial-gradient(ellipse, #ff5a6a, transparent)" }} />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] blur-[160px] opacity-[0.08]" style={{ background: "radial-gradient(ellipse, #ff8c42, transparent)" }} />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="text-[11px] font-black tracking-[0.32em] mb-6" style={{ color: "#ff5a6a" }}>
            CHAPTER 01 · POKERLULU
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-black leading-[1.1] mb-8 break-keep whitespace-pre-line"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              background: "linear-gradient(135deg, #ffffff 0%, #ffd5d8 55%, #ffb48a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {"포커룰루로 시작합니다.\n룰루닷에이아이의 첫 번째 챕터."}
          </motion.h1>
          <p className="text-lg md:text-xl text-white/55 max-w-2xl mx-auto break-keep whitespace-pre-line leading-relaxed">
            {"커뮤니티로 잇는 새로운 세상.\n그 첫 무대는 온라인 소셜 포커 플랫폼, PokerLulu입니다."}
          </p>
        </div>
      </section>

      {/* PRODUCT — PokerLulu 단일 상세 */}
      <section className="px-6 md:px-10 lg:px-16 py-20 md:py-28" style={{ background: "#08080f" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-[11px] font-black tracking-[0.32em] mb-3" style={{ color: "#ff5a6a" }}>
            NOW LIVE
          </div>
          <h2 className="font-black mb-4 break-keep" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
            PokerLulu
          </h2>
          <p className="text-white/55 mb-12 max-w-2xl break-keep whitespace-pre-line">{pokerlulu.desc[lang]}</p>

          {/* Feature grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {pokerlulu.features.map((f) => (
              <div
                key={f.title.ko}
                className="rounded-2xl p-6 flex items-start gap-4"
                style={{ background: "#14141f", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                  style={{ background: `${pokerlulu.color}20`, color: pokerlulu.color }}
                >
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1.5">{f.title[lang]}</h3>
                  <p className="text-sm text-white/55 leading-relaxed break-keep">{f.desc[lang]}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              className="px-10 py-4 rounded-full text-sm font-semibold"
              style={{ background: "linear-gradient(135deg, #ff5a6a, #ff8c42)", boxShadow: "0 0 30px rgba(255,90,106,0.35)" }}
            >
              자세히 보기 →
            </button>
          </div>
        </div>
      </section>

      {/* COMING CHAPTERS — 작게 / 라이브 후 공개 */}
      <section className="px-6 md:px-10 lg:px-16 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-[11px] font-black tracking-[0.32em] mb-3 text-white/40">
            NEXT CHAPTERS
          </div>
          <h3 className="font-black mb-4 text-white/60 break-keep" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
            다음 이야기는 곧 시작됩니다
          </h3>
          <p className="text-sm text-white/35 mb-10 break-keep">
            PokerLulu에 이어, 게임·커뮤니티·기술을 잇는 후속 서비스가 순차적으로 공개됩니다.
          </p>

          <div className="flex flex-wrap justify-center gap-2.5">
            {upcoming.map((s) => (
              <div
                key={s.id}
                className="px-4 py-2 rounded-full text-xs font-semibold"
                style={{ background: `${s.color}10`, border: `1px solid ${s.color}25`, color: s.color }}
              >
                {s.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT (수정 카피) */}
      <section className="px-6 md:px-10 lg:px-16 py-24" style={{ background: "#08080f", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-[11px] font-black tracking-[0.32em] mb-3" style={{ color: "#ff5a6a" }}>
            ABOUT
          </div>
          <h2 className="font-black mb-6 break-keep whitespace-pre-line" style={{ fontSize: "clamp(1.75rem, 4.2vw, 3.2rem)", lineHeight: 1.15 }}>
            {"게임과 커뮤니티로\n세상을 연결합니다"}
          </h2>
          <p className="text-white/62 leading-relaxed break-keep whitespace-pre-line max-w-3xl mx-auto" style={{ fontSize: "clamp(15px, 1.35vw, 19px)" }}>
            {"룰루닷에이아이는 PokerLulu를 시작점으로,\n온라인 포커부터 라이브 미니게임, 커뮤니티 솔루션, AI 툴까지\n플레이어가 머무는 공간을 단계적으로 만들어갑니다."}
          </p>
        </div>
      </section>

      {/* 마지막 요약 */}
      <footer className="px-6 md:px-10 lg:px-16 py-10 text-center" style={{ background: "#06060c", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <p className="text-xs text-white/35 break-keep">
          A안: 라이브 단계와 메시지가 정직하게 일치 · 향후 챕터를 자연스럽게 추가 가능
        </p>
      </footer>
    </div>
  );
}

export default function PreviewAPage() {
  return (
    <LangProvider>
      <PreviewA />
    </LangProvider>
  );
}
