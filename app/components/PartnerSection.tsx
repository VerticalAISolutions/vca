"use client";

import { useState } from "react";
import Corners from "./Corners";
import Label from "./Label";
import Logo from "./Logo";

// Restoration partner enquiries
const CONTACT_EMAIL = "hello@steadymade.ai";

const WAYS = [
  { key: "Land", title: "Land", copy: "Make space for their return." },
  { key: "Knowledge", title: "Knowledge", copy: "Contribute research and expertise." },
  { key: "Funding", title: "Funding", copy: "Help turn restoration into reality." },
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
  const cta = picked.length === 1 ? `Become a ${picked[0].toLowerCase()} partner` : "Become a restoration partner";
  const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <section id="partner" className="relative bg-forest px-5 pb-24 pt-28 text-bone md:px-14 md:pb-32 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <Label className="text-sage">Your role</Label>
        <div className="mt-5 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-20">
          <h2 className="t-h1 max-w-[12ch]">Help bring the gardeners back.</h2>
          <p className="t-lead max-w-[34ch] text-bone/72 md:pb-2">
            Restoring ecosystems takes land, scientific knowledge, long-⁠term commitment and funding. Every partner makes a difference.
          </p>
        </div>

        <fieldset className="mt-16 md:mt-24">
          <legend className="ui-label mb-6 flex w-full items-center gap-4 text-bone/55">
            Choose how you contribute <span aria-hidden className="h-px flex-1 bg-bone/15" /> {picked.length}/3 selected
          </legend>
          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {WAYS.map((w, i) => {
              const on = picked.includes(w.key);
              return (
                <button
                  key={w.key}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(w.key)}
                  className={`group relative flex flex-col border p-6 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal md:min-h-64 md:p-8 ${
                    on ? "border-signal/70 bg-forest-deep" : "border-bone/15 hover:border-bone/40"
                  }`}
                >
                  <Corners tone={on ? "bg-signal" : "bg-bone/60"} />
                  <span className="flex items-center justify-between">
                    <span className="ui-label text-bone/50">0{i + 1}</span>
                    <span
                      aria-hidden
                      className={`flex h-5 w-5 items-center justify-center border transition-colors duration-300 ${on ? "border-signal bg-signal text-forest" : "border-bone/35 text-transparent group-hover:border-bone/70"}`}
                    >
                      <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M2.5 6.2 5 8.5 9.5 3.5" />
                      </svg>
                    </span>
                  </span>
                  <span className="mt-7 block md:mt-auto">
                    <span className="t-h2 block">{w.title}</span>
                    <span className="t-body mt-3 block max-w-[26ch] text-bone/72">{w.copy}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-12 flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
          <a
            href={href}
            className="group relative flex w-full items-center justify-between gap-5 bg-bone px-7 py-5 md:inline-flex md:w-auto md:justify-start font-mono text-[13px] uppercase tracking-[0.06em] whitespace-nowrap text-forest transition-colors duration-300 hover:bg-signal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
          >
            <Corners tone="bg-bone" all />
            {cta}
            <svg viewBox="0 0 20 12" className="h-3 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
              <path d="M0 6h18M13 1l5 5-5 5" />
            </svg>
          </a>
          <p className="ui-label flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-bone/50" aria-live="polite">
            <span>→ {CONTACT_EMAIL}</span>
            <span aria-hidden>·</span>
            <span>{picked.length ? interest : "No selection yet"}</span>
            <span aria-hidden>·</span>
            <button type="button" onClick={copy} className="-my-3 inline-block py-3 uppercase text-bone/75 underline decoration-bone/30 underline-offset-4 transition-colors hover:text-signal">
              {copied ? "Copied" : "Copy message"}
            </button>
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
            className="-my-3 inline-block py-3 text-bone/70 underline-offset-4 transition-colors hover:text-sage hover:underline"
          >
            steadymade.ai
          </a>{" "}
          for the German Vibe Code Awards
        </p>
      </footer>
    </section>
  );
}
