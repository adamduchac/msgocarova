import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { FileText, Download, Wallet, CreditCard, Check, Info } from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { fetchDocuments, type DocumentWithUrl } from "@/lib/cms";
import { useCopyPage, siteCopyQueryOptions } from "@/lib/use-copy";

import zadostPrijeti from "@/assets/dokumenty/zadost-o-prijeti.pdf.asset.json";
import zadostPrazdniny from "@/assets/dokumenty/zadost-prazdninovy-provoz.pdf.asset.json";
import zadostUvolneni from "@/assets/dokumenty/zadost-o-uvolneni.pdf.asset.json";
import pravidlaPrazdniny from "@/assets/dokumenty/pravidla-prazdninovy-provoz-2026.pdf.asset.json";
import skolniRad from "@/assets/dokumenty/skolni-rad.pdf.asset.json";
import radVydejny from "@/assets/dokumenty/vnitrni-rad-vydejny.pdf.asset.json";
import svp from "@/assets/dokumenty/svp-skladame-svet-z-kosticek.pdf.asset.json";

import sachyImg from "@/assets/krouzky/sachy.webp.asset.json";
import pametImg from "@/assets/krouzky/pamet.webp.asset.json";
import pexesoImg from "@/assets/krouzky/pexeso.webp.asset.json";

export const Route = createFileRoute("/pro-rodice")({
  head: () => ({
    meta: [
      { title: "Pro rodiče – Mateřská škola Josefa Gočára" },
      {
        name: "description",
        content:
          "Praktické informace pro rodiče – platby, program dne, výbava do školky a dokumenty ke stažení.",
      },
      { property: "og:title", content: "Pro rodiče – Mateřská škola Josefa Gočára" },
      {
        property: "og:description",
        content: "Vše potřebné pro pohodový nástup i každodenní chod v naší školce.",
      },
      { property: "og:url", content: "/pro-rodice" },
    ],
    links: [{ rel: "canonical", href: "/pro-rodice" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(siteCopyQueryOptions("pro-rodice")),
  component: ProRodicePage,
});

type DocAsset = { url: string; size: number; original_filename: string };

type DocCardProps = { title: string; asset: DocAsset };

const formulare: DocCardProps[] = [
  { title: "Žádost o přijetí k předškolnímu vzdělávání", asset: zadostPrijeti },
  { title: "Žádost o přijetí – prázdninový provoz", asset: zadostPrazdniny },
  { title: "Žádost o uvolnění dítěte z povinného předškolního vzdělávání", asset: zadostUvolneni },
  { title: "Pravidla přijímání dětí – prázdninový provoz 2026", asset: pravidlaPrazdniny },
];

const zakladni: DocCardProps[] = [
  { title: "Školní řád mateřské školy", asset: skolniRad },
  { title: "Vnitřní řád školní výdejny", asset: radVydejny },
  { title: "Školní vzdělávací program", asset: svp },
];

function formatSize(bytes: number) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} kB`;
}

function DocCard({ doc }: { doc: DocCardProps }) {
  return (
    <a
      href={doc.asset.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)] transition-transform duration-200 hover:-translate-y-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 sm:p-6"
    >
      <span
        aria-hidden
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue"
      >
        <FileText className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-ink">{doc.title}</span>
        <span className="mt-0.5 block text-xs uppercase tracking-wide text-body/70">
          PDF · {formatSize(doc.asset.size)}
        </span>
      </span>
      <Download
        aria-hidden
        className="h-5 w-5 shrink-0 text-body transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-brand-blue"
      />
    </a>
  );
}

function ScheduleCard({ rows, c }: { rows: { time: string; activity: string }[]; c: (key: string, fallback: string) => string }) {
  const half = Math.ceil(rows.length / 2);
  const columns = [rows.slice(0, half), rows.slice(half)];
  return (
    <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)]">
      <div className="grid md:grid-cols-2 md:divide-x md:divide-black/5">
        {columns.map((col, ci) => (
          <ul key={ci} className="divide-y divide-black/5">
            {col.map((row) => (
              <li key={row.time} className="flex items-start gap-4 px-6 py-4">
                <span className="w-28 shrink-0 font-display font-bold text-ink tabular-nums">
                  {row.time}
                </span>
                <span className="text-[15px] leading-relaxed text-body">
                  {row.activity}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

function CmsDocCard({ doc }: { doc: DocumentWithUrl }) {
  if (!doc.url) return null;
  return (
    <a
      href={doc.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)] transition-transform duration-200 hover:-translate-y-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 sm:p-6"
    >
      <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
        <FileText className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-ink">{doc.title}</span>
        <span className="mt-0.5 block text-xs uppercase tracking-wide text-body/70">PDF</span>
      </span>
      <Download aria-hidden className="h-5 w-5 shrink-0 text-body transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-brand-blue" />
    </a>
  );
}

function CmsDocumentsGrid({ c }: { c: (key: string, fallback: string) => string }) {
  const { data: cmsDocs } = useQuery({
    queryKey: ["documents", "active"],
    queryFn: () => fetchDocuments(true),
    staleTime: 60_000,
  });
  const cmsFormulare = (cmsDocs ?? []).filter((d) => d.category === "formulare");
  const cmsZakladni = (cmsDocs ?? []).filter((d) => d.category === "dokumenty");
  return (
    <div className="mt-10 grid gap-8 md:grid-cols-2">
      <div>
        <h3 className="mb-4 font-display text-lg font-bold text-ink">{c("documents.formsTitle", "Formuláře a žádosti")}</h3>
        <div className="grid gap-4">
          {formulare.map((doc) => (<DocCard key={doc.asset.url} doc={doc} />))}
          {cmsFormulare.map((doc) => (<CmsDocCard key={doc.id} doc={doc} />))}
        </div>
      </div>
      <div>
        <h3 className="mb-4 font-display text-lg font-bold text-ink">{c("documents.basicTitle", "Základní dokumenty")}</h3>
        <div className="grid gap-4">
          {zakladni.map((doc) => (<DocCard key={doc.asset.url} doc={doc} />))}
          {cmsZakladni.map((doc) => (<CmsDocCard key={doc.id} doc={doc} />))}
        </div>
      </div>
    </div>
  );
}

function ProRodicePage() {
  const c = useCopyPage("pro-rodice");

  const programDne: { time: string; activity: string }[] = [
    { time: c("schedule.row1.time", "6:15 – 7:15"), activity: c("schedule.row1.activity", "Scházení dětí ve Žluté kostičce") },
    { time: c("schedule.row2.time", "7:15 – 9:30"), activity: c("schedule.row2.activity", "Spontánní hry, individuální a skupinové aktivity, pohyb, řízená činnost") },
    { time: c("schedule.row3.time", "8:30 – 8:55"), activity: c("schedule.row3.activity", "Hygiena, svačina") },
    { time: c("schedule.row4.time", "9:30 – 9:40"), activity: c("schedule.row4.activity", "Příprava na pobyt venku") },
    { time: c("schedule.row5.time", "9:40 – 11:40"), activity: c("schedule.row5.activity", "Pobyt venku") },
    { time: c("schedule.row6.time", "11:40 – 12:30"), activity: c("schedule.row6.activity", "Oběd, hygiena") },
    { time: c("schedule.row7.time", "12:30 – 14:00"), activity: c("schedule.row7.activity", "Spánek a odpočinek respektující odlišné potřeby dětí, klidové aktivity") },
    { time: c("schedule.row8.time", "14:00 – 16:45"), activity: c("schedule.row8.activity", "Hygiena, odpolední svačina, hry, činnosti, za příznivého počasí zahrada, rozcházení") },
  ];

  const krouzky: { image: string; alt: string; title: string; text: string }[] = [
    {
      image: sachyImg.url,
      alt: "Ilustrace šachové figurky",
      title: c("clubs.card1.title", "Šachy"),
      text: c("clubs.card1.text", "Šachový klub Lipky HK, každou středu 15:15 (30 min), říjen–červen, hradí rodiče."),
    },
    {
      image: pametImg.url,
      alt: "Ilustrace hry piškvorky",
      title: c("clubs.card2.title", "Bystrohlavička"),
      text: c("clubs.card2.text", "Rozvoj pozornosti, paměti a logického myšlení; říjen–květen v lichém týdnu, Červená (po) a Zelená (út) od 13:15."),
    },
    {
      image: pexesoImg.url,
      alt: "Ilustrace pexesa",
      title: c("clubs.card3.title", "Stolní hry"),
      text: c("clubs.card3.text", "Pravidla deskových her (Pexeso, Dáma, Domino…), Červená a Zelená od 13:15 dle zájmu."),
    },
  ];

  const vybava: string[] = [
    c("equipment.item1", "pohodlné oblečení do třídy"),
    c("equipment.item2", "vhodnou obuv do třídy (bačkory, ne pantofle)"),
    c("equipment.item3", "pyžamo (netýká se předškoláků)"),
    c("equipment.item4", "oblečení na ven"),
    c("equipment.item5", "náhradní oblečení do sáčku v šatně (ponožky, spodní prádlo, tričko)"),
    c("equipment.item6", "pláštěnku"),
    c("equipment.item7", "papírové kapesníky"),
    c("equipment.item8", "kartáček na zuby (pouze Červená a Zelená kostička)"),
  ];

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
              {c("h1", "Pro rodiče")}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-body">
              {c("lead", "Platby, denní program, co s sebou i kroužky – praktické informace, které budete během roku potřebovat nejčastěji. Dokumenty a formuláře najdete dole ke stažení.")}
            </p>
          </div>
        </section>
      </div>

      <main>
        {/* Platby */}
        <section id="platby" className="section-y-md scroll-mt-28">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h2 className="font-display text-[32px] font-extrabold leading-[1.15] text-ink md:text-[40px]">
                {c("payments.h2", "Platby")}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-body">
                {c("payments.body", "Školné pro školní rok 2025/2026 činí 600 Kč/měsíc, v červenci a srpnu 300 Kč. Platí se nejpozději do 15. dne daného měsíce. Děti v posledním roce před nástupem do školy (i s odkladem) školné neplatí.")}
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                    <Wallet className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-base font-bold text-ink">
                    {c("payments.card1.title", "Školné + kurzovné plavání")}
                  </h3>
                </div>
                <p className="mt-4 font-display text-xl font-extrabold text-ink tabular-nums md:text-2xl">
                  35-5744160237/0100
                </p>
              </div>

              <div className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                    <CreditCard className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-base font-bold text-ink">
                    {c("payments.card2.title", "Stravné")}
                  </h3>
                </div>
                <p className="mt-4 font-display text-xl font-extrabold text-ink tabular-nums md:text-2xl">
                  27-320530297/0100
                </p>
              </div>

              <div className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-yellow/20 text-ink">
                    <Info className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-base font-bold text-ink">
                    {c("payments.card3.title", "Variabilní symbol")}
                  </h3>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-body">
                  {c("payments.card3.body", "Variabilní symbol dítěte je pro všechny platby stejný.")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Program dne */}
        <section id="program-dne" className="section-y-md scroll-mt-28">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h2 className="font-display text-[32px] font-extrabold leading-[1.15] text-ink md:text-[40px]">
                {c("schedule.h2", "Program dne")}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-body">
                {c("schedule.body", "Den v naší školce má jasný rytmus, ale ponechává dětem prostor pro spontánní hru i klid.")}
              </p>
            </div>

            <div className="mt-10">
              <ScheduleCard rows={programDne} c={c} />
            </div>
          </div>
        </section>

        {/* Kroužky a aktivity */}
        <section id="krouzky" className="section-y-md scroll-mt-28">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h2 className="font-display text-[32px] font-extrabold leading-[1.15] text-ink md:text-[40px]">
                {c("clubs.h2", "Kroužky a aktivity")}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-body">
                {c("clubs.body", "Nabízíme dětem pravidelné aktivity, které rozvíjejí myšlení, soustředění i radost ze hry.")}
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {krouzky.map(({ image, alt, title, text }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)]"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white">
                    <img
                      src={image}
                      alt={alt}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-display font-bold text-ink">{title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-body">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Výbava */}
        <section id="vybava" className="section-y-md scroll-mt-28">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h2 className="font-display text-[32px] font-extrabold leading-[1.15] text-ink md:text-[40px]">
                {c("equipment.h2", "Co dítě potřebuje do školky")}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-body">
                {c("equipment.body", "Pro pohodový den ve školce si s sebou dítě přinese:")}
              </p>
            </div>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {vybava.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)]"
                >
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-green/15 text-brand-green"
                  >
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-body">{item}</span>
                </li>
              ))}
            </ul>
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
              <div className="max-w-3xl">
                <h2 className="font-display text-[32px] font-extrabold leading-[1.15] text-ink md:text-[40px]">
                  {c("documents.h2", "Dokumenty ke stažení")}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-body">
                  {c("documents.body", "Formuláře, žádosti a základní dokumenty naší mateřské školy ve formátu PDF.")}
                </p>
              </div>

              <CmsDocumentsGrid c={c} />
            </div>
          </section>

          <SiteFooter topCubeColor="yellow" topCubePosition="left" showBottomCube={false} />
        </div>
      </main>
    </div>
  );
}
