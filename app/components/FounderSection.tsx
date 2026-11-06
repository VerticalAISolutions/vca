// The founder: the human sender behind the mission, told with the lines from the briefing film.
// Fictional person and facts (brand set in 2040).
// Portrait: public/founder.webp (or .jpg), portrait format ~4:5. Without it a brand panel fills the slot.

import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Corners from "./Corners";
import Label from "./Label";
import Logo from "./Logo";

const PHOTO = ["founder.webp", "founder.jpg"].find((f) => fs.existsSync(path.join(process.cwd(), "public", f)));

const FACTS = [
  { v: "22", u: "years", k: "Making machines more efficient" },
  { v: "2036", u: "", k: "Founded THE GARDENERS" },
  { v: "3", u: "partner fields", k: "Conservation, veterinary medicine, research" },
];

export default function FounderSection() {
  return (
    <section id="founder" className="relative bg-bone px-5 py-24 text-forest md:px-14 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Label accent="text-earth" className="text-forest/60">The founder</Label>

        <div className="mt-10 grid gap-12 md:mt-14 md:grid-cols-[0.85fr_1.15fr] md:gap-16 lg:gap-20">
          {/* portrait as a field record */}
          <figure className="self-start">
            <div className="relative">
              <Corners tone="bg-forest/70" all />
              <div className="relative aspect-[4/5] overflow-hidden bg-forest">
                {PHOTO ? (
                  <Image src={`/${PHOTO}`} alt="Dr. Ilka Morandt, founder of THE GARDENERS" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_40%,#2b4a3b_0%,var(--color-forest)_70%)]">
                    <Logo className="h-1/3 w-1/3 text-sage/70" />
                  </div>
                )}
                {/* record overlay */}
                <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between bg-gradient-to-b from-black/45 to-transparent p-4 pb-10 text-bone">
                  <span className="ui-label flex items-center gap-2 text-[10px]">
                    <span aria-hidden className="fn-live relative h-1.5 w-1.5 rounded-full bg-signal" />
                    REC · FND-001
                  </span>
                  <span className="ui-label text-[10px] text-bone/80">Field portrait</span>
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-14 text-bone">
                  <div className="ui-label flex items-end justify-between gap-3 text-[10px] text-bone/85">
                    <span>
                      50.9480° N · 6.9615° E
                      <br />
                      <span className="text-bone/60">Cologne · base station</span>
                    </span>
                    <span className="text-right">
                      Founder
                      <br />
                      <span className="text-bone/60">since 2036</span>
                    </span>
                  </div>
                </div>
                {/* focus brackets on the face */}
                <svg aria-hidden viewBox="0 0 100 125" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
                  <g fill="none" stroke="var(--color-bone)" strokeOpacity="0.75" strokeWidth="0.35" vectorEffect="non-scaling-stroke">
                    <path d="M 36 26 H 31 V 31 M 64 26 H 69 V 31 M 36 66 H 31 V 61 M 64 66 H 69 V 61" />
                  </g>
                </svg>
              </div>
            </div>
          </figure>

          <div>
            <blockquote className="t-h2 relative">
              {/* hanging punctuation: the quote mark sits outside the text edge */}
              <span aria-hidden className="absolute -ml-[0.42em] text-earth">“</span>I spent half my life making machines better.{" "}
              <span className="inline-block italic text-[#4f6b47]">Now it’s the earth’s turn.</span>
              <span aria-hidden className="text-earth">”</span>
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <span aria-hidden className="relative h-px w-12 bg-forest/40">
                <span className="absolute -right-1 -top-[3px] h-[7px] w-[7px] rounded-full border border-forest bg-bone" />
              </span>
              <span>
                <span className="font-serif block text-2xl italic">Dr. Ilka Morandt</span>
                <span className="ui-label mt-1 block text-[10px] text-forest/60">Founder · THE GARDENERS</span>
              </span>
            </div>

            <div className="t-body mt-10 max-w-[60ch] space-y-5 text-forest/72">
              <p>
                By 2040, machines run on a fraction of the energy they once consumed. They handle the routine, and people have gained time. Ilka uses
                hers to repair what the machine age broke: rivers that ran dry, habitats that fell apart, and the animals that kept them alive.
              </p>
              <p>
                She found people who carry this with her: with funding, with land, with knowledge. The animals live free in large protected
                landscapes, and their welfare is in the hands of partners in conservation, veterinary medicine and research.
              </p>
              <p className="border-l-2 border-earth/60 pl-5 text-forest">
                A park full of dinosaurs? Not a good idea. We bring back species a landscape is missing, exactly where they are missing.
              </p>
            </div>
          </div>
        </div>

        <dl className="relative mt-16 grid border border-forest/15 md:mt-20 md:grid-cols-3">
          <Corners tone="bg-forest/60" all />
          {FACTS.map((f, i) => (
            <div key={f.k} className={`px-6 py-7 md:px-9 ${i ? "border-t border-forest/15 md:border-l md:border-t-0" : ""}`}>
              <dt className="ui-label text-[10px] text-forest/55">{f.k}</dt>
              <dd className="mt-3 flex items-baseline gap-2">
                <span className="font-serif text-5xl leading-none md:text-6xl">{f.v}</span>
                {f.u ? <span className="text-sm text-forest/60">{f.u}</span> : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
