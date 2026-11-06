"use client";

// Inertial scrolling for mouse and trackpad only. Touch devices keep native scrolling
// (mobile browser bars, momentum), and reduced motion turns it off entirely.
// Rendered as the first child inside #smooth-content so it is created before the ScrollTriggers.

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

export default function SmoothScroll() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const smoother = ScrollSmoother.create({ wrapper: "#smooth-wrapper", content: "#smooth-content", smooth: 1.1, effects: false });
      // in-page anchors scroll smoothly too
      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
        if (!a) return;
        const id = a.getAttribute("href")!.slice(1);
        const el = id ? document.getElementById(id) : null;
        if (!el) return;
        e.preventDefault();
        if (id === "top") smoother.scrollTo(0, true);
        else smoother.scrollTo(el, true, "top top");
      };
      document.addEventListener("click", onClick);
      return () => {
        document.removeEventListener("click", onClick);
        smoother.kill();
      };
    });
  });
  return null;
}
