"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Corners from "./Corners";
import Logo from "./Logo";

export default function SiteNav() {
  // Solid background once the content sections come up. Driven by ScrollTrigger, not by
  // scroll events: with inertial scrolling the content keeps moving after the last event.
  // Starts early (approach at 60% of the viewport) so the scene's outgoing text never
  // slides under a transparent bar.
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    // Measured live on every scroll update (incl. the smoother's inertia), so it cannot go
    // stale when the pinned scene changes the page height after a precomputed trigger.
    let st: ScrollTrigger | undefined;
    const id = requestAnimationFrame(() => {
      const target = document.getElementById("approach");
      if (!target) return;
      const check = () => setSolid(target.getBoundingClientRect().top < window.innerHeight * 0.6);
      st = ScrollTrigger.create({ start: 0, end: "max", onUpdate: check, onRefresh: check });
      check();
    });
    return () => {
      cancelAnimationFrame(id);
      st?.kill();
    };
  }, []);

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid ? "border-b border-bone/10 bg-forest" : "bg-transparent"}`}
    >
      <div className="flex items-center justify-between gap-6 px-5 py-5 md:px-14 md:py-6">
        <a href="#top" className="pointer-events-auto -my-2 flex items-center gap-3 py-2 text-bone" aria-label="THE GARDENERS, back to top">
          <Logo className="h-7 w-7 text-bone md:h-8 md:w-8" />
          <span className="text-[13px] font-semibold tracking-[0.32em]">THE GARDENERS</span>
        </a>
        <p className="ui-label hidden text-bone/90 lg:block">
          Field / 2040 <span className="mx-3 text-sage">·</span> Ecological observation
        </p>
        <a
          href="#partner"
          className="ui-label group relative pointer-events-auto border border-bone/35 px-4 py-3.5 text-bone md:py-2.5 transition-colors duration-300 hover:border-signal hover:bg-signal hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
        >
          <Corners tone="bg-bone" />
          <span className="hidden sm:inline">Become a partner</span>
          <span className="sm:hidden">Partner</span>
        </a>
      </div>
    </header>
  );
}
