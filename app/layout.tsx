import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "lulu.ai — 커뮤니티로 잇는 새로운 세상",
  description:
    "룰루닷에이아이는 게임과 커뮤니티, 기술을 연결하는 플랫폼 기업입니다. 온라인 게임, 라이브 플랫폼, 소모임 운영, AI 솔루션까지 — 플레이어 생태계 전반을 설계합니다.",
  openGraph: {
    title: "lulu.ai — 커뮤니티로 잇는 새로운 세상",
    description: "게임과 커뮤니티, 기술을 연결하는 플랫폼 기업 lulu.ai",
    siteName: "lulu.ai",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "lulu.ai — 커뮤니티로 잇는 새로운 세상",
    description: "게임과 커뮤니티, 기술을 연결하는 플랫폼 기업 lulu.ai",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  other: {
    "theme-color": "#050508",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <meta name="theme-color" content="#050508" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
