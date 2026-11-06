"use client";

// Scientific interface layer. Coordinates are SOURCE IMAGE PIXELS (1672 × 941).
// The SVG uses the same viewBox with `xMidYMid slice`, which is the exact
// equivalent of `object-fit: cover; object-position: center` on the images,
// so every marker stays on its object at any viewport size.
// Visibility is animated by the timeline in LandscapeScroll (classes .mk-*, autoAlpha),
// hovering a point opens a field note with more context.

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FieldNote, NOTES } from "./FieldNote";

const W = 1672;
const H = 941;

type Hover = { id: string; x: number; y: number; flipX: boolean; flipY: boolean; gap: number } | null;

type MarkerProps = {
  id: string;
  note?: string;
  x: number;
  y: number;
  r: number;
  leader: [number, number][];
  label: string;
  sub?: string;
  kicker?: string;
  tone?: "earth";
  desc?: string[];
  ring?: "dashed" | "broken";
  nested?: boolean;
  onHover: (id: string | null, el?: SVGElement) => void;
};

function Marker({ id, note = id, x, y, r, leader, label, sub, kicker, tone, desc, ring = "broken", nested, onHover }: MarkerProps) {
  const [x1, y1] = leader[0];
  // leader starts at ring edge, not at the anchor
  const a = Math.atan2(y1 - y, x1 - x);
  const start: [number, number] = [x + Math.cos(a) * (r + 4), y + Math.sin(a) * (r + 4)];
  const d = "M " + [start, ...leader].map((p) => p.join(" ")).join(" L ");
  const [lx, ly] = leader[leader.length - 1];
  const [px] = leader[leader.length - 2] ?? start;
  const dir = lx >= px ? 1 : -1;
  const PAD_X = 12;
  const tx = lx + dir * PAD_X;
  const anchor = dir === 1 ? "start" : "end";

  // label box sized to the rendered text (re-measured once the web font is in)
  const textRef = useRef<SVGGElement>(null);
  const [box, setBox] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  useLayoutEffect(() => {
    const measure = () => {
      const b = textRef.current?.getBBox();
      if (b && b.width) setBox({ x: b.x - PAD_X, y: b.y - 8, w: b.width + PAD_X * 2, h: b.height + 16 });
    };
    measure();
    document.fonts?.ready.then(measure);
  }, []);

  const enter = (e: React.MouseEvent<SVGElement>) => onHover(note, e.currentTarget.closest(".mk-group") as SVGElement);
  const leave = () => onHover(null);

  return (
    <g className={nested ? `mk-group mk-${id}` : `mk mk-group mk-${id}`} opacity={nested ? undefined : 0} visibility={nested ? undefined : "hidden"}>
      <circle className="mk-ring" cx={x} cy={y} r={r} fill="none" stroke="var(--color-sage)" strokeWidth={1.5} strokeDasharray={ring === "dashed" ? "3 4" : `${r * 1.2} ${r * 0.37}`} vectorEffect="non-scaling-stroke" />
      <circle className="mk-dot" cx={x} cy={y} r={3.2} fill="var(--color-bone)" />
      <path className="mk-line" d={d} pathLength={1} fill="none" stroke="var(--color-bone)" strokeOpacity={0.9} strokeWidth={1} vectorEffect="non-scaling-stroke" />
      <g className="mk-label">
        <circle cx={lx} cy={ly} r={2.4} fill="var(--color-bone)" />
        {box ? (
          <>
            {/* key-visual language: forest field, hairline frame, crosshair corners */}
            <rect
              className="mk-box mk-hit"
              x={box.x}
              y={box.y}
              width={box.w}
              height={box.h}
              rx={2}
              fill="var(--color-forest)"
              fillOpacity={0.9}
              stroke="var(--color-sage)"
              strokeOpacity={0.45}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              pointerEvents="visible"
              onMouseEnter={enter}
              onMouseLeave={leave}
            />
            <path
              d={`M ${box.x - 5} ${box.y} H ${box.x + 5} M ${box.x} ${box.y - 5} V ${box.y + 5} M ${box.x + box.w - 5} ${box.y + box.h} H ${box.x + box.w + 5} M ${box.x + box.w} ${box.y + box.h - 5} V ${box.y + box.h + 5}`}
              stroke="var(--color-bone)"
              strokeOpacity={0.7}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          </>
        ) : null}
        <g ref={textRef} pointerEvents="none">
          {kicker ? (
            <text x={tx} y={ly - 22} textAnchor={anchor} className={tone === "earth" ? "mk-k mk-k-earth" : "mk-k"}>
              {kicker}
            </text>
          ) : null}
          <text x={tx} y={ly - 2} textAnchor={anchor} className="mk-t1">
            {label}
          </text>
          {sub ? (
            <text x={tx} y={ly + 15} textAnchor={anchor} className="mk-t2">
              {sub}
            </text>
          ) : null}
          {desc?.map((line, k) => (
            <text key={line} x={tx} y={ly + (sub ? 33 : 17) + k * 16} textAnchor={anchor} className="mk-t3">
              {line}
            </text>
          ))}
        </g>
      </g>
      {/* hover target on the point itself */}
      <circle className="mk-hit" cx={x} cy={y} r={Math.max(r + 14, 30)} fill="transparent" pointerEvents="visible" onMouseEnter={enter} onMouseLeave={leave} />
    </g>
  );
}

function Brackets({ x1, y1, x2, y2, s = 20 }: { x1: number; y1: number; x2: number; y2: number; s?: number }) {
  const c = [
    `M ${x1} ${y1 + s} L ${x1} ${y1} L ${x1 + s} ${y1}`,
    `M ${x2 - s} ${y1} L ${x2} ${y1} L ${x2} ${y1 + s}`,
    `M ${x2} ${y2 - s} L ${x2} ${y2} L ${x2 - s} ${y2}`,
    `M ${x1 + s} ${y2} L ${x1} ${y2} L ${x1} ${y2 - s}`,
  ];
  return (
    <g className="mk-brackets" stroke="var(--color-bone)" strokeOpacity={0.75} strokeWidth={1} fill="none">
      {c.map((d) => (
        <path key={d} d={d} vectorEffect="non-scaling-stroke" />
      ))}
    </g>
  );
}

export default function ResearchMarkers() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState<Hover>(null);

  const onHover = (id: string | null, group?: SVGElement) => {
    const n = id ? NOTES[id] : null;
    const target = group?.querySelector(n?.at === "box" ? ".mk-box" : ".mk-dot");
    if (!id || !n || !target || !svgRef.current) return setHover(null);
    const box = svgRef.current.getBoundingClientRect();
    const r = target.getBoundingClientRect();
    const flipX = n.side ? n.side === "left" : r.left - box.left > box.width * 0.6;
    const x = (n.at === "box" ? (flipX ? r.left : r.right) : r.left + r.width / 2) - box.left;
    const y = (n.at === "box" ? r.top + 12 : r.top + r.height / 2) - box.top;
    setHover({ id, x, y, flipX, flipY: n.up ?? y > box.height * 0.55, gap: n.gap ?? (n.at === "box" ? 16 : 28) });
  };

  // a note never outlives the scene it belongs to: close on real user scrolling
  // (not on programmatic scroll events from ScrollTrigger refreshes)
  useEffect(() => {
    if (!hover) return;
    const close = () => setHover(null);
    const evts = ["wheel", "touchmove", "keydown"] as const;
    evts.forEach((e) => window.addEventListener(e, close, { passive: true }));
    return () => evts.forEach((e) => window.removeEventListener(e, close));
  }, [hover]);

  const note = hover ? NOTES[hover.id] : null;

  return (
    <>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
        className="research-layer ls-cam pointer-events-none absolute inset-0 z-10 hidden h-full w-full md:block motion-reduce:hidden!"
      >
        {/* SCENE 02 · hoof prints in the foreground */}
        <Marker id="trace" x={898} y={600} r={44} ring="dashed" leader={[[982, 520], [1080, 520]]} label="HOOF IMPRINTS" sub="FIELD TRACE / 02" onHover={onHover} />

        {/* SCENE 03 · the dominant aurochs. Anchored at the rump, line runs above the horns. */}
        <g className="mk mk-bull" opacity={0} visibility="hidden">
          <Brackets x1={884} y1={278} x2={1286} y2={566} />
          <Marker nested id="bull-inner" note="bull" x={978} y={378} r={12} leader={[[1010, 252], [1150, 252]]} kicker="01 / Species · Reintroduced" tone="earth" label="BOS PRIMIGENIUS" sub="ECOSYSTEM ENGINEER" onHover={onHover} />
        </g>

        {/* SCENE 03 → 04 · guide from the animal down to the soil horizon, then the horizon opens */}
        <g className="mk-link" opacity={0} visibility="hidden">
          <path className="mk-link-drop" d="M 1034 566 L 1034 700" pathLength={1} fill="none" stroke="var(--color-sage)" strokeOpacity={0.9} strokeWidth={1} vectorEffect="non-scaling-stroke" />
          <circle cx={1034} cy={566} r={3} fill="var(--color-bone)" />
        </g>
        <g className="mk-horizon" opacity={0} visibility="hidden">
          <path className="mk-horizon-l" d="M 1034 700 L 150 700" pathLength={1} fill="none" stroke="var(--color-bone)" strokeOpacity={0.55} strokeWidth={1} strokeDasharray="1 1" vectorEffect="non-scaling-stroke" />
          <path className="mk-horizon-r" d="M 1034 700 L 1560 700" pathLength={1} fill="none" stroke="var(--color-bone)" strokeOpacity={0.55} strokeWidth={1} strokeDasharray="1 1" vectorEffect="non-scaling-stroke" />
          <circle cx={1034} cy={700} r={4} fill="none" stroke="var(--color-sage)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
          <circle cx={1034} cy={700} r={1.8} fill="var(--color-bone)" />
          <text className="mk-horizon-t mk-k" x={160} y={690} textAnchor="start">
            Existing soil life
          </text>
        </g>

        {/* ECOLOGICAL NETWORK REVEAL · boxes rise from their anchor, in order of appearance */}
        <Marker id="grazing" x={1252} y={612} r={14} ring="dashed" leader={[[1300, 652], [1330, 652]]} kicker="02 / Grazing" label="HABITAT DIVERSITY" desc={["Grazing helps shape", "varied vegetation."]} onHover={onHover} />
        <Marker id="roots" x={412} y={790} r={16} leader={[[412, 640], [440, 640]]} kicker="03 / Root system" label="ROOT NETWORK" desc={["Plant roots connect", "vegetation and soil."]} onHover={onHover} />
        <Marker id="fungi" x={850} y={765} r={16} ring="dashed" leader={[[850, 652], [880, 652]]} kicker="04 / Fungal networks" label="MYCELIAL NETWORK" desc={["Fungi contribute to", "nutrient cycling."]} onHover={onHover} />
        <Marker id="fauna" x={1100} y={802} r={14} leader={[[1100, 738], [1130, 738]]} kicker="05 / Soil biology" label="SOIL FAUNA" desc={["Organisms recycle", "organic material."]} onHover={onHover} />
        <Marker id="decomp" x={740} y={792} r={16} ring="dashed" leader={[[740, 752], [710, 752]]} kicker="06 / Soil processes" label="DECOMPOSITION" desc={["Organic matter returns", "nutrients to the soil."]} onHover={onHover} />
      </svg>

      {note && hover ? (
        <FieldNote
          key={`${hover.id}-${hover.x}-${hover.y}`}
          note={note}
          style={{
            left: hover.x,
            top: hover.y,
            transform: `translate(${hover.flipX ? `calc(-100% - ${hover.gap}px)` : `${hover.gap}px`}, ${hover.flipY ? "calc(-100% + 12px)" : "-12px"})`,
          }}
        />
      ) : null}
    </>
  );
}
