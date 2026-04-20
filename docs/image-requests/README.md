# 서비스별 이미지 요청서

natris-web(lulu.ai 브랜드 페이지) 서비스 상세 페이지 이미지 자산 요청 양식 모음.

## 파일 목록

| 파일 | 서비스 | 담당자 | 상태 |
|------|--------|--------|------|
| [pokerlulu.md](./pokerlulu.md) | PokerLulu (소셜 포커) | | ☐ |
| [linkplay.md](./linkplay.md) | LinkPlay (방송 인터랙티브) | | ☐ |
| [moitto.md](./moitto.md) | 모이또 (소모임) | | ☐ |
| [shuffleup.md](./shuffleup.md) | ShuffleUp (대회 운영) | | ☐ |
| [tubelulu.md](./tubelulu.md) | TubeLuLu (지식·팬덤) | | ☐ |
| [gtolulu.md](./gtolulu.md) | GTOlulu (AI GTO 솔버) | | ☐ |

## 공통 구성 (각 서비스 동일)

각 요청서는 다음 4종의 이미지 자산 요청을 포함한다.

| 항목 | 수량 | 필수 여부 | 사이즈 |
|------|:---:|:---:|------|
| 메인 히어로 이미지 | 1 | 필수 | 1600×1000px (4:3) |
| 갤러리 이미지 | 3 | 필수 | 800×1000px (4:5) |
| 기능별 스크린샷 | 4 | 선택 | 1200×900px (4:3) |
| 로고 | 1 | 선택 | 512×512px SVG/PNG |

## 사용 방법

1. 요청 전: 현재 `/services/[id]` 페이지의 3개 영역(hero / gallery / features)을 스크린샷으로 촬영
2. 빨간 박스로 이미지 삽입 위치를 표시한 뒤 `01-hero-location.png`, `02-gallery-location.png`, `03-features-location.png` 로 저장
3. 해당 서비스의 마크다운 요청서와 스크린샷 3장을 함께 담당자에게 전달
4. 제출된 이미지는 추후 `natris-web/public/images/[서비스ID]/` 경로에 배치 예정

## 제출 파일 네이밍 규칙

```
{서비스ID}-hero.png
{서비스ID}-gallery-1.png
{서비스ID}-gallery-2.png
{서비스ID}-gallery-3.png
{서비스ID}-feature-1.png   (선택)
{서비스ID}-feature-2.png   (선택)
{서비스ID}-feature-3.png   (선택)
{서비스ID}-feature-4.png   (선택)
{서비스ID}-logo.svg        (선택)
```

서비스ID: `pokerlulu` / `linkplay` / `moitto` / `shuffleup` / `tubelulu` / `gtolulu`
