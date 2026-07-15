import { ArrowRight } from "lucide-react";
import { fixPrepositions } from "@/lib/typography";
import iconNews from "@/assets/icon-news-claymation.webp.asset.json";

export function SiteAnnouncementBar() {
  return (
    <section aria-label="Aktuální oznámení" className="px-6 pt-2 pb-6">
      <div className="container mx-auto px-6">
        <a
          href="#aktuality"
          aria-label="Podrobnosti k poslednímu dni školky 26. 6. 2026"
          className="group relative block rounded-2xl bg-cream shadow-[0_8px_24px_-18px_rgba(16,15,16,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background px-4 py-5 sm:px-5 sm:py-3.5"
        >
          {/* Mobile: vertikální stack ikona / text / button */}
          <div className="flex flex-col items-center gap-4 sm:hidden">
            <span className="grid h-[72px] w-[72px] shrink-0 place-items-center rounded-full bg-white">
              <img
                src={iconNews.url}
                alt=""
                aria-hidden="true"
                className="h-12 w-12 object-contain"
                loading="lazy"
              />
            </span>
            <p className="text-center text-base leading-relaxed text-ink font-medium">
              <span className="font-semibold">{fixPrepositions("Poslední den školky 26. 6. 2026.")}</span>
            </p>
            <span
              className="inline-flex h-11 items-center rounded-full bg-ink px-5 text-sm font-medium text-white"
              aria-hidden="true"
            >
              {fixPrepositions("Podrobnosti")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          </div>

          {/* sm+ : původní layout s absolutními prvky */}
          <div className="hidden sm:block">
            <div className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 grid h-20 w-20 shrink-0 place-items-center rounded-full bg-white">
              <img
                src={iconNews.url}
                alt=""
                aria-hidden="true"
                className="h-14 w-14 object-contain"
                loading="lazy"
              />
            </div>

            <p className="min-h-20 flex items-center justify-center text-center text-lg leading-relaxed text-ink font-medium px-[112px]">
              <span>
                <span className="font-semibold">{fixPrepositions("Poslední den školky 26. 6. 2026.")}</span>{" "}
                <span className="text-body font-normal">
                  {fixPrepositions("Těšíme se na viděnou v novém školním roce. Užijte si prázdniny!")}
                </span>
              </span>
            </p>

            <span className="absolute right-5 top-1/2 -translate-y-1/2 flex">
              <span
                className="inline-flex items-center h-12 rounded-full bg-ink text-white overflow-hidden"
                aria-hidden="true"
              >
                <span
                  className="overflow-hidden whitespace-nowrap text-base font-medium max-w-0 opacity-0 px-0 group-hover:max-w-[180px] group-hover:opacity-100 group-hover:pl-4 group-hover:pr-1 group-focus-visible:max-w-[180px] group-focus-visible:opacity-100 group-focus-visible:pl-4 group-focus-visible:pr-1"
                  style={{
                    transitionProperty: "max-width, opacity, padding",
                    transitionDuration: "560ms",
                    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  {fixPrepositions("Podrobnosti")}
                </span>
                <span className="grid place-items-center h-12 w-12 shrink-0">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </span>
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}
