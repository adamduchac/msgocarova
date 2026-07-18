import { useState } from "react";
import { ArrowRight, Home, Trees } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { fixPrepositions } from "@/lib/typography";
import { useCopyPage } from "@/lib/use-copy";
import kostickyA from "@/assets/kosticky-tridy-a.webp.asset.json";
import kostickyB from "@/assets/kosticky-tridy-b.webp.asset.json";

type ClassItem = {
  id: string;
  name: string;
  age: string;
  teachers: string;
  textColor: string;
  pillBg: string;
};

const classes: ClassItem[] = [
  {
    id: "cervena",
    name: fixPrepositions("Červená kostička"),
    age: fixPrepositions("pro děti od 5 do 7 let"),
    teachers: fixPrepositions(
      "paní učitelka Mgr. Nikola Šorfová, Mgr. Jitka Kouklíková a Hana Hloušková"
    ),
    textColor: "text-brand-red",
    pillBg: "bg-brand-red",
  },
  {
    id: "zelena",
    name: fixPrepositions("Zelená kostička"),
    age: fixPrepositions("pro děti od 5 do 7 let"),
    teachers: fixPrepositions("paní učitelka Jana Tuharská a Kristýna Vaňátková, DiS."),
    textColor: "text-brand-green",
    pillBg: "bg-brand-green",
  },
  {
    id: "modra",
    name: fixPrepositions("Modrá kostička"),
    age: fixPrepositions("pro děti od 3 do 5 let"),
    teachers: fixPrepositions("paní učitelka Bc. Veronika Kremláčková a Elena Špicarová"),
    textColor: "text-brand-blue",
    pillBg: "bg-brand-blue",
  },
  {
    id: "zluta",
    name: fixPrepositions("Žlutá kostička"),
    age: fixPrepositions("pro děti od 3 do 5 let"),
    teachers: fixPrepositions("paní učitelka Magdaléna Sováková a Milena Svobodová, DiS."),
    textColor: "text-brand-yellow",
    pillBg: "bg-brand-yellow",
  },
];

export function SiteClasses() {
  const c = useCopyPage("index");
  const [outside, setOutside] = useState(false);

  return (
    <section id="tridy" className="section-y bg-background">
      <div className="container mx-auto px-6">
        <div className="rounded-3xl border border-border/70 bg-background px-6 py-12 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.18)] md:px-12 md:py-16 lg:px-16 lg:py-20">

          {/* Eyebrow + nadpis */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="reveal-up font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink/55">
              {fixPrepositions("Barevné kostičky")}
            </p>
            <h2 className="reveal-up mt-3 font-display text-[34px] text-ink md:text-[40px]">
              {fixPrepositions("Čtyři třídy, jeden")}{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(105deg, #2563EB 0%, #38BDF8 100%)",
                }}
              >
                {fixPrepositions("skvělý tým")}
              </span>
            </h2>
          </div>

          {/* Ilustrace + přepínač */}
          <div
            className="reveal-fade relative mx-auto mt-8 w-full max-w-4xl md:pr-32 lg:mt-10 lg:max-w-[1024px] lg:pr-44"
            style={{ ["--reveal-delay" as string]: "120ms" }}
          >
            {/* Crossfade obrázků */}
            <div className="relative aspect-[4/3] w-full">
              <img
                src={kostickyA.url}
                alt="Plastelínové kostičky doma — červená, modrá, zelená a žlutá"
                data-active={!outside}
                className="classes-illu absolute inset-0 h-full w-full select-none object-contain"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              <img
                src={kostickyB.url}
                alt="Plastelínové kostičky venku na zahradě se skluzavkou a stromem"
                data-active={outside}
                className="classes-illu absolute inset-0 h-full w-full select-none object-contain"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>

            {/* Glass switch — mobile: centered below image; md+: absolute right of image */}
            <div className="mt-4 flex justify-center md:mt-0 md:absolute md:right-0 md:top-1/2 md:block md:-translate-y-1/2 lg:right-2">
              <button
                type="button"
                role="switch"
                aria-checked={outside}
                onClick={() => setOutside((v) => !v)}
                className="group inline-flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-border/70 bg-background/80 px-3 py-2.5 shadow-[0_10px_28px_-14px_rgba(15,23,42,0.28)] backdrop-blur-md transition-colors duration-200 hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background md:gap-3 md:rounded-3xl md:px-4 md:py-4"
              >
                <span
                  aria-hidden
                  className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors duration-300 md:h-9 md:w-16 ${
                    outside ? "bg-brand-green/85" : "bg-brand-blue/85"
                  }`}
                >
                  <span
                    className={`absolute top-1/2 grid h-5 w-5 -translate-y-1/2 place-items-center rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.22)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:h-7 md:w-7 ${
                      outside ? "translate-x-[26px] md:translate-x-[34px]" : "translate-x-[4px]"
                    }`}
                  >
                    {outside ? (
                      <Trees className="h-3 w-3 text-brand-green md:h-4 md:w-4" strokeWidth={2.5} />
                    ) : (
                      <Home className="h-3 w-3 text-brand-blue md:h-4 md:w-4" strokeWidth={2.5} />
                    )}
                  </span>
                </span>
                <span
                  key={outside ? "out" : "in"}
                  className="min-w-[9rem] text-center font-display text-[13px] font-semibold leading-tight text-ink animate-fade-in md:text-[14px]"
                >
                  {outside ? fixPrepositions("Vezmi kostičky dovnitř") : fixPrepositions("Vezmi kostičky ven")}
                </span>
              </button>
            </div>
          </div>



          {/* 4×1 grid tříd */}
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
            {classes.map((c, i) => (
              <Link
                key={c.id}
                to="/barevne-tridy"
                hash={c.id}
                aria-label={fixPrepositions(`Přejít na detail — ${c.name}`)}
                className="reveal-up group relative block overflow-hidden rounded-3xl border border-border/70 bg-background p-5 pb-16 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
                    {fixPrepositions("Vstupte do třídy")}
                  </span>
                  <span className="grid h-11 w-11 shrink-0 place-items-center">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
