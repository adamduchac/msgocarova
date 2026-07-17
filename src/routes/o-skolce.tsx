import { useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Heart, Sparkles, Trees, Activity, UtensilsCrossed } from "lucide-react";
import { fixPrepositions } from "@/lib/typography";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { teamMembers, getInitials } from "@/data/team";

const t = fixPrepositions;

export const Route = createFileRoute("/o-skolce")({
  head: () => ({
    meta: [
      { title: "O školce — Mateřská škola Josefa Gočára" },
      {
        name: "description",
        content:
          "Kdo jsme, jak vzděláváme, kdo se stará o vaše děti a co dalšího nabízíme — od zahrady až po školní jídelnu.",
      },
      { property: "og:title", content: "O školce — Mateřská škola Josefa Gočára" },
      {
        property: "og:description",
        content:
          "Představení, vize, vzdělávání, tým, veřejné hřiště a školní jídelna MŠ Josefa Gočára v Hradci Králové.",
      },
      { property: "og:url", content: "/o-skolce" },
    ],
    links: [{ rel: "canonical", href: "/o-skolce" }],
  }),
  component: OSkolcePage,
});

const tocSections = [
  { id: "o-skolce", title: "O školce" },
  { id: "vize", title: "Představení a vize" },
  { id: "vzdelavani", title: "Vzdělávání a rozvoj" },
  { id: "tym", title: "Náš tým" },
  { id: "hriste", title: "Veřejné hřiště" },
  { id: "jidelna", title: "Školní jídelna" },
];

const galleryTints = [
  { bg: "#FCEDED", label: "text-brand-red/40" },
  { bg: "#E3EEFB", label: "text-brand-blue/40" },
  { bg: "#EAF5EC", label: "text-brand-green/50" },
  { bg: "#FEF6E6", label: "text-brand-yellow/50" },
  { bg: "#FDFAF6", label: "text-ink/25" },
  { bg: "#ECF7F0", label: "text-brand-green/40" },
];

function AboutGallery({ startTint = 0 }: { startTint?: number }) {
  const scrollerRef = useRef<HTMLOListElement | null>(null);
  const tints = [0, 1].map((i) => galleryTints[(startTint + i) % galleryTints.length]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const cardW = first ? first.clientWidth : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * (cardW + 16), behavior: "smooth" });
  };

  return (
    <div className="reveal-fade">
      <ol
        ref={scrollerRef}
        className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0"
      >
        {tints.map((tint, i) => (
          <li
            key={i}
            className="flex shrink-0 basis-[88%] snap-start md:basis-auto"
          >
            <div
              className="flex aspect-[4/3] w-full items-end justify-start overflow-hidden rounded-2xl border border-border/60 p-5"
              style={{ backgroundColor: tint.bg }}
            >
              <span className={`font-display text-xs font-semibold uppercase tracking-[0.16em] ${tint.label}`}>
                {t("Foto brzy doplníme")}
              </span>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-5 flex items-center justify-center gap-3 md:hidden">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label={t("Předchozí fotka")}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background text-ink shadow-sm transition-colors duration-200 hover:bg-offwhite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label={t("Další fotka")}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background text-ink shadow-sm transition-colors duration-200 hover:bg-offwhite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}

const visionCards = [
  {
    icon: Heart,
    title: "Respektující přístup",
    text:
      "Prostředí založené na důvěře, bezpečí a partnerské komunikaci mezi dětmi, učiteli i rodiči.",
    color: "text-brand-red",
    bg: "#FCEDED",
  },
  {
    icon: Sparkles,
    title: "Podpora přirozené zvídavosti",
    text:
      "Prostor pro hru, malování, tvoření a experimentování. Děti se učí přemýšlet, hledat vlastní řešení a spolupracovat.",
    color: "text-brand-blue",
    bg: "#E3EEFB",
  },
  {
    icon: Trees,
    title: "Zahrada v každém ročním období",
    text:
      "Podzimní aktivity, zimní bobování, letní osvěžení v bazénu a prvky přírodní zahrady po celý rok.",
    color: "text-brand-green",
    bg: "#EAF5EC",
  },
  {
    icon: Activity,
    title: "Podpora pohybu",
    text:
      "Každodenní přirozený pohyb, plavecká škola i lyžařský kurz pro předškoláky.",
    color: "text-brand-yellow",
    bg: "#FEF6E6",
  },
  {
    icon: UtensilsCrossed,
    title: "Stravování a pitný režim",
    text:
      "Děti se stravují třikrát denně — svačinky připravuje paní kuchařka, obědy dovážíme ze ZŠ Josefa Gočára. Po celý den mají neomezený pitný režim.",
    color: "text-ink/70",
    bg: "#FDFAF6",
  },
];

const educationBullets = [
  {
    title: "Jazyky a komunikace",
    text:
      "Angličtinu máme přirozeně ve všech třídách, v Zelené kostičce navíc rozvíjíme řeč přes Jazykové hrátky.",
  },
  {
    title: "Myšlení a příprava na školu",
    text:
      "Předškoláky v Červené kostičce vedeme metodou MIU k logickému uvažování a vlastním strategiím.",
  },
  {
    title: "Moderní technologie",
    text:
      "Interaktivní tabule, robotické myši, mikroskopy i světelný panel jsou běžnou součástí výuky.",
  },
  {
    title: "Pohyb a zážitky",
    text:
      "Děti chodí na plavecký kurz a předškoláci vyjíždějí do školy v přírodě i na lyžařskou školu.",
  },
];

const canteenSchedule = [
  { label: "Přesnídávka", time: "8:30 – 8:55" },
  { label: "Oběd (Modrá + Červená)", time: "11:40 – 12:10" },
  { label: "Oběd (Žlutá + Zelená)", time: "11:50 – 12:20" },
  { label: "Svačina", time: "14:00 – 14:30" },
  { label: "Do jídlonosičů (na patrech MŠ)", time: "11:40 – 12:00" },
];

function OSkolcePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />

      {/* Hero */}
      <div
        style={{ background: "linear-gradient(to bottom, #FEF8E7 0%, #FFFFFF 100%)" }}
        className="pt-28 sm:pt-32"
      >
        <section className="section-y-sm">
          <div className="container mx-auto px-6">
            <div className="reveal-up max-w-3xl">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand-green">
                {t("O školce")}
              </p>
              <h1 className="mt-3 font-display text-[42px] font-extrabold leading-[1.05] text-ink md:text-[56px]">
                {t("Mateřská škola Josefa Gočára")}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-body md:text-xl">
                {t(
                  "Nacházíme se v centru Hradce Králové, v klidné části města u břehu Labe. Pracujeme podle školního vzdělávacího programu „Skládáme svět z kostiček“, který vychází ze současných trendů předškolního vzdělávání."
                )}
              </p>

              <h2 className="mt-10 font-display text-[32px] font-extrabold leading-[1.15] text-ink md:text-[40px]">
                {t("Školka, kde má hra a přirozený rozvoj hlavní slovo")}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-body">
                {t(
                  "Naše třídy nesou názvy barevných kostiček — symbolu dětské hry, té nejpřirozenější a nejdůležitější činnosti předškoláka. Cílem je podnětné prostředí plné hraček a zajímavých aktivit, kam se děti každý den těší."
                )}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-body">
                {t(
                  "Preferujeme osobní přístup ke každému dítěti a rozvíjíme jeho potenciál. Didaktické pomůcky umísťujeme tak, aby si je děti mohly samostatně brát a přirozeně rozvíjet fantazii i celou svou osobnost. Na estetickém prostředí školy se děti podílejí svými výtvory. Všechny učitelky mají odpovídající kvalifikaci a dále se vzdělávají."
                )}
              </p>
            </div>
          </div>
        </section>
      </div>

      <main>
        {/* Galerie na plnou šířku */}
        <section id="o-skolce" className="section-y-md scroll-mt-28">
          <div className="container mx-auto px-6">
            <AboutGallery startTint={0} />
          </div>
        </section>

        {/* Představení a vize */}
        <section
          id="vize"
          className="section-y-md scroll-mt-28"
          style={{ background: "linear-gradient(to bottom, #ffffff 0%, #ffffff 10%, var(--blue-soft) 55%, var(--blue-soft) 100%)" }}
        >
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <p className="reveal-up font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand-blue">
                {t("Představení a vize")}
              </p>
              <h2 className="reveal-up mt-3 font-display text-[32px] font-extrabold leading-[1.15] text-ink md:text-[40px]">
                {t("Otevřená školka postavená na partnerství a důvěře")}
              </h2>
              <p className="reveal-up mt-5 text-lg leading-relaxed text-body">
                {t(
                  "Pro nás je důležitá spolupráce s rodinou. Úzce spolupracujeme se ZŠ Josefa Gočára, což budoucím školákům usnadňuje přechod do 1. třídy."
                )}
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {visionCards.map((card, i) => {
                const Icon = card.icon;
                const isWide = i === visionCards.length - 1;
                return (
                  <div
                    key={card.title}
                    className={`card-hover reveal-up flex flex-col rounded-2xl border border-border/70 bg-background p-7 ${
                      isWide ? "lg:col-span-2" : ""
                    }`}
                    style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                  >
                    <div
                      className={`grid h-12 w-12 place-items-center rounded-xl ${card.color}`}
                      style={{ backgroundColor: card.bg }}
                    >
                      <Icon className="h-6 w-6" strokeWidth={2} />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-bold text-ink">
                      {t(card.title)}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-body">
                      {t(card.text)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Vzdělávání a rozvoj */}
        <section id="vzdelavani" className="section-y-md scroll-mt-28">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <div className="reveal-up">
                <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand-green">
                  {t("Vzdělávání a rozvoj")}
                </p>
                <h2 className="mt-3 font-display text-[32px] font-extrabold leading-[1.15] text-ink md:text-[40px]">
                  {t("Pestrý program, který rozvíjí celou osobnost dítěte")}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-body">
                  {t(
                    "Vedle každodenní hry dětem nabízíme pestrý program, který přirozeně rozvíjí jazyk, myšlení, pohyb i vztah k přírodě a technologiím."
                  )}
                </p>
              </div>

              <ul className="reveal-up mt-8 space-y-4">
                {educationBullets.map((b) => (
                  <li key={b.title} className="flex gap-4">
                    <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                    <div>
                      <p className="font-display text-lg font-bold text-ink">{t(b.title)}</p>
                      <p className="mt-1 text-[15px] leading-relaxed text-body">{t(b.text)}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="reveal-fade mt-10">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-display text-sm font-semibold text-background transition-colors duration-200 hover:bg-ink/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
                >
                  {t("Více o vzdělávání")}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>

            <div className="mt-14">
              <AboutGallery startTint={3} />
            </div>
          </div>
        </section>

        {/* Náš tým */}
        <section
          id="tym"
          className="section-y-md scroll-mt-28"
          style={{ backgroundColor: "#F8FAFC" }}
        >
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="reveal-up font-display text-[32px] font-extrabold leading-[1.15] text-ink md:text-[40px]">
                {t("Náš tým")}
              </h2>
            </div>

            <TeamGroup title="Pedagogický tým" members={teamMembers.filter((m) => m.group === "pedagog")} />

            <div className="mt-16">
              <TeamGroup title="Provozní tým" members={teamMembers.filter((m) => m.group === "provoz")} />
            </div>
          </div>
        </section>

        {/* Veřejné hřiště */}
        <section id="hriste" className="section-y-md scroll-mt-28">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl reveal-up">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand-yellow">
                {t("Veřejné hřiště")}
              </p>
              <h2 className="mt-3 font-display text-[32px] font-extrabold leading-[1.15] text-ink md:text-[40px]">
                {t("Zahrada slouží o víkendech veřejnosti")}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-body">
                {t(
                  "Školní zahrada je o sobotách a nedělích otevřená pro širokou veřejnost. Přijďte si s dětmi zaběhat, prolézt prolézačky a užít si klidný park uprostřed města."
                )}
              </p>
            </div>

            <div
              className="reveal-fade mt-10 overflow-hidden rounded-2xl border border-border/70 bg-background"
              style={{ ["--reveal-delay" as string]: "120ms" }}
            >
              <div className="px-6 pt-6 md:px-8 md:pt-8">
                <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-brand-yellow">
                  {t("Sobota, neděle")}
                </p>
              </div>
              <div className="mt-4 grid grid-cols-[1fr_auto_auto] gap-x-6 gap-y-3 px-6 pb-6 text-[15px] md:gap-x-10 md:px-8 md:pb-8 md:text-base">
                <span aria-hidden />
                <span className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-ink/55">
                  {t("Dopolední")}
                </span>
                <span className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-ink/55">
                  {t("Odpolední")}
                </span>

                <span className="border-t border-border/60 pt-3 text-body">
                  {t("od 15. dubna, květen, červen, září")}
                </span>
                <span className="border-t border-border/60 pt-3 font-display font-bold text-ink tabular-nums">
                  10:00 – 12:00
                </span>
                <span className="border-t border-border/60 pt-3 font-display font-bold text-ink tabular-nums">
                  13:00 – 17:00
                </span>

                <span className="border-t border-border/60 pt-3 text-body">
                  {t("do 15. října")}
                </span>
                <span className="border-t border-border/60 pt-3 font-display font-bold text-ink tabular-nums">
                  10:00 – 12:00
                </span>
                <span className="border-t border-border/60 pt-3 font-display font-bold text-ink tabular-nums">
                  13:00 – 16:00
                </span>
              </div>
            </div>


            <p className="reveal-up mt-5 text-sm text-body/80">
              {t("Ve státní svátky je hřiště uzavřeno.")}
            </p>
          </div>
        </section>

        {/* Školní jídelna */}
        <section
          id="jidelna"
          className="section-y-md scroll-mt-28"
          style={{ background: "linear-gradient(to bottom, #FFFFFF 0%, #FDFAF6 100%)" }}
        >
          <div className="container mx-auto px-6">
            <div className="max-w-4xl reveal-up">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand-blue">
                {t("Školní jídelna")}
              </p>
              <h2 className="mt-3 font-display text-[32px] font-extrabold leading-[1.15] text-ink md:text-[40px]">
                {t("Praktické informace ke stravování")}
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6">
              {/* Odhlašování */}
              <div className="reveal-up flex flex-col rounded-2xl border border-border/70 bg-background p-7 md:p-8">
                <h3 className="font-display text-xl font-bold text-ink">
                  {t("Odhlašování a přihlašování stravy")}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-body">
                  {t(
                    "Teplé pokrmy jsou určeny k přímé spotřebě v den výdeje, nejdéle do 12:30. Stravu na následující den je nutné odhlásit nebo přihlásit den předem do 10:00."
                  )}
                </p>
                <ul className="mt-5 space-y-3 text-[15px] text-ink">
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
                    <span>{t("Osobně v kanceláři školní jídelny")}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
                    <span>
                      {t("Telefonicky ")}
                      <a
                        href="tel:+420495019050"
                        className="font-semibold text-ink underline-offset-4 hover:text-brand-blue hover:underline"
                      >
                        495 019 050
                      </a>
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
                    <span>
                      {t("Online na ")}
                      <a
                        href="https://www.strava.cz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-ink underline-offset-4 hover:text-brand-blue hover:underline"
                      >
                        www.strava.cz
                      </a>
                    </span>
                  </li>
                </ul>

                <div className="mt-auto pt-6">
                  <div className="rounded-xl border border-brand-red/25 bg-blush/60 p-4 text-sm text-ink">
                    {t("Zákaz výdeje obědů do skleněných nádob.")}
                  </div>
                </div>
              </div>

              {/* Platba */}
              <div
                className="reveal-up flex flex-col rounded-2xl border border-border/70 bg-background p-7 md:p-8"
                style={{ ["--reveal-delay" as string]: "100ms" }}
              >
                <h3 className="font-display text-xl font-bold text-ink">
                  {t("Platba stravného")}
                </h3>
                <dl className="mt-4 space-y-2.5 text-[15px]">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <dt className="text-body">{t("Číslo účtu")}</dt>
                    <dd className="font-display font-semibold text-ink">27-320530297/0100</dd>
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <dt className="text-body">{t("Variabilní symbol")}</dt>
                    <dd className="text-ink">{t("evidenční číslo dítěte")}</dd>
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <dt className="text-body">{t("Konstantní symbol (složenka)")}</dt>
                    <dd className="font-display font-semibold text-ink">0379</dd>
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <dt className="text-body">{t("Konstantní symbol (převod)")}</dt>
                    <dd className="font-display font-semibold text-ink">0558</dd>
                  </div>
                </dl>
              </div>

              {/* Výdej */}
              <div
                className="reveal-up flex flex-col rounded-2xl border border-border/70 bg-background p-7 md:p-8"
                style={{ ["--reveal-delay" as string]: "200ms" }}
              >
                <h3 className="font-display text-xl font-bold text-ink">
                  {t("Výdej stravy")}
                </h3>
                <ul className="mt-4 divide-y divide-border/60">
                  {canteenSchedule.map((row) => (
                    <li key={row.label} className="flex items-baseline justify-between gap-4 py-2.5 text-[15px]">
                      <span className="text-body">{t(row.label)}</span>
                      <span className="font-display font-semibold text-ink">{row.time}</span>
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
              "linear-gradient(to bottom, #FDFAF6 0%, #FEF8E7 40%, #FEF8E7 100%)",
          }}
        >
          <SiteFooter topCubeColor="blue" topCubePosition="right" showBottomCube={false} />
        </div>
      </main>
    </div>
  );
}


function TeamGroup({ title, members }: { title: string; members: typeof teamMembers }) {
  return (
    <div>
      <div className="reveal-up mt-12 mb-8 flex items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink/60">
          {t(title)}
        </h3>
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {members.map((m, i) => (
          <div
            key={m.name}
            className="reveal-up"
            style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
          >
            <div
              className="overflow-hidden rounded-2xl border border-border/60"
              style={m.photo ? undefined : { backgroundColor: "#FEF8E7" }}
            >
              {m.photo ? (
                <img
                  src={m.photo}
                  alt={m.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                />
              ) : (
                <div
                  className="flex aspect-[4/5] w-full items-center justify-center"
                  role="img"
                  aria-label={m.alt}
                >
                  <span className="font-display text-[64px] font-bold leading-none text-ink/20">
                    {getInitials(m.name)}
                  </span>
                </div>
              )}
            </div>
            <div className="mt-4">
              <p className={`font-display text-xs font-semibold uppercase tracking-[0.16em] ${m.roleColor}`}>
                {t(m.role)}
              </p>
              <h4 className="mt-1.5 font-display text-lg font-bold text-ink">
                {m.name}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
