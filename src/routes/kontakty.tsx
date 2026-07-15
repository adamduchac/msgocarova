import { createFileRoute } from "@tanstack/react-router";
import { ImageIcon } from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/kontakty")({
  head: () => ({
    meta: [
      { title: "Kontakty — Mateřská škola Josefa Gočára" },
      {
        name: "description",
        content:
          "Kontakty na Mateřskou školu Josefa Gočára v Hradci Králové — telefon, e-mail, adresa a čísla na jednotlivé třídy.",
      },
      { property: "og:title", content: "Kontakty — Mateřská škola Josefa Gočára" },
      {
        property: "og:description",
        content: "Škroupova 693, 500 02 Hradec Králové. Telefon 495 444 421, kosticky@msjghk.cz.",
      },
      { property: "og:url", content: "/kontakty" },
    ],
    links: [{ rel: "canonical", href: "/kontakty" }],
  }),
  component: KontaktyPage,
});

type ClassRow = {
  name: string;
  phone: string;
  tel: string;
  dot: string;
  teachers: string;
};

const classes: ClassRow[] = [
  {
    name: "Červená kostička",
    phone: "495 444 425",
    tel: "+420495444425",
    dot: "bg-brand-red",
    teachers:
      "paní učitelka Mgr. Nikola Šorfová, Mgr. Jitka Kouklíková a Hana Hloušková",
  },
  {
    name: "Zelená kostička",
    phone: "495 444 426",
    tel: "+420495444426",
    dot: "bg-brand-green",
    teachers: "paní učitelka Jana Tuharská a Kristýna Vaňátková, DiS.",
  },
  {
    name: "Modrá kostička",
    phone: "495 444 423",
    tel: "+420495444423",
    dot: "bg-brand-blue",
    teachers: "paní učitelka Bc. Veronika Kremláčková a Elena Špicarová",
  },
  {
    name: "Žlutá kostička",
    phone: "495 444 424",
    tel: "+420495444424",
    dot: "bg-brand-yellow",
    teachers: "paní učitelka Magdaléna Sováková a Milena Svobodová, DiS.",
  },
];

const eyebrowClass =
  "font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink/55";
const sectionLabelClass =
  "col-span-full font-display text-xs font-semibold uppercase tracking-[0.16em] text-ink/50";
const boxClass =
  "rounded-2xl border border-border/60 bg-card p-5 md:p-6";
const h2Class =
  "font-display text-[28px] font-extrabold text-ink md:text-[32px]";

function KontaktyPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />

      <div
        style={{ background: "linear-gradient(to bottom, #FEF8E7 0%, #FFFFFF 100%)" }}
        className="pt-28 sm:pt-32"
      >
        {/* Hero */}
        <section className="section-y">
          <div className="container mx-auto grid gap-10 px-6 lg:grid-cols-2 lg:items-start lg:gap-14">
            {/* Levý sloupec */}
            <div className="reveal-up">
              <h1 className="font-display text-[42px] font-extrabold leading-[1.05] text-ink md:text-[56px]">
                Kontakty
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-body">
                Rádi vás uvítáme osobně, nebo se ozvěte telefonem či e-mailem.
              </p>

              <div className="mt-6">
                <a
                  href="tel:+420495444421"
                  className="block font-display text-[28px] font-extrabold leading-[1.1] tabular-nums text-ink transition-colors duration-200 hover:text-ink/70 md:text-[36px]"
                >
                  495 444 421
                </a>
                <a
                  href="mailto:kosticky@msjghk.cz"
                  className="mt-1 block break-all font-display text-[28px] font-extrabold leading-[1.1] text-ink transition-colors duration-200 hover:text-ink/70 md:text-[36px]"
                >
                  kosticky@msjghk.cz
                </a>
              </div>

              <div className="mt-6">
                <p className={eyebrowClass}>Adresa</p>
                <address className="mt-3 not-italic leading-relaxed">
                  <span className="block font-medium text-ink">
                    Mateřská škola Josefa Gočára
                  </span>
                  <span className="block text-body">Škroupova 693</span>
                  <span className="block text-body">500 02 Hradec Králové 2</span>
                </address>
              </div>
            </div>

            {/* Pravý sloupec — fotka 1:1 placeholder */}
            <div
              className="reveal-fade lg:mt-2"
              style={{ ["--reveal-delay" as string]: "160ms" }}
            >
              <div className="flex aspect-square w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-[28px] border border-border/60 bg-muted">
                <ImageIcon className="h-12 w-12 text-ink/25" aria-hidden />
                <span className="text-sm text-ink/40">Fotka školky</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <main>
        {/* Kudy k nám */}
        <section className="section-y-sm">
          <div className="container mx-auto px-6">
            <h2 className={`reveal-up mb-6 ${h2Class}`}>Kudy k nám</h2>
            <div
              className="reveal-fade overflow-hidden rounded-[28px] border border-border/60 shadow-[0_20px_60px_-22px_rgba(16,15,16,0.25)]"
              style={{ ["--reveal-delay" as string]: "120ms" }}
            >
              <iframe
                title="Mapa — Mateřská škola Josefa Gočára"
                src="https://mapy.com/s/kovocenope"
                className="block h-[420px] w-full md:h-[480px]"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Rejstřík */}
        <section className="section-y-sm pb-section">
          <div className="container mx-auto px-6">
            <h2 className={`reveal-up mb-6 ${h2Class}`}>Rejstřík</h2>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {/* Vedení školky */}
              <p className={sectionLabelClass}>Vedení školky</p>

              <div className={`reveal-up ${boxClass}`}>
                <p className="text-sm text-body">Ředitel ZŠ a MŠ Josefa Gočára</p>
                <p className="mt-1 font-display text-lg font-bold text-ink">
                  Mgr. Petr Sadílek
                </p>
              </div>

              <div
                className={`reveal-up ${boxClass}`}
                style={{ ["--reveal-delay" as string]: "60ms" }}
              >
                <p className="text-sm text-body">Zástupkyně ředitele pro MŠ</p>
                <p className="mt-1 font-display text-lg font-bold text-ink">
                  Mgr. Jitka Kouklíková
                </p>
                <div className="mt-3 flex flex-col gap-1">
                  <a
                    href="tel:+420495444421"
                    className="text-[15px] font-semibold tabular-nums text-brand-blue transition-colors duration-200 hover:text-brand-blue/80"
                  >
                    495 444 421
                  </a>
                  <a
                    href="mailto:kosticky@msjghk.cz"
                    className="text-[15px] text-ink transition-colors duration-200 hover:text-brand-blue"
                  >
                    kosticky@msjghk.cz
                  </a>
                </div>
              </div>

              {/* Školní jídelna */}
              <p className={`${sectionLabelClass} mt-6`}>Školní jídelna</p>

              <div className={`reveal-up ${boxClass}`}>
                <p className="font-display text-lg font-bold text-ink">
                  Školní jídelna ZŠ
                </p>
                <p className="mt-1 text-sm text-body">
                  Odhlašování obědů nejdéle do 10:00 na příští den.
                </p>
                <a
                  href="tel:+420495019050"
                  className="mt-3 inline-block text-[15px] font-semibold tabular-nums text-brand-blue transition-colors duration-200 hover:text-brand-blue/80"
                >
                  495 019 050
                </a>
              </div>

              <div
                className={`reveal-up ${boxClass}`}
                style={{ ["--reveal-delay" as string]: "60ms" }}
              >
                <p className="font-display text-lg font-bold text-ink">
                  Výdejna obědů MŠ
                </p>
                <a
                  href="tel:+420495444422"
                  className="mt-3 inline-block text-[15px] font-semibold tabular-nums text-brand-blue transition-colors duration-200 hover:text-brand-blue/80"
                >
                  495 444 422
                </a>
              </div>

              {/* Barevné třídy */}
              <p className={`${sectionLabelClass} mt-6`}>Barevné třídy</p>

              {classes.map((c, i) => (
                <div
                  key={c.name}
                  className={`reveal-up ${boxClass}`}
                  style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-2.5 w-2.5 shrink-0 rounded-full ${c.dot}`}
                      aria-hidden
                    />
                    <p className="min-w-0 flex-1 font-display text-lg font-bold text-ink">
                      {c.name}
                    </p>
                    <a
                      href={`tel:${c.tel}`}
                      className="text-[15px] font-semibold tabular-nums text-brand-blue transition-colors duration-200 hover:text-brand-blue/80"
                    >
                      {c.phone}
                    </a>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    {c.teachers}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div
          style={{
            background:
              "linear-gradient(to bottom, #FFFFFF 0%, #FEF8E7 40%, #FEF8E7 100%)",
          }}
        >
          <SiteFooter cubeVariant="kontakty" />
        </div>
      </main>
    </div>
  );
}
