# NATRIS 홈페이지 실행 가이드

## 사내 공유 (같은 Wi-Fi/네트워크)

터미널에서 아래 명령 실행:

```
cd C:\Users\Nat2206\Cllp\natris-web
npm run dev -- --hostname 0.0.0.0
```

실행 후 다른 분들은 브라우저에서:
→ http://192.168.0.76:3000

## 내 PC에서만 볼 때

```
npm run dev
```
→ http://localhost:3000

## 콘텐츠 수정

모든 텍스트(한국어/영어)는 한 파일에 있습니다:
→ lib/i18n.ts

프로젝트 소개, 슬로건, 통계 수치 등 이 파일만 수정하면 반영됩니다.
