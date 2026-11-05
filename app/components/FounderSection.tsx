// The founder: the human sender behind the mission, told with the lines from the briefing film.
// Fictional person and facts (brand set in 2040).
// Portrait: drop public/founder.webp (or .jpg), portrait format ~4:5. Until then a brand panel fills the slot.

import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Logo from "./Logo";

const PHOTO = ["founder.webp", "founder.jpg"].find((f) =>
  fs.existsSync(path.join(process.cwd(), "public", f)),
);

const FACTS = [
  { v: "22", u: "years", k: "Making machines more efficient" },
  { v: "2036", u: "", k: "Founded THE GARDENERS" },
  {
    v: "3",
    u: "partner fields",
    k: "Conservation, veterinary medicine, research",
  },
];

function Corners() {
  return (
    <>
      <span
        aria-hidden
        className="absolute -left-[7px] -top-px z-10 h-px w-3.5 bg-forest/60"
      />
      <span
        aria-hidden
        className="absolute -left-px -top-[7px] z-10 h-3.5 w-px bg-forest/60"
      />
      <span
        aria-hidden
        className="absolute -bottom-px -right-[7px] z-10 h-px w-3.5 bg-forest/60"
      />
      <span
        aria-hidden
        className="absolute -bottom-[7px] -right-px z-10 h-3.5 w-px bg-forest/60"
      />
    </>
  );
}

export default function FounderSection() {
  return (
    <section
      id="founder"
      className="relative bg-bone px-5 py-24 text-forest md:px-14 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <p className="ui-label flex items-center gap-4 text-forest/60">
          The founder <span aria-hidden className="h-px w-10 bg-forest/30" />{" "}
          Why we exist
        </p>

        <div className="mt-10 grid gap-12 md:mt-14 md:grid-cols-[0.85fr_1.15fr] md:gap-16 lg:gap-20">
          {/* portrait slot */}
          <figure className="self-start">
            <div className="relative">
              <Corners />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-forest">
                {PHOTO ? (
                  <Image
                    src={`/${PHOTO}`}
                    alt="Dr. Ilka Morandt, founder of THE GARDENERS"
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_40%,#2b4a3b_0%,var(--color-forest)_70%)]">
                    <Logo className="h-1/3 w-1/3 text-sage/70" />
                  </div>
                )}
              </div>
            </div>
            <figcaption className="ui-label mt-4 flex justify-between text-[10px] text-forest/55">
              <span>Field portrait · 2040</span>
              <span>Founder</span>
            </figcaption>
          </figure>

          <div>
            <blockquote className="font-serif text-[clamp(2.3rem,4.4vw,4.2rem)] leading-[1.02]">
              <span aria-hidden className="mr-1 text-earth">
                “
              </span>
              I spent half my life making machines better.{" "}
              <span className="italic text-[#4f6b47]">
                Now it’s the earth’s turn.
              </span>
              <span aria-hidden className="text-earth">
                ”
              </span>
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              {/* observation node, as on the research markers */}
              <span aria-hidden className="relative h-px w-12 bg-forest/40">
                <span className="absolute -right-1 -top-[3px] h-[7px] w-[7px] rounded-full border border-forest bg-bone" />
              </span>
              <span>
                <span className="font-serif block text-2xl italic">
                  Dr. Ilka Morandt
                </span>
                <span className="ui-label mt-1 block text-[10px] text-forest/60">
                  Founder · THE GARDENERS
                </span>
              </span>
            </div>

            <div className="mt-10 space-y-5 text-lg leading-relaxed text-forest/80">
              <p>
                By 2040, machines run on a fraction of the energy they once
                consumed. They handle the routine, and people have gained time.
                Ilka uses hers to repair what the machine age broke: rivers that
                ran dry, habitats that fell apart, and the animals that kept
                them alive.
              </p>
              <p>
                She found people who carry this with her: with funding, with
                land, with knowledge. The animals live free in large protected
                landscapes, and their welfare is in the hands of partners in
                conservation, veterinary medicine and research.
              </p>
              <p className="border-l-2 border-earth/60 pl-5 text-forest">
                A park full of dinosaurs? Not a good idea. We bring back species
                a landscape is missing, exactly where they are missing.
              </p>
            </div>
          </div>
        </div>

        <dl className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-forest/15 bg-forest/15 md:mt-20 md:grid-cols-3">
          {FACTS.map((f) => (
            <div key={f.k} className="bg-bone px-7 py-7 md:px-9">
              <dt className="ui-label text-[10px] text-forest/55">{f.k}</dt>
              <dd className="mt-3 flex items-baseline gap-2">
                <span className="font-serif text-5xl leading-none">{f.v}</span>
                {f.u ? (
                  <span className="text-sm text-forest/60">{f.u}</span>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
