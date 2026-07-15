import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Mail, Phone } from "lucide-react";
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

type ClassRow = { name: string; phone: string; tel: string; dot: string };

const classes: ClassRow[] = [
  { name: "Červená kostička", phone: "495 444 425", tel: "+420495444425", dot: "bg-brand-red" },
  { name: "Zelená kostička", phone: "495 444 426", tel: "+420495444426", dot: "bg-brand-green" },
  { name: "Modrá kostička", phone: "495 444 423", tel: "+420495444423", dot: "bg-brand-blue" },
  { name: "Žlutá kostička", phone: "495 444 424", tel: "+420495444424", dot: "bg-brand-yellow" },
];

function KontaktyPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />

      <div
        style={{ background: "linear-gradient(to bottom, #FEF8E7 0%, #FFFFFF 100%)" }}
        className="pt-28 sm:pt-32"
      >
        <section className="section-y">
          <div className="container mx-auto px-6">
            <div className="reveal-up mx-auto max-w-3xl text-center">
              <h1 className="font-display text-[42px] font-extrabold leading-[1.1] text-ink md:text-[56px]">
                Kontakty
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-body">
                Rádi vás uvítáme osobně, nebo se ozvěte telefonem či e-mailem.
              </p>
            </div>
          </div>
        </section>
      </div>

      <main>
        {/* Hlavní kontakt + mapa */}
        <section className="section-y">
          <div className="container mx-auto grid gap-10 px-6 lg:grid-cols-2 lg:gap-14 lg:items-center">
            <div className="reveal-up">
              <a
                href="tel:+420495444421"
                className="flex items-center gap-4 font-display text-[44px] font-extrabold leading-[1.05] text-brand-blue transition-colors duration-200 hover:text-brand-blue/80 md:text-[56px]"
              >
                <Phone className="h-9 w-9 shrink-0 md:h-11 md:w-11" aria-hidden strokeWidth={2.2} />
                <span className="tabular-nums">495 444 421</span>
              </a>

              <a
                href="mailto:kosticky@msjghk.cz"
                className="mt-4 flex items-center gap-4 font-display text-[24px] font-bold text-ink transition-colors duration-200 hover:text-brand-blue md:text-[32px]"
              >
                <Mail className="h-6 w-6 shrink-0 text-ink/60 md:h-7 md:w-7" aria-hidden />
                kosticky@msjghk.cz
              </a>

              <div className="mt-8 flex items-start gap-3 text-[15px] leading-relaxed">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-ink/50" aria-hidden />
                <address className="not-italic">
                  <span className="block font-medium text-ink">Mateřská škola Josefa Gočára</span>
                  <span className="block text-body">Škroupova 693</span>
                  <span className="block text-body">500 02 Hradec Králové 2</span>
                </address>
              </div>
            </div>

            <div
              className="reveal-fade overflow-hidden rounded-[28px] border border-border/60 shadow-[0_20px_60px_-22px_rgba(16,15,16,0.25)]"
              style={{ ["--reveal-delay" as string]: "160ms" }}
            >
              <iframe
                title="Mapa — Mateřská škola Josefa Gočára"
                src="https://mapy.com/s/kovocenope"
                className="block h-[360px] w-full md:h-[440px]"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Vedení školky */}
        <section className="section-y pt-0">
          <div className="container mx-auto px-6">
            <h2 className="reveal-up section-header-gap font-display text-[28px] font-extrabold text-ink md:text-[32px]">
              Vedení školky
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="reveal-up rounded-2xl border border-border/60 bg-card p-6 md:p-8">
                <p className="text-sm text-body">Ředitel ZŠ a MŠ Josefa Gočára</p>
                <p className="mt-2 font-display text-xl font-bold text-ink md:text-2xl">
                  Mgr. Petr Sadílek
                </p>
              </div>

              <div
                className="reveal-up rounded-2xl border border-border/60 bg-card p-6 md:p-8"
                style={{ ["--reveal-delay" as string]: "80ms" }}
              >
                <p className="text-sm text-body">Zástupkyně ředitele pro MŠ</p>
                <p className="mt-2 font-display text-xl font-bold text-ink md:text-2xl">
                  Mgr. Jitka Kouklíková
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <a
                    href="tel:+420495444421"
                    className="inline-flex items-center gap-2 font-display text-[17px] font-semibold text-brand-blue transition-colors duration-200 hover:text-brand-blue/80"
                  >
                    <Phone className="h-4 w-4" aria-hidden />
                    <span className="tabular-nums">495 444 421</span>
                  </a>
                  <a
                    href="mailto:kosticky@msjghk.cz"
                    className="inline-flex items-center gap-2 text-[15px] text-ink transition-colors duration-200 hover:text-brand-blue"
                  >
                    <Mail className="h-4 w-4 text-ink/60" aria-hidden />
                    kosticky@msjghk.cz
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Školní jídelna */}
        <section className="section-y pt-0">
          <div className="container mx-auto px-6">
            <h2 className="reveal-up section-header-gap font-display text-[28px] font-extrabold text-ink md:text-[32px]">
              Školní jídelna
            </h2>

            <div className="reveal-up rounded-2xl border border-border/60 bg-card p-6 md:p-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                <div>
                  <p className="font-display text-[17px] font-semibold text-ink">Školní jídelna ZŠ</p>
                  <a
                    href="tel:+420495019050"
                    className="mt-1 inline-flex items-center gap-2 font-display text-[22px] font-bold text-brand-blue transition-colors duration-200 hover:text-brand-blue/80 md:text-[26px]"
                  >
                    <Phone className="h-5 w-5" aria-hidden />
                    <span className="tabular-nums">495 019 050</span>
                  </a>
                  <p className="mt-2 text-sm text-body">
                    Odhlašování obědů nejdéle do 10:00 na příští den.
                  </p>
                </div>
                <div>
                  <p className="font-display text-[17px] font-semibold text-ink">Výdejna obědů MŠ</p>
                  <a
                    href="tel:+420495444422"
                    className="mt-1 inline-flex items-center gap-2 font-display text-[22px] font-bold text-brand-blue transition-colors duration-200 hover:text-brand-blue/80 md:text-[26px]"
                  >
                    <Phone className="h-5 w-5" aria-hidden />
                    <span className="tabular-nums">495 444 422</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Barevné třídy */}
        <section className="section-y pt-0">
          <div className="container mx-auto px-6">
            <h2 className="reveal-up section-header-gap font-display text-[28px] font-extrabold text-ink md:text-[32px]">
              Barevné třídy
            </h2>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {classes.map((c, i) => (
                <a
                  key={c.name}
                  href={`tel:${c.tel}`}
                  className="reveal-up group flex items-center gap-4 rounded-2xl border border-border/60 bg-card px-5 py-4 transition-colors duration-200 hover:border-border"
                  style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
                >
                  <span className={`h-3 w-3 shrink-0 rounded-full ${c.dot}`} aria-hidden />
                  <span className="min-w-0 flex-1 font-display text-[15px] font-semibold text-ink">
                    {c.name}
                  </span>
                  <span className="font-display text-[17px] font-semibold tabular-nums text-ink transition-colors duration-200 group-hover:text-brand-blue">
                    {c.phone}
                  </span>
                </a>
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
