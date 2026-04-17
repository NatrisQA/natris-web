"use client";

import { LangProvider } from "@/components/LangContext";
import Partnership from "@/components/Partnership";
import CursorEffect from "@/components/CursorEffect";

export default function PartnershipPage() {
  return (
    <LangProvider>
      <div
        className="relative"
        style={{ height: "100dvh", overflowY: "auto", background: "#050508" }}
      >
        <Partnership />
      </div>
      <CursorEffect />
    </LangProvider>
  );
}
