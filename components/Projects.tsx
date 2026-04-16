"use client";

import { useLang } from "./LangContext";
import { content } from "@/lib/i18n";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";

const statusColors: Record<string, string> = {
  "서비스 중": "#10b981", Live: "#10b981",
  "개발 중": "#f59e0b", "In Development": "#f59e0b",
  "출시 예정": "#6366f1", "Launching Soon": "#6366f1",
  "베타 준비": "#ec4899", "Beta Soon": "#ec4899",
  "기획 중": "#8b5cf6", Planned: "#8b5cf6",
};

/* ── Product icon logos ── */
function IconLogo({ id, color, size = 40 }: { id: string; color: string; size?: number }) {
  const c = color;
  const icons: Record<string, React.ReactNode> = {

    pokerlulu: (
      <div style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative", borderRadius: 4 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-pokerlulu.png"
          alt="PokerLulu"
          style={{
            position: "absolute",
            width: "auto",
            height: "185%",
            top: "-8%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </div>
    ),

    linkplay: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 8 Q38 20 30 32" stroke={`${c}35`} strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <path d="M27 11 Q33 20 27 29" stroke={`${c}55`} strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        <rect x="5" y="12" width="20" height="16" rx="3" fill={`${c}20`} stroke={`${c}60`} strokeWidth="1.3"/>
        <path d="M11 16 L11 24 L20 20 Z" fill={`${c}dd`} />
        <circle cx="22" cy="13" r="2.5" fill={`${c}cc`} />
        <circle cx="22" cy="13" r="4" fill="none" stroke={`${c}40`} strokeWidth="0.8"/>
      </svg>
    ),

    moitto: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="15" r="5" fill={`${c}35`} />
        <path d="M4 30 Q10 22 16 30" fill={`${c}28`} />
        <circle cx="30" cy="15" r="5" fill={`${c}35`} />
        <path d="M24 30 Q30 22 36 30" fill={`${c}28`} />
        <circle cx="20" cy="13" r="6" fill={`${c}55`} stroke={`${c}80`} strokeWidth="1"/>
        <path d="M12 32 Q20 22 28 32" fill={`${c}45`} />
        <path d="M15 15 Q20 10 25 15" stroke={`${c}50`} strokeWidth="1" fill="none" strokeDasharray="2 1.5"/>
        <circle cx="20" cy="5" r="4" fill={`${c}25`} stroke={`${c}55`} strokeWidth="1"/>
        <text x="20" y="8" fontSize="5" textAnchor="middle" fill={`${c}cc`} fontFamily="sans-serif">★</text>
      </svg>
    ),

    tubelulu: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 8 L20 34" stroke={`${c}55`} strokeWidth="1.3"/>
        <path d="M20 8 Q11 9 7 13 L7 34 Q11 30 20 32" fill={`${c}22`} stroke={`${c}50`} strokeWidth="1.2"/>
        <path d="M20 8 Q29 9 33 13 L33 34 Q29 30 20 32" fill={`${c}18`} stroke={`${c}45`} strokeWidth="1.2"/>
        <line x1="10" y1="17" x2="18" y2="16.5" stroke={`${c}45`} strokeWidth="0.9"/>
        <line x1="10" y1="20.5" x2="18" y2="20" stroke={`${c}38`} strokeWidth="0.9"/>
        <line x1="10" y1="24" x2="17" y2="23.5" stroke={`${c}30`} strokeWidth="0.9"/>
        <path d="M23 16 L23 26 L31 21 Z" fill={`${c}cc`}/>
        <text x="20" y="7" fontSize="7" textAnchor="middle" fill={`${c}bb`} fontFamily="sans-serif">★</text>
      </svg>
    ),

    shuffleup: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 7 L27 7 L25 21 Q20 25 20 25 Q20 25 15 21 Z" fill={`${c}28`} stroke={`${c}65`} strokeWidth="1.3"/>
        <path d="M13 7 Q7 7 7 13 Q7 19 13 21" stroke={`${c}55`} strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        <path d="M27 7 Q33 7 33 13 Q33 19 27 21" stroke={`${c}55`} strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        <rect x="17" y="25" width="6" height="6" fill={`${c}28`}/>
        <rect x="12" y="31" width="16" height="3.5" rx="1.8" fill={`${c}50`} stroke={`${c}70`} strokeWidth="1"/>
        <text x="20" y="20" fontSize="11" textAnchor="middle" fill={`${c}ee`} fontFamily="sans-serif">★</text>
        <text x="20" y="13" fontSize="6" textAnchor="middle" fill={`${c}aa`} fontWeight="800" fontFamily="sans-serif">1st</text>
      </svg>
    ),

    gtolulu: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 34 Q8 34 11 28 Q14 20 20 12 Q26 20 29 28 Q32 34 36 34"
          stroke={`${c}70`} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M4 34 Q8 34 11 28 Q14 20 20 12 Q26 20 29 28 Q32 34 36 34 L36 36 L4 36 Z"
          fill={`${c}12`}/>
        <line x1="4" y1="34" x2="36" y2="34" stroke={`${c}25`} strokeWidth="1"/>
        <circle cx="20" cy="12" r="4.5" fill={`${c}35`} stroke={`${c}70`} strokeWidth="1.2"/>
        <circle cx="11" cy="28" r="3" fill={`${c}25`} stroke={`${c}50`} strokeWidth="1"/>
        <circle cx="29" cy="28" r="3" fill={`${c}25`} stroke={`${c}50`} strokeWidth="1"/>
        <line x1="14" y1="14" x2="9" y2="26" stroke={`${c}35`} strokeWidth="0.9"/>
        <line x1="26" y1="14" x2="31" y2="26" stroke={`${c}35`} strokeWidth="0.9"/>
        <text x="20" y="15.5" fontSize="5" textAnchor="middle" fill={`${c}ee`} fontWeight="800" fontFamily="sans-serif">GTO</text>
      </svg>
    ),
  };

  return (
    <div style={{ width: size, height: size, flexShrink: 0 }}>
      {icons[id] ?? (
        <svg viewBox="0 0 40 40" fill="none">
          <rect x="4" y="4" width="32" height="32" rx="8" fill={`${c}28`}/>
          <text x="20" y="27" fontSize="18" textAnchor="middle" fill={c} fontWeight="bold" fontFamily="sans-serif">
            {id[0].toUpperCase()}
          </text>
        </svg>
      )}
    </div>
  );
}

function PokerLuluIllustration({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <g transform="rotate(-18 110 115)">
        <rect x="50" y="45" width="72" height="98" rx="8" fill={`${color}14`} stroke={`${color}35`} strokeWidth="1.5"/>
        <text x="64" y="80" fontSize="18" fill={`${color}90`} fontFamily="serif">♣</text>
        <text x="64" y="130" fontSize="18" fill={`${color}90`} fontFamily="serif" transform="rotate(180 80 125)">♣</text>
      </g>
      <g transform="rotate(-5 160 110)">
        <rect x="100" y="40" width="72" height="98" rx="8" fill={`${color}20`} stroke={`${color}55`} strokeWidth="1.5"/>
        <text x="114" y="75" fontSize="18" fill={`${color}cc`} fontFamily="serif">♠</text>
        <text x="136" y="100" fontSize="28" fill={`${color}dd`} fontFamily="serif" textAnchor="middle">♠</text>
        <text x="114" y="125" fontSize="18" fill={`${color}cc`} fontFamily="serif" transform="rotate(180 130 120)">♠</text>
      </g>
      <g transform="rotate(12 200 115)">
        <rect x="148" y="45" width="72" height="98" rx="8" fill={`${color}14`} stroke={`${color}35`} strokeWidth="1.5"/>
        <text x="162" y="80" fontSize="18" fill={`${color}90`} fontFamily="serif">♥</text>
        <text x="162" y="130" fontSize="18" fill={`${color}90`} fontFamily="serif" transform="rotate(180 178 125)">♥</text>
      </g>
      <circle cx="258" cy="118" r="32" fill={`${color}10`} stroke={`${color}45`} strokeWidth="2"/>
      <circle cx="258" cy="118" r="24" fill={`${color}0a`} stroke={`${color}60`} strokeWidth="1.5" strokeDasharray="6 4"/>
      <circle cx="258" cy="118" r="14" fill={`${color}18`} stroke={`${color}55`} strokeWidth="1.5"/>
      <text x="258" y="123" fontSize="12" fill={`${color}cc`} textAnchor="middle" fontWeight="bold">LULU</text>
      <ellipse cx="160" cy="165" rx="120" ry="10" fill={`${color}10`}/>
    </svg>
  );
}

function LinkPlayIllustration({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="90" y="25" width="140" height="28" rx="8" fill={`${color}15`} stroke={`${color}40`} strokeWidth="1.5"/>
      <circle cx="108" cy="39" r="6" fill={`${color}cc`}/>
      <circle cx="108" cy="39" r="10" fill="none" stroke={`${color}50`} strokeWidth="1.2">
        <animate attributeName="r" values="6;14;6" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite"/>
      </circle>
      <text x="122" y="43" fontSize="9" fill={`${color}cc`} fontWeight="700">LIVE</text>
      <rect x="148" y="33" width="60" height="12" rx="4" fill={`${color}20`}/>
      <rect x="150" y="35" width="42" height="8" rx="3" fill={`${color}50`}/>
      <rect x="40" y="65" width="110" height="72" rx="8" fill={`${color}12`} stroke={`${color}40`} strokeWidth="1.5"/>
      <circle cx="95" cy="88" r="12" fill={`${color}35`}/>
      <path d="M72 130 Q95 110 118 130" fill={`${color}25`}/>
      <rect x="89" y="110" width="12" height="18" rx="6" fill={`${color}50`} stroke={`${color}70`} strokeWidth="1"/>
      <path d="M84 122 Q84 130 95 130 Q106 130 106 122" stroke={`${color}60`} strokeWidth="1.2" fill="none"/>
      <rect x="168" y="65" width="90" height="22" rx="8" fill={`${color}18`} stroke={`${color}35`} strokeWidth="1"/>
      <rect x="174" y="70" width="60" height="6" rx="3" fill={`${color}40`}/>
      <rect x="174" y="79" width="40" height="4" rx="2" fill={`${color}25`}/>
      <rect x="178" y="95" width="80" height="22" rx="8" fill={`${color}18`} stroke={`${color}35`} strokeWidth="1"/>
      <rect x="184" y="100" width="50" height="6" rx="3" fill={`${color}40`}/>
      <rect x="184" y="109" width="34" height="4" rx="2" fill={`${color}25`}/>
      <rect x="168" y="125" width="90" height="22" rx="8" fill={`${color}22`} stroke={`${color}45`} strokeWidth="1"/>
      <rect x="174" y="130" width="55" height="6" rx="3" fill={`${color}50`}/>
      <rect x="174" y="139" width="38" height="4" rx="2" fill={`${color}30`}/>
      <path d="M152 90 L166 85" stroke={`${color}50`} strokeWidth="1.5" strokeDasharray="3 2"/>
      <path d="M152 100 L166 106" stroke={`${color}40`} strokeWidth="1.5" strokeDasharray="3 2"/>
      <path d="M152 105 L166 136" stroke={`${color}30`} strokeWidth="1.5" strokeDasharray="3 2"/>
      <rect x="40" y="148" width="60" height="16" rx="6" fill={`${color}20`} stroke={`${color}40`} strokeWidth="1"/>
      <text x="70" y="159" fontSize="8" textAnchor="middle" fill={`${color}cc`} fontWeight="600">👥 1,204</text>
    </svg>
  );
}

function MoittoIllustration({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <line x1="100" y1="90" x2="160" y2="60" stroke={`${color}30`} strokeWidth="1.5" strokeDasharray="4 3"/>
      <line x1="220" y1="90" x2="160" y2="60" stroke={`${color}30`} strokeWidth="1.5" strokeDasharray="4 3"/>
      <line x1="100" y1="90" x2="220" y2="90" stroke={`${color}30`} strokeWidth="1.5" strokeDasharray="4 3"/>
      <line x1="100" y1="90" x2="160" y2="135" stroke={`${color}25`} strokeWidth="1.5" strokeDasharray="4 3"/>
      <line x1="220" y1="90" x2="160" y2="135" stroke={`${color}25`} strokeWidth="1.5" strokeDasharray="4 3"/>
      <circle cx="160" cy="52" r="18" fill={`${color}18`} stroke={`${color}55`} strokeWidth="1.5"/>
      <circle cx="160" cy="47" r="7" fill={`${color}40`}/>
      <path d="M147 66 Q160 58 173 66" stroke={`${color}55`} strokeWidth="1.5" fill="none"/>
      <circle cx="92" cy="90" r="18" fill={`${color}18`} stroke={`${color}55`} strokeWidth="1.5"/>
      <circle cx="92" cy="85" r="7" fill={`${color}40`}/>
      <path d="M79 104 Q92 96 105 104" stroke={`${color}55`} strokeWidth="1.5" fill="none"/>
      <circle cx="228" cy="90" r="18" fill={`${color}18`} stroke={`${color}55`} strokeWidth="1.5"/>
      <circle cx="228" cy="85" r="7" fill={`${color}40`}/>
      <path d="M215 104 Q228 96 241 104" stroke={`${color}55`} strokeWidth="1.5" fill="none"/>
      <circle cx="160" cy="135" r="14" fill={`${color}25`} stroke={`${color}65`} strokeWidth="1.5"/>
      <text x="160" y="140" fontSize="13" textAnchor="middle" fill={`${color}dd`}>★</text>
      <rect x="66" y="115" width="26" height="12" rx="5" fill={`${color}20`} stroke={`${color}40`} strokeWidth="1"/>
      <text x="79" y="124" fontSize="7" textAnchor="middle" fill={`${color}bb`} fontWeight="600">RANK</text>
      <rect x="202" y="115" width="26" height="12" rx="5" fill={`${color}20`} stroke={`${color}40`} strokeWidth="1"/>
      <text x="215" y="124" fontSize="7" textAnchor="middle" fill={`${color}bb`} fontWeight="600">RANK</text>
    </svg>
  );
}

function TubeLuluIllustration({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="120" cy="90" r="52" fill={`${color}12`} stroke={`${color}35`} strokeWidth="1.5"/>
      <circle cx="120" cy="90" r="38" fill={`${color}18`} stroke={`${color}45`} strokeWidth="1.5"/>
      <path d="M110 74 L110 106 L140 90 Z" fill={`${color}cc`}/>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(192, ${42 + i * 34})`}>
          <rect width="96" height="26" rx="5" fill={`${color}10`} stroke={`${color}22`} strokeWidth="1"/>
          <circle cx="13" cy="13" r="9" fill={`${color}25`}/>
          <rect x="28" y="7" width="50" height="4" rx="2" fill={`${color}35`}/>
          <rect x="28" y="15" width="36" height="4" rx="2" fill={`${color}20`}/>
        </g>
      ))}
      <rect x="58" y="150" width="52" height="20" rx="10" fill={`${color}20`} stroke={`${color}45`} strokeWidth="1"/>
      <text x="84" y="163" fontSize="9" textAnchor="middle" fill={`${color}cc`} fontWeight="600">Q&amp;A</text>
      <text x="165" y="98" fontSize="20" fill={`${color}80`}>★</text>
    </svg>
  );
}

function ShuffleUpIllustration({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M148 32 L172 32 L168 58 Q160 66 160 66 Q160 66 152 58 Z" fill={`${color}25`} stroke={`${color}55`} strokeWidth="1.5"/>
      <path d="M148 32 Q138 32 138 44 Q138 56 152 58" stroke={`${color}45`} strokeWidth="1.5" fill="none"/>
      <path d="M172 32 Q182 32 182 44 Q182 56 168 58" stroke={`${color}45`} strokeWidth="1.5" fill="none"/>
      <rect x="154" y="66" width="12" height="14" fill={`${color}30`}/>
      <rect x="146" y="80" width="28" height="5" rx="2" fill={`${color}45`}/>
      <text x="160" y="55" fontSize="12" textAnchor="middle" fill={`${color}cc`}>★</text>
      <rect x="38" y="105" width="48" height="20" rx="4" fill={`${color}15`} stroke={`${color}40`} strokeWidth="1.2"/>
      <rect x="38" y="133" width="48" height="20" rx="4" fill={`${color}15`} stroke={`${color}40`} strokeWidth="1.2"/>
      <rect x="234" y="105" width="48" height="20" rx="4" fill={`${color}15`} stroke={`${color}40`} strokeWidth="1.2"/>
      <rect x="234" y="133" width="48" height="20" rx="4" fill={`${color}15`} stroke={`${color}40`} strokeWidth="1.2"/>
      <rect x="114" y="119" width="92" height="20" rx="4" fill={`${color}22`} stroke={`${color}55`} strokeWidth="1.5"/>
      <text x="160" y="132" fontSize="8" textAnchor="middle" fill={`${color}cc`} fontWeight="600">FINAL</text>
      <path d="M86 115 L100 115 L100 129 L114 129" stroke={`${color}35`} strokeWidth="1.2"/>
      <path d="M86 143 L100 143 L100 129" stroke={`${color}35`} strokeWidth="1.2"/>
      <path d="M234 115 L220 115 L220 129 L206 129" stroke={`${color}35`} strokeWidth="1.2"/>
      <path d="M234 143 L220 143 L220 129" stroke={`${color}35`} strokeWidth="1.2"/>
      <line x1="160" y1="85" x2="160" y2="119" stroke={`${color}35`} strokeWidth="1.2" strokeDasharray="3 2"/>
    </svg>
  );
}

function GTOluluIllustration({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path
        d="M40 145 Q60 145 80 130 Q100 115 120 80 Q140 40 160 35 Q180 40 200 80 Q220 115 240 130 Q260 145 280 145"
        stroke={`${color}70`} strokeWidth="2" fill="none"
      />
      <path
        d="M40 145 Q60 145 80 130 Q100 115 120 80 Q140 40 160 35 Q180 40 200 80 Q220 115 240 130 Q260 145 280 145 L280 150 L40 150 Z"
        fill={`${color}10`}
      />
      <line x1="40" y1="150" x2="280" y2="150" stroke={`${color}25`} strokeWidth="1"/>
      <circle cx="80" cy="80" r="10" fill={`${color}20`} stroke={`${color}55`} strokeWidth="1.5"/>
      <circle cx="160" cy="55" r="13" fill={`${color}30`} stroke={`${color}70`} strokeWidth="1.5"/>
      <circle cx="240" cy="80" r="10" fill={`${color}20`} stroke={`${color}55`} strokeWidth="1.5"/>
      <line x1="90" y1="80" x2="147" y2="60" stroke={`${color}35`} strokeWidth="1"/>
      <line x1="230" y1="80" x2="173" y2="60" stroke={`${color}35`} strokeWidth="1"/>
      <text x="160" y="59" fontSize="9" textAnchor="middle" fill={`${color}ee`} fontWeight="800">GTO</text>
      <text x="80" y="84" fontSize="8" textAnchor="middle" fill={`${color}aa`}>64%</text>
      <text x="240" y="84" fontSize="8" textAnchor="middle" fill={`${color}aa`}>36%</text>
      <rect x="248" y="28" width="44" height="36" rx="6" fill={`${color}15`} stroke={`${color}40`} strokeWidth="1.2"/>
      <rect x="256" y="36" width="28" height="20" rx="3" fill={`${color}20`} stroke={`${color}50`} strokeWidth="1"/>
      <text x="270" y="50" fontSize="9" textAnchor="middle" fill={`${color}cc`} fontWeight="700">AI</text>
      {[0,1,2].map(i => <line key={i} x1={257 + i * 8} y1="28" x2={257 + i * 8} y2="24" stroke={`${color}40`} strokeWidth="1.5"/>)}
      {[0,1,2].map(i => <line key={i} x1={257 + i * 8} y1="64" x2={257 + i * 8} y2="68" stroke={`${color}40`} strokeWidth="1.5"/>)}
    </svg>
  );
}

function ProductIllustration({ id, color }: { id: string; color: string }) {
  const map: Record<string, React.ReactNode> = {
    pokerlulu:  <PokerLuluIllustration color={color} />,
    linkplay:   <LinkPlayIllustration color={color} />,
    moitto:     <MoittoIllustration color={color} />,
    tubelulu:   <TubeLuluIllustration color={color} />,
    shuffleup:  <ShuffleUpIllustration color={color} />,
    gtolulu:    <GTOluluIllustration color={color} />,
  };
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: `${color}08`,
        border: `1px solid ${color}20`,
        aspectRatio: "16/7",
      }}
    >
      {map[id] ?? null}
    </div>
  );
}

export default function Projects() {
  const { lang } = useLang();
  const t = content.products;
  const items = t.items;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  const scroll = (dir: "prev" | "next") => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.querySelector("[data-card]") as HTMLElement | null;
    if (!card) return;
    const w = card.offsetWidth + 16; // card width + gap
    const newIdx = dir === "next" ? Math.min(currentIdx + 1, items.length - 1) : Math.max(currentIdx - 1, 0);
    container.scrollTo({ left: w * newIdx, behavior: "smooth" });
    setCurrentIdx(newIdx);
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.querySelector("[data-card]") as HTMLElement | null;
    if (!card) return;
    const w = card.offsetWidth + 16;
    const idx = Math.round(container.scrollLeft / w);
    setCurrentIdx(idx);
  };

  return (
    <section
      id="products"
      className="relative overflow-hidden"
      style={{ height: "100dvh", scrollSnapAlign: "start" }}
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[200px] opacity-[0.05] pointer-events-none" style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />

      <div className="h-full flex flex-col pt-24 md:pt-28 pb-6 md:pb-10">
        {/* Header */}
        <div className="px-5 md:px-12 lg:px-16 mb-6 md:mb-8 flex-shrink-0 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.24em] text-indigo-400 mb-3 uppercase"
          >
            {t.label[lang]}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="font-black text-white leading-tight"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            {t.headline[lang]}
          </motion.h2>
        </div>

        {/* Carousel wrapper with overlay arrows */}
        <div className="relative flex-1 min-h-0">
          {/* Prev arrow */}
          <button
            onClick={() => scroll("prev")}
            className="absolute left-1 md:left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md"
            style={{
              background: currentIdx > 0 ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.2)",
              border: "1px solid rgba(255,255,255,0.1)",
              opacity: currentIdx > 0 ? 1 : 0,
              pointerEvents: currentIdx > 0 ? "auto" : "none",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>

          {/* Next arrow */}
          <button
            onClick={() => scroll("next")}
            className="absolute right-1 md:right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md"
            style={{
              background: currentIdx < items.length - 1 ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.2)",
              border: "1px solid rgba(255,255,255,0.1)",
              opacity: currentIdx < items.length - 1 ? 1 : 0,
              pointerEvents: currentIdx < items.length - 1 ? "auto" : "none",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>

          {/* Horizontal slide cards */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="h-full flex gap-4 overflow-x-auto px-5 md:px-12 lg:px-16"
            style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", scrollPaddingLeft: "20px" }}
          >
          {items.map((item, i) => {
            const sc = statusColors[item.status[lang]] || "#888";
            return (
              <motion.div
                key={item.id}
                data-card
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="group relative rounded-2xl flex flex-col overflow-hidden flex-shrink-0"
                style={{
                  width: "min(85vw, 420px)",
                  scrollSnapAlign: "start",
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl pointer-events-none"
                  style={{ background: `linear-gradient(135deg, ${item.color}0c, transparent 60%)` }}
                />

                {/* Image placeholder */}
                <div
                  className="relative w-full flex items-center justify-center overflow-hidden"
                  style={{ aspectRatio: "16/9", background: `${item.color}08` }}
                >
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <>
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(ellipse at 30% 40%, ${item.color}15, transparent 60%), radial-gradient(ellipse at 80% 70%, ${item.color}0c, transparent 50%)`,
                        }}
                      />
                      <svg viewBox="0 0 160 90" fill="none" className="w-1/2 h-1/2 opacity-15">
                        <rect x="30" y="15" width="100" height="60" rx="8" stroke={item.color} strokeWidth="1" strokeDasharray="4 3" />
                        <path d="M55 55 L70 35 L85 50 L95 40 L115 55" stroke={item.color} strokeWidth="1.2" fill="none" strokeLinejoin="round" />
                        <circle cx="60" cy="32" r="6" stroke={item.color} strokeWidth="1" fill={`${item.color}20`} />
                      </svg>
                    </>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 p-4 md:p-5 flex-1">

                {/* Icon + name + tag */}
                <div className="relative z-10 flex items-center gap-3">
                  <div
                    className="rounded-xl p-2.5 flex-shrink-0"
                    style={{
                      background: `${item.color}12`,
                      border: `1px solid ${item.color}28`,
                      boxShadow: `0 0 16px ${item.color}15`,
                    }}
                  >
                    <IconLogo id={item.id} color={item.color} size={32} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-bold text-white truncate group-hover:text-indigo-200 transition-colors duration-300">
                      {item.name}
                      {item.name_ko !== item.name && (
                        <span className="text-white/25 font-medium ml-1.5 text-sm">{item.name_ko}</span>
                      )}
                    </h3>
                    <div className="text-[11px] md:text-xs mt-0.5 opacity-55" style={{ color: item.color }}>
                      {item.tag[lang]}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="relative z-10 text-xs md:text-sm text-white/45 leading-relaxed whitespace-pre-line flex-1">
                  {item.desc[lang]}
                </p>

                {/* Badges */}
                <div className="relative z-10 flex flex-wrap gap-1.5">
                  {item.badges[lang].map((badge) => (
                    <span
                      key={badge}
                      className="text-[10px] md:text-[11px] px-2.5 py-1 rounded-full font-medium"
                      style={{ background: `${item.color}12`, color: item.color, border: `1px solid ${item.color}22` }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Bottom: status + link */}
                <div className="relative z-10 flex items-center justify-between pt-2" style={{ borderTop: `1px solid rgba(255,255,255,0.06)` }}>
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-medium"
                    style={{ color: sc }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: sc, boxShadow: `0 0 4px ${sc}` }} />
                    {item.status[lang]}
                  </span>
                  <Link
                    href={`/services/${item.id}`}
                    className="text-xs font-semibold px-4 py-1.5 rounded-full text-white transition-all duration-200 hover:brightness-125"
                    style={{ background: `${item.color}25`, border: `1px solid ${item.color}40` }}
                  >
                    {lang === "ko" ? "자세히 보기" : "Learn More"}
                  </Link>
                </div>
                </div>
              </motion.div>
            );
          })}
          {/* End spacer */}
          <div className="flex-shrink-0 w-1" />
        </div>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 pt-4 md:pt-6 flex-shrink-0">
          {items.map((item, i) => (
            <button
              key={item.id}
              onClick={() => {
                const container = scrollRef.current;
                if (!container) return;
                const card = container.querySelector("[data-card]") as HTMLElement | null;
                if (!card) return;
                const w = card.offsetWidth + 16;
                container.scrollTo({ left: w * i, behavior: "smooth" });
                setCurrentIdx(i);
              }}
              className="rounded-full transition-all duration-300"
              style={{
                width: currentIdx === i ? 24 : 6,
                height: 6,
                background: currentIdx === i
                  ? `linear-gradient(90deg, ${item.color}, ${item.color}88)`
                  : "rgba(255,255,255,0.15)",
                boxShadow: currentIdx === i ? `0 0 8px ${item.color}60` : "none",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
