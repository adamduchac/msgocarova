import { createFileRoute } from "@tanstack/react-router";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/o-skolce")({
  head: () => ({
    meta: [
      { title: "O školce — Mateřská škola Josefa Gočára" },
      {
        name: "description",
        content:
          "Představení, vize, vzdělávací přístup, tým, veřejné hřiště a školní jídelna Mateřské školy Josefa Gočára v Hradci Králové.",
      },
      { property: "og:title", content: "O školce — Mateřská škola Josefa Gočára" },
      {
        property: "og:description",
        content:
          "Kdo jsme, jak vzděláváme, kdo se stará o děti a jaké zázemí nabízíme.",
      },
      { property: "og:url", content: "/o-skolce" },
    ],
    links: [{ rel: "canonical", href: "/o-skolce" }],
  }),
  component: OSkolcePage,
});

const sections = [
  { id: "vize", title: "Představení a vize" },
  { id: "vzdelavani", title: "Vzdělávání" },
  { id: "tym", title: "Náš tým" },
  { id: "hriste", title: "Veřejné hřiště" },
  { id: "jidelna", title: "Školní jídelna" },
];

function OSkolcePage() {
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
              O školce
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-body">
              Pár slov o nás, o tom, jak vzděláváme, kdo se u nás stará o děti a co dalšího nabízíme.
            </p>
          </div>
        </section>
      </div>

      <main>
        {sections.map((s) => (
          <section
            key={s.id}
            id={s.id}
            className="section-y-sm scroll-mt-28"
          >
            <div className="container mx-auto px-6">
              <h2 className="font-display text-[28px] font-extrabold text-ink md:text-[32px]">
                {s.title}
              </h2>
              <p className="mt-4 max-w-2xl text-body">
                Obsah této sekce brzy doplníme.
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
          <SiteFooter topCubeColor="blue" topCubePosition="right" />
        </div>
      </main>
    </div>
  );
}
