import { createFileRoute } from "@tanstack/react-router";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/pro-rodice")({
  head: () => ({
    meta: [
      { title: "Pro rodiče — Mateřská škola Josefa Gočára" },
      {
        name: "description",
        content:
          "Praktické informace pro rodiče — platby, program dne, výbava do školky a dokumenty ke stažení.",
      },
      { property: "og:title", content: "Pro rodiče — Mateřská škola Josefa Gočára" },
      {
        property: "og:description",
        content: "Vše potřebné pro pohodový nástup i každodenní chod v naší školce.",
      },
      { property: "og:url", content: "/pro-rodice" },
    ],
    links: [{ rel: "canonical", href: "/pro-rodice" }],
  }),
  component: ProRodicePage,
});

const sections = [
  { id: "platby", title: "Platby" },
  { id: "program-dne", title: "Program dne" },
  { id: "vybava", title: "Výbava do školky" },
  { id: "dokumenty", title: "Dokumenty ke stažení" },
];

function ProRodicePage() {
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
              Pro rodiče
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-body">
              Praktické informace pro každodenní chod i pohodový nástup do školky.
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
          <SiteFooter topCubeColor="blue" topCubePosition="left" />
        </div>
      </main>
    </div>
  );
}
