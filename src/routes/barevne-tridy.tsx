import { createFileRoute } from "@tanstack/react-router";
import { fixPrepositions } from "@/lib/typography";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/barevne-tridy")({
  head: () => ({
    meta: [
      { title: "Barevné třídy — Mateřská škola Josefa Gočára" },
      {
        name: "description",
        content:
          "Čtyři barevné kostičky — Červená, Zelená, Modrá a Žlutá třída Mateřské školy Josefa Gočára.",
      },
      { property: "og:title", content: "Barevné třídy — Mateřská škola Josefa Gočára" },
      {
        property: "og:description",
        content: "Poznejte naše barevné třídy a jejich paní učitelky.",
      },
      { property: "og:url", content: "/barevne-tridy" },
    ],
    links: [{ rel: "canonical", href: "/barevne-tridy" }],
  }),
  component: BarevneTridyPage,
});

const sections = [
  { id: "cervena", title: fixPrepositions("Červená kostička") },
  { id: "zelena", title: fixPrepositions("Zelená kostička") },
  { id: "modra", title: fixPrepositions("Modrá kostička") },
  { id: "zluta", title: fixPrepositions("Žlutá kostička") },
];

function BarevneTridyPage() {
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
              {fixPrepositions("Barevné třídy")}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-body">
              {fixPrepositions(
                "U nás si každé dítě najde svoji kostičku. Prohlédněte si jednotlivé třídy."
              )}
            </p>
          </div>
        </section>
      </div>

      <main>
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="section-y-sm scroll-mt-28">
            <div className="container mx-auto px-6">
              <h2 className="font-display text-[28px] font-extrabold text-ink md:text-[32px]">
                {s.title}
              </h2>
              <p className="mt-4 max-w-2xl text-body">
                {fixPrepositions("Obsah této sekce brzy doplníme.")}
              </p>
            </div>
          </section>
        ))}

        <div
          style={{
            background:
              "linear-gradient(to bottom, #FFFFFF 0%, #FEF8E7 40%, #FEF8E7 100%)",
          }}
        >
          <SiteFooter topCubeColor="red" topCubePosition="right" />
        </div>
      </main>
    </div>
  );
}
