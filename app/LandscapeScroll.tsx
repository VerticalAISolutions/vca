"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Fraunces } from "next/font/google";

const display = Fraunces({ subsets: ["latin"], weight: ["400"] });

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STATES = [
  { src: "/landscape/state-1.png", alt: "Karge, stille Steppe unter bewölktem Himmel", headline: "Nature has lost its gardeners." },
  { src: "/landscape/state-2.png", alt: "Tiefe Fußspuren im trockenen Grasland", headline: "But the land remembers." },
  { src: "/landscape/state-3.png", alt: "Eine Auerochsenherde kehrt in die Steppe zurück", headline: "The gardeners are coming home." },
  { src: "/landscape/state-4.png", alt: "Blühende Wildnis mit Auerochsen im goldenen Abendlicht", headline: "When they return, life follows." },
];

export default function LandscapeScroll() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const layers = gsap.utils.toArray<HTMLElement>(".ls-layer");
        const heads = gsap.utils.toArray<HTMLElement>(".ls-head");

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            pin: true,
            scrub: 0.8,
            start: "top top",
            end: "+=300%",
            invalidateOnRefresh: true,
          },
        });

        // hold 0.5 · fade 1 · hold 0.5 … so each state rests fully visible
        for (let i = 1; i < STATES.length; i++) {
          const at = (i - 1) * 1.5 + 0.5;
          tl.fromTo(layers[i], { opacity: 0 }, { opacity: 1, duration: 1 }, at)
            .to(heads[i - 1], { opacity: 0, y: -16, duration: 0.45 }, at)
            .fromTo(heads[i], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45 }, at + 0.55);
        }
        tl.to({}, { duration: 0.5 }); // final hold
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative h-svh w-full overflow-hidden bg-black motion-reduce:h-auto">
      {STATES.map((s, i) => (
        <div
          key={s.src}
          className={`ls-layer absolute inset-0 motion-reduce:relative motion-reduce:h-svh ${i > 0 ? "motion-safe:opacity-0" : ""}`}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* scrim only behind the headline */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.2)_35%,transparent_60%)]" />
          <h2
            className={`ls-head ${display.className} pointer-events-none absolute left-6 right-6 top-[12svh] max-w-[14ch] text-[clamp(2.25rem,7vw,5.5rem)] font-normal leading-[1.02] tracking-tight text-[#f7f1e6] [text-shadow:0_2px_24px_rgba(0,0,0,0.35)] md:left-14 ${i > 0 ? "motion-safe:opacity-0" : ""}`}
          >
            {s.headline}
          </h2>
        </div>
      ))}
    </section>
  );
}
