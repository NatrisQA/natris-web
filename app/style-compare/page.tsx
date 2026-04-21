"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLang, LangProvider } from "@/components/LangContext";
import { content } from "@/lib/i18n";

export default function StyleComparePage() {
  return (
    <LangProvider>
      <Inner />
    </LangProvider>
  );
}

function Inner() {
  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <TopBar />
      <SectionHeader
        label="VARIANT A"
        title="Refined Platform — Wemade 선택적 + Stripe 정제"
        note="라이트·정갈. 스탯 스트립 + 클린 카드. B2B 파트너/투자자 우선."
      />
      <VariantA />
      <Divider />
      <SectionHeader
        label="VARIANT B"
        title="Player-First Density — Riot/Krafton 하이브리드"
        note="다크·몰입. 풀블리드 이미지 카드 + 호버 스케일. 플레이어/BJ 우선."
      />
      <VariantB />
      <FooterNote />
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  Top Bar                                                   */
/* ────────────────────────────────────────────────────────── */
function TopBar() {
  return (
    <div
      className="sticky top-0 z-50 px-6 py-3 flex items-center justify-between"
      style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #eee" }}
    >
      <div className="text-[12px] font-black tracking-[0.3em]">STYLE COMPARE</div>
      <Link href="/" className="text-[12px] font-bold" style={{ color: "#666" }}>
        ← lulu.ai
      </Link>
    </div>
  );
}

function SectionHeader({ label, title, note }: { label: string; title: string; note: string }) {
  return (
    <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-6">
      <div className="text-[11px] font-black tracking-[0.32em]" style={{ color: "var(--brand-red)" }}>
        {label}
      </div>
      <h2 className="font-black tracking-tight mt-3" style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.2rem)", color: "#111" }}>
        {title}
      </h2>
      <p className="mt-2 text-[13px]" style={{ color: "#666" }}>
        {note}
      </p>
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "#eee", margin: "40px 0" }} />;
}

function FooterNote() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16 text-[13px] leading-relaxed" style={{ color: "#666" }}>
      <p className="mb-2 font-bold" style={{ color: "#111" }}>
        두 시안은 같은 <code>content.products</code> 데이터를 쓰지만 레이아웃·컬러·인터랙션만 다르게 렌더합니다.
      </p>
      <p>
        마음에 드는 방향이 정해지면 실제 메인 페이지의 <code>Projects.tsx</code>를 해당 시안으로 교체하고, 이어서 Hero·About·News 섹션도 같은 톤으로 맞춥니다.
      </p>
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  Variant A — Refined Platform                              */
/* ────────────────────────────────────────────────────────── */
function VariantA() {
  const { lang } = useLang();
  const t = content.products;
  const items = t.items;

  const stats = [
    { value: "6+", label: lang === "ko" ? "개발 중 서비스" : "Services in Pipeline" },
    { value: "2,000+", label: lang === "ko" ? "국내 홀덤펍" : "Holdem Pubs in Korea" },
    { value: "2030", label: lang === "ko" ? "시장 규모 $372B" : "Market Size $372B" },
  ];

  return (
    <section className="py-24 px-6" style={{ background: "#fafafa" }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-[11px] font-black tracking-[0.32em] mb-4" style={{ color: "var(--brand-red)" }}>
            {t.label.ko}
          </div>
          <h2 className="font-black tracking-tight mb-6" style={{ fontSize: "clamp(1.9rem, 4.2vw, 3rem)", color: "#111", lineHeight: 1.15 }}>
            {t.headline[lang]}
          </h2>
          <p className="leading-relaxed" style={{ fontSize: "clamp(14px, 1.2vw, 16px)", color: "#555" }}>
            {t.sub[lang]}
          </p>
        </div>

        {/* Stats strip */}
        <div
          className="grid grid-cols-3 mb-16 rounded-2xl overflow-hidden"
          style={{ background: "#fff", border: "1px solid #ececec" }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="px-6 py-8 text-center"
              style={{ borderRight: i < 2 ? "1px solid #ececec" : "none" }}
            >
              <div className="font-black" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#111" }}>
                {s.value}
              </div>
              <div className="text-[12px] font-bold mt-2" style={{ color: "#666" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((s, i) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{ background: "#fff", border: "1px solid #ececec" }}
            >
              {/* Color bar */}
              <div style={{ height: 4, background: s.color }} />
              <div className="p-6 flex flex-col gap-3 flex-1">
                <div className="flex items-center justify-between">
                  <span
                    className="text-[10px] font-black tracking-[0.2em] px-2 py-1 rounded"
                    style={{ background: `${s.color}15`, color: s.color }}
                  >
                    {s.tag[lang].toUpperCase()}
                  </span>
                  <span className="text-[10px] font-bold" style={{ color: "#999" }}>
                    {s.status[lang]}
                  </span>
                </div>
                <h3 className="font-black mt-1" style={{ fontSize: 22, color: "#111" }}>
                  {s.name}
                </h3>
                <p
                  className="text-[13px] leading-relaxed whitespace-pre-line flex-1"
                  style={{ color: "#555" }}
                >
                  {s.desc[lang]}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex gap-1.5 flex-wrap">
                    {s.badges[lang].slice(0, 2).map((b) => (
                      <span
                        key={b}
                        className="text-[10px] font-bold px-2 py-1 rounded"
                        style={{ background: "#f3f3f3", color: "#555" }}
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                  <span className="text-[12px] font-black" style={{ color: s.color }}>
                    Learn more →
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  Variant B — Player-First Density                          */
/* ────────────────────────────────────────────────────────── */
function VariantB() {
  const { lang } = useLang();
  const t = content.products;
  const items = t.items;

  return (
    <section className="py-24 px-6" style={{ background: "#0a0a12", color: "#fff" }}>
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div
            className="text-[11px] font-black tracking-[0.32em] mb-4"
            style={{ color: "#ff5a6a" }}
          >
            {t.label.ko}
          </div>
          <h2
            className="font-black tracking-tight mb-5"
            style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", color: "#fff", lineHeight: 1.08 }}
          >
            {t.headline[lang]}
          </h2>
          <p
            className="leading-relaxed"
            style={{ fontSize: "clamp(14px, 1.2vw, 16px)", color: "rgba(255,255,255,0.65)" }}
          >
            {t.sub[lang]}
          </p>
        </div>

        {/* Full-bleed cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((s, i) => (
            <PlayerCard key={s.id} item={s} index={i} lang={lang} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-8 py-8 rounded-2xl"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div>
            <div className="text-[11px] font-black tracking-[0.3em] mb-2" style={{ color: "#ff5a6a" }}>
              JOIN THE PLATFORM
            </div>
            <h3 className="font-black" style={{ fontSize: 24, color: "#fff" }}>
              {lang === "ko" ? "함께 만들어갈 파트너를 찾습니다" : "Looking for partners to build with"}
            </h3>
          </div>
          <div className="flex gap-3">
            <button
              className="px-6 py-3 rounded-full text-sm font-black"
              style={{ background: "#fff", color: "#111" }}
            >
              {lang === "ko" ? "제휴 문의" : "Partner With Us"} →
            </button>
            <button
              className="px-6 py-3 rounded-full text-sm font-black"
              style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)" }}
            >
              {lang === "ko" ? "전체 서비스" : "All Services"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

type ProductItem = (typeof content.products.items)[number];

function PlayerCard({ item: s, index, lang }: { item: ProductItem; index: number; lang: "ko" | "en" }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      whileHover={{ y: -4 }}
      className="relative overflow-hidden rounded-2xl cursor-pointer group"
      style={{
        aspectRatio: "4 / 5",
        background: `linear-gradient(135deg, ${s.color}30 0%, rgba(10,10,18,1) 70%)`,
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${s.color}40 0%, transparent 50%)`,
        }}
      />

      {/* Service color strip */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: s.color }}
      />

      {/* Content layered over */}
      <div className="relative z-10 h-full p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-5">
            <span
              className="text-[10px] font-black tracking-[0.2em] px-2.5 py-1.5 rounded-full"
              style={{ background: `${s.color}20`, color: s.color, border: `1px solid ${s.color}50` }}
            >
              {s.tag[lang].toUpperCase()}
            </span>
            <span
              className="text-[10px] font-bold px-2 py-1 rounded"
              style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}
            >
              {s.status[lang]}
            </span>
          </div>
          <h3
            className="font-black tracking-tight leading-[0.95]"
            style={{ fontSize: "clamp(28px, 3.2vw, 40px)", color: "#fff" }}
          >
            {s.name}
          </h3>
          <p className="mt-3 text-[13px] whitespace-pre-line leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
            {s.desc[lang]}
          </p>
        </div>

        <div>
          <div className="flex gap-1.5 flex-wrap mb-5">
            {s.badges[lang].slice(0, 3).map((b) => (
              <span
                key={b}
                className="text-[10px] font-bold px-2 py-1 rounded"
                style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.85)" }}
              >
                #{b}
              </span>
            ))}
          </div>
          <div
            className="inline-flex items-center gap-2 text-[12px] font-black px-4 py-2.5 rounded-full transition-transform group-hover:translate-x-1"
            style={{ background: s.color, color: "#fff" }}
          >
            {lang === "ko" ? "알아보기" : "Explore"} →
          </div>
        </div>
      </div>
    </motion.article>
  );
}
