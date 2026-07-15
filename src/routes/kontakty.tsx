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
          "Kontakty na Mateřskou školu Josefa Gočára v Hradci Králové — telefon, e-mail, adresa, čísla na jednotlivé třídy a mapu.",
      },
      { property: "og:title", content: "Kontakty — Mateřská škola Josefa Gočára" },
      {
        property: "og:description",
        content:
          "Škroupova 693, 500 02 Hradec Králové. Telefon 495 444 421, kosticky@msjghk.cz.",
      },
      { property: "og:url", content: "/kontakty" },
    ],
    links: [{ rel: "canonical", href: "/kontakty" }],
  }),
  component: KontaktyPage,
});

type PhoneRow = {
  label: string;
  note?: string;
  phone: string;
  tel: string;
  dot?: string;
};

const phones: PhoneRow[] = [
  { label: "Mateřská škola", note: "zástupce ředitele", phone: "495 444 421", tel: "+420495444421" },
  {
    label: "Školní jídelna ZŠ",
    note: "odhlašování obědů — nejdéle do 10:00 na příští den",
    phone: "495 019 050",
    tel: "+420495019050",
  },
  { label: "Výdejna obědů MŠ", phone: "495 444 422", tel: "+420495444422" },
  { label: "Červená kostička", phone: "495 444 425", tel: "+420495444425", dot: "bg-brand-red" },
  { label: "Zelená kostička", phone: "495 444 426", tel: "+420495444426", dot: "bg-brand-green" },
  { label: "Modrá kostička", phone: "495 444 423", tel: "+420495444423", dot: "bg-brand-blue" },
  { label: "Žlutá kostička", phone: "495 444 424", tel: "+420495444424", dot: "bg-brand-yellow" },
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
              <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink/55">
                Napište nám
              </p>
              <h1 className="mt-3 font-display text-[42px] font-extrabold leading-[1.1] text-ink md:text-[56px]">
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
          <div className="container mx-auto grid gap-10 px-6 lg:grid-cols-2 lg:gap-14">
            <div className="reveal-up">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand-green">
                Hlavní kontakt
              </p>

              <a
                href="tel:+420495444421"
                className="mt-5 flex items-center gap-4 font-display text-[34px] font-extrabold leading-tight text-brand-blue transition-colors duration-200 hover:text-brand-blue/80 md:text-[42px]"
              >
                <Phone className="h-8 w-8 shrink-0" aria-hidden />
                495 444 421
              </a>

              <a
                href="mailto:kosticky@msjghk.cz"
                className="mt-3 flex items-center gap-4 font-display text-[24px] font-semibold text-ink transition-colors duration-200 hover:text-brand-blue md:text-[30px]"
              >
                <Mail className="h-6 w-6 shrink-0 text-ink/60" aria-hidden />
                kosticky@msjghk.cz
              </a>

              <div className="mt-8 flex items-start gap-3 text-[15px] leading-relaxed text-body">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-ink/50" aria-hidden />
                <address className="not-italic">
                  <span className="block font-medium text-ink">Mateřská škola Josefa Gočára</span>
                  <span className="block">Škroupova 693</span>
                  <span className="block">500 02 Hradec Králové 2</span>
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

        {/* Vedení */}
        <section className="section-y pt-0">
          <div className="container mx-auto px-6">
            <div className="reveal-up section-header-gap mx-auto max-w-2xl text-center">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink/55">
                Vedení školy
              </p>
              <h2 className="mt-3 font-display text-[30px] font-extrabold text-ink md:text-[36px]">
                Kdo školku vede
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="reveal-up rounded-2xl border border-border/60 bg-card p-6 md:p-8">
                <p className="text-sm font-medium uppercase tracking-[0.14em] text-ink/55">
                  Ředitel ZŠ a MŠ Josefa Gočára
                </p>
                <p className="mt-3 font-display text-2xl font-bold text-ink">
                  Mgr. Petr Sadílek
                </p>
              </div>
              <div
                className="reveal-up rounded-2xl border border-border/60 bg-card p-6 md:p-8"
                style={{ ["--reveal-delay" as string]: "80ms" }}
              >
                <p className="text-sm font-medium uppercase tracking-[0.14em] text-ink/55">
                  Zástupce ředitele pro MŠ
                </p>
                <p className="mt-3 font-display text-2xl font-bold text-ink">
                  Mgr. Jitka Kouklíková
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Telefonní seznam */}
        <section className="section-y pt-0">
          <div className="container mx-auto px-6">
            <div className="reveal-up section-header-gap mx-auto max-w-2xl text-center">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink/55">
                Telefony
              </p>
              <h2 className="mt-3 font-display text-[30px] font-extrabold text-ink md:text-[36px]">
                Zavolejte na správné místo
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {phones.map((p, i) => (
                <a
                  key={p.label}
                  href={`tel:${p.tel}`}
                  className="reveal-up group flex items-center gap-4 rounded-2xl border border-border/60 bg-card px-5 py-4 transition-colors duration-200 hover:border-border"
                  style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
                >
                  {p.dot ? (
                    <span
                      className={`h-3 w-3 shrink-0 rounded-full ${p.dot}`}
                      aria-hidden
                    />
                  ) : (
                    <Phone className="h-5 w-5 shrink-0 text-ink/50" aria-hidden />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[15px] font-semibold text-ink">
                      {p.label}
                    </span>
                    {p.note && (
                      <span className="block text-sm text-body">{p.note}</span>
                    )}
                  </span>
                  <span className="font-display text-[17px] font-semibold tabular-nums text-ink transition-colors duration-200 group-hover:text-brand-blue">
                    {p.phone}
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
