import { ArrowRight } from "lucide-react";
import iconNews from "@/assets/icon-news-claymation.webp.asset.json";

export function SiteAnnouncementBar() {
  return (
    <section aria-label="Aktuální oznámení" className="px-4 sm:px-6 lg:px-8 pt-2 pb-6">
      <div className="mx-auto max-w-6xl">
        <div
          className="grid items-center gap-3 sm:gap-4 rounded-2xl bg-cream px-3 sm:px-5 py-3 sm:py-3.5 shadow-[0_8px_24px_-18px_rgba(16,15,16,0.25)]"
          style={{ gridTemplateColumns: "auto minmax(0,1fr) auto" }}
        >
          <div className="grid h-11 w-11 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-full bg-white shadow-[0_2px_8px_-4px_rgba(16,15,16,0.2)]">
            <img
              src={iconNews.url}
              alt=""
              aria-hidden="true"
              className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
              loading="lazy"
            />
          </div>
          <p className="min-w-0 text-sm sm:text-base text-ink font-medium text-center px-1 sm:px-3">
            <span className="font-semibold">Poslední den školky 26. 6. 2026.</span>{" "}
            <span className="hidden sm:inline">Těšíme se na viděnou v novém školním roce. Užijte si prázdniny!</span>
          </p>
          <a
            href="#aktuality"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ink text-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium hover:bg-ink/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          >
            <span className="hidden sm:inline">Podrobnosti</span>
            <span className="sm:hidden">Více</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
