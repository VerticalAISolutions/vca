import type { Metadata, Viewport } from "next";

const PRIMAER = "#2f6b4f";
// TODO: nach dem ersten Deploy die echte Domain eintragen
const DOMAIN = "https://DEINE-DOMAIN";

const daten = {
  name: "Mockname",
  logo: "/logo-karte.svg",
  keyVisual: "/key-visual.webp",
  primaerfarbe: PRIMAER,
  website: "/",
};

export const viewport: Viewport = { themeColor: PRIMAER };

export const metadata: Metadata = {
  title: `${daten.name} – Abgabe`,
  openGraph: { images: [`${DOMAIN}/key-visual.webp`] },
};

export default function VcaPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 bg-white p-8 text-neutral-900">
      <script
        type="application/json"
        id="vca-abgabe"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(daten) }}
      />
      <h1 className="text-4xl font-semibold">{daten.name}</h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={daten.keyVisual} alt="Key Visual" className="aspect-[3/2] w-full rounded-lg object-cover" />
      <div className="flex items-center gap-6">
        <div className="flex h-32 w-32 items-center justify-center rounded-lg" style={{ background: PRIMAER }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={daten.logo} alt={`${daten.name} Logo`} className="h-24 w-24" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-16 w-16 rounded border border-neutral-300" style={{ background: PRIMAER }} />
          <code>{PRIMAER}</code>
        </div>
      </div>
      <a href="/" className="underline">Zur Startseite</a>
    </main>
  );
}
