import { ArrowRight } from "lucide-react";
import iconNews from "@/assets/icon-news-claymation.webp.asset.json";

export function SiteAnnouncementBar() {
  return (
    <section aria-label="Aktuální oznámení" className="px-6 pt-2 pb-6">
      <div className="container mx-auto px-6">
        <a
          href="#aktuality"
          aria-label="Podrobnosti k poslednímu dni školky 26. 6. 2026"
          className="group block rounded-2xl bg-cream shadow-[0_8px_24px_-18px_rgba(16,15,16,0.25)] card-hover-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <div
            className="grid items-center gap-4 sm:gap-6 px-3 sm:px-5 py-3 sm:py-3.5"
            style={{ gridTemplateColumns: "auto minmax(0,1fr) auto" }}
          >
            {/* Levá ikona */}
            <div className="grid h-[72px] w-[72px] sm:h-20 sm:w-20 shrink-0 place-items-center rounded-full bg-white">
              <img
                src={iconNews.url}
                alt=""
                aria-hidden="true"
                className="h-12 w-12 sm:h-14 sm:w-14 object-contain"
                loading="lazy"
              />
            </div>

            {/* Sdělení */}
            <p className="min-w-0 text-sm sm:text-base text-ink font-medium text-center px-1 sm:px-3">
              <span className="font-semibold">Poslední den školky 26. 6. 2026.</span>{" "}
              <span className="hidden sm:inline text-body font-normal">
                Těšíme se na viděnou v novém školním roce. Užijte si prázdniny!
              </span>
            </p>

            {/* CTA pill: kruh se šipkou, rozbalí se vlevo na „Podrobnosti →" */}
            <span
              className="inline-flex items-center h-[72px] sm:h-20 rounded-full bg-ink text-white overflow-hidden"
              aria-hidden="true"
            >
              <span
                className="overflow-hidden whitespace-nowrap text-sm sm:text-base font-medium max-w-0 opacity-0 group-hover:max-w-[180px] group-hover:opacity-100 group-focus-visible:max-w-[180px] group-focus-visible:opacity-100"
                style={{
                  transitionProperty: "max-width, opacity, padding",
                  transitionDuration: "300ms",
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                  paddingLeft: "1.25rem",
                  paddingRight: "0.25rem",
                }}
              >
                Podrobnosti
              </span>
              <span className="grid place-items-center h-[72px] w-[72px] sm:h-20 sm:w-20 shrink-0">
                <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </span>
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}
