"use client";

import { useLang } from "./LangContext";
import { content } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Nav() {
  const { lang, toggle } = useLang();
  const router = useRouter();
  const t = content.nav[lang];
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const c = document.getElementById("scroll-container");
    if (!c) return;
    const onScroll = () => setElevated(c.scrollTop > 16);
    c.addEventListener("scroll", onScroll, { passive: true });
    return () => c.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#products", label: t.products },
    { href: "#about", label: t.about },
    { href: "#news", label: lang === "ko" ? "소식" : "News" },
    { href: "/partnership", label: lang === "ko" ? "제휴" : "Partnership" },
  ];

  const handleNav = (href: string) => {
    if (href.startsWith("#")) {
      const container = document.getElementById("scroll-container");
      const target = document.getElementById(href.slice(1));
      if (container && target) {
        container.scrollTo({ top: target.offsetTop - 72, behavior: "smooth" });
      }
    } else {
      router.push(href);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{
          background: elevated ? "rgba(10,10,18,0.82)" : "rgba(10,10,18,0.4)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: elevated ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
          transition: "border-color 0.3s, background 0.3s",
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            const c = document.getElementById("scroll-container");
            if (c) c.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 group"
        >
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-black"
            style={{ background: "#ff5a6a", color: "#fff" }}
          >
            L
          </div>
          <span className="font-black tracking-[0.02em] text-[15px]" style={{ color: "#f5f5f7" }}>
            LULU.AI
          </span>
        </a>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNav(item.href);
              }}
              className="text-sm font-semibold transition-colors duration-200 hover:opacity-100"
              style={{ color: "rgba(255,255,255,0.72)" }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: lang toggle + mobile hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all duration-200"
            style={{ border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.62)" }}
          >
            <span style={{ color: lang === "ko" ? "#f5f5f7" : "rgba(255,255,255,0.4)" }}>KO</span>
            <span style={{ color: "rgba(255,255,255,0.28)" }}>|</span>
            <span style={{ color: lang === "en" ? "#f5f5f7" : "rgba(255,255,255,0.4)" }}>EN</span>
          </button>

          {/* Hamburger (mobile only) */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col items-center justify-center w-8 h-8 gap-[5px]"
            aria-label="Menu"
          >
            <span
              className="block w-5 h-[1.5px] transition-all duration-300 origin-center"
              style={{ background: "#f5f5f7", ...(open ? { transform: "translateY(3.25px) rotate(45deg)" } : {}) }}
            />
            <span
              className="block w-5 h-[1.5px] transition-all duration-300 origin-center"
              style={{ background: "#f5f5f7", ...(open ? { transform: "translateY(-3.25px) rotate(-45deg)" } : {}) }}
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
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
            style={{ background: "rgba(10,10,18,0.97)", backdropFilter: "blur(24px)" }}
          >
            {links.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ delay: 0.06 * i }}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  handleNav(item.href);
                }}
                className="text-2xl font-black"
                style={{ color: "#f5f5f7" }}
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
