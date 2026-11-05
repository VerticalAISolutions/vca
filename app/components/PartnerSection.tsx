"use client";

import { useState } from "react";
import Logo from "./Logo";

// TODO: echte Kontaktadresse eintragen. Leer = Mailprogramm öffnet sich ohne Empfänger.
const CONTACT_EMAIL = "";

const WAYS = [
  { key: "Land", title: "LAND", copy: "Make space for their return." },
  { key: "Knowledge", title: "KNOWLEDGE", copy: "Contribute research and expertise." },
  { key: "Funding", title: "FUNDING", copy: "Help turn restoration into reality." },
] as const;

export default function PartnerSection() {
  const [picked, setPicked] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const toggle = (k: string) => setPicked((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));

  const interest = picked.length ? picked.join(", ") : "Land, Knowledge or Funding";
  const subject = `Restoration partnership: ${interest}`;
  const body = `Hello THE GARDENERS,\n\nWe would like to become a restoration partner.\nWe can contribute: ${interest}\n\nOrganisation:\nContact person:\nRegion / landscape:\n\n`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${subject}\n\n${body}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };
  const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <section id="partner" className="relative bg-forest px-5 pb-24 pt-28 text-bone md:px-14 md:pb-32 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <p className="ui-label flex items-center gap-4 text-sage">
          The next chapter <span aria-hidden className="h-px w-10 bg-sage/50" /> Your role
        </p>
        <h2 className="font-serif mt-6 max-w-[13ch] text-[clamp(2.9rem,7vw,6.25rem)] leading-[0.96]">Help bring the gardeners back.</h2>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-bone/85 md:text-xl">
          Restoring ecosystems takes land, scientific knowledge, long-term commitment and funding. Every partner makes a difference.
        </p>

        <fieldset className="mt-16 md:mt-20">
          <legend className="ui-label mb-6 text-bone/60">Choose how you contribute</legend>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-bone/15 bg-bone/15 md:grid-cols-3">
            {WAYS.map((w, i) => {
              const on = picked.includes(w.key);
              return (
                <button
                  key={w.key}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(w.key)}
                  className={`group relative flex flex-col bg-forest p-7 text-left transition-colors duration-300 hover:bg-forest-deep focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sage md:min-h-56 md:p-9 ${on ? "bg-forest-deep" : ""}`}
                >
                  <span className="flex items-center justify-between">
                    <span className="ui-label text-bone/50">/ 0{i + 1}</span>
                    <span
                      aria-hidden
                      className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors duration-300 ${on ? "border-sage bg-sage text-forest" : "border-bone/30 text-transparent group-hover:border-sage"}`}
                    >
                      <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M2.5 6.2 5 8.5 9.5 3.5" />
                      </svg>
                    </span>
                  </span>
                  <span className="mt-12 block md:mt-16">
                    <span className="block text-[15px] font-semibold tracking-[0.3em]">{w.title}</span>
                    <span className="mt-3 block max-w-[24ch] text-base leading-relaxed text-bone/70">{w.copy}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-12 flex flex-col items-start gap-5 md:flex-row md:items-center md:gap-8">
          <a
            href={href}
            className="ui-label inline-flex items-center gap-4 rounded-full bg-bone px-8 py-5 text-[12px] text-forest transition-colors duration-300 hover:bg-sage focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
          >
            Become a restoration partner
            <svg viewBox="0 0 20 12" className="h-3 w-5" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
              <path d="M0 6h18M13 1l5 5-5 5" />
            </svg>
          </a>
          <button
            type="button"
            onClick={copy}
            className="ui-label text-[11px] text-bone/70 underline decoration-bone/30 underline-offset-[6px] transition-colors hover:text-sage hover:decoration-sage focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
          >
            {copied ? "Copied to clipboard" : "Copy message instead"}
          </button>
          <p className="text-sm text-bone/60" aria-live="polite">
            Opens a prepared email · {picked.length ? interest : "select one or more ways to contribute"}
          </p>
        </div>
      </div>

      <footer className="mx-auto mt-28 flex max-w-6xl flex-col gap-6 border-t border-bone/15 pt-8 md:mt-36 md:flex-row md:items-center md:justify-between">
        <div className="flex shrink-0 items-center gap-3">
          <Logo className="h-7 w-7 text-sage" />
          <span className="whitespace-nowrap text-[12px] font-semibold tracking-[0.32em]">THE GARDENERS</span>
        </div>
        <p className="ui-label whitespace-nowrap text-[10px] text-bone/50">Restoration / Research / Responsibility</p>
        <p className="ui-label text-[10px] text-bone/40">
          Est. 2040 · A fictional brand by{" "}
          <a
            href="https://steadymade.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bone/70 underline-offset-4 transition-colors hover:text-sage hover:underline"
          >
            steadymade.ai
          </a>{" "}
          for the German Vibe Code Awards
        </p>
      </footer>
    </section>
  );
}
