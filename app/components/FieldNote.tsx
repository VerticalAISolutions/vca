"use client";

// Field note: the hover data sheet of a research marker. Future Research Lab look,
// set in the site's own type system: Instrument Serif for names and readings,
// DM Sans for prose, .ui-label micro type for metadata. All data is fictional (2040).

import { useLayoutEffect, useRef, type CSSProperties } from "react";

type Metric = { k: string; v: string; u: string; d?: string };

export type Note = {
  code: string;
  time: string;
  kicker: string;
  title: string;
  latin: string;
  status: string;
  native?: boolean; // existing life vs. a reintroduced species
  metrics: Metric[];
  series: number[];
  seriesLabel: string;
  body: string;
  coords: string;
  sensor: string;
  conf: string;
  // placement
  at?: "dot" | "box";
  side?: "left" | "right";
  up?: boolean;
  gap?: number;
};

export const NOTES: Record<string, Note> = {
  trace: {
    code: "TRC-02-0418",
    time: "2040.04.18 · 05:56 UTC",
    kicker: "Field trace / 02",
    title: "Hoof imprints",
    latin: "Vestigium ungulatum · est. 800 kg",
    status: "Trace · species pending",
    metrics: [
      { k: "Imprint depth", v: "4.2", u: "cm" },
      { k: "Stride length", v: "1.46", u: "m" },
      { k: "Seed burial", v: "+38", u: "%", d: "vs. bare ground" },
      { k: "Water capture", v: "0.6", u: "L / print" },
    ],
    series: [0, 0, 1, 3, 4, 8, 11, 17, 27],
    seriesLabel: "Tracks per 100 m² · 2032–40",
    body: "Heavy grazers press seeds into the soil and leave small hollows where rainwater collects.",
    coords: "51.2104° N · 13.7731° E",
    sensor: "Camera trap C-11",
    conf: "0.91",
    side: "right",
  },
  bull: {
    code: "AUR-07 / H02",
    time: "2040.06.14 · 06:42 UTC",
    kicker: "Field note / 01 · Species",
    title: "Aurochs",
    latin: "Bos primigenius",
    status: "Reintroduced · Gen. 3",
    metrics: [
      { k: "Body mass", v: "920", u: "kg" },
      { k: "Shoulder height", v: "1.78", u: "m" },
      { k: "Grazing intake", v: "41", u: "kg / day" },
      { k: "Genome match", v: "98.7", u: "%", d: "ref. 1627 lineage" },
    ],
    series: [4, 6, 9, 13, 18, 24, 31],
    seriesLabel: "Herd size · 2034–40",
    body: "The wild ancestor of cattle, extinct since 1627. Grazing and trampling keep landscapes open, so light reaches the ground.",
    coords: "51.2112° N · 13.7748° E",
    sensor: "GPS collar AUR-07",
    conf: "0.99",
    at: "box",
    side: "left",
    up: false,
  },
  grazing: {
    code: "VEG-02-1187",
    time: "2040.06.14 · 07:10 UTC",
    kicker: "Field note / 03 · Grazing",
    title: "Habitat diversity",
    latin: "Grazed sward mosaic",
    status: "Process · observed",
    native: true,
    metrics: [
      { k: "Plant species", v: "34", u: "per m²", d: "+61 % since 2036" },
      { k: "Sward height var.", v: "0.42", u: "CV" },
      { k: "Open ground", v: "18", u: "%" },
      { k: "Pollinator visits", v: "212", u: "per hour" },
    ],
    series: [21, 22, 24, 27, 29, 31, 34],
    seriesLabel: "Species per m² · 2034–40",
    body: "Uneven grazing leaves short lawns, tall tussocks and open patches side by side.",
    coords: "51.2109° N · 13.7752° E",
    sensor: "Drone D-3 · multispectral",
    conf: "0.94",
    side: "right",
  },
  roots: {
    code: "SOL-03-0262",
    time: "2040.06.14 · 07:24 UTC",
    kicker: "Field note / 02 · Root system",
    title: "Root network",
    latin: "Festuca · Plantago · Trifolium",
    status: "Native · existing soil life",
    native: true,
    metrics: [
      { k: "Rooting depth", v: "1.4", u: "m" },
      { k: "Root biomass", v: "3.1", u: "t / ha" },
      { k: "Soil carbon", v: "42", u: "t C / ha", d: "+9 % since 2034" },
      { k: "Infiltration", v: "27", u: "mm / h" },
    ],
    series: [38.4, 38.9, 39.6, 40.3, 41, 41.6, 42],
    seriesLabel: "Soil carbon · 2034–40",
    body: "Grazed grasses regrow and root deeper, holding the soil together and storing water and carbon.",
    coords: "51.2101° N · 13.7719° E · −0.32 m",
    sensor: "Soil probe S-14",
    conf: "0.96",
  },
  seed: {
    code: "SED-04-0312",
    time: "2040.06.14 · 07:28 UTC",
    kicker: "Field note / 04 · Seed dispersal",
    title: "Germination",
    latin: "Centaurea jacea · seedling",
    status: "Process · observed",
    native: true,
    metrics: [
      { k: "Seeds per imprint", v: "3.4", u: "avg." },
      { k: "Germination", v: "+42", u: "%", d: "vs. untrodden soil" },
      { k: "Burial depth", v: "1.2", u: "cm" },
      { k: "Moisture in print", v: "+18", u: "%" },
    ],
    series: [8, 11, 15, 19, 24, 30, 37],
    seriesLabel: "Seedlings per m² · 2034–40",
    body: "A hoof presses seeds into the ground and leaves a small hollow that holds water: a seedbed made by a gardener.",
    coords: "51.2105° N · 13.7733° E · −0.04 m",
    sensor: "Soil camera S-09",
    conf: "0.92",
    side: "left",
  },
  fungi: {
    code: "MYC-04-0731",
    time: "2040.06.14 · 07:31 UTC",
    kicker: "Field note / 05 · Fungal networks",
    title: "Mycelial network",
    latin: "Glomeromycota · arbuscular",
    status: "Native · existing soil life",
    native: true,
    metrics: [
      { k: "Hyphal length", v: "118", u: "m / g soil" },
      { k: "Linked plants", v: "63", u: "individuals" },
      { k: "N transfer", v: "4.8", u: "mg / day" },
      { k: "Network span", v: "38", u: "m" },
    ],
    series: [61, 70, 79, 88, 97, 108, 118],
    seriesLabel: "Hyphal length · 2034–40",
    body: "Fungal threads connect plant roots and move water and nutrients between them.",
    coords: "51.2106° N · 13.7738° E · −0.21 m",
    sensor: "eDNA sampler E-2",
    conf: "0.93",
  },
  fauna: {
    code: "FAU-05-1840",
    time: "2040.06.14 · 07:38 UTC",
    kicker: "Field note / 06 · Soil biology",
    title: "Soil fauna",
    latin: "Isopoda · Lumbricidae · Carabidae",
    status: "Native · existing soil life",
    native: true,
    metrics: [
      { k: "Organisms", v: "1,840", u: "per m²" },
      { k: "Earthworm mass", v: "112", u: "g / m²" },
      { k: "Taxa detected", v: "46", u: "taxa" },
      { k: "Soil aeration", v: "+19", u: "%", d: "since 2036" },
    ],
    series: [920, 1040, 1210, 1380, 1520, 1700, 1840],
    seriesLabel: "Organisms per m² · 2034–40",
    body: "Woodlice, beetles and earthworms break down dung and plant matter and keep the soil full of air.",
    coords: "51.2108° N · 13.7745° E · −0.27 m",
    sensor: "Soil probe S-17",
    conf: "0.92",
    side: "left",
  },
  decomp: {
    code: "DEC-06-0094",
    time: "2040.06.14 · 07:45 UTC",
    kicker: "Field note / 07 · Soil processes",
    title: "Decomposition",
    latin: "Litter layer · O-horizon",
    status: "Process · observed",
    native: true,
    metrics: [
      { k: "Litter turnover", v: "94", u: "days", d: "−22 % since 2034" },
      { k: "N release", v: "26", u: "kg / ha · yr" },
      { k: "Microbial activity", v: "0.83", u: "index" },
      { k: "Dung beetles", v: "17", u: "species" },
    ],
    series: [121, 117, 112, 106, 101, 97, 94],
    seriesLabel: "Litter turnover in days · 2034–40",
    body: "Dung beetles pull dung deep into the ground, where fungi and soil organisms turn it into nutrients for the plants above.",
    coords: "51.2103° N · 13.7736° E · −0.06 m",
    sensor: "Respiration probe R-4",
    conf: "0.90",
  },
};

function Sparkline({ data }: { data: number[] }) {
  const w = 300;
  const h = 46;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - 6 - ((v - min) / (max - min || 1)) * (h - 14)] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"} ${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const [ex, ey] = pts[pts.length - 1];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-2 h-[46px] w-full overflow-visible" aria-hidden>
      {/* baseline grid */}
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1={0} x2={w} y1={h * f} y2={h * f} stroke="var(--color-bone)" strokeOpacity={0.08} />
      ))}
      <line x1={0} x2={w} y1={h - 0.5} y2={h - 0.5} stroke="var(--color-bone)" strokeOpacity={0.25} />
      {pts.map(([x]) => (
        <line key={x} x1={x} x2={x} y1={h - 3} y2={h} stroke="var(--color-bone)" strokeOpacity={0.35} />
      ))}
      <path d={`${line} L ${w} ${h} L 0 ${h} Z`} fill="var(--color-sage)" fillOpacity={0.1} />
      <path className="fn-spark" d={line} pathLength={1} fill="none" stroke="var(--color-sage)" strokeWidth={1.5} />
      {pts.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={1.6} fill="var(--color-bone)" fillOpacity={0.7} />
      ))}
      <circle cx={ex} cy={ey} r={5} fill="none" stroke="var(--color-sage)" />
      <circle cx={ex} cy={ey} r={2.4} fill="var(--color-bone)" />
    </svg>
  );
}

type FieldNoteProps =
  | { note: Note; style: CSSProperties; sheet?: false; onClose?: never }
  // mobile: the same data sheet, opened by tapping a field chip, docked to the bottom of the stage
  | { note: Note; style?: never; sheet: true; onClose: () => void };

export function FieldNote({ note, style, sheet, onClose }: FieldNoteProps) {
  const ref = useRef<HTMLDivElement>(null);

  // keep the sheet inside the stage (below the nav), nudging via the CSS translate property
  useLayoutEffect(() => {
    const el = ref.current;
    const stage = el?.offsetParent as HTMLElement | null;
    if (sheet || !el || !stage) return;
    el.style.translate = ""; // measure the unnudged position (effects may run twice in dev)
    const r = el.getBoundingClientRect();
    const p = stage.getBoundingClientRect();
    const pad = 16;
    let dx = 0;
    let dy = 0;
    if (r.right > p.right - pad) dx = p.right - pad - r.right;
    if (r.left + dx < p.left + pad) dx = p.left + pad - r.left;
    if (r.bottom > p.bottom - pad) dy = p.bottom - pad - r.bottom;
    if (r.top + dy < p.top + 88) dy = p.top + 88 - r.top;
    el.style.translate = `${dx}px ${dy}px`;
  }, [sheet]);

  return (
    <div
      ref={ref}
      role={sheet ? "dialog" : "tooltip"}
      aria-label={sheet ? `Field note: ${note.title}` : undefined}
      style={style}
      className={`field-note absolute z-30 border border-sage/40 bg-forest/95 text-bone shadow-[0_24px_60px_-24px_rgb(0_0_0/0.75)] backdrop-blur-[2px] ${
        sheet
          ? "fn-sheet pointer-events-auto inset-x-3 bottom-[calc(100lvh-100svh+0.75rem)] max-h-[calc(100svh-6.5rem)] overflow-y-auto overflow-x-hidden overscroll-contain [scrollbar-width:none] md:hidden"
          : "pointer-events-none hidden w-[364px] md:block"
      }`}
    >
      {sheet ? (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close field note"
          className="absolute right-0 top-0 z-10 flex h-11 w-11 items-center justify-center text-bone/80 active:text-bone"
        >
          <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" aria-hidden>
            <path d="M1 1 L13 13 M13 1 L1 13" stroke="currentColor" strokeWidth={1.3} />
          </svg>
        </button>
      ) : null}
      {/* crosshair corners, as in the key visual */}
      <span aria-hidden className="absolute -left-[6px] -top-px h-px w-3 bg-bone/70" />
      <span aria-hidden className="absolute -left-px -top-[6px] h-3 w-px bg-bone/70" />
      <span aria-hidden className="absolute -bottom-px -right-[6px] h-px w-3 bg-bone/70" />
      <span aria-hidden className="absolute -bottom-[6px] -right-px h-3 w-px bg-bone/70" />

      {/* record header */}
      <div className={`flex items-center justify-between border-b border-bone/12 px-5 py-2.5 ${sheet ? "pr-12" : ""}`}>
        <span className="ui-label flex items-center gap-2 whitespace-nowrap text-[9px] text-bone/80">
          <span aria-hidden className="fn-live relative h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
          Live · {note.code}
        </span>
        <span className="ui-label whitespace-nowrap text-[9px] text-bone/45 tabular-nums">{note.time.split(" · ")[1]}</span>
      </div>

      <div className="px-5 pb-4 pt-4">
        <p className="ui-label text-[10px] text-sage">{note.kicker}</p>
        <div className="mt-2 flex items-end justify-between gap-4">
          <div>
            <p className="font-serif text-[30px] leading-[1]">{note.title}</p>
            <p className="font-serif mt-1 text-[16px] italic leading-tight text-bone/65">{note.latin}</p>
          </div>
        </div>
        <p
          className={`ui-label mt-3 inline-flex items-center gap-2 border px-2.5 py-1 text-[9px] ${
            note.native ? "border-sage/40 text-sage" : "border-[#d1a07a]/50 text-[#d1a07a]"
          }`}
        >
          <span aria-hidden className={`h-1 w-1 rounded-full ${note.native ? "bg-sage" : "bg-[#d1a07a]"}`} />
          {note.status}
        </p>

        {/* readings */}
        <dl className="mt-4 grid grid-cols-2 border-t border-bone/12">
          {note.metrics.map((m, i) => (
            <div key={m.k} className={`py-3 ${i % 2 ? "border-l border-bone/12 pl-4" : "pr-4"} ${i > 1 ? "border-t border-bone/12" : ""}`}>
              <dt className="ui-label text-[9px] text-bone/50">{m.k}</dt>
              <dd className="mt-1.5 flex items-baseline gap-1.5">
                <span className="font-serif text-[28px] leading-none tabular-nums">{m.v}</span>
                <span className="text-[11px] text-bone/60">{m.u}</span>
              </dd>
              {m.d ? <dd className="mt-1 text-[11px] text-sage">{m.d}</dd> : null}
            </div>
          ))}
        </dl>

        {/* monitoring trend */}
        <div className="border-t border-bone/12 pt-3">
          <div className="flex items-center justify-between">
            <span className="ui-label text-[9px] text-bone/50">{note.seriesLabel}</span>
            <span className="ui-label text-[9px] text-sage">Monitoring</span>
          </div>
          <Sparkline data={note.series} />
        </div>

        <p className="mt-4 text-[13px] leading-relaxed text-bone/75">{note.body}</p>
      </div>

      {/* provenance */}
      <div className="flex flex-col gap-1 border-t border-bone/12 px-5 py-2.5">
        <span className="ui-label text-[8.5px] text-bone/45 tabular-nums">{note.coords}</span>
        <span className="ui-label text-[8.5px] text-bone/45 tabular-nums">
          {note.time.split(" · ")[0]} · {note.sensor} · <span className="text-bone/70">Conf {note.conf}</span>
        </span>
      </div>
    </div>
  );
}
