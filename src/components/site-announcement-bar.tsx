import { ArrowRight } from "lucide-react";
import iconNews from "@/assets/icon-news-claymation.webp.asset.json";

export function SiteAnnouncementBar() {
  return (
    <section aria-label="Aktuální oznámení" className="px-6 pt-2 pb-6">
      <div className="container mx-auto px-6">
        <a
          href="#aktuality"
          aria-label="Podrobnosti k poslednímu dni školky 26. 6. 2026"
          className="group relative block rounded-2xl bg-cream shadow-[0_8px_24px_-18px_rgba(16,15,16,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background px-3 sm:px-5 py-3 sm:py-3.5"
        >
          {/* Levá ikona — absolutně, aby nevychylovala střed textu */}
          <div className="pointer-events-none absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 grid h-[72px] w-[72px] sm:h-20 sm:w-20 shrink-0 place-items-center rounded-full bg-white">
            <img
              src={iconNews.url}
              alt=""
              aria-hidden="true"
              className="h-12 w-12 sm:h-14 sm:w-14 object-contain"
              loading="lazy"
            />
          </div>

          {/* Sdělení — přes celou šířku, na střed celého boxu */}
          <p className="min-h-[72px] sm:min-h-20 flex items-center justify-center text-center text-base sm:text-lg leading-relaxed text-ink font-medium px-[92px] sm:px-[112px]">
            <span>
              <span className="font-semibold">Poslední den školky 26. 6. 2026.</span>{" "}
              <span className="hidden sm:inline text-body font-normal">
                Těšíme se na viděnou v novém školním roce. Užijte si prázdniny!
              </span>
            </span>
          </p>

          {/* CTA pill — absolutně vpravo */}
          <span className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 flex">
            <span
              className="inline-flex items-center h-11 sm:h-12 rounded-full bg-ink text-white overflow-hidden"
              aria-hidden="true"
            >
              <span
                className="overflow-hidden whitespace-nowrap text-sm sm:text-base font-medium max-w-0 opacity-0 px-0 group-hover:max-w-[180px] group-hover:opacity-100 group-hover:pl-4 group-hover:pr-1 group-focus-visible:max-w-[180px] group-focus-visible:opacity-100 group-focus-visible:pl-4 group-focus-visible:pr-1"
                style={{
                  transitionProperty: "max-width, opacity, padding",
                  transitionDuration: "560ms",
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                Podrobnosti
              </span>
              <span className="grid place-items-center h-11 w-11 sm:h-12 sm:w-12 shrink-0">
                <ArrowRight className="h-4 w-4" />
              </span>
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}
