import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { fixPrepositions } from "@/lib/typography";
import preschool from "@/assets/activity-preschool.jpg.asset.json";
import box2 from "@/assets/box2-2.webp.asset.json";
import box3 from "@/assets/box3-2.webp.asset.json";

type Activity = {
  title: string;
  text: string;
  image: string;
  alt: string;
  href: "/pro-rodice" | "/vzdelavani-a-rozvoj" | "/akce-s-rodici" | "/predskolacek";
  hash?: string;
};

const activities: Activity[] = [
  {
    title: fixPrepositions("Klub Předškoláček"),
    text: fixPrepositions(
      "Cílená a hravá příprava na zápis do 1. třídy. Trénujeme grafomotoriku, soustředění a logiku tak, aby se děti do školy těšily."
    ),
    image: preschool.url,
    alt: "Soustředěný předškolák kreslí tužkou u stolu",
    href: "/predskolacek",
  },
  {
    title: fixPrepositions("Vzdělávání a aktivity"),
    text: fixPrepositions(
      "S dětmi nezůstáváme jen za plotem. Pravidelně jezdíme na předplavecký výcvik, pořádáme lyžařské kurzy a jarní školy v přírodě."
    ),
    image: box2.url,
    alt: "Děti si hrají a cákají ve venkovním bazénu na školní zahradě",
    href: "/vzdelavani-a-rozvoj",
  },
  {
    title: fixPrepositions("Akce s rodiči"),
    text: fixPrepositions(
      "Školka pro nás nekončí odpoledním vyzvednutím. Pořádáme společné tvořivé dílničky, „Večer se strašidly“ nebo jarní zahradní brigády."
    ),
    image: box3.url,
    alt: "Rodiče s dětmi opékají buřty u ohniště na zahradě školky",
    href: "/akce-s-rodici",
  },
];

export function SiteActivities() {
  return (
    <section id="aktuality" className="section-y">
      <div className="container mx-auto px-6">
        <div className="reveal-up section-header-gap mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[34px] font-extrabold text-ink md:text-[40px]">
            {fixPrepositions("Zážitky, které si děti odnáší")}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
          {activities.map((a, i) => (
            <Link
              key={a.title}
              to={a.href}
              hash={a.hash}
              className="card-hover reveal-up group relative block cursor-pointer overflow-hidden rounded-2xl border border-border/70 bg-card no-underline shadow-[0_10px_30px_-18px_rgba(15,23,42,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
              style={{ ["--reveal-delay" as string]: `${i * 60}ms`, minHeight: "440px" }}
              aria-label={fixPrepositions(`Číst dále: ${a.title}`)}
            >
              <div className="activity-shift flex h-full flex-col transition-transform duration-300 ease-out motion-reduce:transform-none group-hover:-translate-y-14 group-focus-within:-translate-y-14">
                <div className="aspect-[5/3] w-full overflow-hidden">
                  <img
                    src={a.image}
                    alt={a.alt}
                    width={1024}
                    height={614}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-xl font-semibold text-ink">{a.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-body">{a.text}</p>
                </div>
              </div>

              <span className="activity-cta group/cta pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-center gap-2 px-7 pb-7 pt-3 text-[15px] font-medium text-brand-red opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none">
                {fixPrepositions("Číst dále")}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover/cta:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
