import { createFileRoute } from "@tanstack/react-router";

import { fixPrepositions } from "@/lib/typography";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { siteCopyQueryOptions, useCopyPage } from "@/lib/use-copy";

export const Route = createFileRoute("/kontakty")({
  loader: ({ context }) => context.queryClient.ensureQueryData(siteCopyQueryOptions("kontakty")),
  head: () => ({
    meta: [
      { title: "Kontakty – Mateřská škola Josefa Gočára" },
      {
        name: "description",
        content:
          "Kontakty na Mateřskou školu Josefa Gočára v Hradci Králové – telefon, e-mail, adresa a čísla na jednotlivé třídy.",
      },
      { property: "og:title", content: "Kontakty – Mateřská škola Josefa Gočára" },
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
    name: fixPrepositions("Červená kostička"),
    phone: "495 444 425",
    tel: "+420495444425",
    dot: "bg-brand-red",
    teachers: fixPrepositions(
      "paní učitelka Mgr. Nikola Šorfová, Mgr. Jitka Kouklíková a Hana Hloušková"
    ),
  },
  {
    name: fixPrepositions("Zelená kostička"),
    phone: "495 444 426",
    tel: "+420495444426",
    dot: "bg-brand-green",
    teachers: fixPrepositions("paní učitelka Jana Tuharská a Kristýna Vaňátková, DiS."),
  },
  {
    name: fixPrepositions("Modrá kostička"),
    phone: "495 444 423",
    tel: "+420495444423",
    dot: "bg-brand-blue",
    teachers: fixPrepositions("paní učitelka Bc. Veronika Kremláčková a Elena Špicarová"),
  },
  {
    name: fixPrepositions("Žlutá kostička"),
    phone: "495 444 424",
    tel: "+420495444424",
    dot: "bg-brand-yellow",
    teachers: fixPrepositions("paní učitelka Magdaléna Sováková a Milena Svobodová, DiS."),
  },
];

const eyebrowClass =
  "font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink/55";
const sectionLabelClass =
  "font-display text-xs font-semibold uppercase tracking-[0.16em] text-ink/50";
const boxClass =
  "rounded-2xl border border-border/60 bg-card p-5 md:p-6";
const h2Class =
  "font-display text-[28px] font-extrabold text-ink md:text-[32px]";
const contactValueClass =
  "block font-display text-[28px] font-extrabold leading-[1.15] text-ink transition-colors duration-200 hover:text-ink/70 md:text-[36px]";

function KontaktyPage() {
  const c = useCopyPage("kontakty");
  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />

      <div
        style={{ background: "linear-gradient(to bottom, #FEF8E7 0%, #FFFFFF 100%)" }}
        className="pt-28 sm:pt-32"
      >
        {/* Hero */}
        <section className="section-y">
          <div className="container mx-auto grid gap-10 px-6 lg:grid-cols-2 lg:items-center lg:gap-14">
            {/* Levý sloupec */}
            <div className="reveal-up">
              <h1 className="font-display text-[42px] font-extrabold leading-[1.05] text-ink md:text-[56px]">
                {c("hero.h1", "Kontakty")}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-body">
                {c("hero.lead", "Rádi vás uvítáme osobně, nebo se ozvěte telefonem či e-mailem.")}
              </p>

              <div className="mt-10 flex flex-col gap-8">
                <div>
                  <p className={eyebrowClass}>Telefon</p>
                  <a
                    href="tel:+420495444421"
                    className={`${contactValueClass} tabular-nums mt-2`}
                  >
                    495 444 421
                  </a>
                </div>

                <div>
                  <p className={eyebrowClass}>E-mail</p>
                  <a
                    href="mailto:kosticky@msjghk.cz"
                    className={`${contactValueClass} break-all mt-2`}
                  >
                    kosticky@msjghk.cz
                  </a>
                </div>

                <div>
                  <p className={eyebrowClass}>Adresa</p>
                  <address className={`${contactValueClass} not-italic mt-2`}>
                    <span className="block">{fixPrepositions("Mateřská škola Josefa Gočára")}</span>
                    <span className="block">Škroupova 693</span>
                    <span className="block">500 02 Hradec Králové 2</span>
                  </address>
                </div>
              </div>
            </div>

            {/* Pravý sloupec – mapa */}
            <div
              className="reveal-fade lg:mt-2"
              style={{ ["--reveal-delay" as string]: "160ms" }}
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-border/60 shadow-[0_20px_60px_-22px_rgba(16,15,16,0.25)]">
                <iframe
                  title="Mapa – Mateřská škola Josefa Gočára"
                  src="https://mapy.com/s/kovocenope"
                  className="block h-full w-full"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <main>
        {/* Rejstřík */}
        <section className="section-y-sm pb-section">
          <div className="container mx-auto px-6">
            <h2 className={`reveal-up mb-6 ${h2Class}`}>{fixPrepositions("Rejstřík")}</h2>

            <div
              className="reveal-up rounded-[28px] border border-border/60 bg-card p-6 shadow-[0_20px_60px_-22px_rgba(16,15,16,0.25)] md:p-10"
            >
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Levý sloupec */}
                <div className="flex flex-col gap-5">
                  {/* Vedení školky */}
                  <div className={boxClass}>
                    <p className={sectionLabelClass}>{fixPrepositions("Vedení školky")}</p>
                    <div className="mt-5 flex flex-col gap-5">
                      <div>
                        <p className="text-sm text-body">{fixPrepositions("Ředitel ZŠ a MŠ Josefa Gočára")}</p>
                        <p className="mt-1 font-display text-lg font-bold text-ink">
                          Mgr. Petr Sadílek
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-body">{fixPrepositions("Zástupkyně ředitele pro MŠ")}</p>
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
                    </div>
                  </div>

                  {/* Školní jídelna */}
                  <div className={boxClass}>
                    <p className={sectionLabelClass}>{fixPrepositions("Školní jídelna")}</p>
                    <div className="mt-5 flex flex-col gap-5">
                      <div>
                        <p className="font-display text-lg font-bold text-ink">
                          {fixPrepositions("Školní jídelna ZŠ")}
                        </p>
                        <p className="mt-1 text-sm text-body">
                          {fixPrepositions("Odhlašování obědů nejdéle do 10:00 na příští den.")}
                        </p>
                        <a
                          href="tel:+420495019050"
                          className="mt-3 inline-block text-[15px] font-semibold tabular-nums text-brand-blue transition-colors duration-200 hover:text-brand-blue/80"
                        >
                          495 019 050
                        </a>
                      </div>

                      <div>
                        <p className="font-display text-lg font-bold text-ink">
                          {fixPrepositions("Výdejna obědů MŠ")}
                        </p>
                        <a
                          href="tel:+420495444422"
                          className="mt-3 inline-block text-[15px] font-semibold tabular-nums text-brand-blue transition-colors duration-200 hover:text-brand-blue/80"
                        >
                          495 444 422
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pravý sloupec – Barevné třídy */}
                <div className={boxClass}>
                  <p className={sectionLabelClass}>{fixPrepositions("Barevné třídy")}</p>
                  <div className="mt-5 flex flex-col gap-5">
                    {classes.map((c) => (
                      <div key={c.name}>
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
          <SiteFooter cubeVariant="kontakty" />
        </div>
      </main>
    </div>
  );
}
