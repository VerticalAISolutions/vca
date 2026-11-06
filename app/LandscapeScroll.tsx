"use client";

import { Fragment, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Label from "./components/Label";
import ResearchMarkers from "./components/ResearchMarkers";
import { ChapterIndicator, RestorationSignal } from "./components/SceneHud";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Bildsatz "Fixpunkt": eine feste Kamera, fünf Zeitpunkte (gen/prompts)
const SET = "/landscape/fixpoint";

// Future Lab Look: Gradient-Map (Forest → Sage → Bone) als SVG-Filter auf Szene 1–4.
// Bilddateien bleiben unverändert. false = Originalfarben.
const FUTURE_LAB = false;

type Scene = { src: string; alt: string; kicker: string; headline: string; body: string; reveal?: boolean };

const STATES: Scene[] = [
  {
    src: `${SET}/state-1.webp`,
    alt: "Fester Beobachtungspunkt in kalter, bedeckter Dämmerung: totes Gras, im Querschnitt karger, verdichteter Boden",
    kicker: "01|The Silence",
    headline: "Nature has lost its gardeners.",
    body: "We bring back extinct animals that once shaped entire ecosystems.",
  },
  {
    src: `${SET}/state-2.webp`,
    alt: "Dieselbe Stelle bei Sonnenaufgang: frische Hufspuren im trockenen Gras, darunter ein Regenwurm auf dem Weg nach oben",
    kicker: "02|The Traces",
    headline: "But the land remembers.",
    body: "Once, great wild grazers shaped these landscapes. Their disappearance left more than empty space.",
  },
  {
    src: `${SET}/state-3.webp`,
    alt: "Ein Auerochsenbulle im Gegenlicht der aufgehenden Sonne, die Herde im Bodennebel, darunter noch ausgelaugter Boden",
    kicker: "03|The Return",
    headline: "Meet the gardeners.",
    body: "These are aurochs. Extinct wild cattle that once helped shape European landscapes. We are bringing them back.",
    reveal: true,
  },
  {
    src: `${SET}/state-4.webp`,
    alt: "Derselbe Moment Jahre später: blühende Wiese, unter dem Hufabdruck keimt ein Samen, Pilzgeflecht, Mistkäfer und Regenwurm im lebendigen Boden",
    kicker: "04|The Revival",
    headline: "Their return is just the beginning.",
    body: "Their grazing and movement help restart natural processes. Protected habitats, research and long-\u2060term stewardship give ecosystems the conditions to recover.",
  },
  {
    src: `${SET}/state-5.webp`,
    alt: "Blaue Stunde: der Auerochse als Silhouette, im Boden leuchtet das Pilzgeflecht biolumineszent, Glühwürmchen im Gras",
    kicker: "●|Our mission",
    headline: "Bring back what brings life.",
    body: "We bring back extinct species, restore protected habitats and work with scientists and conservation partners to rebuild living ecosystems.",
  },
];

// Ecological network reveal: what the overlay shows, also rendered as text (screen readers,
// reduced motion) and as a one-at-a-time field chip on mobile.
const DISCOVERY = [
  { id: "bull", kicker: "01 / Species · Reintroduced", title: "Bos primigenius", desc: "Ecosystem engineer. Extinct wild cattle, returning." },
  { id: "roots", kicker: "02 / Root system", title: "Root network", desc: "Plant roots connect vegetation and soil." },
  { id: "grazing", kicker: "03 / Grazing", title: "Habitat diversity", desc: "Grazing helps shape varied vegetation." },
  { id: "seed", kicker: "04 / Seed dispersal", title: "Germination", desc: "Hooves press seeds into the soil." },
  { id: "fungi", kicker: "05 / Fungal networks", title: "Mycelial network", desc: "Fungi contribute to nutrient cycling." },
  { id: "fauna", kicker: "06 / Soil biology", title: "Soil fauna", desc: "Organisms recycle organic material." },
  { id: "decomp", kicker: "07 / Soil processes", title: "Decomposition", desc: "Dung beetles return nutrients to the soil." },
  { id: "recovery", kicker: "08 / Restoration", title: "Ecological recovery", desc: "Connected processes support ecosystem recovery." },
];

// Timeline in abstract units. Scene holds sit between the image crossfades.
// S1 0–1 · T1 1–2 · S2 2–3 · T2 3–4 (herd arrives)
// S3 4–6.8: reveal 4–5.4, ecological discovery starts at 5.4 on the same image
// T3 6.8–7.8 · S4 7.8–10: discovery peaks ~8.5, overlays recede ~9.2 · T4 10–11 · S5 (mission) 11–12.2
const FADES = [1, 3, 6.8, 10];
const CHAPTER_EDGES = [0, 1.5, 3.5, 7.3, 10.5]; // four chapters, the mission closes chapter 04
const CHAPTERS = CHAPTER_EDGES.length - 1;
const TOTAL = 12.2;
const REVEAL = STATES.findIndex((s) => s.reveal);

// headline words rise out of a mask (descender-safe padding)
function Words({ text }: { text: string }) {
  return text.split(" ").map((w, i, a) => (
    <Fragment key={`${w}-${i}`}>
      <span className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-top">
        <span className="ls-w inline-block will-change-transform">{w}</span>
      </span>
      {i < a.length - 1 ? " " : null}
    </Fragment>
  ));
}

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
          while (i < CHAPTERS - 1 && t >= CHAPTER_EDGES[i + 1]) i++;
          const local = (t - CHAPTER_EDGES[i]) / (CHAPTER_EDGES[i + 1] - CHAPTER_EDGES[i]);
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
            end: "+=740%",
            invalidateOnRefresh: true,
          },
        });

        // --- camera: one slow push through the whole sequence (images and marker layer move together) ---
        tl.fromTo(q(".ls-cam"), { scale: 1, yPercent: 0 }, { scale: 1.05, yPercent: -0.8, transformOrigin: "50% 55%", duration: TOTAL }, 0);

        // --- scene changes: the next landscape rises from the ground, a scan line leads the edge ---
        const bodies = q(".ls-body");
        const scan = q(".ls-scan")[0];
        const scanLabel = q(".ls-scan-label")[0] as HTMLElement | undefined;
        const words = (i: number) => q(`.ls-head-${i} .ls-w`);
        FADES.forEach((at, k) => {
          const i = k + 1;
          tl.fromTo(layers[i], { "--wipe": "0%" }, { "--wipe": "112%", duration: 1, ease: "power1.inOut" }, at)
            .fromTo(scan, { top: "100%", autoAlpha: 1 }, { top: "-6%", duration: 1, ease: "power1.inOut", immediateRender: false }, at)
            .set(scan, { autoAlpha: 0 }, at + 1)
            .call(() => {
              if (scanLabel) scanLabel.textContent = `Scanning · layer 0${i + 1}`;
            }, [], at)
            .to(heads[i - 1], { opacity: 0, y: -16, duration: 0.45 }, at);
          if (i === REVEAL) return; // staged separately below
          tl.fromTo(heads[i], { opacity: 0, y: 0 }, { opacity: 1, duration: 0.05 }, at + 0.5)
            .fromTo(q(`.ls-head-${i} .ls-kicker`), { opacity: 0 }, { opacity: 1, duration: 0.3 }, at + 0.5)
            .fromTo(words(i), { yPercent: 115 }, { yPercent: 0, duration: 0.45, stagger: 0.05, ease: "power3.out" }, at + 0.55)
            .fromTo(bodies[i], { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, at + 0.85);
        });

        // --- SCENE 03 · the brand reveal ---
        // A arrival: herd fades in · B recognition: headline · C identification: marker
        // D explanation: body copy · E short hold · F ecological discovery (below)
        const r = FADES[REVEAL - 1] + 1; // herd fully in
        tl.fromTo(heads[REVEAL], { opacity: 0, y: 0 }, { opacity: 1, duration: 0.05 }, r - 0.1)
          .fromTo(q(".ls-reveal .ls-kicker"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 }, r - 0.1)
          .fromTo(words(REVEAL), { yPercent: 115 }, { yPercent: 0, duration: 0.7, stagger: 0.12, ease: "power4.out" }, r)
          .fromTo(bodies[REVEAL], { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, r + 0.8);

        // --- marker helpers ---
        const markerIn = (sel: string, at: number) => {
          // autoAlpha: hidden markers also stop catching the pointer
          tl.fromTo(q(sel), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, at)
            .fromTo(q(`${sel} .mk-ring`), { scale: 0.6, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }, at)
            .fromTo(q(`${sel} .mk-line`), { strokeDasharray: "1 1", strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.35 }, at + 0.1)
            // the field box rises out of the ground into place
            .fromTo(q(`${sel} .mk-label`), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, at + 0.35);
        };
        const markerOut = (sel: string, at: number, dur = 0.3) => tl.to(q(sel), { autoAlpha: 0, duration: dur }, at);
        const understate = (sel: string, at: number) => tl.to(q(sel), { opacity: 0.28, duration: 0.3 }, at);

        // SCENE 02 · traces
        markerIn(".mk-trace", 2.0);
        markerOut(".mk-trace", 2.75);

        // SCENE 03 · identification, right after the headline has landed
        markerIn(".mk-bull", r + 0.45);
        tl.fromTo(q(".mk-bull .mk-brackets"), { scale: 1.04, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }, r + 0.45);

        // --- ECOLOGICAL NETWORK REVEAL · starts on the reveal image, peaks in scene 04 ---
        const D = r + 1.4;
        // attention moves from the animal to the ground, then the soil horizon opens
        tl.fromTo(q(".mk-link"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 }, D)
          .fromTo(q(".mk-link-drop"), { strokeDasharray: "1 1", strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.35 }, D)
          .fromTo(q(".mk-horizon"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 }, D + 0.3)
          .fromTo(q(".mk-horizon-l, .mk-horizon-r"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6 }, D + 0.3)
          .fromTo(q(".mk-horizon-t"), { opacity: 0 }, { opacity: 1, duration: 0.25 }, D + 0.65);
        // field boxes rise from their anchors; a retired box leaves its ring as an observation point
        const F = FADES[2];
        const SEQ: [string, number][] = [
          ["roots", D + 0.5],
          ["grazing", F + 0.3],
          ["seed", F + 0.7],
          ["fungi", F + 1.1],
          ["fauna", F + 1.5],
          ["decomp", F + 1.9],
        ];
        SEQ.forEach(([id, at]) => markerIn(`.mk-${id}`, at));
        const retire = (id: string, at: number) => tl.to(q(`.mk-${id} .mk-label, .mk-${id} .mk-line`), { opacity: 0, duration: 0.3 }, at);
        retire("roots", SEQ[2][1]);
        retire("grazing", SEQ[3][1]);
        retire("seed", SEQ[4][1]);
        retire("fungi", SEQ[5][1]);
        understate(".mk-bull", SEQ[1][1]);
        markerOut(".mk-link", F, 0.4);
        // quiet hold: overlays recede, the horizon stays as one faint connection
        const quiet = F + 2.6;
        markerOut(".mk-bull, .mk-roots, .mk-grazing, .mk-seed, .mk-fungi, .mk-fauna, .mk-decomp", quiet, 0.5);
        tl.to(q(".mk-horizon"), { opacity: 0.35, duration: 0.5 }, quiet);
        markerOut(".mk-horizon", FADES[3], 0.5);

        // mobile: one field chip at a time, same sequence
        const chips = q(".mob-chip");
        const chipTimes = [r + 0.45, ...SEQ.map(([, at]) => at), quiet];
        chips.forEach((el, k) => {
          if (k >= chipTimes.length - 1) return;
          tl.fromTo(el, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.25 }, chipTimes[k]).to(
            el,
            { autoAlpha: 0, y: -8, duration: 0.2 },
            chipTimes[k + 1] - 0.15
          );
        });

        // --- restoration signal: grows with the story, completes at the discovery peak ---
        tl.to(q(".sig-line"), { strokeDashoffset: 0.68, duration: 1 }, FADES[0])
          .to(q(".sig-node-1"), { opacity: 1, duration: 0.25 }, FADES[0] + 0.6)
          .to(q(".sig-line"), { strokeDashoffset: 0.42, duration: 1 }, FADES[1])
          .to(q(".sig-node-2"), { opacity: 1, duration: 0.25 }, FADES[1] + 0.6)
          .to(q(".sig-line"), { strokeDashoffset: 0.2, duration: 1 }, D)
          .to(q(".sig-node-3"), { opacity: 1, duration: 0.25 }, D + 0.7)
          .to(q(".sig-line"), { strokeDashoffset: 0, duration: 0.9 }, FADES[2] + 0.8)
          .to(q(".sig-echo"), { strokeDashoffset: 0, duration: 0.7 }, FADES[2] + 1.0)
          .to(q(".sig-node-4"), { opacity: 1, duration: 0.25 }, FADES[2] + 2.0)
          .fromTo(q(".sig-note"), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.3 }, FADES[2] + 2.1);

        tl.to({}, { duration: 0.01 }, TOTAL - 0.01); // final clean hold
        updateChapter(0);

        // --- intro: the first headline rises on load ---
        if (window.scrollY < 10) {
          gsap.from(words(0), { yPercent: 115, duration: 1.1, stagger: 0.07, ease: "power4.out", delay: 0.15 });
          gsap.from(q(".ls-head-0 .ls-kicker, .ls-head-0 .ls-body"), { opacity: 0, y: 12, duration: 0.9, stagger: 0.5, ease: "power2.out", delay: 0.3 });
        }
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative h-lvh w-full overflow-hidden bg-forest motion-reduce:h-auto">
      {FUTURE_LAB && (
        <svg aria-hidden className="pointer-events-none absolute h-0 w-0">
          <filter id="future-lab" colorInterpolationFilters="sRGB">
            {/* luminance */}
            <feColorMatrix
              type="matrix"
              values="0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0 0 0 1 0"
            />
            {/* gradient map: forest-deep → forest → moss → sage → bone */}
            <feComponentTransfer result="graded">
              <feFuncR type="table" tableValues="0.055 0.110 0.275 0.620 0.941" />
              <feFuncG type="table" tableValues="0.106 0.224 0.430 0.725 0.929" />
              <feFuncB type="table" tableValues="0.078 0.157 0.260 0.520 0.886" />
            </feComponentTransfer>
            {/* keep a trace of the original colour for depth */}
            <feComposite in="graded" in2="SourceGraphic" operator="arithmetic" k1="0" k2="0.9" k3="0.1" k4="0" />
          </filter>
        </svg>
      )}
      {STATES.map((s, i) => (
        <div
          key={s.src}
          className={`ls-layer absolute inset-0 overflow-hidden motion-reduce:relative motion-reduce:h-svh ${i > 0 ? "ls-wipe" : ""}`}
        >
          <div className="ls-cam absolute inset-0 will-change-transform">
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover object-[60%_50%] md:object-center"
            style={FUTURE_LAB && i < STATES.length - 1 ? { filter: "url(#future-lab)" } : undefined}
          />
          </div>
          {/* reading light: a soft veil from the text side (desktop) / from the top (mobile), no text shadows */}
          <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,rgb(14_24_19/0.66)_0%,rgb(14_24_19/0.42)_26%,rgb(14_24_19/0.12)_46%,transparent_60%)] md:block" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[48svh] bg-gradient-to-b from-[rgb(14_24_19/0.62)] via-[rgb(14_24_19/0.3)] to-transparent md:hidden" />
          {/* soft top edge for the navigation */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[rgb(20_32_26/0.5)] to-transparent" />
          {/* last scene: the image bottom settles into the night colour the next section starts with */}
          {i === STATES.length - 1 ? <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-night to-transparent" /> : null}
          {/* soft floor so the bottom interface stays readable */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[calc(42svh+100lvh-100svh)] bg-gradient-to-t from-black/60 via-black/25 to-transparent md:h-40 md:via-transparent md:from-black/45" />
          <div
            className={`ls-head ls-head-${i} pointer-events-none absolute bottom-[calc(100lvh-100svh+8.75rem)] left-5 right-5 top-[12svh] flex flex-col md:bottom-auto md:left-14 md:top-[15svh] md:block ${s.reveal ? "ls-reveal" : ""} ${i > 0 ? "motion-safe:opacity-0" : ""}`}
          >
            <Label index={s.kicker.split("|")[0]} className="ls-kicker text-bone">{s.kicker.split("|")[1]}</Label>
            {s.reveal ? (
              // Level 1+: the brand reveal deliberately breaks the shared headline scale (~30% larger)
              <h2 className="t-display mt-5 text-bone [filter:drop-shadow(0_1px_18px_rgb(0_0_0/0.22))]">
                <Words text="Meet the" />
                <br />
                <Words text="gardeners." />
              </h2>
            ) : (
              <h2 className="t-h1 mt-5 max-w-[14ch] text-bone [filter:drop-shadow(0_1px_14px_rgb(0_0_0/0.2))]">
                <Words text={s.headline} />
              </h2>
            )}
            <p
              className={`ls-body t-lead mt-auto max-w-[32ch] text-bone [text-shadow:0_1px_2px_rgb(0_0_0/0.3)] md:mt-7 motion-reduce:mt-6 ${s.reveal ? "md:max-w-[36ch]" : ""} ${i > 0 ? "motion-safe:opacity-0" : ""}`}
            >
              {s.body}
            </p>
          </div>
        </div>
      ))}

      {/* scene-change scan line */}
      <div aria-hidden className="ls-scan pointer-events-none invisible absolute inset-x-0 z-20 h-px bg-signal/80 shadow-[0_0_18px_2px_rgb(205_238_143/0.45)] motion-reduce:hidden">
        <span className="ls-scan-label ui-label absolute -top-6 right-5 text-[10px] text-signal md:right-14">Scanning</span>
      </div>

      <ResearchMarkers />

      {/* mobile: the discovery as a single field chip rising from the soil */}
      <div aria-hidden className="pointer-events-none absolute bottom-[calc(100lvh-100svh+1.75rem)] left-5 z-20 h-[96px] w-[66%] md:hidden motion-reduce:hidden">
        {DISCOVERY.slice(0, 7).map((d) => (
          <div key={d.id} className="mob-chip invisible absolute bottom-0 left-0 flex gap-3 opacity-0">
            <span className="relative mt-1 w-px shrink-0 bg-sage/80">
              <span className="absolute -bottom-1 -left-[3px] h-[7px] w-[7px] rounded-full border border-sage bg-bone" />
            </span>
            <span className="block border border-sage/45 bg-forest/95 px-3 py-2">
              <span className={`ui-label block text-[9px] ${d.id === "bull" ? "text-[#d1a07a]" : "text-sage"}`}>{d.kicker}</span>
              <span className="mt-0.5 block font-mono text-[12px] font-medium uppercase tracking-[0.04em] text-bone">{d.title}</span>
              <span className="mt-0.5 block text-[12px] leading-snug text-bone/80">{d.desc}</span>
            </span>
          </div>
        ))}
      </div>

      {/* the same field notes as text: screen readers always, visible when motion is reduced */}
      <section aria-label="Field observations" className="sr-only motion-reduce:not-sr-only motion-reduce:bg-forest motion-reduce:px-5 motion-reduce:py-16 md:motion-reduce:px-14">
        <p className="ui-label text-sage">Field observations · above and below ground</p>
        <ol className="mt-6 grid gap-6 md:grid-cols-3">
          {DISCOVERY.map((d) => (
            <li key={d.id} className="border-t border-bone/20 pt-4">
              <p className="ui-label text-[10px] text-sage">{d.kicker}</p>
              <p className="mt-2 font-mono text-sm font-medium uppercase tracking-[0.04em] text-bone">{d.title}</p>
              <p className="mt-1 text-bone/75">{d.desc}</p>
            </li>
          ))}
        </ol>
      </section>
      <RestorationSignal />
      <ChapterIndicator />
    </section>
  );
}
