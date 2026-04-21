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

const snapStyle: React.CSSProperties = {
  scrollSnapAlign: "start",
  scrollSnapStop: "always",
  scrollMarginTop: 72,
};

function PageContent() {
  const { lang } = useLang();
  return (
    <>
      <div
        id="scroll-container"
        className="relative"
        style={{
          height: "100dvh",
          overflowY: "auto",
          background: "#0a0a12",
          scrollSnapType: "y proximity",
          scrollBehavior: "smooth",
        }}
      >
        <Nav />
        <section id="hero" style={snapStyle}>
          <Hero />
        </section>
        <motion.section id="products" {...sectionReveal} style={snapStyle}>
          <Projects />
        </motion.section>
        <motion.section id="axes" {...sectionReveal} style={snapStyle}>
          <AxesConnection />
        </motion.section>
        <motion.section id="about" {...sectionReveal} style={snapStyle}>
          <About />
        </motion.section>
        <motion.section id="news" {...sectionReveal} style={snapStyle}>
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
