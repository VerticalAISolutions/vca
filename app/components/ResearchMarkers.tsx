// Scientific interface layer. Coordinates are SOURCE IMAGE PIXELS (1672 × 941).
// The SVG uses the same viewBox with `xMidYMid slice`, which is the exact
// equivalent of `object-fit: cover; object-position: center` on the images,
// so every marker stays on its object at any viewport size.
// Animated by the timeline in LandscapeScroll (classes .mk-*).

const W = 1672;
const H = 941;

type MarkerProps = {
  id: string;
  x: number;
  y: number;
  r: number;
  leader: [number, number][];
  label: string;
  sub: string;
  ring?: "dashed" | "broken";
  nested?: boolean;
};

function Marker({ id, x, y, r, leader, label, sub, ring = "broken", nested }: MarkerProps) {
  const pts = [[x, y], ...leader];
  // leader starts at ring edge, not at the anchor
  const [x1, y1] = pts[1];
  const a = Math.atan2(y1 - y, x1 - x);
  const start: [number, number] = [x + Math.cos(a) * (r + 4), y + Math.sin(a) * (r + 4)];
  const d = "M " + [start, ...leader].map((p) => p.join(" ")).join(" L ");
  const [lx, ly] = leader[leader.length - 1];
  const [px] = leader[leader.length - 2] ?? start;
  const dir = lx >= px ? 1 : -1;
  const tx = dir === 1 ? lx - 2 : lx + 2;
  const anchor = dir === 1 ? "end" : "start";

  return (
    <g className={nested ? `mk-${id}` : `mk mk-${id}`} opacity={nested ? undefined : 0}>
      <circle
        className="mk-ring"
        cx={x}
        cy={y}
        r={r}
        fill="none"
        stroke="var(--color-sage)"
        strokeWidth={1.25}
        strokeDasharray={ring === "dashed" ? "3 4" : `${r * 1.2} ${r * 0.37}`}
        vectorEffect="non-scaling-stroke"
      />
      <circle className="mk-dot" cx={x} cy={y} r={2.6} fill="var(--color-bone)" />
      <path className="mk-line" d={d} pathLength={1} fill="none" stroke="var(--color-bone)" strokeOpacity={0.85} strokeWidth={1} vectorEffect="non-scaling-stroke" />
      <circle cx={lx} cy={ly} r={1.8} fill="var(--color-bone)" className="mk-label" />
      <g className="mk-label" style={{ filter: "drop-shadow(0 1px 2px rgb(0 0 0 / 0.65))" }}>
        <text x={tx} y={ly - 7} textAnchor={anchor} className="mk-t1">
          {label}
        </text>
        <text x={tx} y={ly + 15} textAnchor={anchor} className="mk-t2">
          {sub}
        </text>
      </g>
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
    <g className="mk-brackets" stroke="var(--color-bone)" strokeOpacity={0.7} strokeWidth={1} fill="none">
      {c.map((d) => (
        <path key={d} d={d} vectorEffect="non-scaling-stroke" />
      ))}
    </g>
  );
}

export default function ResearchMarkers() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      className="research-layer pointer-events-none absolute inset-0 z-10 hidden h-full w-full md:block motion-reduce:hidden!"
    >
      {/* SCENE 02 · hoof prints in the foreground */}
      <Marker id="trace" x={898} y={600} r={44} ring="dashed" leader={[[982, 520], [1150, 520]]} label="HOOF IMPRINTS" sub="FIELD TRACE / 02" />

      {/* SCENE 03 · the dominant aurochs. Marker anchored at the rump, line runs above the horns. */}
      <g className="mk mk-bull" opacity={0}>
        <Brackets x1={884} y1={278} x2={1286} y2={566} />
        <Marker nested id="bull-inner" x={978} y={378} r={12} leader={[[1010, 252], [1300, 252]]} label="BOS PRIMIGENIUS" sub="ECOSYSTEM ENGINEER" />
      </g>

      {/* SCENE 04 · below-ground discovery */}
      <Marker id="soil-1" x={428} y={792} r={16} leader={[[470, 838], [610, 838]]} label="ROOT NETWORK" sub="SOIL / LAYER 01" />
      <Marker id="soil-2" x={836} y={786} r={16} ring="dashed" leader={[[880, 742], [1030, 742]]} label="MYCELIAL NETWORK" sub="BIOLOGICAL ACTIVITY" />
      <Marker id="soil-3" x={1138} y={892} r={16} leader={[[1092, 852], [950, 852]]} label="SOIL FAUNA" sub="EARTHWORM" />
    </svg>
  );
}
