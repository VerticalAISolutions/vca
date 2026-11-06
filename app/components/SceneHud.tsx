// Viewport-anchored interface: Restoration Signal (bottom left) and
// Chapter Indicator (bottom right). Driven by the LandscapeScroll timeline.

// Signal nodes along one organic line. The line gets more connected per scene.
const NODES: [number, number][] = [
  [6, 40],
  [58, 28],
  [110, 37],
  [162, 19],
  [214, 25],
];
const LINE = "M 6 40 C 24 40 40 28 58 28 S 92 37 110 37 S 144 19 162 19 S 198 25 214 25";
const ECHO = "M 6 48 C 24 48 40 37 58 37 S 92 45 110 45 S 144 28 162 28 S 198 33 214 33";

export function RestorationSignal() {
  return (
    <div className="hud-signal pointer-events-none absolute bottom-8 left-14 z-20 hidden select-none md:block motion-reduce:hidden!">
      <p className="sig-note mb-3 max-w-[230px] text-[12px] leading-snug text-bone opacity-0 [text-shadow:0_1px_3px_rgb(0_0_0/0.9),0_0_14px_rgb(0_0_0/0.7)]">
        <span className="ui-label block text-[10px] text-sage">08 / Restoration</span>
        Connected processes support ecosystem recovery.
      </p>
      <p className="ui-label text-bone">RESTORATION</p>
      <svg viewBox="0 0 220 56" className="mt-2 h-14 w-[220px] overflow-visible" aria-hidden>
        {/* the potential: faint dashed course of the full line */}
        <path d={LINE} fill="none" stroke="var(--color-bone)" strokeOpacity={0.28} strokeWidth={1} strokeDasharray="2 4" />
        {/* scene 4: a second contour joins, the system becomes connected */}
        <path className="sig-echo" d={ECHO} pathLength={1} fill="none" stroke="var(--color-sage)" strokeOpacity={0.6} strokeWidth={1} strokeDasharray="1 1" strokeDashoffset={1} />
        <path className="sig-line" d={LINE} pathLength={1} fill="none" stroke="var(--color-sage)" strokeWidth={1.5} strokeDasharray="1 1" strokeDashoffset={0.94} />
        {NODES.map(([x, y], i) => (
          <g key={x} className={`sig-node sig-node-${i}`} opacity={i === 0 ? 1 : 0}>
            <circle cx={x} cy={y} r={5} fill="none" stroke="var(--color-sage)" strokeWidth={1} strokeOpacity={0.6} />
            <circle cx={x} cy={y} r={2.2} fill="var(--color-bone)" />
          </g>
        ))}
      </svg>
      <p className="ui-label mt-1 text-[11px] text-[#dfe6d4]">LONG-TERM ECOSYSTEM RECOVERY</p>
    </div>
  );
}

export function ChapterIndicator() {
  return (
    <div className="hud-chapter pointer-events-none absolute bottom-[calc(100lvh-100svh+1.5rem)] right-5 z-20 select-none text-right md:bottom-8 md:right-14 motion-reduce:hidden">
      <p className="ui-label hidden text-bone/90 md:block">FIELD SEQUENCE</p>
      <p className="ui-label mt-1 text-[13px] text-bone tabular-nums">
        <span className="hud-chapter-num">01</span>
        <span className="text-bone/70"> / 04</span>
        <span className="ml-3 hidden text-[#dfe6d4] md:inline">2040</span>
      </p>
      <div className="mt-3 ml-auto flex w-[120px] gap-1.5 md:w-[168px]">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="hud-seg relative h-[2px] flex-1 overflow-hidden bg-bone/35">
            <span className="hud-seg-fill absolute inset-0 origin-left scale-x-0 bg-sage" />
          </span>
        ))}
      </div>
    </div>
  );
}
