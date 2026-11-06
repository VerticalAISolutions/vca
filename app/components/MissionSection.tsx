"use client";

// Brand mission, continued: what the organization does beyond the returning animals.
// The three phases sit as nodes on the logo's root line and connect while scrolling;
// a live field band counts up the (fictional, 2040) network figures.

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Corners from "./Corners";
import Label from "./Label";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STEPS = [
  { title: "Research", copy: "Understand species and their ecological roles.", data: "38 extinct species assessed" },
  { title: "Return", copy: "Reintroduce species into suitable protected landscapes.", data: "4 species in reintroduction" },
  { title: "Restore", copy: "Support habitat recovery and functioning natural processes.", data: "3 protected landscapes" },
];

const LIVE = [
  { v: 12, f: (n: number) => `${n}`, k: "Herds living wild" },
  { v: 48600, f: (n: number) => n.toLocaleString("en-US"), k: "Hectares protected" },
  { v: 1284, f: (n: number) => n.toLocaleString("en-US"), k: "Species monitored" },
  { v: 37, f: (n: number) => `${n}`, k: "Partner organisations" },
];

// node x positions = column starts of the 3-column grid (viewBox 1200 wide)
const NX = [6, 406, 806];

export default function MissionSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);
        // root line connects the phases with the scroll
        gsap
          .timeline({ scrollTrigger: { trigger: q(".ap-graph")[0], start: "top 85%", end: "top 35%", scrub: 0.6 } })
          .fromTo(q(".ap-line"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1, ease: "none" }, 0)
          .fromTo(q(".ap-root"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, stagger: 0.25, ease: "none" }, 0.1)
          .fromTo(q(".ap-node"), { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.15, stagger: 0.38, ease: "back.out(3)" }, 0)
          .fromTo(q(".ap-step"), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.36 }, 0.05);

        // live figures count up once
        q(".ap-num").forEach((el, i) => {
          const o = { n: 0 };
          gsap.to(o, {
            n: LIVE[i].v,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => {
              el.textContent = LIVE[i].f(Math.round(o.n));
            },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="approach" className="relative bg-[linear-gradient(180deg,var(--color-night)_0%,#111a17_16%,#1a2c24_32%,var(--color-forest)_52%)] px-5 pt-28 text-bone md:px-14 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <Label className="text-sage">Our approach</Label>

        <div className="mt-5 grid gap-10 md:grid-cols-[1.45fr_1fr] md:items-end md:gap-20">
          <div>
            <h2 className="t-h2 max-w-[18ch]">Their return sets natural processes in motion.</h2>
            <p className="t-lead-serif mt-5 max-w-[26ch] text-sage">Our commitment makes long-⁠term restoration possible.</p>
          </div>
          <p className="t-body max-w-[38ch] border-l border-bone/20 pl-6 text-bone/72">
            Aurochs are one example. Our mission extends to extinct species whose return can help restore lost ecological functions.
          </p>
        </div>

        {/* phases on the root line */}
        <div className="ap-graph relative mt-20 md:mt-28">
          <svg viewBox="0 0 1200 90" preserveAspectRatio="xMinYMin meet" className="hidden w-full overflow-visible md:block" aria-hidden>
            <line x1={0} y1={8} x2={1200} y2={8} stroke="var(--color-bone)" strokeOpacity={0.15} />
            <line className="ap-line" x1={0} y1={8} x2={1200} y2={8} pathLength={1} stroke="var(--color-sage)" strokeWidth={1.5} strokeDasharray="1 1" />
            {/* roots between the phases, like the logo's network */}
            {[0, 1].map((k) => (
              <g key={k}>
                <path
                  className="ap-root"
                  d={`M ${NX[k]} 8 C ${NX[k] + 90} 8 ${NX[k] + 140} 70 ${NX[k] + 200} 70 S ${NX[k + 1] - 90} 8 ${NX[k + 1]} 8`}
                  pathLength={1}
                  fill="none"
                  stroke="var(--color-sage)"
                  strokeOpacity={0.55}
                  strokeDasharray="1 1"
                />
                <circle cx={NX[k] + 200} cy={70} r={3} fill="var(--color-sage)" fillOpacity={0.7} />
              </g>
            ))}
            {NX.map((x) => (
              <g key={x} className="ap-node">
                <circle cx={x} cy={8} r={7} fill="var(--color-forest)" stroke="var(--color-signal)" strokeWidth={1.5} />
                <circle cx={x} cy={8} r={2.6} fill="var(--color-signal)" />
              </g>
            ))}
          </svg>

          <ol className="grid border-l border-bone/15 md:mt-4 md:grid-cols-3 md:border-l-0">
            {STEPS.map((s, i) => (
              <li key={s.title} className="ap-step relative py-8 pl-7 md:py-0 md:pl-0 md:pr-10">
                {/* mobile node on the vertical line */}
                <span aria-hidden className="absolute -left-[5px] top-10 h-[9px] w-[9px] rounded-full border border-signal bg-forest md:hidden" />
                <p className="ui-label text-bone/50">Phase 0{i + 1}</p>
                <p className="t-h2 mt-4">{s.title}</p>
                <p className="t-body mt-4 max-w-[30ch] text-bone/72">{s.copy}</p>
                <p className="ui-label mt-5 text-[10px] text-sage">→ {s.data}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* live field band */}
        <div className="relative mt-20 border border-bone/15 md:mt-28">
          <Corners tone="bg-bone/60" all />
          <div className="ui-label flex items-center justify-between gap-4 border-b border-bone/15 px-5 py-3 text-[10px] text-bone/55 md:px-8">
            <span className="flex items-center gap-2">
              <span aria-hidden className="fn-live relative h-1.5 w-1.5 rounded-full bg-signal" />
              Live · Field network
            </span>
            <span className="text-right">Updated 2040.06.14 · 07:45 UTC</span>
          </div>
          <dl className="grid grid-cols-2 md:grid-cols-4">
            {LIVE.map((l, i) => (
              <div
                key={l.k}
                className={`px-5 py-6 md:px-8 md:py-8 ${i % 2 ? "border-l border-bone/15" : ""} ${i > 1 ? "border-t border-bone/15 md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}
              >
                <dt className="ui-label text-[10px] text-bone/50">{l.k}</dt>
                <dd className="ap-num font-serif mt-3 text-[2.6rem] leading-none tabular-nums md:text-6xl">{l.f(l.v)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
