"use client";

import { LangProvider, useLang } from "@/components/LangContext";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import News from "@/components/News";

import Footer from "@/components/Footer";
import ScrollDots from "@/components/ScrollDots";
import CursorEffect from "@/components/CursorEffect";
import { motion } from "framer-motion";

const sectionReveal = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" as const },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

function PageContent() {
  const { lang } = useLang();
  return (
    <>
      <div
        id="scroll-container"
        className="relative"
        style={{ height: "100dvh", overflowY: "scroll", scrollSnapType: "y mandatory", background: "#050508" }}
      >
        <Nav />
        <Hero />
        <motion.div id="products" {...sectionReveal} className="section-divider" style={{ scrollSnapAlign: "start" }}>
          <Projects />
        </motion.div>
        <motion.div id="news" {...sectionReveal} className="section-divider" style={{ scrollSnapAlign: "start" }}>
          <News />
        </motion.div>
        <motion.div id="about" {...sectionReveal} className="section-divider" style={{ scrollSnapAlign: "start" }}>
          <About />
        </motion.div>
        <Footer />
      </div>
      <ScrollDots lang={lang} />
      <CursorEffect />
    </>
  );
}

export default function Home() {
  return (
    <LangProvider>
      <PageContent />
    </LangProvider>
  );
}
