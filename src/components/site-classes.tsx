import { ArrowRight } from "lucide-react";
import kostickyTym from "@/assets/kosticky-tym.webp.asset.json";

type ClassItem = {
  name: string;
  age: string;
  teachers: string;
  textColor: string;
  dot: string;
  pillBg: string;
};

const classes: ClassItem[] = [
  {
    name: "Modrá kostička",
    age: "pro děti od 3 do 5 let",
    teachers: "paní učitelka Bc. Veronika Kremláčková a Elena Špicarová",
    textColor: "text-brand-blue",
    dot: "bg-brand-blue",
    pillBg: "bg-brand-blue",
  },
  {
    name: "Červená kostička",
    age: "pro děti od 5 do 7 let",
    teachers:
      "paní učitelka Mgr. Nikola Šorfová, Mgr. Jitka Kouklíková a Hana Hloušková",
    textColor: "text-brand-red",
    dot: "bg-brand-red",
    pillBg: "bg-brand-red",
  },
  {
    name: "Žlutá kostička",
    age: "pro děti od 3 do 5 let",
    teachers: "paní učitelka Magdaléna Sováková a Milena Svobodová, DiS.",
    textColor: "text-brand-yellow",
    dot: "bg-brand-yellow",
    pillBg: "bg-brand-yellow",
  },
  {
    name: "Zelená kostička",
    age: "pro děti od 5 do 7 let",
    teachers: "paní učitelka Jana Tuharská a Kristýna Vaňátková, DiS.",
    textColor: "text-brand-green",
    dot: "bg-brand-green",
    pillBg: "bg-brand-green",
  },
];

export function SiteClasses() {
  return (
    <section id="tridy" className="section-y bg-background">
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Levý sloupec — text + 2x2 karty */}
          <div className="text-left">
            <p className="reveal-up font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink/55">
              Barevné kostičky
            </p>
            <h2 className="reveal-up mt-3 font-display text-3xl text-ink md:text-[40px]">
              Čtyři třídy, jeden{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(105deg, #2563EB 0%, #38BDF8 100%)",
                }}
              >
                skvělý tým
              </span>
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {classes.map((c, i) => (
                <a
                  key={c.name}
                  href="#"
                  aria-label={`Vstupte do třídy — ${c.name}`}
                  className="reveal-up group relative block overflow-hidden rounded-3xl border border-white/60 bg-background p-5 pb-16 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-6 sm:pb-16"
                  style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                >
                  <p
                    className={`font-display text-xl font-semibold ${c.textColor}`}
                  >
                    {c.name}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-bold text-ink">
                    {c.age}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    {c.teachers}
                  </p>

                  {/* Rozbalovací CTA pill */}
                  <span
                    className={`absolute bottom-4 right-4 inline-flex h-11 items-center overflow-hidden rounded-full text-white ${c.pillBg}`}
                    aria-hidden
                  >
                    <span
                      className="max-w-0 overflow-hidden whitespace-nowrap px-0 text-sm font-medium opacity-0 group-hover:max-w-[180px] group-hover:pl-4 group-hover:pr-1 group-hover:opacity-100 group-focus-visible:max-w-[180px] group-focus-visible:pl-4 group-focus-visible:pr-1 group-focus-visible:opacity-100"
                      style={{
                        transitionProperty: "max-width, opacity, padding",
                        transitionDuration: "560ms",
                        transitionTimingFunction:
                          "cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                    >
                      Vstupte do třídy
                    </span>
                    <span className="grid h-11 w-11 shrink-0 place-items-center">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Pravý sloupec — obrázek kostiček */}
          <div
            className="reveal-fade order-first md:order-last"
            style={{ ["--reveal-delay" as string]: "120ms" }}
          >
            <img
              src={kostickyTym.url}
              alt="Čtyři plastelínové kostičky s obličeji — červená, modrá, zelená a žlutá"
              className="mx-auto h-auto w-full max-w-xl select-none"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
