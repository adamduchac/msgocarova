import herofoto from "@/assets/kosticky-herofoto.webp.asset.json";
import { ArrowRight } from "lucide-react";

type ClassItem = {
  color: string;
  age: string;
  text: string;
  borderColor: string;
  textColor: string;
  dot: string;
};

const classes: ClassItem[] = [
  {
    color: "Červená kostička",
    age: "2–3 roky",
    text: "Pro nejmenší objevitele. Bezpečné prostředí a klidná adaptace.",
    borderColor: "before:bg-brand-red",
    textColor: "text-brand-red",
    dot: "bg-brand-red",
  },
  {
    color: "Modrá kostička",
    age: "3–4 roky",
    text: "Pro zvídavé děti. Rozvoj řeči, tvoření a první velká kamarádství.",
    borderColor: "before:bg-brand-blue",
    textColor: "text-brand-blue",
    dot: "bg-brand-blue",
  },
  {
    color: "Zelená kostička",
    age: "4–5 let",
    text: "Pro šikovné parťáky. Logické myšlení, pokusy a objevování přírody.",
    borderColor: "before:bg-brand-green",
    textColor: "text-brand-green",
    dot: "bg-brand-green",
  },
  {
    color: "Žlutá kostička",
    age: "5–6 let",
    text: "Pro budoucí školáky. Předškolní příprava, angličtina a samostatnost.",
    borderColor: "before:bg-brand-yellow",
    textColor: "text-brand-yellow",
    dot: "bg-brand-yellow",
  },
];

export function SiteClasses() {
  return (
    <section id="tridy" className="section-y">
      <div className="container mx-auto px-6">
        <div className="reveal-up section-header-gap mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-blue">
            Naše třídy
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink md:text-[40px]">
            Čtyři třídy, jeden skvělý <span className="text-brand-green">tým</span>
          </h2>
        </div>

        {/* Hero "class photo" */}
        <div
          className="reveal-fade mx-auto mb-12 max-w-4xl"
          style={{ ["--reveal-delay" as string]: "120ms" }}
        >
          <img
            src={herofoto.url}
            alt="Čtyři barevné plastelínové kostičky s obličeji — červená, modrá, zelená a žlutá"
            className="h-auto w-full select-none"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {classes.map((c, i) => (
            <article
              key={c.color}
              className={`reveal-up group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-[box-shadow,transform] duration-[280ms] ease-out hover:-translate-y-0.5 hover:shadow-[0_22px_45px_-22px_rgba(16,15,16,0.22)] before:absolute before:inset-x-0 before:top-0 before:h-1.5 ${c.borderColor} before:content-['']`}
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
            >
              <div className="flex items-center gap-2 pt-2">
                <span className={`inline-block h-2.5 w-2.5 rounded-full ${c.dot}`} aria-hidden />
                <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${c.textColor}`}>
                  {c.color}
                </p>
              </div>
              <h3 className="mt-3 font-display text-xl font-bold text-ink">{c.age}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-body">{c.text}</p>
              <a
                href="#"
                className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${c.textColor} transition-[gap] duration-200 hover:gap-2.5`}
              >
                Detail třídy
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
