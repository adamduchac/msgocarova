import { createFileRoute } from "@tanstack/react-router";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteHero } from "@/components/site-hero";
import { SiteBenefits } from "@/components/site-benefits";
import { SiteDailyRhythm } from "@/components/site-daily-rhythm";
import { SiteAnnouncementBar } from "@/components/site-announcement-bar";
import { SiteClasses } from "@/components/site-classes";
import { SiteActivities } from "@/components/site-activities";
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
      <div style={{ background: "linear-gradient(to bottom, #FEF8E7 0%, #FFFFFF 100%)" }} className="pt-28 sm:pt-32">
        <SiteHero />
        <SiteAnnouncementBar />
      </div>
      <main>
        <SiteBenefits />
        <SiteDailyRhythm />
        <SiteClasses />
        <SiteQuickLinks />
        <div style={{ background: "linear-gradient(to bottom, #FFFFFF 0%, #FEF8E7 40%, #FEF8E7 100%)" }}>
          <SiteActivities />
          <SiteFooter />
        </div>
      </main>
    </div>
  );
}
