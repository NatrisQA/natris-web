"use client";

import { LangProvider, useLang } from "@/components/LangContext";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import News from "@/components/News";
import Partnership from "@/components/Partnership";
import Footer from "@/components/Footer";
import ScrollDots from "@/components/ScrollDots";

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
        <Projects />
        <News />
        <About />
        <Partnership />
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
