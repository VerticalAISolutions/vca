"use client";

// First-load curtain. The mark grows the way the story does: the ground line settles,
// roots draw down into the soil, the two leaves rise out of the ground. Once the hero image
// and fonts are ready, the curtain clears from the ground up behind a signal scan line
// (same gesture as the scene changes) and hands over to the hero headline.
// The drawing runs on CSS so it starts before hydration; GSAP only drives the exit.

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { LOBE, LOBE_R, NODES, ROOTS } from "./Logo";

export const LOADED_EVENT = "gardeners:loaded";

const MIN_MS = 2000; // let the mark finish growing
const MAX_MS = 6000; // never hold the page hostage

function heroReady() {
  const img = document.querySelector<HTMLImageElement>(".ls-layer img");
  const image = !img
    ? Promise.resolve()
    : img.complete
      ? Promise.resolve()
      : new Promise<void>((res) => {
          img.addEventListener("load", () => res(), { once: true });
          img.addEventListener("error", () => res(), { once: true });
        });
  return Promise.all([image, document.fonts?.ready ?? Promise.resolve()]);
}

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // hold the page still while the curtain is up (no overflow toggle → no layout shift)
    const block = (e: Event) => e.preventDefault();
    const blockKeys = (e: KeyboardEvent) => {
      if ([" ", "PageDown", "PageUp", "ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) e.preventDefault();
    };
    window.addEventListener("wheel", block, { passive: false });
    window.addEventListener("touchmove", block, { passive: false });
    window.addEventListener("keydown", blockKeys);
    const release = () => {
      window.removeEventListener("wheel", block);
      window.removeEventListener("touchmove", block);
      window.removeEventListener("keydown", blockKeys);
    };

    let announced = false;
    const announce = () => {
      if (announced) return;
      announced = true;
      (window as unknown as { __gardenersLoaded?: boolean }).__gardenersLoaded = true;
      window.dispatchEvent(new Event(LOADED_EVENT));
    };

    // progress: eases towards 85% while waiting, completes when ready
    const bar = q(".pl-bar");
    const wait = gsap.to(bar, { scaleX: 0.85, duration: MIN_MS / 1000, ease: "power2.out" });

    let exit: gsap.core.Timeline | undefined;
    let cancelled = false;
    const start = performance.now();

    Promise.race([heroReady(), new Promise((r) => setTimeout(r, MAX_MS))]).then(() => {
      const remaining = Math.max(0, MIN_MS - (performance.now() - start));
      setTimeout(() => {
        if (cancelled) return;
        wait.kill();
        if (reduce) {
          exit = gsap.timeline({ onComplete: () => (release(), setDone(true)) })
            .call(announce)
            .to(el, { opacity: 0, duration: 0.5, ease: "power1.out" });
          return;
        }
        exit = gsap
          .timeline({ onComplete: () => (release(), setDone(true)) })
          // CSS entrance animations hold their end state with fill-mode; drop them so GSAP owns the exit
          .set(q(".pl-word, .pl-track"), { animation: "none" })
          .to(bar, { scaleX: 1, duration: 0.45, ease: "power2.inOut" })
          .to(q(".pl-mark, .pl-word, .pl-track"), { opacity: 0, y: -14, duration: 0.6, stagger: 0.06, ease: "power2.in" }, "+=0.15")
          .addLabel("wipe", "-=0.2")
          .fromTo(q(".pl-veil"), { "--out": "0%" }, { "--out": "112%", duration: 1.3, ease: "power2.inOut" }, "wipe")
          .fromTo(q(".pl-scan"), { top: "106%", autoAlpha: 1 }, { top: "-6%", duration: 1.3, ease: "power2.inOut" }, "wipe")
          .call(announce, [], "wipe+=0.55") // headline rises while the edge passes over it
          .set(q(".pl-scan"), { autoAlpha: 0 });
      }, remaining);
    });

    return () => {
      cancelled = true;
      wait.kill();
      exit?.kill();
      release();
    };
  }, []);

  if (done) return null;

  return (
    <div ref={root} id="preloader" aria-hidden className="fixed inset-0 z-[100]">
      <div className="pl-veil absolute inset-0 flex flex-col items-center justify-center bg-forest">
        <svg viewBox="265 103 625 572" className="pl-mark h-auto w-16 overflow-visible text-bone md:w-20">
          <defs>
            {/* everything above the ground line: the leaves grow out of the soil */}
            <clipPath id="pl-above">
              <rect x="265" y="60" width="625" height="356" />
            </clipPath>
          </defs>
          <g clipPath="url(#pl-above)" fill="currentColor">
            <path className="pl-lobe" d={LOBE} />
            <path className="pl-lobe pl-lobe-r" d={LOBE_R} />
          </g>
          <rect className="pl-ground" x="282" y="414" width="591" height="26" rx="13" fill="currentColor" />
          <g fill="none" stroke="currentColor" strokeWidth={15} strokeLinecap="round" strokeLinejoin="round">
            {ROOTS.map((d, i) => (
              <path key={d} className="pl-root" d={d} pathLength={1} style={{ animationDelay: `${0.55 + i * 0.09}s` }} />
            ))}
            {NODES.map(([x, y], i) => (
              <circle
                key={`${x}-${y}`}
                className="pl-node"
                cx={x}
                cy={y}
                r={18}
                pathLength={1}
                style={{ animationDelay: `${1.05 + i * 0.07}s`, transformOrigin: `${x}px ${y}px` }}
              />
            ))}
          </g>
        </svg>
        <p className="pl-word mt-7 pl-[0.32em] text-[11px] font-semibold tracking-[0.32em] text-bone md:mt-8 md:text-[12px]">THE GARDENERS</p>
        <div className="pl-track relative mt-5 h-px w-28 overflow-hidden bg-bone/15">
          <div className="pl-bar absolute inset-0 origin-left scale-x-0 bg-signal" />
        </div>
      </div>
      <div className="pl-scan pointer-events-none invisible absolute inset-x-0 h-px bg-signal/80 shadow-[0_0_18px_2px_rgb(205_238_143/0.45)]" />
    </div>
  );
}
