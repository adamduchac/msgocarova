import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download, Wallet, CreditCard, Check, Puzzle, Brain, Dices } from "lucide-react";
import { fixPrepositions } from "@/lib/typography";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";

import zadostPrijeti from "@/assets/dokumenty/zadost-o-prijeti.pdf.asset.json";
import zadostPrazdniny from "@/assets/dokumenty/zadost-prazdninovy-provoz.pdf.asset.json";
import zadostUvolneni from "@/assets/dokumenty/zadost-o-uvolneni.pdf.asset.json";
import pravidlaPrazdniny from "@/assets/dokumenty/pravidla-prazdninovy-provoz-2026.pdf.asset.json";
import skolniRad from "@/assets/dokumenty/skolni-rad.pdf.asset.json";
import radVydejny from "@/assets/dokumenty/vnitrni-rad-vydejny.pdf.asset.json";
import svp from "@/assets/dokumenty/svp-skladame-svet-z-kosticek.pdf.asset.json";

export const Route = createFileRoute("/pro-rodice")({
  head: () => ({
    meta: [
      { title: "Pro rodiče — Mateřská škola Josefa Gočára" },
      {
        name: "description",
        content:
          "Praktické informace pro rodiče — platby, program dne, výbava do školky a dokumenty ke stažení.",
      },
      { property: "og:title", content: "Pro rodiče — Mateřská škola Josefa Gočára" },
      {
        property: "og:description",
        content: "Vše potřebné pro pohodový nástup i každodenní chod v naší školce.",
      },
      { property: "og:url", content: "/pro-rodice" },
    ],
    links: [{ rel: "canonical", href: "/pro-rodice" }],
  }),
  component: ProRodicePage,
});

const t = fixPrepositions;

const programDne: { time: string; activity: string }[] = [
  { time: "6:15 – 7:15", activity: "Scházení dětí ve Žluté kostičce" },
  { time: "7:15 – 9:30", activity: "Spontánní hry, individuální a skupinové aktivity, pohyb, řízená činnost" },
  { time: "8:30 – 8:55", activity: "Hygiena, svačina" },
  { time: "9:30 – 9:40", activity: "Příprava na pobyt venku" },
  { time: "9:40 – 11:40", activity: "Pobyt venku" },
  { time: "11:40 – 12:30", activity: "Oběd, hygiena" },
  { time: "12:30 – 14:00", activity: "Spánek a odpočinek respektující odlišné potřeby dětí, klidové aktivity" },
  { time: "14:00 – 16:45", activity: "Hygiena, odpolední svačina, hry, činnosti, za příznivého počasí zahrada, rozcházení" },
];

const krouzky: { icon: typeof Puzzle; title: string; text: string }[] = [
  {
    icon: Puzzle,
    title: "Šachy",
    text: "Šachový klub Lipky HK, každou středu 15:15 (30 min), říjen–červen, hradí rodiče.",
  },
  {
    icon: Brain,
    title: "Bystrohlavička",
    text: "Rozvoj pozornosti, paměti a logického myšlení; říjen–květen v lichém týdnu, Červená (po) a Zelená (út) od 13:15.",
  },
  {
    icon: Dices,
    title: "Stolní hry",
    text: "Pravidla deskových her (Pexeso, Dáma, Domino…), Červená a Zelená od 13:15 dle zájmu.",
  },
];

const vybava: string[] = [
  "pohodlné oblečení do třídy",
  "vhodnou obuv do třídy (bačkory, ne pantofle)",
  "pyžamo (netýká se předškoláků)",
  "oblečení na ven",
  "náhradní oblečení do sáčku v šatně (ponožky, spodní prádlo, tričko)",
  "pláštěnku",
  "papírové kapesníky",
  "kartáček na zuby (pouze Červená a Zelená kostička)",
];

type DocAsset = { url: string; size: number; original_filename: string };

const formulare: { title: string; asset: DocAsset }[] = [
  { title: "Žádost o přijetí k předškolnímu vzdělávání", asset: zadostPrijeti },
  { title: "Žádost o přijetí — prázdninový provoz", asset: zadostPrazdniny },
  { title: "Žádost o uvolnění dítěte z povinného předškolního vzdělávání", asset: zadostUvolneni },
  { title: "Pravidla přijímání dětí — prázdninový provoz 2026", asset: pravidlaPrazdniny },
];

const zakladni: { title: string; asset: DocAsset }[] = [
  { title: "Školní řád mateřské školy", asset: skolniRad },
  { title: "Vnitřní řád školní výdejny", asset: radVydejny },
  { title: "Školní vzdělávací program — Skládáme svět z kostiček", asset: svp },
];

function formatSize(bytes: number) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} kB`;
}

function DocList({ items }: { items: { title: string; asset: DocAsset }[] }) {
  return (
    <ul className="divide-y divide-black/5">
      {items.map((doc) => (
        <li key={doc.asset.url}>
          <a
            href={doc.asset.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-black/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 sm:px-6"
          >
            <span
              aria-hidden
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue"
            >
              <FileText className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-ink">
                {fixPrepositions(doc.title)}
              </span>
              <span className="mt-0.5 block text-xs uppercase tracking-wide text-body/70">
                PDF · {formatSize(doc.asset.size)}
              </span>
            </span>
            <Download
              aria-hidden
              className="h-5 w-5 shrink-0 text-body transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-brand-blue"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

function ProRodicePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />

      <div
        style={{ background: "linear-gradient(to bottom, #FEF8E7 0%, #FFFFFF 100%)" }}
        className="pt-28 sm:pt-32"
      >
        <section className="section-y">
          <div className="container mx-auto px-6">
            <h1 className="font-display text-[42px] font-extrabold leading-[1.05] text-ink md:text-[56px]">
              {fixPrepositions("Pro rodiče")}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-body">
              {fixPrepositions(
                "Praktické informace pro každodenní chod i pohodový nástup do školky."
              )}
            </p>
          </div>
        </section>
      </div>

      <main>
        {placeholderSections.map((s) => (
          <section key={s.id} id={s.id} className="section-y-sm scroll-mt-28">
            <div className="container mx-auto px-6">
              <h2 className="font-display text-[28px] font-extrabold text-ink md:text-[32px]">
                {s.title}
              </h2>
              <p className="mt-4 max-w-2xl text-body">
                {fixPrepositions("Obsah této sekce brzy doplníme.")}
              </p>
            </div>
          </section>
        ))}

        <div
          style={{
            background:
              "linear-gradient(to bottom, #FFFFFF 0%, #FEF8E7 40%, #FEF8E7 100%)",
          }}
        >
          <section id="dokumenty" className="section-y-md scroll-mt-28">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl">
                <h2 className="font-display text-[28px] font-extrabold text-ink md:text-[32px]">
                  {fixPrepositions("Dokumenty ke stažení")}
                </h2>
                <p className="mt-4 max-w-2xl text-body">
                  {fixPrepositions(
                    "Formuláře, žádosti a základní dokumenty naší mateřské školy ke stažení ve formátu PDF."
                  )}
                </p>

                <div className="mt-10 space-y-8">
                  <div>
                    <h3 className="mb-3 font-display text-lg font-bold text-ink">
                      {fixPrepositions("Formuláře a žádosti")}
                    </h3>
                    <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)]">
                      <DocList items={formulare} />
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 font-display text-lg font-bold text-ink">
                      {fixPrepositions("Základní dokumenty")}
                    </h3>
                    <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)]">
                      <DocList items={zakladni} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <SiteFooter topCubeColor="blue" topCubePosition="left" />
        </div>
      </main>
    </div>
  );
}
