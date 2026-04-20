"use client";

import HeroVisualA from "@/components/hero-previews/HeroVisualA";
import HeroVisualB from "@/components/hero-previews/HeroVisualB";
import HeroVisualC from "@/components/hero-previews/HeroVisualC";

export default function HeroPreviewPage() {
  const variants = [
    {
      key: "A",
      title: "A. Brand Hub Constellation",
      desc: "중앙 LULU.AI 허브 + 6개 서비스가 궤도에 배치. 브랜드 허브라는 메시지가 가장 직관적. (AxesConnection과 구조가 비슷해질 위험)",
      Comp: HeroVisualA,
    },
    {
      key: "B",
      title: "B. Brand Wall",
      desc: "거대한 LULU.AI 워드마크 + 6개 서비스 색상이 번지는 그라데이션 + 타이포 태그. 브랜드 아이덴티티 무드보드 느낌.",
      Comp: HeroVisualB,
    },
    {
      key: "C",
      title: "C. Venn + Service Tags",
      desc: "기존 GAME/TECH/COMMUNITY Venn 유지 + 각 원 안에 서비스 이름 태그 삽입. 변경 폭 최소.",
      Comp: HeroVisualC,
    },
  ];

  return (
    <div style={{ background: "#fff", minHeight: "100dvh", padding: "60px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8 }}>
          Hero 시각 시안 비교
        </h1>
        <p style={{ color: "#666", marginBottom: 48 }}>
          타이틀 우측 도형 3가지 안 — 어느 방향이 좋을지 선택하세요.
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
