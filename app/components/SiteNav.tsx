"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function SiteNav() {
  // solid background once the content sections reach the nav
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const target = document.getElementById("approach");
    if (!target) return;
    const check = () => setSolid(target.getBoundingClientRect().top < 80);
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid ? "border-b border-bone/10 bg-forest" : "bg-transparent"}`}
    >
      <div className="flex items-center justify-between gap-6 px-5 py-5 md:px-14 md:py-6">
        <a href="#top" className="pointer-events-auto flex items-center gap-3 text-bone" aria-label="THE GARDENERS, back to top">
          <Logo className="h-7 w-7 text-bone md:h-8 md:w-8" />
          <span className="text-[13px] font-semibold tracking-[0.32em]">THE GARDENERS</span>
        </a>
        <p className="ui-label hidden text-bone/90 lg:block">
          Field / 2040 <span className="mx-3 text-sage">·</span> Ecological observation
        </p>
        <a
          href="#partner"
          className="ui-label pointer-events-auto rounded-full border border-bone/40 px-4 py-2.5 text-bone transition-colors duration-300 hover:border-sage hover:bg-sage hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
        >
          <span className="hidden sm:inline">Become a partner</span>
          <span className="sm:hidden">Partner</span>
        </a>
      </div>
    </header>
  );
}
