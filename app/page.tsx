"use client";

import { LangProvider, useLang } from "@/components/LangContext";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Axes from "@/components/Axes";
import AxesConnection from "@/components/AxesConnection";
import AxesVision from "@/components/AxesVision";
import About from "@/components/About";
import Projects from "@/components/Projects";
import News from "@/components/News";
import Footer from "@/components/Footer";
import ScrollDots from "@/components/ScrollDots";
import { motion } from "framer-motion";

const sectionReveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

function PageContent() {
  const { lang } = useLang();
  return (
    <>
      <div
        id="scroll-container"
        className="relative"
        style={{ height: "100dvh", overflowY: "auto", background: "#ffffff" }}
      >
        <Nav />
        <Hero />
        <motion.section id="axes" {...sectionReveal}>
          <AxesConnection />
        </motion.section>
        <motion.section id="axes-vision" {...sectionReveal}>
          <AxesVision />
        </motion.section>
        {/* Keep original 3-card version below variants for reference — remove after choosing */}
        <motion.section id="axes-cards" {...sectionReveal}>
          <div className="text-center pt-16" style={{ background: "#fff" }}>
            <span
              className="inline-block text-[10px] font-black tracking-[0.24em] px-3 py-1.5 rounded-full"
              style={{ background: "#666", color: "#fff" }}
            >
              현재 버전 · 3카드 구조
            </span>
          </div>
          <Axes />
        </motion.section>
        <motion.section id="products" {...sectionReveal} className="section-divider">
          <Projects />
        </motion.section>
        <motion.section id="about" {...sectionReveal} className="section-divider">
          <About />
        </motion.section>
        <motion.section id="news" {...sectionReveal} className="section-divider">
          <News />
        </motion.section>
        <Footer />
      </div>
      <ScrollDots lang={lang} />
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
