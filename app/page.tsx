"use client";

import { LangProvider, useLang } from "@/components/LangContext";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import AxesConnection from "@/components/AxesConnection";
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
        style={{ height: "100dvh", overflowY: "auto", background: "#0a0a12" }}
      >
        <Nav />
        <Hero />
        <motion.section id="products" {...sectionReveal}>
          <Projects />
        </motion.section>
        <motion.section id="axes" {...sectionReveal}>
          <AxesConnection />
        </motion.section>
        <motion.section id="about" {...sectionReveal}>
          <About />
        </motion.section>
        <motion.section id="news" {...sectionReveal}>
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
