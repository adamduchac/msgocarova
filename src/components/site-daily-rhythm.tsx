import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import denRano from "@/assets/den-rano.webp.asset.json";
import denTvoreni from "@/assets/den-tvoreni.webp.asset.json";
import denPohyb from "@/assets/den-pohyb.webp.asset.json";
import denSvacina from "@/assets/den-svacina.webp.asset.json";
import denStezka from "@/assets/den-stezka.webp.asset.json";

type Moment = {
  title: string;
  desc: string;
  img: { url: string };
  alt: string;
  rotate: string;
  offset: string;
};

const moments: Moment[] = [
  {
    title: "Ranní přivítání",
    desc: "Přivítáme se a naladíme na to, co nás čeká.",
    img: denRano,
    alt: "Ranní přivítání — paní učitelka předčítá dětem v kruhu",
    rotate: "md:rotate-[-2.2deg]",
    offset: "md:-translate-y-2",
  },
  {
    title: "Tvoření a hry",
    desc: "Kreslíme a objevujeme svět vlastním tempem.",
    img: denTvoreni,
    alt: "Tvoření a hry — děti kreslí pastelkami u stolu",
    rotate: "md:rotate-[1.4deg]",
    offset: "md:translate-y-3",
  },
  {
    title: "Pohyb a dobrodružství",
    desc: "Šplháme, balancujeme a vybíjíme energii.",
    img: denPohyb,
    alt: "Pohyb a dobrodružství — děti šplhají po dřevěné prolézačce",
    rotate: "md:rotate-[-0.8deg]",
    offset: "md:-translate-y-3",
  },
  {
    title: "Svačinka",
    desc: "Ve třídě si dáme něco zdravého a dobrého.",
    img: denSvacina,
    alt: "Svačinka — kluk se chutě zakusuje do jablka",
    rotate: "md:rotate-[2.0deg]",
    offset: "md:translate-y-2",
  },
  {
    title: "Smyslová stezka",
    desc: "Naboso poznáváme přírodu na naší stezce.",
    img: denStezka,
    alt: "Smyslová stezka — děti chodí naboso po kamíncích a šiškách",
    rotate: "md:rotate-[-1.6deg]",
    offset: "md:-translate-y-1",
  },
];

const delays = ["0ms", "440ms", "880ms", "1320ms", "1760ms"];


export function SiteDailyRhythm() {
  const scrollerRef = useRef<HTMLOListElement | null>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const cardW = first ? first.clientWidth : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * (cardW + 20), behavior: "smooth" });
  };

  return (
    <section
      id="bezny-den"
      className="section-y"
      style={{
        background:
          "linear-gradient(to bottom, var(--blue-soft) 0%, var(--blue-soft) 12%, #ffffff 70%, #ffffff 100%)",
      }}
    >
      <div className="container mx-auto px-6">
        <header className="reveal-up section-header-gap mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink/55">
            Zažijte to s námi
          </p>
          <h2 className="mt-3 font-display text-[34px] text-ink md:text-[40px]">
            Jeden den v MŠ Gočárova
          </h2>
        </header>

        {/* Polaroids — md+: grid 5 cols / mobile: horizontal scroll-snap */}
        <ol
          ref={scrollerRef}
          className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 pt-10 md:mx-0 md:grid md:grid-cols-5 md:gap-6 md:overflow-visible md:px-0 md:pt-14"
        >
          {moments.map((m, i) => (
            <li
              key={m.title}
              className={`reveal-up flex shrink-0 basis-[78%] snap-start justify-center md:basis-auto ${m.rotate} ${m.offset}`}
              style={{ ["--reveal-delay" as string]: delays[i] }}
            >
              <article className="card-hover-soft w-full rounded-md bg-card px-3 pb-6 pt-3 shadow-[0_18px_40px_-22px_rgba(16,15,16,0.28)]">
                <figure className="overflow-hidden rounded-sm bg-muted">
                  <img
                    src={m.img.url}
                    alt={m.alt}
                    width={800}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/5] h-auto w-full object-cover"
                  />
                </figure>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">
                  {m.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-body">
                  {m.desc}
                </p>
              </article>
            </li>
          ))}
        </ol>

        {/* Šipky pro mobilní slider */}
        <div className="mt-6 flex items-center justify-center gap-3 md:hidden">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Předchozí moment dne"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background text-ink shadow-sm transition-colors duration-200 hover:bg-offwhite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Další moment dne"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background text-ink shadow-sm transition-colors duration-200 hover:bg-offwhite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
