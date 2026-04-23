"use client";

import { useParams } from "next/navigation";
import { content } from "@/lib/i18n";
import { LangProvider, useLang } from "@/components/LangContext";
import ServiceDetail from "@/components/ServiceDetail";

function ServicePageContent() {
  const params = useParams();
  const { lang } = useLang();
  const id = params.id as string;
  const item = id === "moitto" ? undefined : content.products.items.find((p) => p.id === id);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#050508" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">404</h1>
          <p className="text-white/40 mb-8">{lang === "ko" ? "서비스를 찾을 수 없습니다." : "Service not found."}</p>
          <a href="/" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            {lang === "ko" ? "홈으로 돌아가기" : "Back to Home"}
          </a>
        </div>
      </div>
    );
  }

  return <ServiceDetail item={item} />;
}

export default function ServicePage() {
  return (
    <LangProvider>
      <ServicePageContent />
    </LangProvider>
  );
}
