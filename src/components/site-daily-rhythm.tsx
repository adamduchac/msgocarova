import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fixPrepositions } from "@/lib/typography";
import den01 from "@/assets/den-01.webp.asset.json";
import den02 from "@/assets/den-02.webp.asset.json";
import den03 from "@/assets/den-03.webp.asset.json";
import den04 from "@/assets/den-04.webp.asset.json";
import den05 from "@/assets/den-05.webp.asset.json";
import den06 from "@/assets/den-06.webp.asset.json";
import den07 from "@/assets/den-07.webp.asset.json";
import den08 from "@/assets/den-08.webp.asset.json";
import den09 from "@/assets/den-09.webp.asset.json";
import den10 from "@/assets/den-10.webp.asset.json";

type Moment = {
  title: string;
  desc: string;
  img: { url: string };
  alt: string;
};

const moments: Moment[] = [
  {
    title: fixPrepositions("Vítáme se hrou"),
    desc: fixPrepositions("Ráno se scházíme a rozehráváme první hry."),
    img: den01,
    alt: "Děti si spolu hrají s autíčky a dřevěnou dráhou ve třídě",
  },
  {
    title: fixPrepositions("Hra na kuchaře"),
    desc: fixPrepositions("Vžíváme se do rolí a fantazii pouštíme naplno."),
    img: den02,
    alt: "Skupina dětí ve třídě loupe a krájí brambory v dětské kuchyňce",
  },
  {
    title: fixPrepositions("Ranní kruh"),
    desc: fixPrepositions("Sejdeme se v kruhu, popovídáme si a naladíme na den."),
    img: den03,
    alt: "Děti sedí v kruhu s paní učitelkou a povídají si",
  },
  {
    title: fixPrepositions("Spolupracujeme"),
    desc: fixPrepositions("U společných úkolů se učíme domluvit a pomáhat si."),
    img: den04,
    alt: "Dvě děti společně skládají barevné kostky lega",
  },
  {
    title: fixPrepositions("Pečujeme o zahradu"),
    desc: fixPrepositions("Zaléváme rostliny a staráme se o naši zahradu."),
    img: den05,
    alt: "Tři kluci zalévají záhon se sazenicemi žlutými konvičkami",
  },
  {
    title: fixPrepositions("Objevujeme přírodu"),
    desc: fixPrepositions("Na zahradě pozorujeme louku a její drobné obyvatele."),
    img: den06,
    alt: "Děti prohlížejí dřevěný domeček pro hmyz na kraji záhonu",
  },
  {
    title: fixPrepositions("Obědváme"),
    desc: fixPrepositions("U stolu si společně pochutnáme na obědě."),
    img: den07,
    alt: "Děti sedí u kulatého stolu a jí polévku ze společných talířů",
  },
  {
    title: fixPrepositions("Klidové chvíle"),
    desc: fixPrepositions("Po odpočinku se u stolečků věnujeme klidným činnostem."),
    img: den08,
    alt: "Dvě děti u stolu kreslí fixami do pracovních listů",
  },
  {
    title: fixPrepositions("Odpolední hry"),
    desc: fixPrepositions("Odpoledne patří volné hře a kamarádům."),
    img: den09,
    alt: "Děti si ve třídě hrají s obručí a barevnými pytlíky",
  },
  {
    title: fixPrepositions("Společně tvoříme"),
    desc: fixPrepositions("Malujeme, lepíme a vyrábíme vlastní výtvory."),
    img: den10,
    alt: "Děti u stolu tvoří koláž z listů a papírových roliček",
  },
];

// Desktop náklony: 1. řada jemnější, 2. řada opačně a výrazněji.
const desktopTransforms = [
  "rotate(-2deg) translateY(-6px)",
  "rotate(1deg) translateY(6px)",
  "rotate(-1deg) translateY(-4px)",
  "rotate(2deg) translateY(8px)",
  "rotate(-1.5deg) translateY(-2px)",
  "rotate(2.5deg) translateY(8px)",
  "rotate(-3deg) translateY(-6px)",
  "rotate(1.5deg) translateY(4px)",
  "rotate(-2.5deg) translateY(-8px)",
  "rotate(3deg) translateY(2px)",
];

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
            {fixPrepositions("Zažijte to s námi")}
          </p>
          <h2 className="mt-3 font-display text-[34px] text-ink md:text-[40px]">
            {fixPrepositions("Jeden den v Mateřské škole Josefa Gočára")}
          </h2>
        </header>

        {/* Polaroidy — mobile: horizontal snap slider (10) / md: grid 3x3 (9) / lg: grid 5x2 (10) */}
        <ol
          ref={scrollerRef}
          className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 pt-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pt-14 lg:grid-cols-5"
        >
          {moments.map((m, i) => {
            const hideOnTablet = i === 9 ? "max-lg:md:hidden" : "";
            return (
              <li
                key={m.title}
                className={`reveal-up flex shrink-0 basis-[78%] snap-start justify-center md:basis-auto md:[transform:var(--tilt)] ${hideOnTablet}`}
                style={{
                  ["--reveal-delay" as string]: `${i * 70}ms`,
                  ["--tilt" as string]: desktopTransforms[i],
                }}
              >
                <article className="card-hover-soft w-full rounded-md bg-card px-3 pb-6 pt-3 shadow-[0_18px_40px_-22px_rgba(16,15,16,0.28)]">
                  <figure className="overflow-hidden rounded-sm bg-muted">
                    <img
                      src={m.img.url}
                      alt={m.alt}
                      width={800}
                      height={1000}
                      loading={i < 2 ? "eager" : "lazy"}
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
            );
          })}
        </ol>

        {/* Šipky pro mobilní slider */}
        <div className="mt-6 flex items-center justify-center gap-3 md:hidden">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label={fixPrepositions("Předchozí moment dne")}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background text-ink shadow-sm transition-colors duration-200 hover:bg-offwhite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label={fixPrepositions("Další moment dne")}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background text-ink shadow-sm transition-colors duration-200 hover:bg-offwhite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
