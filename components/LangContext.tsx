"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Lang } from "@/lib/i18n";

const LangContext = createContext<{
  lang: Lang;
  toggle: () => void;
}>({ lang: "ko", toggle: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ko");
  const toggle = () => setLang((l) => (l === "ko" ? "en" : "ko"));
  return (
    <LangContext.Provider value={{ lang, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
