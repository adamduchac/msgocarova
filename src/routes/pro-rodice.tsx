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
        {/* Platby */}
        <section id="platby" className="section-y-md scroll-mt-28">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <h2 className="font-display text-[32px] font-extrabold leading-[1.15] text-ink md:text-[40px]">
                {t("Platby")}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-body">
                {t(
                  "Školné pro školní rok 2025/2026 činí 600 Kč/měsíc, v červenci a srpnu 300 Kč. Platí se nejpozději do 15. dne daného měsíce. Děti v posledním roce před nástupem do školy (i s odkladem) školné neplatí."
                )}
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)]">
                  <div className="flex items-center gap-3">
                    <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                      <Wallet className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-base font-bold text-ink">
                      {t("Školné + kurzovné plavání")}
                    </h3>
                  </div>
                  <p className="mt-4 font-display text-xl font-extrabold text-ink tabular-nums">
                    35-5744160237/0100
                  </p>
                </div>

                <div className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)]">
                  <div className="flex items-center gap-3">
                    <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                      <CreditCard className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-base font-bold text-ink">
                      {t("Stravné")}
                    </h3>
                  </div>
                  <p className="mt-4 font-display text-xl font-extrabold text-ink tabular-nums">
                    27-320530297/0100
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm text-body/80">
                {t("Variabilní symbol dítěte je pro všechny platby stejný.")}
              </p>
            </div>
          </div>
        </section>

        {/* Program dne */}
        <section
          id="program-dne"
          className="section-y-md scroll-mt-28"
          style={{ background: "linear-gradient(to bottom, #ffffff 0%, #ffffff 10%, var(--blue-soft) 55%, var(--blue-soft) 100%)" }}
        >
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <h2 className="font-display text-[32px] font-extrabold leading-[1.15] text-ink md:text-[40px]">
                {t("Program dne")}
              </h2>

              <div className="mt-8 overflow-hidden rounded-2xl border border-border/70 bg-white">
                <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 px-6 py-6 md:gap-x-10 md:px-8 md:py-8">
                  {programDne.map((row, i) => (
                    <div key={row.time} className="contents">
                      <span
                        className={`font-display font-bold text-ink tabular-nums ${i > 0 ? "border-t border-border/60 pt-3" : ""}`}
                      >
                        {row.time}
                      </span>
                      <span
                        className={`text-body ${i > 0 ? "border-t border-border/60 pt-3" : ""}`}
                      >
                        {t(row.activity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="mt-12 font-display text-[24px] font-extrabold leading-[1.15] text-ink md:text-[28px]">
                {t("Kroužky a aktivity")}
              </h3>

              <div className="mt-6 space-y-4">
                {krouzky.map(({ icon: Icon, title, text }) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)]"
                  >
                    <div className="flex items-start gap-4">
                      <span aria-hidden className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-yellow/15 text-ink">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h4 className="font-display text-lg font-bold text-ink">
                          {t(title)}
                        </h4>
                        <p className="mt-1.5 text-body">{t(text)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Výbava */}
        <section id="vybava" className="section-y-md scroll-mt-28">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <h2 className="font-display text-[32px] font-extrabold leading-[1.15] text-ink md:text-[40px]">
                {t("Co dítě potřebuje do školky")}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-body">
                {t("Pro pohodový den ve školce si s sebou dítě přinese:")}
              </p>

              <div className="mt-8 overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)]">
                <ul className="divide-y divide-black/5">
                  {vybava.map((item) => (
                    <li key={item} className="flex items-start gap-4 px-5 py-4 sm:px-6">
                      <span
                        aria-hidden
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green/15 text-brand-green"
                      >
                        <Check className="h-4 w-4" />
                      </span>
                      <span className="text-body">{t(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

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
