# natris-web Design System

> lulu.ai 브랜드 허브의 디자인 규약. Wemade(wemade.com) 코퍼레이트 사이트 패턴을 레퍼런스로, 게임·커뮤니티 플랫폼 기업 톤에 맞춰 설계.
>
> 이 문서는 **사실상의 규약**이며, 새 섹션·컴포넌트 추가 시 반드시 이 문서의 규칙을 따른다.

---

## 0. 설계 원칙 (Philosophy)

1. **코퍼레이트 프리미엄 + 게임 에너지** — 금융 플랫폼급의 정제된 타이포·간격을 쓰되, 게임 서비스 특유의 대담한 컬러·모션을 곁들인다.
2. **스크롤 내러티브** — 페이지는 "슬라이드 쇼"가 아니라 "스크롤 스토리"다. 각 섹션은 이전/다음과 의미적으로 연결돼야 한다.
3. **한 화면 한 메시지** — 히어로·섹션 전환부에서 눈이 여러 곳으로 분산되지 않게 한다. 서브텍스트·설명은 메인 이후에 둔다.
4. **브랜드 레드 + 서비스 멀티컬러** — lulu.ai 공통은 레드 `#e60012`, 각 서비스는 고유색(로고에서 추출)을 가진다. 공통과 서비스 컬러를 한 섹션에 섞지 않는다.
5. **한영 이중 언어 전제** — 모든 카피는 `ko` / `en` 쌍으로 작성. 줄바꿈(`\n`)은 양 언어에서 대칭으로 맞춘다.

---

## 1. Color System

### 1.1 Global (lulu.ai 공통)

| 역할 | Hex | CSS 변수 | 용도 |
|------|-----|----------|------|
| Brand Red | `#e60012` | `--brand-red` | 로고, eyebrow label, 강조 아이콘, 메인 CTA 배경 |
| Ink (텍스트 1차) | `#111` | — | 헤드라인, 본문 진하게 |
| Gray 700 | `#222` | — | 본문 진하게 서브 |
| Gray 500 | `#555` | — | 본문 표준 |
| Gray 400 | `#666` | — | 본문 연하게, 캡션 |
| Gray 300 | `#999` | — | 메타·날짜·라벨 |
| Gray 200 | `#bbb` | — | 힌트·스크롤 인디케이터 |
| Gray 100 | `#ececec` / `#eee` | — | 카드 보더 |
| Gray 50 | `#f3f3f3` / `#fafafa` | — | 섹션 배경 alt |
| White | `#fff` | — | 메인 배경, 카드 배경 |

### 1.2 Service Palette (서비스별 고유색)

로고·실제 브랜드에서 추출. `lib/i18n.ts`의 `products.items[].color` 필드가 단일 진실 공급원(SSOT).

| 서비스 | Color | 상황 |
|--------|-------|------|
| PokerLulu | `#FF6D1F` | 비비드 탠저린 오렌지 (logo 기반) |
| LinkPlay | `#06b6d4` | 시안 (방송 레드→블루 계열) |
| Moitto | `#10b981` | 에메랄드 |
| ShuffleUp | `#3b82f6` | 로얄 블루 |
| TubeLulu | `#ec4899` | 핑크 마젠타 |
| GTOlulu | `#8b5cf6` | 바이올렛 |

**규칙**
- 서비스별 히어로·CTA 버튼은 해당 서비스색만 사용. 공통 브랜드 레드와 섞지 않는다.
- 서비스색 오파시티 변주로 배경·보더·섀도 만들기:
  - 배경 틴트: `${color}10` ~ `${color}20`
  - 보더: `${color}30` ~ `${color}50`
  - 섀도 글로우: `${color}28` ~ `${color}55`

---

## 2. Typography

### 2.1 폰트 패밀리
- `sans-serif` (시스템 기본 — 국문 혼용 렌더링 최적). 별도 웹폰트 도입 시 문서 업데이트 필수.

### 2.2 스케일 (clamp 기반 반응형)

| 역할 | clamp() | 용도 |
|------|---------|------|
| Display 1 (히어로 타이틀) | `clamp(3.2rem, 10vw, 8rem)` | 서비스 상세 히어로, 브랜드 워드마크 |
| Display 2 (섹션 헤드라인) | `clamp(1.9rem, 4.2vw, 3rem)` | About / Products / News 헤드라인 |
| H3 (서브 섹션) | `clamp(1.8rem, 4vw, 2.8rem)` | AxesConnection 등 내부 h2 |
| H4 (카드 타이틀) | `16px` (base) | News 카드·Projects 카드 |
| Body Lg | `clamp(17px, 1.8vw, 22px)` | 섹션 브레이크 대형 문구 |
| Body | `clamp(14px, 1.2vw, 16px)` | 본문 |
| Caption | `13px` | News 카드 desc |
| Label (eyebrow) | `11px` + `tracking-[0.28em~0.32em]` + `font-black` | 섹션 라벨 (`ABOUT`, `MISSION` 등) |
| Meta | `10px` + `tracking-[0.3em]` | 스크롤 힌트 등 |

### 2.3 웨이트
- `font-black` (900) — 모든 헤드라인·라벨·CTA 기본
- `font-bold` (700) — 본문 강조·배지
- `font-normal` (400) — 본문

### 2.4 줄높이·트래킹
- 헤드라인: `leading-[0.92~1.2]` + `tracking-tight`
- 본문: `leading-relaxed` (기본 1.6)
- 라벨: 트래킹 `0.28em~0.32em` 강한 자간

### 2.5 줄바꿈 규칙
- 헤드라인에 `\n` 사용 시 `whitespace-pre-line` 반드시 적용
- KO/EN 양쪽 모두 동일한 줄 수가 되도록 대칭 맞춤 (한 쪽만 2줄, 다른 쪽 1줄 금지)
- 카드처럼 폭이 좁은 컨테이너의 `\n` 문구는 실제 줄 내 글자 수가 폭 안에 들어가는지 체크 (한글 ~22자/줄, 영문 ~48자/줄 @ 13px, 340px 폭 기준)

---

## 3. Layout & Spacing

### 3.1 컨테이너 폭
- **표준 섹션 컨테이너**: `max-w-[1200px] mx-auto`
- **히어로·서비스 상세 2단 그리드**: `max-w-[1280px]` (폭 여유 필요한 경우만)
- **본문 폭 제한**: `max-w-3xl` (~768px) — Mission·About body 등 긴 문단
- **본문 좁게**: `max-w-2xl` (~672px) — 보조 설명

> 1200 / 1280 혼용 시 섹션 간 미세한 정렬 어긋남 발생. 새 섹션은 **1200 기본**.

### 3.2 섹션 패딩
- 세로: `py-28` (112px) 또는 `py-32 md:py-44` (섹션 규모에 따라)
- 가로: `px-6` (모바일) / `px-6 md:px-12` (히어로·상세 페이지 히어로)

### 3.3 섹션 배경
- 흰 섹션: `bg-white`
- alt 섹션: `bg-[#fafafa]` (약한 대비)
- 연속 섹션은 흰 → alt → 흰 식으로 교차

### 3.4 Gap·Grid
- 카드 그리드: `gap-5` (20px)
- 2단 그리드: `gap-12` (48px), `items-center`
- 플렉스 인라인: `gap-2` ~ `gap-4`

### 3.5 라운드
- 카드: `rounded-2xl` (16px)
- 대형 키비주얼: `rounded-[24px]~rounded-[28px]`
- 버튼: `rounded-full` (pill) — 모든 CTA 기본
- 배지: `rounded-full` + `px-3 py-1.5`

### 3.6 Border & Shadow
- 라이트 카드: `border: 1px solid #ececec`, `boxShadow: 0 2px 12px rgba(0,0,0,0.03)`
- 서비스 컬러 보더: `border: 1px solid ${color}30`
- 히어로 글로우 섀도: `0 30px 80px ${color}28~35`

---

## 4. Section Archetypes

페이지는 아래 섹션 타입의 조합으로 구성된다. 새 섹션은 아래 원형 중 하나로 분류되거나, 추가 시 이 문서에 새 원형을 등록한다.

### 4.1 Hero (최상단)
- 구조: 브랜드 워드마크 + 서브 카피 + 1-2개 CTA
- 동작: 페이드 인 + 위→아래 슬라이드, 스크롤 시 부드럽게 사라짐(parallax)
- 스크롤 힌트: 하단 `SCROLL` 라벨 + 세로 얇은 선

### 4.2 Big Statement (About/Mission)
- 구조: eyebrow 라벨 → 대형 헤드라인(2~3줄) → 본문 문단 → 보조 대형 문구
- 정렬: 중앙 정렬 기본
- 보조 문구는 **카드 쉘 없이** 큰 타이포로 섹션 브레이크처럼 사용 (테두리·배경·그림자 금지)

### 4.3 Product/Service Grid
- 구조: eyebrow + 헤드라인 + 서브 설명 + 서비스 카드 n개 그리드
- 카드: 라이트 카드 패턴(`border: 1px solid #ececec`) + 서비스 컬러 액센트(아이콘/배지)
- 클릭 전체 영역: `Link` 래퍼, 카드 내부 텍스트는 비활성

### 4.4 Connection Diagram (Axes)
- SVG 기반 다이어그램, 중앙 허브 + 주변 궤도 배치
- 연결선은 `strokeDasharray` + `animate stroke-dashoffset`로 흐름 애니메이션
- 로고 있으면 실제 SVG 이미지, 없으면 서비스명 텍스트

### 4.5 News/Timeline
- 구조: 헤드라인 + `전체보기` 링크 + 3카드 그리드
- 카드: 이미지(16:9) + 날짜 + 제목 + 설명(`line-clamp-3` + `whitespace-pre-line`)
- 이미지 없을 때: 서비스 컬러 틴트 배경 + 추상 SVG 패턴

### 4.6 Stats / Value Props
- Wemade 스타일: 큰 숫자 + 라벨 가로 배치 (예: `6+ / 2,000+ / 2030`)
- 숫자: `Display 1` 스케일, 컬러는 `#111`
- 단위·설명: 숫자 아래 캡션

### 4.7 CTA Section (Join / Partnership)
- 구조: 대형 카피 + 부가 설명 + 주·부 CTA
- 배경: 흰 또는 어두운 네이비 반전 배경(임팩트 필요 시)
- 반전 시 텍스트 흰색 + 버튼 밝은 액센트

### 4.8 Footer
- 구조: 4-6단 컬럼 (Resources / Social / Sitemap / External / Locations)
- 멀티 리전 오피스 정보 블록은 선택 (lulu.ai는 현재 1 리전)
- 카피라이트·법무 링크는 최하단 단일 라인

---

## 5. Animation & Interaction

### 5.1 허용 패턴 (Framer Motion 기반)
- **진입 페이드-업**: `initial={{ opacity: 0, y: 24 }}` → `whileInView={{ opacity: 1, y: 0 }}`, `duration: 0.5~0.8`, `ease: [0.22, 1, 0.36, 1]`
- **스태거**: 리스트에 `delay: i * 0.08~0.15` 부여
- **호버**: 카드 `scale(1.01~1.02)` + 섀도 심화, 200~300ms ease-out
- **스크롤 패럴랙스**: `useScroll` + `useTransform`으로 헤더/히어로 opacity·y 변환
- **뷰포트 트리거**: `viewport={{ once: true, margin: "-60px~-80px" }}` (섹션 들어서면 1회 재생)

### 5.2 금지 패턴
- 자동 캐러셀 (사용자가 못 따라가는 속도로 돌아가는 슬라이더)
- 무한 루프 빡빡한 흔들림·점멸
- 모션 2.5초 초과 애니메이션
- `prefers-reduced-motion` 무시

---

## 6. CTA Button System

### 6.1 계층
- **Primary**: 진한 배경 + 흰 텍스트, `rounded-full`, `px-6 py-3`, `text-sm font-black`
  - 공통 브랜드: `bg-[#111] text-white` 또는 `bg-[var(--brand-red)]`
  - 서비스별: `bg-${color} text-white`
- **Secondary**: 흰 배경 + 회색 보더
  - `bg-white text-[#111] border border-[#dcdcdc]`
- **Ghost (링크형)**: 텍스트만 + `→` 화살표 끝맺음

### 6.2 배치 규칙
- 히어로: Primary + Secondary 2개까지. 3개 이상 금지
- 섹션 내: 1개 Primary 권장, 필요 시 부가 Ghost 링크

---

## 7. Imagery & Visual Assets

### 7.1 이미지 종류
- **Hero KeyVisual (서비스 상세)**: 16:9 또는 5:6 가로/세로, 서비스 브랜드 톤 반영
- **Service Card Hero (메인 카드)**: 1:1 또는 4:5, 3D 오브젝트 / 클레이 렌더 권장
- **News Image**: 16:9 (aspectRatio: "16 / 9")
- **Logo (BI)**: SVG 권장. PNG 대체 시 48~60px 크기 내 사용

### 7.2 이미지 스타일 가이드
- **통일 톤**: 짙은 네이비·블랙 배경 + 서비스 고유색 글로우
- **금지**: 스톡 사진 직접 사용, 저해상도 이미지(1K 미만)
- **AI 생성**: 사용 가능. 단 Gemini/Imagen 워터마크(✦ 스파클) 제거 필수 — CSS 마스킹 또는 크롭 처리
- **파일 경로 규약**:
  - `public/images/{serviceId}/hero.{ext}` — 메인 카드용
  - `public/images/{serviceId}/keyvisual.{ext}` — 상세 페이지 히어로
  - `public/images/news/{slug}.{ext}` — 뉴스용
  - `public/logos/{serviceId}.svg` — BI 로고

### 7.3 Next Image 사용
- `next/image` `<Image>` 사용 원칙 (자동 최적화·레이지 로딩). 단 쉽게 마스킹할 때는 일반 `<img>` 허용.
- `sizes` 속성 명시: 예) `"(max-width: 768px) 100vw, 33vw"`

---

## 8. Accessibility

- 모든 이미지 `alt` 필수 (장식 이미지는 `alt=""`)
- 클릭 영역 최소 44×44px 터치 타겟 유지
- 텍스트 대비 WCAG AA 이상 (본문은 `#666` 대신 `#555` 이하 권장하는 경우도 체크)
- 키보드 포커스 스타일 기본값 유지(`outline` 제거 금지)
- 언어 전환 시 `<html lang>` 업데이트 필수

---

## 9. i18n 규약

- 모든 카피는 `lib/i18n.ts`의 `content` 객체에 `ko` / `en` 쌍으로 위치
- 서비스 항목의 `id`·`color`·`axis`는 언어 독립 필드
- 다국어 분기는 컴포넌트 내부에서 `useLang()` 훅으로 접근
- 긴 카피는 인라인 삼항(`lang === "ko" ? ... : ...`) 대신 i18n 파일 사용

---

## 10. Antipatterns (금지)

### 10.1 Visual
- MISSION/VISION 같은 라벨을 테두리·배경 있는 "박스"로 감싸기 (IR 자료 톤). 반드시 플랫 타이포로.
- 동일 섹션 내 헤드라인 단어를 본문에서 3회 이상 반복 (예: "연결" × 3 방지)
- 한 섹션에 CTA 3개 이상

### 10.2 Layout
- 섹션 컨테이너 폭 혼용 (1200/1280) — 하나로 통일
- `max-w-*` 없는 본문 `<p>` 태그 (가독 폭 무한 확장 방지)
- 카드 그리드가 4열 이상 (모바일에서 깨짐)

### 10.3 Copy
- "성공적으로 개최했습니다" / "선보입니다" 같은 관료체·보도자료체
- 카드처럼 좁은 컨테이너에 들어가는 문구에서 `\n` 없이 긴 한 줄 (실제로는 어색하게 wrap됨)
- KO/EN 줄 수 비대칭

### 10.4 Performance
- SSR 기본 원칙. `"use client"`는 인터랙션 필수 컴포넌트에만
- 대형 이미지(2MB+) 최적화 없이 직접 참조

---

## 11. 점검 체크리스트 (섹션 추가 시)

신규 섹션 커밋 전 아래 모두 통과:

- [ ] 섹션 컨테이너 `max-w-[1200px] mx-auto` 또는 명시적 사유로 1280
- [ ] 세로 패딩 `py-28` 이상
- [ ] 헤드라인·body·label 스케일 §2.2 따름
- [ ] eyebrow 라벨 있으면 `tracking-[0.28em~0.32em] font-black`
- [ ] KO/EN 양쪽 카피 존재 + 줄 수 대칭
- [ ] 진입 애니메이션: 페이드-업, `viewport={{ once: true, margin: "-60px" }}`
- [ ] CTA 2개 이하, 스타일 §6.1 따름
- [ ] 이미지 alt 텍스트
- [ ] 반응형: sm/md/lg 모두 확인
- [ ] 다크 모드? 현재 사이트는 라이트 단일 — 다크 필요 시 이 문서 업데이트 후 작업

---

## 12. 참조

- 레퍼런스 사이트: wemade.com (코퍼레이트 게임 기업 표준 구조)
- 현재 구현 컴포넌트: `components/Hero.tsx`, `About.tsx`, `Projects.tsx`, `AxesConnection.tsx`, `News.tsx`, `ServiceDetail.tsx`
- 언어 파일: `lib/i18n.ts`
- 정적 자산: `public/images/`, `public/logos/`

이 문서에 포함되지 않은 새 패턴이 필요하면, **먼저 문서를 업데이트**하고 코드 작성한다. 문서가 규약이지 코드가 규약이 아니다.
