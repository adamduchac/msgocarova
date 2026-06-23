import { createFileRoute } from "@tanstack/react-router";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteHero } from "@/components/site-hero";
import { SiteNewsCarousel } from "@/components/site-news-carousel";
import { SiteBenefits } from "@/components/site-benefits";
import { SiteClasses } from "@/components/site-classes";
import { SiteTeam } from "@/components/site-team";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MŠ Josefa Gočára — Mateřská škola v centru Hradce Králové" },
      {
        name: "description",
        content:
          "Mateřská škola Josefa Gočára v centru Hradce Králové. Místo, kde děti objevují svět vlastním tempem a dny jsou plné her i opravdových zážitků.",
      },
      { property: "og:title", content: "MŠ Josefa Gočára — Mateřská škola v centru Hradce Králové" },
      {
        property: "og:description",
        content:
          "Mateřská škola v centru Hradce Králové, kde vaše dítě objevuje svět vlastním tempem.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />
      <main>
        <SiteHero />
        <SiteNewsCarousel />
        <SiteBenefits />
        <SiteClasses />
        <SiteTeam />
        <SiteFooter />
        {/* Další sekce budou doplněny v dalších krocích. */}
      </main>
    </div>
  );
}
