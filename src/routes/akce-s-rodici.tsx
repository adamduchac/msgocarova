import { createFileRoute } from "@tanstack/react-router";
import { fixPrepositions } from "@/lib/typography";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import rodice1 from "@/assets/akce/rodice1.webp.asset.json";
import rodice2 from "@/assets/akce/rodice2.webp.asset.json";
import rodice3 from "@/assets/akce/rodice3.webp.asset.json";

const t = fixPrepositions;

export const Route = createFileRoute("/akce-s-rodici")({
  head: () => ({
    meta: [
      { title: "Akce s rodiči — Mateřská škola Josefa Gočára" },
      {
        name: "description",
        content:
          "Společná setkání rodin ve školce — od podzimního dlabání dýní přes vánoční posezení až po květnové Slavnosti školy na zahradě.",
      },
      { property: "og:title", content: "Akce s rodiči — Mateřská škola Josefa Gočára" },
      {
        property: "og:description",
        content:
          "Přehled tradičních akcí, kdy se ve školce potkávají celé rodiny — tvoření, slavnosti, výlety a další společné události.",
      },
      { property: "og:url", content: "/akce-s-rodici" },
    ],
    links: [{ rel: "canonical", href: "/akce-s-rodici" }],
  }),
  component: AkceSRodiciPage,
});

const photos = [
  { url: rodice1.url, alt: "Rodiče a děti pohromadě ve školce" },
  { url: rodice2.url, alt: "Společné tvoření rodin ve školce" },
  { url: rodice3.url, alt: "Slavnostní setkání rodin na zahradě školky" },
];

const events: { title: string; text: string }[] = [
  {
    title: "Tvoření dýňáčků",
    text: "Dlabání dýní s rodiči a sourozenci.",
  },
  {
    title: "Podvečer se strašidly",
    text: "Večer plný světýlek a fantazie.",
  },
  {
    title: "Vánoční posezení",
    text: "Společné naladění na advent s krátkým vystoupením dětí.",
  },
  {
    title: "Den rodin",
    text: "Odpoledne s programem a opékáním buřtů.",
  },
  {
    title: "Slavnosti školy",
    text: "Květnové setkání na školní zahradě s divadlem.",
  },
  {
    title: "Loučení s předškoláky",
    text: "Slavnostní rozloučení s dětmi odcházejícími do ZŠ.",
  },
  {
    title: "Péče o zahradu",
    text: "Společně zvelebujeme venkovní prostředí pro děti.",
  },
  {
    title: "Nabídky rodičů",
    text: "Vítáme exkurze, materiály i další podněty, které obohatí program školky.",
  },
];

function AkceSRodiciPage() {
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
              <h1 className="font-display text-[42px] font-extrabold leading-[1.05] text-ink md:text-[56px]">
                {t("Akce s rodiči")}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-body md:text-xl">
                {t(
                  "Během roku se ve školce potkávají nejen děti s učitelkami, ale i celé rodiny — od podzimního dlabání dýní přes vánoční posezení až po květnové Slavnosti školy na zahradě. Některé akce se opakují každý rok, jiné vznikají i z nápadů a nabídek samotných rodičů. Aktuální termíny najdete v aplikaci Naše MŠ."
                )}
              </p>
            </div>
          </div>
        </section>
      </div>

      <main>
        {/* Photo gallery */}
        <section className="section-y-sm">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
              {photos.map((p, i) => (
                <div
                  key={i}
                  className="reveal-up aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border/60"
                  style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                >
                  <img
                    src={p.url}
                    alt={t(p.alt)}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Events list */}
        <section className="section-y-md">
          <div className="container mx-auto px-6">
            <div className="reveal-up mx-auto max-w-3xl">
              <h2 className="font-display text-[28px] font-extrabold leading-[1.15] text-ink md:text-[34px]">
                {t("Přehled akcí")}
              </h2>
              <ul className="mt-8 divide-y divide-black/5 border-y border-black/5">
                {events.map((e) => (
                  <li key={e.title} className="py-5">
                    <p className="font-display text-lg font-semibold text-ink">
                      {t(e.title)}
                      <span className="font-normal text-body"> — {t(e.text)}</span>
                    </p>
                  </li>
                ))}
                <li className="py-5">
                  <p className="font-display text-lg font-semibold text-ink/60">
                    {t("a další…")}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <SiteFooter topCubeColor="yellow" topCubePosition="right" showBottomCube={false} />
      </main>
    </div>
  );
}
