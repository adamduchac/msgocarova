import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Phone, ClipboardList, FileCheck, ArrowRight, Sun } from "lucide-react";
import { fixPrepositions } from "@/lib/typography";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { CmsStatusBlock } from "@/components/cms-status-block";
import { siteCopyQueryOptions, useCopyPage } from "@/lib/use-copy";

export const Route = createFileRoute("/zapis-do-skolky")({
  loader: ({ context }) => context.queryClient.ensureQueryData(siteCopyQueryOptions("zapis-do-skolky")),
  head: () => ({
    meta: [
      { title: "Zápis do školky — Mateřská škola Josefa Gočára" },
      {
        name: "description",
        content:
          "Termíny, kritéria a dokumenty k zápisu do Mateřské školy Josefa Gočára. Aktuální stav zápisu, průběh a co si připravit.",
      },
      { property: "og:title", content: "Zápis do školky — Mateřská škola Josefa Gočára" },
      {
        property: "og:description",
        content: "Aktuální stav zápisu, průběh, potřebné dokumenty a informace o prázdninovém provozu.",
      },
      { property: "og:url", content: "/zapis-do-skolky" },
    ],
    links: [{ rel: "canonical", href: "/zapis-do-skolky" }],
  }),
  component: ZapisPage,
});

const t = fixPrepositions;

function ZapisPage() {
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
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue">
                <span className="mr-2 inline-block h-1.5 w-1.5 translate-y-[-2px] rounded-full bg-brand-blue align-middle" />
                {t("Pro rodiče")}
              </p>
              <h1 className="mt-3 font-display text-[42px] font-extrabold leading-[1.05] text-ink md:text-[56px]">
                {t("Zápis do mateřské školy")}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-body">
                {t(
                  "Zápis do naší školky probíhá jednou ročně, zpravidla na jaře. Na této stránce najdete aktuální termín, kritéria a vše, co je k zápisu potřeba. Přihlašování i komunikaci vedeme přes aplikaci Naše MŠ."
                )}
              </p>
            </div>
          </div>
        </section>
      </div>

      <main>
        {/* Status + hlavní 3sloupcový grid (jedna sekce) */}
        <section className="section-y-md">
          <div className="container mx-auto px-6">
            <CmsStatusBlock
              page="zapis"
              fallbackVariant="closed"
              fallbackTitle="Zápis pro školní rok 2026/2027 je uzavřen"
              fallbackBody={
                <p>
                  {t(
                    "Termín zápisu pro školní rok 2027/2028 zatím nebyl vyhlášen. Jakmile bude známý, zveřejníme ho zde, na nástěnkách školky a v aplikaci Naše MŠ."
                  )}
                </p>
              }
            />

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <article className="reveal-up rounded-2xl border border-black/[0.06] bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue"
                  >
                    <ClipboardList className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-ink">
                    {t("Jak zápis probíhá")}
                  </h3>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-body">
                  {t(
                    "Termín, místo i kritéria pro přijetí stanovuje ředitel školy a zveřejňuje je předem na webu a informačních letácích. Do školky přijímáme děti zpravidla od 3 do 6 let, nejdříve však od 2 let. Pro děti, které do začátku školního roku dosáhnou 5 let, je předškolní vzdělávání povinné. Děti lze přijmout i v průběhu roku, pokud to dovolí kapacita."
                  )}
                </p>
              </article>

              <article className="reveal-up rounded-2xl border border-black/[0.06] bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/15 text-brand-green"
                  >
                    <FileCheck className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-ink">
                    {t("Co si k zápisu připravit")}
                  </h3>
                </div>
                <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-body">
                  <li className="flex gap-2">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                    <span>
                      {t("vyplněnou žádost o přijetí")}{" "}
                      <Link
                        to="/pro-rodice"
                        hash="dokumenty"
                        className="font-medium text-brand-blue underline-offset-4 hover:underline"
                      >
                        {t("(Dokumenty ke stažení)")}
                      </Link>
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                    <span>{t("rodný list dítěte")}</span>
                  </li>
                  <li className="flex gap-2">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                    <span>{t("průkaz totožnosti zákonného zástupce")}</span>
                  </li>
                  <li className="flex gap-2">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                    <span>
                      {t(
                        "potvrzení dětského lékaře o očkování (součást žádosti); u dětí s povinným předškolním vzděláváním se doklad o očkování nevyžaduje"
                      )}
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                    <span>
                      {t(
                        "případně vyjádření školského poradenského zařízení (u dětí se speciálními vzdělávacími potřebami)"
                      )}
                    </span>
                  </li>
                </ul>
              </article>

              <article className="reveal-up rounded-2xl border border-black/[0.06] bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-yellow/20 text-ink"
                  >
                    <Sun className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-ink">
                    {t("Prázdninový provoz (červenec–srpen)")}
                  </h3>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-body">
                  {t(
                    "V létě můžeme přijmout i děti z jiných školek, a to na dobu, kdy má jejich kmenová školka omezený nebo přerušený provoz. Přednost mají děti ze spádového obvodu a s trvalým bydlištěm v Hradci Králové; při převisu rozhoduje los. Podrobná pravidla najdete v dokumentech."
                  )}{" "}
                  <Link
                    to="/pro-rodice"
                    hash="dokumenty"
                    className="inline-flex items-center gap-1 font-medium text-brand-blue underline-offset-4 hover:underline"
                  >
                    {t("Pravidla přijímání")}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </p>
              </article>
            </div>

            <div className="mt-8 reveal-up rounded-2xl border border-black/[0.06] bg-[#FEF8E7]/60 p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)] md:p-10">
              <h3 className="font-display text-xl font-extrabold text-ink">
                {t("Po přijetí")}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-body">
                {t(
                  "Rodiče nově přijatých dětí zveme na společnou schůzku před začátkem docházky, kde se dozvíte vše k nástupu a předáte zbývající dokumenty (evidenční list, přihlášku ke stravování, pověření k vyzvedávání)."
                )}
              </p>
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
          <section className="section-y-sm">
            <div className="container mx-auto px-6">
              <div className="reveal-up">
                <h3 className="font-display text-2xl font-extrabold text-ink md:text-3xl">
                  {t("Máte dotaz k zápisu?")}
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
