// The founder: the human sender behind the mission, told with the lines from the briefing film.
// Fictional person and facts (brand set in 2040).

const FACTS = [
  { v: "22", u: "years", k: "Making machines more efficient" },
  { v: "2036", u: "", k: "Founded THE GARDENERS" },
  { v: "3", u: "partner fields", k: "Conservation, veterinary medicine, research" },
];

export default function FounderSection() {
  return (
    <section id="founder" className="relative bg-forest px-5 pt-28 text-bone md:px-14 md:pt-40">
      <div className="mx-auto max-w-6xl border-t border-bone/15 pt-16 md:pt-20">
        <p className="ui-label flex items-center gap-4 text-sage">
          The founder <span aria-hidden className="h-px w-10 bg-sage/50" /> Why we exist
        </p>

        <div className="mt-10 grid gap-14 md:grid-cols-[1.35fr_1fr] md:gap-20">
          <figure>
            <blockquote className="font-serif text-[clamp(2.4rem,5vw,4.6rem)] leading-[1.02]">
              <span aria-hidden className="mr-1 text-sage">“</span>I spent half my life making machines better.{" "}
              <span className="italic text-sage">Now it’s the earth’s turn.</span>
              <span aria-hidden className="text-sage">”</span>
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-4">
              {/* observation node, as on the research markers */}
              <span aria-hidden className="relative h-px w-12 bg-bone/40">
                <span className="absolute -right-1 -top-[3px] h-[7px] w-[7px] rounded-full border border-sage bg-forest" />
              </span>
              <span>
                <span className="font-serif block text-2xl italic">Dr. Ilka Morandt</span>
                <span className="ui-label mt-1 block text-[10px] text-bone/55">Founder · THE GARDENERS</span>
              </span>
            </figcaption>
          </figure>

          <div className="space-y-6 text-lg leading-relaxed text-bone/80 md:pt-3">
            <p>
              By 2040, machines run on a fraction of the energy they once consumed. They handle the routine, and people have gained time. Ilka uses
              hers to repair what the machine age broke: rivers that ran dry, habitats that fell apart, and the animals that kept them alive.
            </p>
            <p>
              She found people who carry this with her: with funding, with land, with knowledge. The animals live free in large protected
              landscapes, and their welfare is in the hands of partners in conservation, veterinary medicine and research.
            </p>
            <p className="border-l border-sage/50 pl-5 text-bone">
              A park full of dinosaurs? Not a good idea. We bring back species a landscape is missing, exactly where they are missing.
            </p>
          </div>
        </div>

        <dl className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-bone/15 bg-bone/15 md:mt-20 md:grid-cols-3">
          {FACTS.map((f) => (
            <div key={f.k} className="bg-forest px-7 py-7 md:px-9">
              <dt className="ui-label text-[10px] text-bone/50">{f.k}</dt>
              <dd className="mt-3 flex items-baseline gap-2">
                <span className="font-serif text-5xl leading-none">{f.v}</span>
                {f.u ? <span className="text-sm text-bone/60">{f.u}</span> : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
