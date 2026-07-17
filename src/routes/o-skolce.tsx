import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Heart, Sparkles, Trees, Activity, UtensilsCrossed } from "lucide-react";
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

function GalleryPlaceholder({ startTint = 0, count = 3 }: { startTint?: number; count?: number }) {
  return (
    <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
      {Array.from({ length: count }).map((_, i) => {
        const tint = galleryTints[(startTint + i) % galleryTints.length];
        return (
          <div
            key={i}
            className="reveal-up flex aspect-[4/5] items-end justify-start overflow-hidden rounded-2xl border border-border/60 p-5"
            style={{
              backgroundColor: tint.bg,
              ["--reveal-delay" as string]: `${i * 90}ms`,
            }}
          >
            <span className={`font-display text-xs font-semibold uppercase tracking-[0.16em] ${tint.label}`}>
              {t("Foto brzy doplníme")}
            </span>
          </div>
        );
      })}
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

const educationAreas = [
  {
    title: "Jazyky a komunikace",
    text:
      "Angličtinu máme přirozeně ve všech třídách, v Zelené kostičce navíc rozvíjíme řeč přes Jazykové hrátky.",
    color: "text-brand-green",
  },
  {
    title: "Myšlení a příprava na školu",
    text:
      "Předškoláky v Červené kostičce vedeme metodou MIU k logickému uvažování a vlastním strategiím.",
    color: "text-brand-red",
  },
  {
    title: "Moderní technologie",
    text:
      "Interaktivní tabule, robotické myši, mikroskopy i světelný panel jsou běžnou součástí výuky.",
    color: "text-brand-blue",
  },
  {
    title: "Pohyb a zážitky",
    text:
      "Děti chodí na plavecký kurz a předškoláci vyjíždějí do školy v přírodě i na lyžařskou školu.",
    color: "text-brand-yellow",
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
        <section className="section-y">
          <div className="container mx-auto px-6">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
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
              </div>

              {/* Sticky TOC on desktop */}
              <nav
                aria-label="Obsah stránky"
                className="reveal-fade hidden rounded-2xl border border-border/70 bg-background/70 p-5 backdrop-blur lg:block"
                style={{ ["--reveal-delay" as string]: "160ms" }}
              >
                <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">
                  {t("Obsah")}
                </p>
                <ul className="mt-3 space-y-2">
                  {tocSections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="group inline-flex items-center gap-2 text-sm text-ink/80 transition-colors hover:text-brand-blue"
                      >
                        <span className="h-px w-4 bg-ink/25 transition-all group-hover:w-6 group-hover:bg-brand-blue" />
                        {t(s.title)}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </section>
      </div>

      <main>
        {/* 1. O školce */}
        <section id="o-skolce" className="section-y scroll-mt-28">
          <div className="container mx-auto px-6">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
              <div className="reveal-up">
                <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand-green">
                  {t("Skládáme svět z kostiček")}
                </p>
                <h2 className="mt-3 font-display text-[32px] font-extrabold leading-[1.15] text-ink md:text-[40px]">
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

              <div className="reveal-fade" style={{ ["--reveal-delay" as string]: "160ms" }}>
                <GalleryPlaceholder startTint={0} count={3} />
              </div>
            </div>
          </div>
        </section>

        {/* 2. Představení a vize */}
        <section
          id="vize"
          className="section-y scroll-mt-28"
          style={{ backgroundColor: "#FDFAF6" }}
        >
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center">
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
                return (
                  <div
                    key={card.title}
                    className="card-hover reveal-up flex flex-col rounded-2xl border border-border/70 bg-background p-7"
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

        {/* 3. Vzdělávání a rozvoj */}
        <section id="vzdelavani" className="section-y scroll-mt-28">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl">
              <p className="reveal-up font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
                {t("Vzdělávání a rozvoj")}
              </p>
              <h2 className="reveal-up mt-3 font-display text-[32px] font-extrabold leading-[1.15] text-ink md:text-[40px]">
                {t("Pestrý program, který rozvíjí celou osobnost dítěte")}
              </h2>
              <p className="reveal-up mt-5 text-lg leading-relaxed text-body">
                {t(
                  "Vedle každodenní hry dětem nabízíme pestrý program, který přirozeně rozvíjí jazyk, myšlení, pohyb i vztah k přírodě a technologiím."
                )}
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
              {educationAreas.map((area, i) => (
                <div
                  key={area.title}
                  className="card-hover reveal-up rounded-2xl border border-border/70 bg-background p-7 md:p-8"
                  style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                >
                  <p className={`font-display text-xs font-semibold uppercase tracking-[0.18em] ${area.color}`}>
                    {t(`0${i + 1}`)}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-ink">
                    {t(area.title)}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-body">
                    {t(area.text)}
                  </p>
                </div>
              ))}
            </div>

            <div className="reveal-fade mt-10 flex flex-wrap items-center gap-3">
              <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-dashed border-border px-4 py-2 text-sm text-ink/55">
                {t("Podrobnosti — samostatná stránka Vzdělávání")}
                <span className="rounded-full bg-ink/5 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-ink/50">
                  {t("Připravujeme")}
                </span>
              </span>
            </div>

            <GalleryPlaceholder startTint={3} count={3} />
          </div>
        </section>

        {/* 4. Náš tým */}
        <section
          id="tym"
          className="section-y scroll-mt-28"
          style={{ backgroundColor: "#F8FAFC" }}
        >
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="reveal-up font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand-green">
                {t("Náš tým")}
              </p>
              <h2 className="reveal-up mt-3 font-display text-[32px] font-extrabold leading-[1.15] text-ink md:text-[40px]">
                {t("Lidé, kteří se starají o vaše děti")}
              </h2>
            </div>

            <TeamGroup title="Pedagogický tým" members={teamMembers.filter((m) => m.group === "pedagog")} />

            <div className="mt-16">
              <TeamGroup title="Provozní tým" members={teamMembers.filter((m) => m.group === "provoz")} />
            </div>
          </div>
        </section>

        {/* 5. Veřejné hřiště */}
        <section id="hriste" className="section-y scroll-mt-28">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-4xl">
              <div className="reveal-up">
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
                className="reveal-fade mt-10 grid gap-0 overflow-hidden rounded-2xl border border-border/70 bg-background md:grid-cols-2"
                style={{ ["--reveal-delay" as string]: "120ms" }}
              >
                <div className="border-b border-border/70 p-8 md:border-b-0 md:border-r">
                  <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
                    {t("15. dubna – září")}
                  </p>
                  <dl className="mt-4 space-y-2 text-ink">
                    <div className="flex items-baseline justify-between gap-6">
                      <dt className="text-body">{t("Dopoledne")}</dt>
                      <dd className="font-display text-xl font-bold">10:00 – 12:00</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-6">
                      <dt className="text-body">{t("Odpoledne")}</dt>
                      <dd className="font-display text-xl font-bold">13:00 – 17:00</dd>
                    </div>
                  </dl>
                </div>
                <div className="p-8">
                  <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
                    {t("Do 15. října")}
                  </p>
                  <dl className="mt-4 space-y-2 text-ink">
                    <div className="flex items-baseline justify-between gap-6">
                      <dt className="text-body">{t("Dopoledne")}</dt>
                      <dd className="font-display text-xl font-bold">10:00 – 12:00</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-6">
                      <dt className="text-body">{t("Odpoledne")}</dt>
                      <dd className="font-display text-xl font-bold">13:00 – 16:00</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <p className="reveal-up mt-5 text-sm text-body/80">
                {t("Ve státní svátky je hřiště uzavřeno.")}
              </p>
            </div>
          </div>
        </section>

        {/* 6. Školní jídelna */}
        <section
          id="jidelna"
          className="section-y scroll-mt-28"
          style={{ backgroundColor: "#FDFAF6" }}
        >
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl">
              <p className="reveal-up font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand-blue">
                {t("Školní jídelna")}
              </p>
              <h2 className="reveal-up mt-3 font-display text-[32px] font-extrabold leading-[1.15] text-ink md:text-[40px]">
                {t("Praktické informace ke stravování")}
              </h2>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
              {/* Pravidla */}
              <div className="reveal-up rounded-2xl border border-border/70 bg-background p-7 md:p-8">
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

                <div className="mt-7 rounded-xl border border-brand-red/25 bg-blush/60 p-4 text-sm text-ink">
                  {t("Zákaz výdeje obědů do skleněných nádob.")}
                </div>
              </div>

              {/* Platby + časy */}
              <div className="reveal-up rounded-2xl border border-border/70 bg-background p-7 md:p-8" style={{ ["--reveal-delay" as string]: "120ms" }}>
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

                <h4 className="mt-8 font-display text-lg font-bold text-ink">
                  {t("Výdej stravy")}
                </h4>
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
          <SiteFooter topCubeColor="blue" topCubePosition="right" />
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
