"use client";

import HeroLayout1 from "@/components/hero-previews/HeroLayout1";
import HeroLayout2 from "@/components/hero-previews/HeroLayout2";

export default function HeroPreviewPage() {
  const variants = [
    {
      key: "1",
      title: "1. 통합안 (Hybrid)",
      desc: "상단: 단순화한 LULU.AI 워드마크 (브랜드 시그니처). 하단: 태그 + h1 + sub 카피가 메시지 주인공. 브랜드 각인 + 메시지 전달 둘 다 살리는 안.",
      Comp: HeroLayout1,
    },
    {
      key: "2",
      title: "2. 단일 헤로안 (Signature-Only)",
      desc: "HeroVisualE 완전체가 주인공 + 태그 + 한 줄 짧은 설명만. Stripe/Linear 스타일의 미니멀 브랜드 랜딩. 시각 표현이 메시지 대부분을 전달.",
      Comp: HeroLayout2,
    },
  ];

  return (
    <div style={{ background: "#fff", minHeight: "100dvh", padding: "60px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8 }}>
          Hero 레이아웃 시안 — 1 · 2
        </h1>
        <p style={{ color: "#666", marginBottom: 48 }}>
          현재 Hero의 중복 구조를 정리하는 두 방향입니다.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>
          {variants.map(({ key, title, desc, Comp }) => (
            <section
              key={key}
              style={{
                border: "1px solid #eee",
                borderRadius: 16,
                padding: "40px 32px",
                background: "#fafafa",
              }}
            >
              <div style={{ marginBottom: 24 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 900,
                    color: "#e60012",
                    letterSpacing: "0.3em",
                    marginBottom: 8,
                  }}
                >
                  OPTION {key}
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 8 }}>
                  {title}
                </h2>
                <p style={{ color: "#666", fontSize: 14, maxWidth: 680 }}>
                  {desc}
                </p>
              </div>

              <Comp />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
