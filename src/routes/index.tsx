import { createFileRoute } from "@tanstack/react-router";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteHero } from "@/components/site-hero";
import { SiteQuickLinks } from "@/components/site-quick-links";
import { SiteAbout } from "@/components/site-about";
import { SiteBenefits } from "@/components/site-benefits";
import { SiteClasses } from "@/components/site-classes";
import { SiteActivities } from "@/components/site-activities";
import { SiteNews } from "@/components/site-news";
import { SiteCtaBanner } from "@/components/site-cta-banner";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MŠ Josefa Gočára — Mateřská škola v centru Hradce Králové" },
      {
        name: "description",
        content:
          "Mateřská škola Josefa Gočára v centru Hradce Králové. Místo, kde si děti hrají, objevují a rostou — bezpečné zázemí, velká zahrada a respektující přístup.",
      },
      { property: "og:title", content: "MŠ Josefa Gočára — Mateřská škola v centru Hradce Králové" },
      {
        property: "og:description",
        content:
          "Místo, kde si děti hrají, objevují a rostou. Velká zahrada, respektující přístup, hravá angličtina.",
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
        <SiteQuickLinks />
        <SiteAbout />
        <SiteBenefits />
        <SiteClasses />
        <SiteActivities />
        <SiteNews />
        <SiteCtaBanner />
      </main>
      <SiteFooter />
    </div>
  );
}
