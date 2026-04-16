import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-6 text-center px-6"
      style={{ height: "100dvh", background: "#050508" }}
    >
      <div
        className="text-[120px] font-black leading-none"
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #c7d2fe 60%, #a5b4fc 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        404
      </div>
      <p className="text-white/40 text-lg">페이지를 찾을 수 없습니다</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
        style={{
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          boxShadow: "0 0 24px rgba(99,102,241,0.3)",
        }}
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
