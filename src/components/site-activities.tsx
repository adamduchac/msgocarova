import { ArrowRight } from "lucide-react";
import preschool from "@/assets/activity-preschool.jpg.asset.json";
import sport from "@/assets/activity-sport.jpg.asset.json";
import parents from "@/assets/activity-parents.jpg.asset.json";

type Activity = {
  title: string;
  text: string;
  image: string;
  alt: string;
  href: string;
};

const activities: Activity[] = [
  {
    title: "Klub Předškoláček",
    text: "Cílená a hravá příprava na zápis do 1. třídy. Trénujeme grafomotoriku, soustředění a logiku tak, aby se děti do školy těšily.",
    image: preschool.url,
    alt: "Soustředěný předškolák kreslí tužkou u stolu",
    href: "#predskolacek",
  },
  {
    title: "Sport a příroda",
    text: "S dětmi nezůstáváme jen za plotem. Pravidelně jezdíme na předplavecký výcvik, pořádáme lyžařské kurzy a jarní školy v přírodě.",
    image: sport.url,
    alt: "Děti s plovacími deskami v bazénu během plaveckého kurzu",
    href: "#sport",
  },
  {
    title: "Akce s rodiči",
    text: "Školka pro nás nekončí odpoledním vyzvednutím. Pořádáme společné tvořivé dílničky, „Večer se strašidly“ nebo jarní zahradní brigády.",
    image: parents.url,
    alt: "Tatínek s malým synem společně dlabou dýni",
    href: "#akce-rodice",
  },
];

export function SiteActivities() {
  return (
    <section
      id="aktuality"
      className="section-y"
      style={{ background: "linear-gradient(to bottom, #FFFFFF 0%, #FCE4E1 100%)" }}
    >
      <div className="container mx-auto px-6">
        <div className="reveal-up section-header-gap mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-blue">
            Aktuality
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-ink md:text-[40px]">
            Zážitky, které si děti odnesou do školy
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
          {activities.map((a, i) => (
            <article
              key={a.title}
              className="card-hover reveal-up group relative overflow-hidden rounded-2xl bg-card"
              style={{ ["--reveal-delay" as string]: `${i * 110}ms`, minHeight: "440px" }}
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

              <a
                href={a.href}
                className="activity-cta group/cta absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 px-7 pb-7 pt-3 text-[15px] font-medium text-brand-red opacity-0 translate-y-2 pointer-events-none transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 motion-reduce:transition-none"
                aria-label={`Číst dále: ${a.title}`}
              >
                Číst dále
                <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover/cta:translate-x-1" aria-hidden />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
