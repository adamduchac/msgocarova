import denRano from "@/assets/den-rano.webp.asset.json";
import denTvoreni from "@/assets/den-tvoreni.webp.asset.json";
import denPohyb from "@/assets/den-pohyb.webp.asset.json";
import denSvacina from "@/assets/den-svacina.webp.asset.json";
import denStezka from "@/assets/den-stezka.webp.asset.json";

const GRADIENT = "linear-gradient(105deg, #2563EB 0%, #38BDF8 100%)";

type Moment = {
  time: string;
  title: string;
  desc: string;
  img: { url: string };
  alt: string;
  rotate: string;
  offset: string;
};

const moments: Moment[] = [
  {
    time: "8:00",
    title: "Ranní přivítání",
    desc: "Přivítáme se a naladíme na to, co nás čeká.",
    img: denRano,
    alt: "Ranní přivítání — paní učitelka předčítá dětem v kruhu",
    rotate: "md:rotate-[-2.2deg]",
    offset: "md:-translate-y-2",
  },
  {
    time: "9:00",
    title: "Tvoření a hry",
    desc: "Kreslíme a objevujeme svět vlastním tempem.",
    img: denTvoreni,
    alt: "Tvoření a hry — děti kreslí pastelkami u stolu",
    rotate: "md:rotate-[1.4deg]",
    offset: "md:translate-y-3",
  },
  {
    time: "10:00",
    title: "Pohyb a dobrodružství",
    desc: "Šplháme, balancujeme a vybíjíme energii.",
    img: denPohyb,
    alt: "Pohyb a dobrodružství — děti šplhají po dřevěné prolézačce",
    rotate: "md:rotate-[-0.8deg]",
    offset: "md:-translate-y-3",
  },
  {
    time: "11:30",
    title: "Svačinka",
    desc: "Ve třídě si dáme něco zdravého a dobrého.",
    img: denSvacina,
    alt: "Svačinka — kluk se chutě zakusuje do jablka",
    rotate: "md:rotate-[2.0deg]",
    offset: "md:translate-y-2",
  },
  {
    time: "13:00",
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
  return (
    <section
      id="bezny-den"
      className="section-y"
      style={{
        background:
          "linear-gradient(to bottom, var(--mint-soft) 0%, var(--mint-soft) 12%, #ffffff 70%, #ffffff 100%)",
      }}
    >
      <div className="container mx-auto px-6">
        <header className="reveal-up section-header-gap mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink/55">
            Zažijte to s námi
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink md:text-[40px]">
            Běžný den v MŠ Gočárova
          </h2>
        </header>

        {/* Desktop timeline: times above, wavy line with small dots */}
        <div className="relative hidden md:block">
          {/* Times above the line */}
          <ol className="grid grid-cols-5">
            {moments.map((m, i) => (
              <li
                key={`t-${m.time}`}
                className="reveal-up text-center"
                style={{ ["--reveal-delay" as string]: delays[i] }}
              >
                <span className="font-display text-base font-bold text-brand-blue">
                  {m.time}
                </span>
              </li>
            ))}
          </ol>

          {/* Wavy line with dots ON the line */}
          <div className="relative mt-2 h-12">
            <div className="reveal-up absolute left-[10%] right-[10%] top-0 h-12">
              <svg
                viewBox="0 0 1200 48"
                preserveAspectRatio="none"
                className="block h-12 w-full overflow-visible"
                aria-hidden
              >
                <defs>
                  <linearGradient id="daily-grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#38BDF8" />
                  </linearGradient>
                </defs>
                {/* base wavy track */}
                <path
                  d="M0,28 C40,36 80,12 120,20 C180,26 280,42 360,36 C440,32 520,6 600,12 C680,18 770,40 840,32 C920,26 1010,14 1080,22 C1130,26 1170,30 1200,26"
                  fill="none"
                  stroke="#9CC8A6"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
                {/* gradient progress wave */}
                <path
                  className="daily-progress-path"
                  d="M0,28 C40,36 80,12 120,20 C180,26 280,42 360,36 C440,32 520,6 600,12 C680,18 770,40 840,32 C920,26 1010,14 1080,22 C1130,26 1170,30 1200,26"
                  fill="none"
                  stroke="url(#daily-grad)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={1}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

            </div>

            {/* dots aligned to columns (same 5-col grid as times/polaroids) */}
            <ol className="pointer-events-none absolute inset-0 grid grid-cols-5">
              {moments.map((m, i) => {
                const tops = ["28px", "36px", "12px", "26px", "26px"];
                return (
                  <li
                    key={`d-${m.time}`}
                    className="relative"
                    style={{ ["--reveal-delay" as string]: delays[i] }}
                  >
                    <span
                      className="reveal-up absolute left-1/2 block h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue"
                      style={{
                        top: tops[i],
                        ["--reveal-delay" as string]: delays[i],
                      }}
                      aria-hidden
                    />
                  </li>
                );
              })}
            </ol>
          </div>

          </div>
        </div>

        {/* Polaroids — md+: grid 5 cols / mobile: horizontal scroll-snap */}
        <ol className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 pt-6 md:mx-0 md:grid md:grid-cols-5 md:gap-6 md:overflow-visible md:px-0 md:pt-8">
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
                {/* time chip — primary on mobile, redundant accent on desktop */}
                <p
                  className="mt-4 font-display text-xs font-bold uppercase tracking-[0.14em] md:hidden"
                  style={{
                    backgroundImage: GRADIENT,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {m.time}
                </p>
                <h3 className="mt-2 font-display text-lg font-bold text-ink md:mt-4">
                  {m.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-body">
                  {m.desc}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </div>

      <style>{`
        .daily-progress-path {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          transition: stroke-dashoffset 2200ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal-up.is-visible .daily-progress-path,
        .is-visible .daily-progress-path {
          stroke-dashoffset: 0;
        }
        /* trigger progress when section is in view via any ancestor reveal */
        @media (prefers-reduced-motion: reduce) {
          .daily-progress-path { stroke-dashoffset: 0 !important; transition: none !important; }
        }
      `}</style>
    </section>
  );
}
