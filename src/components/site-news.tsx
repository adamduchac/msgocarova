import trip from "@/assets/news-trip.jpg.asset.json";
import art from "@/assets/news-art.jpg.asset.json";
import openday from "@/assets/news-openday.jpg.asset.json";
import { ArrowRight } from "lucide-react";

type News = {
  badge: string;
  badgeBg: string;
  title: string;
  text: string;
  image: string;
  alt: string;
};

const news: News[] = [
  {
    badge: "Akce",
    badgeBg: "bg-brand-blue",
    title: "Výlet do přírody",
    text: "Společně jsme objevili krásy lesa, hráli hry a užili si den plný zážitků.",
    image: trip.url,
    alt: "Skupina veselých dětí běží po zelené louce v lese",
  },
  {
    badge: "Novinky",
    badgeBg: "bg-brand-green",
    title: "Nový kroužek – Malý umělec",
    text: "Od září otevíráme výtvarný kroužek pro všechny kreativní děti.",
    image: art.url,
    alt: "Dětské ručky malující vodovkami pestrobarevné květiny",
  },
  {
    badge: "Oznámení",
    badgeBg: "bg-brand-red",
    title: "Den otevřených dveří",
    text: "Přijďte se podívat do naší školky ve středu 15. 5. od 9:00 do 17:00.",
    image: openday.url,
    alt: "Učitelka čte s malou holčičkou knížku ve světlé třídě",
  },
];

export function SiteNews() {
  return (
    <section id="aktuality" className="section-y">
      <div className="container mx-auto px-6">
        <div className="reveal-up section-header-gap mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-blue">
            Aktuálně
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-ink md:text-[40px]">
            Aktuali<span className="text-brand-yellow">ty</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
          {news.map((n, i) => (
            <article
              key={n.title}
              className="card-hover reveal-up group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card"
              style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}
            >
              <div className="relative aspect-[5/3] w-full overflow-hidden">
                <img
                  src={n.image}
                  alt={n.alt}
                  width={1024}
                  height={614}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <span className={`absolute left-4 top-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white ${n.badgeBg}`}>
                  {n.badge}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-semibold text-ink">{n.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{n.text}</p>
                <a
                  href="#"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-[gap] duration-200 hover:gap-2.5"
                >
                  Číst více
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="#"
            className="group inline-flex h-12 items-center gap-2 rounded-md border border-ink/15 bg-background px-6 text-[15px] font-semibold text-ink transition-colors duration-200 hover:bg-offwhite"
          >
            Všechny aktuality
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
