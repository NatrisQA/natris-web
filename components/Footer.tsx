"use client";

import { useLang } from "./LangContext";
import { content } from "@/lib/i18n";
import Link from "next/link";

export default function Footer() {
  const { lang } = useLang();
  const tf = content.footer[lang];

  return (
    <footer
      id="footer"
      className="relative flex-shrink-0"
      style={{ background: "#f7f7f7", borderTop: "1px solid #ececec" }}
    >
      <div className="px-6 md:px-12 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand + links */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-black"
                style={{ background: "var(--brand-red)", color: "#fff" }}
              >
                L
              </div>
              <div>
                <div className="text-sm font-black" style={{ color: "#111" }}>
                  {tf.company}
                </div>
                <div className="text-[11px]" style={{ color: "#888" }}>
                  {tf.tagline}
                </div>
              </div>
            </div>
            <div className="flex items-center flex-wrap gap-4">
              {tf.links.map((l) =>
                l.href.startsWith("/") ? (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="text-[12.5px] font-semibold transition-colors"
                    style={{ color: "#555" }}
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    key={l.label}
                    href={l.href}
                    className="text-[12.5px] font-semibold transition-colors"
                    style={{ color: "#555" }}
                  >
                    {l.label}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Contact + rights */}
          <div className="flex flex-col items-start md:items-end gap-1">
            <a
              href={`mailto:${tf.contact}`}
              className="text-[13px] font-bold"
              style={{ color: "#111" }}
            >
              {tf.contact_label}: {tf.contact}
            </a>
            <span className="text-[11px]" style={{ color: "#999" }}>
              {tf.rights.replace("2026", String(new Date().getFullYear()))}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
