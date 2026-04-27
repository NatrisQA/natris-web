"use client";

import { LangProvider, useLang } from "@/components/LangContext";
import { content } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

function PreviewB() {
  const { lang } = useLang();
  const items = content.products.items;

  return (
    <div style={{ background: "#0a0a12", minHeight: "100dvh", color: "#f5f5f7" }}>
      {/* Banner */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-3 text-xs"
        style={{ background: "#ff8c42", color: "#fff" }}
      >
        <span className="font-bold tracking-wider">시안 B안 — Coming Soon 티저</span>
        <Link href="/preview/a" className="underline opacity-90 hover:opacity-100">
          ← A안 보기
        </Link>
      </div>

      {/* Top bar (간소화) */}
      <header
        className="flex items-center justify-between px-6 md:px-10 lg:px-16 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <Image src="/lulu-ai-logo.png" alt="Lulu AI" width={240} height={80} className="h-14 w-48 object-cover" style={{ objectPosition: "center 52%" }} />
        <span className="text-[11px] tracking-[0.2em] text-white/40 uppercase">Preview · B안</span>
      </header>

      {/* HERO — 기존 메시지 유지 */}
      <section className="relative overflow-hidden px-6 md:px-10 lg:px-16 py-32 md:py-40">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] blur-[180px] opacity-[0.12]" style={{ background: "radial-gradient(ellipse, #ff5a6a, transparent)" }} />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] blur-[160px] opacity-[0.08]" style={{ background: "radial-gradient(ellipse, #ff8c42, transparent)" }} />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="text-[11px] font-black tracking-[0.32em] mb-6" style={{ color: "#ff5a6a" }}>
            LULU.AI
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
            {"커뮤니티로 잇는\n새로운 세상"}
          </motion.h1>
          <p className="text-lg md:text-xl text-white/55 max-w-2xl mx-auto break-keep whitespace-pre-line leading-relaxed">
            {"5개의 서비스, 하나의 생태계.\n룰루닷에이아이가 만들어가는 플레이어 네트워크."}
          </p>
        </div>
      </section>

      {/* PRODUCTS — PokerLulu 활성 + 나머지 4개 Coming Soon 카드 */}
      <section className="px-6 md:px-10 lg:px-16 py-20 md:py-28" style={{ background: "#08080f" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-[11px] font-black tracking-[0.32em] mb-3" style={{ color: "#ff5a6a" }}>
            OUR SERVICES
          </div>
          <h2 className="font-black mb-4 break-keep" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
            5개의 서비스, 하나의 생태계
          </h2>
          <p className="text-white/55 mb-12 max-w-2xl break-keep">
            지금은 PokerLulu, 다음은 LinkPlay·TubeLuLu·ShuffleUp·GTOlulu로 이어집니다.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((s) => {
              const isLive = s.id === "pokerlulu";
              return (
                <div
                  key={s.id}
                  className="rounded-2xl p-6 relative overflow-hidden flex flex-col gap-3"
                  style={{
                    background: isLive ? "#14141f" : "rgba(20,20,31,0.5)",
                    border: `1px solid ${isLive ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.05)"}`,
                    opacity: isLive ? 1 : 0.55,
                    cursor: isLive ? "pointer" : "not-allowed",
                  }}
                >
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${s.color}${isLive ? "60" : "20"}, transparent)` }}
                  />

                  <div className="flex items-center justify-between">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: s.color, boxShadow: isLive ? `0 0 8px ${s.color}90` : "none" }}
                    />
                    {!isLive && (
                      <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)" }}>
                        Coming Soon
                      </span>
                    )}
                    {isLive && (
                      <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full" style={{ background: `${s.color}20`, color: s.color, border: `1px solid ${s.color}40` }}>
                        LIVE
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-black mt-2">{s.name}</h3>
                  <p className="text-xs text-white/50 mb-1">{s.tag[lang]}</p>
                  <p className="text-sm text-white/55 leading-relaxed break-keep whitespace-pre-line line-clamp-3">{s.desc[lang]}</p>

                  <div className="mt-auto pt-3">
                    {isLive ? (
                      <span className="text-xs font-bold" style={{ color: s.color }}>
                        자세히 보기 →
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-white/30">공개 예정</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AXES — 기존 그대로 (5축 시스템 유지 메시지) */}
      <section className="px-6 md:px-10 lg:px-16 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-[11px] font-black tracking-[0.32em] mb-3" style={{ color: "#ff5a6a" }}>
            CONNECTED BY COMMUNITY
          </div>
          <h2 className="font-black mb-4 break-keep" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)" }}>
            게임 · 커뮤니티 · 기술의 교차점
          </h2>
          <p className="text-white/55 leading-relaxed break-keep">
            (실제 페이지에서는 3축 다이어그램 그대로 유지 — 5개 서비스가 어떤 축에 속하는지 시각화)
          </p>
        </div>
      </section>

      {/* ABOUT — 기존 그대로 */}
      <section className="px-6 md:px-10 lg:px-16 py-24" style={{ background: "#08080f", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-[11px] font-black tracking-[0.32em] mb-3" style={{ color: "#ff5a6a" }}>
            ABOUT
          </div>
          <h2 className="font-black mb-6 break-keep whitespace-pre-line" style={{ fontSize: "clamp(1.75rem, 4.2vw, 3.2rem)", lineHeight: 1.15 }}>
            {"게임과 커뮤니티로\n세상을 연결합니다"}
          </h2>
          <p className="text-white/62 leading-relaxed break-keep whitespace-pre-line max-w-3xl mx-auto" style={{ fontSize: "clamp(15px, 1.35vw, 19px)" }}>
            {"다섯 개의 서비스, 하나의 생태계.\n룰루닷에이아이는 온라인 포커부터 라이브 미니게임, 커뮤니티 솔루션, AI 툴까지\n플레이어가 머무는 공간을 직접 만들고 운영합니다."}
          </p>
        </div>
      </section>

      {/* 마지막 요약 */}
      <footer className="px-6 md:px-10 lg:px-16 py-10 text-center" style={{ background: "#06060c", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <p className="text-xs text-white/35 break-keep">
          B안: 5개 서비스 비전 유지 · 비활성 카드는 흐릿하게 + Coming Soon 뱃지로 기대감 형성
        </p>
      </footer>
    </div>
  );
}

export default function PreviewBPage() {
  return (
    <LangProvider>
      <PreviewB />
    </LangProvider>
  );
}
