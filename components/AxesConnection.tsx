"use client";

import { useLang } from "./LangContext";
import { content } from "@/lib/i18n";
import { motion } from "framer-motion";
import { useMemo } from "react";

/* Rich ecosystem constellation — WEMADE-adjacent tone.
 *   - Central COMMUNITY hub with dual-wave pulse rings + glow
 *   - 6 service nodes on a r=300 orbit, grouped by axis (pairs)
 *   - Axis peer-arcs (same-axis services connected on the outer ring)
 *   - Thick gradient spokes (service → center) with flowing dashes
 *   - Data-flow particles traveling each spoke toward the hub
 *   - Axis label text on arcs (GAME · COMMUNITY · TECH)
 *   - Background twinkling stars + soft radial glow
 */

const AXIS_META: Record<
  "game" | "community" | "tech",
  { ko: string; en: string; color: string }
> = {
  game: { ko: "게임", en: "GAME", color: "#ff5a6a" },
  community: { ko: "커뮤니티", en: "COMMUNITY", color: "#ff8c42" },
  tech: { ko: "테크", en: "TECH", color: "#4dd4e8" },
};

// clockwise order — pair by axis so same-axis services are adjacent
const ORDER: string[] = [
  "pokerlulu", // game
  "linkplay", // game
  "moitto", // community
  "shuffleup", // community
  "tubelulu", // tech
  "gtolulu", // tech
];

export default function AxesConnection() {
  const { lang } = useLang();
  const services = content.products.items;

  const ordered = useMemo(
    () =>
      ORDER.map((id) => services.find((s) => s.id === id)).filter(
        (s): s is (typeof services)[number] => Boolean(s)
      ),
    [services]
  );

  // geometry
  const cx = 600;
  const cy = 420;
  const R = 268; // service orbit radius (tightened after removing external labels)
  const axisR = 158; // axis label arc radius (scaled with R)
  const nodeR = 58; // service node outer fill radius
  const nodeRingR = 74; // dashed decorative ring around node
  const haloR = 116; // halo fade radius
  const hubR = 95;
  // 60° apart, starting at top
  const angles = [-90, -30, 30, 90, 150, 210];

  const polar = (deg: number, r: number) => {
    const a = (deg * Math.PI) / 180;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  };

  const axisPairs: { a: number; b: number; axis: "game" | "community" | "tech" }[] = [
    { a: 0, b: 1, axis: "game" },
    { a: 2, b: 3, axis: "community" },
    { a: 4, b: 5, axis: "tech" },
  ];

  // scattered twinkling star positions (deterministic via seeded sequence)
  const stars = useMemo(() => {
    const arr: { x: number; y: number; r: number; delay: number; dur: number }[] = [];
    let seed = 42;
    const rand = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return seed / 0x7fffffff;
    };
    for (let i = 0; i < 70; i++) {
      arr.push({
        x: rand() * 1200,
        y: rand() * 840,
        r: rand() * 1.5 + 0.3,
        delay: rand() * 5,
        dur: 2.5 + rand() * 4,
      });
    }
    return arr;
  }, []);

  return (
    <section
      className="py-28 px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32"
      style={{ background: "#0a0a12" }}
    >
      <div className="max-w-[1680px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div
            className="text-[11px] font-black tracking-[0.32em] mb-4"
            style={{ color: "#ff5a6a" }}
          >
            CONNECTED BY COMMUNITY
          </div>
          <h2
            className="font-black tracking-tight mb-4"
            style={{
              fontSize: "clamp(2rem, 5.2vw, 4.2rem)",
              color: "#f5f5f7",
              whiteSpace: "pre-line",
              lineHeight: 1.15,
            }}
          >
            {lang === "ko"
              ? "서로 다른 서비스가\n하나의 커뮤니티로 이어집니다"
              : "Different services,\nwoven into one community"}
          </h2>
          <p
            className="max-w-3xl mx-auto leading-relaxed"
            style={{
              fontSize: "clamp(15px, 1.35vw, 19px)",
              color: "rgba(255,255,255,0.62)",
            }}
          >
            {lang === "ko"
              ? "여섯 개의 플랫폼은 각자의 역할을 하면서도, 커뮤니티라는 결을 따라 자연스럽게 서로를 엮어갑니다."
              : "Six platforms each play their role, tied together by the thread of community."}
          </p>
        </div>

        {/* Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: 1440, margin: "0 auto" }}
        >
          <svg
            viewBox="0 0 1200 840"
            style={{ width: "100%", height: "auto", display: "block" }}
          >
            <defs>
              {/* Background radial glow */}
              <radialGradient id="bgGlow" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#ff5a6a" stopOpacity="0.14" />
                <stop offset="40%" stopColor="#ff5a6a" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#ff5a6a" stopOpacity="0" />
              </radialGradient>

              {/* Hub inner glow */}
              <radialGradient id="hubGlow" cx="50%" cy="45%">
                <stop offset="0%" stopColor="#ff5a6a" stopOpacity="0.55" />
                <stop offset="60%" stopColor="#ff5a6a" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#ff5a6a" stopOpacity="0" />
              </radialGradient>

              {/* Per-service spoke gradients */}
              {ordered.map((s, i) => {
                const p = polar(angles[i], R);
                return (
                  <linearGradient
                    key={`grad-${s.id}`}
                    id={`grad-${s.id}`}
                    x1={p.x}
                    y1={p.y}
                    x2={cx}
                    y2={cy}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor={s.color} stopOpacity="1" />
                    <stop offset="100%" stopColor="#ff5a6a" stopOpacity="0.35" />
                  </linearGradient>
                );
              })}

              {/* Per-service halo (radial gradient behind node) */}
              {ordered.map((s) => (
                <radialGradient
                  key={`halo-${s.id}`}
                  id={`halo-${s.id}`}
                  cx="50%"
                  cy="50%"
                >
                  <stop offset="0%" stopColor={s.color} stopOpacity="0.45" />
                  <stop offset="55%" stopColor={s.color} stopOpacity="0.08" />
                  <stop offset="100%" stopColor={s.color} stopOpacity="0" />
                </radialGradient>
              ))}

              {/* Paths for particle motion (service → center) */}
              {ordered.map((s, i) => {
                const p = polar(angles[i], R);
                return (
                  <path
                    key={`path-${s.id}`}
                    id={`path-${s.id}`}
                    d={`M ${p.x} ${p.y} L ${cx} ${cy}`}
                  />
                );
              })}

              {/* Axis label arcs (inner ring) */}
              {axisPairs.map((pair) => {
                const p1 = polar(angles[pair.a], axisR);
                const p2 = polar(angles[pair.b], axisR);
                return (
                  <path
                    key={`axis-path-${pair.axis}`}
                    id={`axis-path-${pair.axis}`}
                    d={`M ${p1.x} ${p1.y} A ${axisR} ${axisR} 0 0 1 ${p2.x} ${p2.y}`}
                    fill="none"
                  />
                );
              })}
            </defs>

            {/* Background glow */}
            <rect
              x="0"
              y="0"
              width="1200"
              height="840"
              fill="url(#bgGlow)"
            />

            {/* Twinkling stars */}
            <g>
              {stars.map((s, i) => (
                <circle
                  key={`star-${i}`}
                  cx={s.x}
                  cy={s.y}
                  r={s.r}
                  fill="#ffffff"
                  opacity="0.35"
                >
                  <animate
                    attributeName="opacity"
                    values="0.08;0.55;0.08"
                    dur={`${s.dur}s`}
                    begin={`${s.delay}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
            </g>

            {/* Outer decorative rings */}
            <circle
              cx={cx}
              cy={cy}
              r={R + 60}
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
              strokeDasharray="2 8"
            />
            <circle
              cx={cx}
              cy={cy}
              r={R + 24}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
              strokeDasharray="1 3"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from={`0 ${cx} ${cy}`}
                to={`360 ${cx} ${cy}`}
                dur="60s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx={cx}
              cy={cy}
              r={axisR - 32}
              fill="none"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />

            {/* Axis peer-arcs (same-axis services) */}
            {axisPairs.map((pair) => {
              const p1 = polar(angles[pair.a], R);
              const p2 = polar(angles[pair.b], R);
              const axisColor = AXIS_META[pair.axis].color;
              return (
                <path
                  key={`peer-${pair.axis}`}
                  d={`M ${p1.x} ${p1.y} A ${R} ${R} 0 0 1 ${p2.x} ${p2.y}`}
                  stroke={axisColor}
                  strokeWidth="1.4"
                  strokeDasharray="3 6"
                  fill="none"
                  opacity="0.55"
                  strokeLinecap="round"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-18"
                    dur="3.2s"
                    repeatCount="indefinite"
                  />
                </path>
              );
            })}

            {/* Spokes (service → center) */}
            {ordered.map((s, i) => {
              const p = polar(angles[i], R);
              return (
                <line
                  key={`spoke-${s.id}`}
                  x1={p.x}
                  y1={p.y}
                  x2={cx}
                  y2={cy}
                  stroke={`url(#grad-${s.id})`}
                  strokeWidth="2"
                  strokeDasharray="5 7"
                  strokeLinecap="round"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-24"
                    dur={`${2.1 + i * 0.15}s`}
                    repeatCount="indefinite"
                  />
                </line>
              );
            })}

            {/* Data-flow particles */}
            {ordered.map((s, i) => (
              <g key={`particle-${s.id}`}>
                <circle r="5" fill={s.color}>
                  <animateMotion
                    dur={`${3.2 + i * 0.3}s`}
                    repeatCount="indefinite"
                    rotate="auto"
                  >
                    <mpath href={`#path-${s.id}`} />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.12;0.82;1"
                    dur={`${3.2 + i * 0.3}s`}
                    repeatCount="indefinite"
                  />
                </circle>
                <circle r="10" fill={s.color} opacity="0.4">
                  <animateMotion
                    dur={`${3.2 + i * 0.3}s`}
                    repeatCount="indefinite"
                  >
                    <mpath href={`#path-${s.id}`} />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0;0.4;0.4;0"
                    keyTimes="0;0.12;0.82;1"
                    dur={`${3.2 + i * 0.3}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            ))}

            {/* Center hub: outer pulse rings */}
            <circle
              cx={cx}
              cy={cy}
              r={hubR}
              fill="none"
              stroke="#ff5a6a"
              strokeWidth="1.5"
            >
              <animate
                attributeName="r"
                values={`${hubR};${hubR + 48};${hubR}`}
                dur="3.2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.7;0;0.7"
                dur="3.2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx={cx}
              cy={cy}
              r={hubR}
              fill="none"
              stroke="#ff5a6a"
              strokeWidth="1.2"
            >
              <animate
                attributeName="r"
                values={`${hubR};${hubR + 48};${hubR}`}
                dur="3.2s"
                begin="1.6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.7;0;0.7"
                dur="3.2s"
                begin="1.6s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Center hub: glow + solid body */}
            <circle cx={cx} cy={cy} r={hubR + 55} fill="url(#hubGlow)" />
            <circle
              cx={cx}
              cy={cy}
              r={hubR}
              fill="#14141f"
              stroke="#ff5a6a"
              strokeWidth="2"
            />
            <circle cx={cx} cy={cy} r={hubR} fill="url(#hubGlow)" opacity="0.6" />
            <circle
              cx={cx}
              cy={cy}
              r={hubR}
              fill="none"
              stroke="#ff5a6a"
              strokeWidth="1"
              strokeDasharray="2 4"
              opacity="0.4"
            />

            {/* Hub text */}
            <text
              x={cx}
              y={cy - 2}
              fontSize="19"
              fontWeight="900"
              textAnchor="middle"
              fill="#f5f5f7"
              letterSpacing="0.18em"
              fontFamily="Pretendard, sans-serif"
            >
              COMMUNITY
            </text>
            <text
              x={cx}
              y={cy + 20}
              fontSize="9"
              fontWeight="800"
              textAnchor="middle"
              fill="#ff8c42"
              letterSpacing="0.3em"
              fontFamily="Pretendard, sans-serif"
            >
              WOVEN TOGETHER
            </text>

            {/* Axis labels (on arcs) */}
            {axisPairs.map((pair) => {
              const axisColor = AXIS_META[pair.axis].color;
              return (
                <text
                  key={`axis-label-${pair.axis}`}
                  fontSize="13"
                  fontWeight="900"
                  fill={axisColor}
                  letterSpacing="0.36em"
                  fontFamily="Pretendard, sans-serif"
                >
                  <textPath
                    href={`#axis-path-${pair.axis}`}
                    startOffset="50%"
                    textAnchor="middle"
                  >
                    {AXIS_META[pair.axis].en}
                  </textPath>
                </text>
              );
            })}

            {/* Service nodes */}
            {ordered.map((s, i) => {
              const p = polar(angles[i], R);
              const axis = s.axis as "game" | "community" | "tech";
              return (
                <motion.g
                  key={`node-${s.id}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.45 + i * 0.08 }}
                >
                  {/* Halo */}
                  <circle cx={p.x} cy={p.y} r={haloR} fill={`url(#halo-${s.id})`} />
                  {/* Decorative outer ring */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={nodeRingR}
                    fill="none"
                    stroke={s.color}
                    strokeWidth="1"
                    strokeDasharray="1 3"
                    opacity="0.55"
                  >
                    <animateTransform
                      attributeName="transform"
                      attributeType="XML"
                      type="rotate"
                      from={`0 ${p.x} ${p.y}`}
                      to={`360 ${p.x} ${p.y}`}
                      dur={`${24 + i * 3}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  {/* Inner node */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={nodeR}
                    fill="#14141f"
                    stroke={s.color}
                    strokeWidth="2"
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={nodeR}
                    fill={`${s.color}15`}
                  />
                  {/* Service name (primary) */}
                  <text
                    x={p.x}
                    y={p.y + 2}
                    fontSize="14"
                    fontWeight="900"
                    fill={s.color}
                    textAnchor="middle"
                    letterSpacing="0.06em"
                    fontFamily="Pretendard, sans-serif"
                  >
                    {s.name.toUpperCase()}
                  </text>
                  {/* Axis tag */}
                  <text
                    x={p.x}
                    y={p.y + 20}
                    fontSize="8.5"
                    fontWeight="800"
                    fill="rgba(255,255,255,0.5)"
                    textAnchor="middle"
                    letterSpacing="0.28em"
                    fontFamily="Pretendard, sans-serif"
                  >
                    {AXIS_META[axis].en}
                  </text>
                </motion.g>
              );
            })}

            {/* External one-line intro (per service, outside node) */}
            {ordered.map((s, i) => {
              const lp = polar(angles[i], R + 96);
              return (
                <text
                  key={`tag-${s.id}`}
                  x={lp.x}
                  y={lp.y}
                  fontSize="13"
                  fontWeight="700"
                  fill="rgba(245,245,247,0.78)"
                  textAnchor="middle"
                  fontFamily="Pretendard, sans-serif"
                >
                  {s.tag[lang]}
                </text>
              );
            })}
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
