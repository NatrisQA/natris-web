"use client";

import { useLang } from "./LangContext";
import { content } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Nav() {
  const { lang, toggle } = useLang();
  const t = content.nav[lang];
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#products", label: t.products },
    { href: "#partnership", label: t.partnership },
    { href: "#about", label: t.about },
    { href: "mailto:contact@lulu.ai", label: t.contact },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5"
        style={{ background: "rgba(5,5,8,0.8)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-black text-white">L</div>
          <span className="text-white font-bold tracking-wide text-sm">lulu.ai</span>
        </a>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                if (item.href.startsWith("#")) {
                  e.preventDefault();
                  const container = document.getElementById("scroll-container");
                  const target = document.getElementById(item.href.slice(1));
                  if (container && target) {
                    container.scrollTo({ top: target.offsetTop, behavior: "smooth" });
                  }
                }
              }}
              className="text-sm text-white/60 hover:text-white transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: lang toggle + mobile hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white/60 hover:text-white border border-white/10 hover:border-white/30 transition-all duration-200"
          >
            <span className={lang === "ko" ? "text-white" : "text-white/40"}>KO</span>
            <span className="text-white/20">|</span>
            <span className={lang === "en" ? "text-white" : "text-white/40"}>EN</span>
          </button>

          {/* Hamburger (mobile only) */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col items-center justify-center w-8 h-8 gap-[5px]"
            aria-label="Menu"
          >
            <span
              className="block w-5 h-[1.5px] bg-white/70 transition-all duration-300 origin-center"
              style={open ? { transform: "translateY(3.25px) rotate(45deg)" } : {}}
            />
            <span
              className="block w-5 h-[1.5px] bg-white/70 transition-all duration-300 origin-center"
              style={open ? { transform: "translateY(-3.25px) rotate(-45deg)" } : {}}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
            style={{ background: "rgba(5,5,8,0.95)", backdropFilter: "blur(24px)" }}
          >
            {links.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.06 * i }}
                onClick={(e) => {
                  setOpen(false);
                  if (item.href.startsWith("#")) {
                    e.preventDefault();
                    const container = document.getElementById("scroll-container");
                    const target = document.getElementById(item.href.slice(1));
                    if (container && target) {
                      container.scrollTo({ top: target.offsetTop, behavior: "smooth" });
                    }
                  }
                }}
                className="text-xl font-semibold text-white/80 hover:text-white transition-colors"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
