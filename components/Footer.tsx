"use client";

import { useLang } from "./LangContext";
import { content } from "@/lib/i18n";

export default function Footer() {
  const { lang } = useLang();
  const tf = content.footer[lang];

  return (
    <footer
      id="footer"
      className="relative flex-shrink-0"
      style={{ scrollSnapAlign: "end" }}
    >
      <div className="relative px-8 md:px-16 py-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {/* top glow line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.45), transparent)" }} />

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand + links */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black text-white" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 0 10px rgba(99,102,241,0.45)" }}>L</div>
              <span className="text-white/70 text-sm font-semibold">{tf.company}</span>
            </div>
            <div className="hidden md:flex items-center gap-4">
              {tf.links.map((l) => (
                <a key={l.label} href={l.href} className="text-xs text-white/28 hover:text-white/60 transition-colors duration-200">{l.label}</a>
              ))}
            </div>
          </div>

          {/* Contact + rights */}
          <div className="flex items-center gap-6">
            <a href={`mailto:${tf.contact}`} className="text-xs text-white/35 hover:text-white/65 transition-colors duration-200">{tf.contact}</a>
            <span className="text-xs text-white/18">{tf.rights}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
