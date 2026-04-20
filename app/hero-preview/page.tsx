"use client";

import HeroVisualE from "@/components/hero-previews/HeroVisualE";
import HeroVisualF from "@/components/hero-previews/HeroVisualF";

export default function HeroPreviewPage() {
  const variants = [
    {
      key: "E",
      title: "E. Kinetic Typography",
      desc: "거대한 LULU.AI 워드마크 + 6개 서비스 색상 그라데이션 플로우 + 서비스명 티커. 레퍼런스: Stripe · Linear · Framer.",
      Comp: HeroVisualE,
    },
    {
      key: "F",
      title: "F. Logo Mark + Service Aura",
      desc: "커스텀 LULU 로고 마크 + 6개 서비스 색상이 halo로 회전. 레퍼런스: Airbnb Bélo · Figma · Spotify.",
      Comp: HeroVisualF,
    },
  ];

  return (
    <div style={{ background: "#fff", minHeight: "100dvh", padding: "60px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8 }}>
          Hero 시각 시안 비교 — E · F
        </h1>
        <p style={{ color: "#666", marginBottom: 48 }}>
          어느 방향이 lulu.ai 브랜드 페이지 느낌에 맞는지 선택하세요.
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

              <div
                style={{
                  background: "#fff",
                  border: "1px solid #eee",
                  borderRadius: 12,
                  padding: 40,
                  display: "flex",
                  justifyContent: "center",
                  minHeight: 520,
                  alignItems: "center",
                }}
              >
                <Comp />
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
