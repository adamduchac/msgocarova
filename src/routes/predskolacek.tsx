import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, GraduationCap, ListChecks } from "lucide-react";
import { fixPrepositions } from "@/lib/typography";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { StatusBlock } from "@/components/status-block";

export const Route = createFileRoute("/predskolacek")({
  head: () => ({
    meta: [
      { title: "Předškoláček — Mateřská škola Josefa Gočára" },
      {
        name: "description",
        content:
          "Program Předškoláček pro budoucí prvňáčky a jejich rodiče. Aktuální termíny, průběh setkání a na co se zaměřujeme.",
      },
      { property: "og:title", content: "Předškoláček — Mateřská škola Josefa Gočára" },
      {
        property: "og:description",
        content:
          "Hravá příprava budoucích prvňáčků společně s rodiči. Termíny, průběh a přihlašování přes aplikaci Naše MŠ.",
      },
      { property: "og:url", content: "/predskolacek" },
    ],
    links: [{ rel: "canonical", href: "/predskolacek" }],
  }),
  component: PredskolacekPage,
});

const t = fixPrepositions;

function PredskolacekPage() {
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
            <div className="reveal-up max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-red">
                <span className="mr-2 inline-block h-1.5 w-1.5 translate-y-[-2px] rounded-full bg-brand-red align-middle" />
                {t("Pro rodiče")}
              </p>
              <h1 className="mt-3 font-display text-[42px] font-extrabold leading-[1.05] text-ink md:text-[56px]">
                {t("Předškoláček")}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-body">
                {t(
                  "Předškoláček je program pro budoucí prvňáčky a jejich rodiče. Hravou formou v něm procvičujeme dovednosti důležité pro vstup do první třídy — a zároveň je to společně strávený čas dítěte s rodičem. Setkání vedou naše učitelky v malých skupinkách přibližně deseti dětí."
                )}
              </p>
            </div>
          </div>
        </section>
      </div>

      <main>
        {/* Stavový blok */}
        <section className="section-y-sm">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <StatusBlock
                variant="closed"
                title="Termíny Předškoláčka pro rok 2027 zatím nebyly vyhlášeny"
              >
                <p>
                  {t(
                    "Jakmile budou termíny známé, najdete je zde a v aplikaci Naše MŠ. Přihlásit se pak bude možné přes aplikaci nebo osobně ve své třídě."
                  )}
                </p>
              </StatusBlock>
            </div>
          </div>
        </section>

        {/* Dva boxy 1/2 + 1/2 */}
        <section className="section-y-md">
          <div className="container mx-auto px-6">
            <div className="mx-0 grid max-w-4xl gap-6 md:grid-cols-2">
              <article className="reveal-up rounded-2xl border border-black/[0.06] bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red/10 text-brand-red"
                  >
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-ink">
                    {t("Jak Předškoláček probíhá")}
                  </h3>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-body">
                  {t(
                    "Program probíhá v Červené i Zelené kostičce, vždy 3× v období únor až březen, od 15:30 do 16:20. Rodiče jsou u toho — vidí své dítě při práci a odnášejí si náměty pro společné aktivity doma. Z každého setkání si děti odnášejí 10 úkolů. Aktivity jsou pestré a přiměřené věku; účast je dobrovolná. Prosíme, aby se setkání neúčastnili mladší sourozenci."
                  )}
                </p>
              </article>

              <article className="reveal-up rounded-2xl border border-black/[0.06] bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/15 text-brand-green"
                  >
                    <ListChecks className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-ink">
                    {t("Na co se zaměřujeme")}
                  </h3>
                </div>
                <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-body">
                  {[
                    "grafomotorika — jemná i hrubá motorika, správný úchop tužky",
                    "řeč — komunikace, výslovnost, slovní zásoba",
                    "sluch — vnímání rytmu a melodie řeči (příprava na čtení a psaní)",
                    "zrak — rozlišování tvarů a barev, zraková paměť",
                    "prostorová a pravolevá orientace — důležitá pro čtení zleva doprava",
                    "matematické představy — základní tvary a jejich třídění",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                      <span>{t(item)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* Infobox 1/1 */}
        <section className="section-y-md">
          <div className="container mx-auto px-6">
            <div className="reveal-up max-w-4xl rounded-2xl border border-black/[0.06] bg-[#FEF8E7]/60 p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)] md:p-10">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="font-display text-xl font-extrabold text-ink">
                    {t("Co si přinést")}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-body">
                    {t(
                      "Trojhrannou tužku (silnější), pastelky, ořezávátko, desky na úkoly a 30 kancelářských papírů."
                    )}
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl font-extrabold text-ink">
                    {t("Přihlášení")}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-body">
                    {t(
                      "Přihlásit se můžete v aplikaci Naše MŠ nebo osobně ve své třídě, nejpozději do [DOPLNIT datum]. Kvůli přípravě pomůcek je přihlášení předem nutné — počítáme s vámi na všechna 3 setkání."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Kontakt CTA */}
        <div
          style={{
            background:
              "linear-gradient(to bottom, #FFFFFF 0%, #FEF8E7 40%, #FEF8E7 100%)",
          }}
        >
          <section className="section-y-md">
            <div className="container mx-auto px-6">
              <div className="reveal-up max-w-4xl">
                <h3 className="font-display text-2xl font-extrabold text-ink md:text-3xl">
                  {t("Máte dotaz k Předškoláčkovi?")}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-body">
                  {t("Ozvěte se nám, rádi vše zodpovíme.")}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="mailto:kostičky@msjghk.cz"
                    className="inline-flex h-11 items-center gap-2 rounded-md bg-brand-blue px-5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-brand-blue/90"
                  >
                    <Mail className="h-4 w-4" aria-hidden />
                    kostičky@msjghk.cz
                  </a>
                  <a
                    href="tel:+420495444421"
                    className="inline-flex h-11 items-center gap-2 rounded-md border border-black/10 bg-white px-5 text-[15px] font-semibold text-ink transition-colors duration-200 hover:bg-white/70"
                  >
                    <Phone className="h-4 w-4" aria-hidden />
                    495 444 421
                  </a>
                </div>
              </div>
            </div>
          </section>

          <SiteFooter topCubeColor="yellow" topCubePosition="left" showBottomCube={false} />
        </div>
      </main>
    </div>
  );
}
