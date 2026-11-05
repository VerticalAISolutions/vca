"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ResearchMarkers from "./components/ResearchMarkers";
import { ChapterIndicator, RestorationSignal } from "./components/SceneHud";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Bildsatz wechseln: "/landscape" (Idee 1) oder "/landscape/idea2"
const SET = "/landscape/idea2";

const STATES = [
  { src: `${SET}/state-1.png`, alt: "Stille, karge Steppe mit trockenem Boden im Querschnitt", kicker: "01 — The Silence", headline: "Nature has lost its gardeners." },
  { src: `${SET}/state-2.png`, alt: "Erste Fußspuren im Gras, im Boden regt sich Leben", kicker: "02 — The Traces", headline: "But the land remembers." },
  { src: `${SET}/state-3.png`, alt: "Eine Auerochsenherde kehrt in die Steppe zurück", kicker: "03 — The Return", headline: "The gardeners are coming home." },
  { src: `${SET}/state-4.png`, alt: "Goldene Aue mit Auerochsen, darunter lebendiges, durchwurzeltes Erdreich", kicker: "04 — The Revival", headline: "When they return, life follows." },
];

// Timeline in abstract units. Scene holds sit between the image crossfades.
// S1 0–1 · T1 1–2 · S2 2–3 · T2 3–4 · S3 4–5 · T3 5–6 · S4 6–8.6
const FADES = [1, 3, 5];
const SCENE_EDGES = [0, 1.5, 3.5, 5.5, 8.6]; // chapter switches at the crossfade midpoints
const TOTAL = 8.6;

export default function LandscapeScroll() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);
        const layers = q(".ls-layer");
        const heads = q(".ls-head");
        const num = q(".hud-chapter-num")[0] as HTMLElement | undefined;
        const fills = q(".hud-seg-fill");
        let shown = -1;

        const updateChapter = (t: number) => {
          let i = 0;
          while (i < 3 && t >= SCENE_EDGES[i + 1]) i++;
          const local = (t - SCENE_EDGES[i]) / (SCENE_EDGES[i + 1] - SCENE_EDGES[i]);
          fills.forEach((el, k) => gsap.set(el, { scaleX: k < i ? 1 : k === i ? Math.min(1, Math.max(0.12, local)) : 0 }));
          if (i !== shown && num) {
            shown = i;
            num.textContent = `0${i + 1}`;
          }
        };

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          onUpdate: () => updateChapter(tl.time()),
          scrollTrigger: {
            trigger: root.current,
            pin: true,
            scrub: 0.8,
            start: "top top",
            end: "+=500%",
            invalidateOnRefresh: true,
          },
        });

        // --- images + headlines (unchanged logic, wider holds) ---
        FADES.forEach((at, k) => {
          const i = k + 1;
          tl.fromTo(layers[i], { opacity: 0 }, { opacity: 1, duration: 1 }, at)
            .to(heads[i - 1], { opacity: 0, y: -16, duration: 0.45 }, at)
            .fromTo(heads[i], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45 }, at + 0.55);
        });

        // --- marker helpers ---
        const markerIn = (sel: string, at: number) => {
          tl.fromTo(q(sel), { opacity: 0 }, { opacity: 1, duration: 0.2 }, at)
            .fromTo(q(`${sel} .mk-ring`), { scale: 0.6, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }, at)
            .fromTo(q(`${sel} .mk-line`), { strokeDasharray: "1 1", strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.35 }, at + 0.1)
            .fromTo(q(`${sel} .mk-label`), { opacity: 0 }, { opacity: 1, duration: 0.2 }, at + 0.35);
        };
        const markerOut = (sel: string, at: number, dur = 0.3) => tl.to(q(sel), { opacity: 0, duration: dur }, at);

        // SCENE 02 · traces
        markerIn(".mk-trace", 2.0);
        markerOut(".mk-trace", 2.75);

        // SCENE 03 · aurochs, only after the herd is fully in (layer 3 ends at 4.0)
        markerIn(".mk-bull", 4.05);
        tl.fromTo(q(".mk-bull .mk-brackets"), { scale: 1.04, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }, 4.05);
        markerOut(".mk-bull", 5.0, 0.4);

        // SCENE 04 · below ground, staggered, then recede for a clean last look
        markerIn(".mk-soil-1", 6.0);
        markerIn(".mk-soil-2", 6.35);
        markerIn(".mk-soil-3", 6.7);
        markerOut(".mk-soil-1, .mk-soil-2, .mk-soil-3", 7.6, 0.4);

        // --- restoration signal: grows with the story ---
        tl.to(q(".sig-line"), { strokeDashoffset: 0.68, duration: 1 }, FADES[0])
          .to(q(".sig-node-1"), { opacity: 1, duration: 0.25 }, FADES[0] + 0.6)
          .to(q(".sig-line"), { strokeDashoffset: 0.42, duration: 1 }, FADES[1])
          .to(q(".sig-node-2"), { opacity: 1, duration: 0.25 }, FADES[1] + 0.6)
          .to(q(".sig-line"), { strokeDashoffset: 0, duration: 1 }, FADES[2])
          .to(q(".sig-node-3"), { opacity: 1, duration: 0.25 }, FADES[2] + 0.5)
          .to(q(".sig-node-4"), { opacity: 1, duration: 0.25 }, FADES[2] + 0.85)
          .to(q(".sig-echo"), { strokeDashoffset: 0, duration: 0.8 }, FADES[2] + 0.6);

        tl.to({}, { duration: 0.01 }, TOTAL - 0.01); // final clean hold
        updateChapter(0);
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative h-svh w-full overflow-hidden bg-forest motion-reduce:h-auto">
      {STATES.map((s, i) => (
        <div
          key={s.src}
          className={`ls-layer absolute inset-0 motion-reduce:relative motion-reduce:h-svh ${i > 0 ? "motion-safe:opacity-0" : ""}`}
        >
          <Image src={s.src} alt={s.alt} fill priority={i === 0} sizes="100vw" className="object-cover object-center" />
          {/* scrim only behind the headline */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgb(20_32_26/0.62)_0%,rgb(20_32_26/0.22)_38%,transparent_62%)]" />
          {/* soft floor so the bottom interface stays readable */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/45 to-transparent" />
          <div
            className={`ls-head pointer-events-none absolute left-5 right-5 top-[15svh] md:left-14 md:top-[17svh] ${i > 0 ? "motion-safe:opacity-0" : ""}`}
          >
            <p className="ui-label text-bone/80">{s.kicker}</p>
            <h2 className="font-serif mt-4 max-w-[15ch] text-[clamp(2.6rem,7.2vw,6rem)] leading-[0.98] tracking-[-0.01em] text-bone [text-shadow:0_2px_28px_rgb(0_0_0/0.35)]">
              {s.headline}
            </h2>
          </div>
        </div>
      ))}

      <ResearchMarkers />
      <RestorationSignal />
      <ChapterIndicator />
    </section>
  );
}
