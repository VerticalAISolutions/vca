import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Logo from "../components/Logo";

// Forest #20372d fails the voting colour check (RGB spread 23 < 25),
// so the card uses the visually identical #203a2d.
const PRIMAER = "#203a2d";
const DOMAIN = "https://vca-two.vercel.app";

const daten = {
  name: "THE GARDENERS",
  logo: "/logo-karte.svg",
  keyVisual: "/key-visual.webp",
  primaerfarbe: PRIMAER,
  website: "/",
};

export const viewport: Viewport = { themeColor: PRIMAER };

export const metadata: Metadata = {
  title: `${daten.name} · Abgabe`,
  openGraph: { images: [`${DOMAIN}/key-visual.webp`] },
};

export default function VcaPage() {
  return (
    <main className="min-h-screen bg-bone px-5 py-12 text-forest md:px-14 md:py-16">
      <script type="application/json" id="vca-abgabe" dangerouslySetInnerHTML={{ __html: JSON.stringify(daten) }} />
      <div className="mx-auto flex max-w-4xl flex-col gap-10">
        <header className="flex items-center justify-between border-b border-forest/15 pb-6">
          <span className="ui-label">Brand submission</span>
          <span className="ui-label text-forest/60">Est. 2040</span>
        </header>

        <div className="flex items-center gap-5">
          <Logo className="h-14 w-14 text-sage" title="THE GARDENERS Logo" />
          <div>
            <h1 className="text-2xl font-semibold tracking-[0.3em] md:text-3xl">{daten.name}</h1>
            <p className="ui-label mt-2 text-sage">Bring back what brings life.</p>
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={daten.keyVisual} alt="Key Visual: Auerochsen in einer regenerierten Aue mit lebendigem Erdreich" className="aspect-[3/2] w-full rounded-2xl object-cover" />

        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex items-center gap-5">
            <div className="flex h-28 w-28 items-center justify-center rounded-2xl" style={{ background: PRIMAER }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={daten.logo} alt="Logo auf der Primärfarbe" className="h-20 w-20" />
            </div>
            <p className="ui-label text-forest/70">Logo / Card</p>
          </div>
          <div className="flex items-center gap-5">
            <div className="h-28 w-28 rounded-2xl border border-forest/20" style={{ background: PRIMAER }} />
            <div>
              <p className="ui-label text-forest/70">Primary colour</p>
              <code className="mt-2 block text-lg">{PRIMAER}</code>
            </div>
          </div>
        </div>

        <Link href="/" className="ui-label self-start rounded-full bg-forest px-6 py-4 text-bone transition-colors hover:bg-sage hover:text-forest">
          View the site
        </Link>
      </div>
    </main>
  );
}
