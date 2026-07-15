import { createFileRoute } from "@tanstack/react-router";
import { fixPrepositions } from "@/lib/typography";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/zapis-do-skolky")({
  head: () => ({
    meta: [
      { title: "Zápis do školky — Mateřská škola Josefa Gočára" },
      {
        name: "description",
        content:
          "Vše o zápisu do Mateřské školy Josefa Gočára — termíny, potřebné dokumenty a průběh.",
      },
      { property: "og:title", content: "Zápis do školky — Mateřská škola Josefa Gočára" },
      {
        property: "og:description",
        content: "Termíny, dokumenty a průběh zápisu do naší mateřské školy.",
      },
      { property: "og:url", content: "/zapis-do-skolky" },
    ],
    links: [{ rel: "canonical", href: "/zapis-do-skolky" }],
  }),
  component: ZapisPage,
});

function ZapisPage() {
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
              {fixPrepositions("Zápis do školky")}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-body">
              {fixPrepositions(
                "Termíny, potřebné dokumenty a průběh zápisu do Mateřské školy Josefa Gočára."
              )}
            </p>
          </div>
        </section>
      </div>

      <main>
        <section className="section-y-sm scroll-mt-28">
          <div className="container mx-auto px-6">
            <h2 className="font-display text-[28px] font-extrabold text-ink md:text-[32px]">
              {fixPrepositions("Informace k zápisu")}
            </h2>
            <p className="mt-4 max-w-2xl text-body">
              {fixPrepositions("Obsah této stránky brzy doplníme.")}
            </p>
          </div>
        </section>

        <div
          style={{
            background:
              "linear-gradient(to bottom, #FFFFFF 0%, #FEF8E7 40%, #FEF8E7 100%)",
          }}
        >
          <SiteFooter topCubeColor="red" topCubePosition="left" />
        </div>
      </main>
    </div>
  );
}
