// THE GARDENERS symbol: two leaf lobes above the ground line, a root network below.
// Same geometry as /public/brand/the-gardeners-mark.svg, with slightly heavier
// roots and ground line so the mark holds up at icon sizes (28–56 px).

const CX = 577.5;
const m = (x: number) => 2 * CX - x;

const LOBE =
  "M 541 123 C 548 123 552 128 552 138 L 552 318 C 552 360 522 389 482 389 C 440 389 411 358 411 315 C 411 245 455 172 520 130 C 527 125 534 123 541 123 Z";
const LOBE_R = `M ${m(541)} 123 C ${m(548)} 123 ${m(552)} 128 ${m(552)} 138 L ${m(552)} 318 C ${m(552)} 360 ${m(522)} 389 ${m(482)} 389 C ${m(440)} 389 ${m(411)} 358 ${m(411)} 315 C ${m(411)} 245 ${m(455)} 172 ${m(520)} 130 C ${m(527)} 125 ${m(534)} 123 ${m(541)} 123 Z`;

const ROOTS = [
  "M 577.5 440 L 577.5 615",
  "M 577.5 440 C 575 500 545 525 505 548 C 482 561 465 576 458 586",
  `M 577.5 440 C ${m(575)} 500 ${m(545)} 525 ${m(505)} 548 C ${m(482)} 561 ${m(465)} 576 ${m(458)} 586`,
  "M 505 436 C 495 470 460 485 420 497 L 392 507",
  `M ${m(505)} 436 C ${m(495)} 470 ${m(460)} 485 ${m(420)} 497 L ${m(392)} 507`,
];
const NODES: [number, number][] = [
  [446, 600],
  [372.5, 514],
  [m(446), 600],
  [m(372.5), 514],
  [CX, 635],
];

export default function Logo({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="265 103 625 572" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title ? <title>{title}</title> : null}
      <g fill="currentColor">
        <path d={LOBE} />
        <path d={LOBE_R} />
        <rect x="282" y="414" width="591" height="26" rx="13" />
      </g>
      <g fill="none" stroke="currentColor" strokeWidth={15} strokeLinecap="round" strokeLinejoin="round">
        {ROOTS.map((d) => (
          <path key={d} d={d} />
        ))}
        {NODES.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={18} />
        ))}
      </g>
    </svg>
  );
}
