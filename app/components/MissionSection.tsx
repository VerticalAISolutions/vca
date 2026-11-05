// Brand mission, continued: what the organization does beyond the returning animals.
// Follows the "Bring back what brings life." frame at the end of the scroll sequence.

const STEPS = [
  { title: "Research", copy: "Understand species and their ecological roles." },
  { title: "Return", copy: "Reintroduce species into suitable protected landscapes." },
  { title: "Restore", copy: "Support habitat recovery and functioning natural processes." },
];

export default function MissionSection() {
  return (
    <section id="approach" className="relative bg-forest px-5 pt-28 text-bone md:px-14 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <p className="ui-label flex items-center gap-4 text-sage">
          The Gardeners <span aria-hidden className="h-px w-10 bg-sage/50" /> Our approach
        </p>

        <div className="mt-8 grid gap-10 md:grid-cols-[1.5fr_1fr] md:items-end md:gap-16">
          <h2 className="font-serif text-[clamp(2.3rem,4.6vw,4.25rem)] leading-[1.02]">
            Their return sets natural processes in motion.{" "}
            <span className="italic text-sage">Our commitment makes long-term restoration possible.</span>
          </h2>
          <p className="max-w-md border-l border-bone/20 pl-6 text-lg leading-relaxed text-bone/80">
            Aurochs are one example. Our mission extends to extinct species whose return can help restore lost ecological functions.
          </p>
        </div>

        <ol className="mt-20 grid border-t border-bone/20 md:mt-28 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="group relative border-b border-bone/15 py-8 pr-6 md:border-b-0 md:border-r md:py-10 md:pl-6 md:first:pl-0 md:last:border-r-0">
              {/* observation node on the rule */}
              <span aria-hidden className="absolute -top-[4px] left-0 h-[7px] w-[7px] rounded-full border border-sage bg-forest md:left-6 md:group-first:left-0" />
              <p className="ui-label text-[10px] text-bone/50">Phase / 0{i + 1}</p>
              <p className="mt-6 text-[15px] font-semibold uppercase tracking-[0.3em]">{s.title}</p>
              <p className="mt-3 max-w-[26ch] leading-relaxed text-bone/70">{s.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
