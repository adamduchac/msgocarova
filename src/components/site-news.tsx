import trip from "@/assets/news-trip.jpg.asset.json";
import art from "@/assets/news-art.jpg.asset.json";
import openday from "@/assets/news-openday.jpg.asset.json";
import { ArrowRight } from "lucide-react";
import { fixPrepositions } from "@/lib/typography";

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
    badge: fixPrepositions("Akce"),
    badgeBg: "bg-brand-blue",
    title: fixPrepositions("Výlet do přírody"),
    text: fixPrepositions(
      "Společně jsme objevili krásy lesa, hráli hry a užili si den plný zážitků."
    ),
    image: trip.url,
    alt: "Skupina veselých dětí běží po zelené louce v lese",
  },
  {
    badge: fixPrepositions("Novinky"),
    badgeBg: "bg-brand-green",
    title: fixPrepositions("Nový kroužek – Malý umělec"),
    text: fixPrepositions(
      "Od září otevíráme výtvarný kroužek pro všechny kreativní děti."
    ),
    image: art.url,
    alt: "Dětské ručky malující vodovkami pestrobarevné květiny",
  },
  {
    badge: fixPrepositions("Oznámení"),
    badgeBg: "bg-brand-red",
    title: fixPrepositions("Den otevřených dveří"),
    text: fixPrepositions(
      "Přijďte se podívat do naší školky ve středu 15. 5. od 9:00 do 17:00."
    ),
    image: openday.url,
    alt: "Učitelka čte s malou holčičkou knížku ve světlé třídě",
  },
];

export function SiteNews() {
  return (
    <section id="aktuality" className="section-y">
      <div className="container mx-auto px-6">
        <div className="reveal-up section-header-gap mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[34px] font-extrabold text-ink md:text-[40px]">
            {fixPrepositions("Zážitky, které si děti odnáší")}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
          {news.map((n, i) => (
            <article
              key={n.title}
              className="card-hover reveal-up group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card"
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
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
                  className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-colors duration-200 hover:text-brand-blue/80"
                >
                  {fixPrepositions("Číst více")}
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
            {fixPrepositions("Všechny aktuality")}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
