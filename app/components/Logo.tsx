import { useId } from "react";

// THE GARDENERS symbol, traced from the brand board. Cutouts are real (mask),
// so the mark works on any background. Static files live in /public/brand.
const VB = "40 30 1010 975";
const LOBES = [
  "M 478 46 C 300 70 70 300 52 560 C 40 760 160 905 300 905 C 390 905 455 860 485 790 L 520 700 L 528 525 C 470 460 440 400 452 320 C 462 240 505 160 505 80 C 505 58 495 46 478 46 Z",
  "M 612 46 C 790 70 1020 300 1038 560 C 1050 760 930 905 790 905 C 700 905 635 860 605 790 L 570 700 L 562 525 C 620 460 650 400 638 320 C 628 240 585 160 585 80 C 585 58 595 46 612 46 Z",
];
const SLITS = [
  "M 340 84 C 205 190 125 400 216 580 C 175 410 230 215 340 84 Z",
  "M 750 84 C 885 190 965 400 874 580 C 915 410 860 215 750 84 Z",
];
const BRANCHES = [
  "M 337 368 C 340 470 420 520 478 568 C 515 600 530 640 545 705 C 560 640 575 600 612 568 C 670 520 750 470 753 368",
  "M 250 638 C 390 630 492 680 500 790 L 503 835",
  "M 840 638 C 700 630 598 680 590 790 L 587 835",
];
const NODES = [
  [337, 368],
  [753, 368],
  [250, 638],
  [840, 638],
];

export default function Logo({ className, title }: { className?: string; title?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox={VB} className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title ? <title>{title}</title> : null}
      <mask id={`m${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="1100" height="1050">
        <rect x="0" y="0" width="1100" height="1050" fill="#fff" />
        {SLITS.map((d) => (
          <path key={d} d={d} fill="#000" />
        ))}
        {BRANCHES.map((d) => (
          <path key={d} d={d} fill="none" stroke="#000" strokeWidth={30} strokeLinecap="round" strokeLinejoin="miter" strokeMiterlimit={2.6} />
        ))}
        {NODES.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={37} fill="#000" />
        ))}
      </mask>
      <g fill="currentColor" mask={`url(#m${id})`}>
        {LOBES.map((d) => (
          <path key={d} d={d} />
        ))}
        <rect x="531" y="320" width="28" height="240" />
        <rect x="521" y="540" width="48" height="420" />
        <circle cx="545" cy="315" r="37" />
        <rect x="190" y="948" width="718" height="47" />
      </g>
    </svg>
  );
}
