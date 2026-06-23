import cubeBlue from "@/assets/cube-blue.png.asset.json";
import cubeYellow from "@/assets/cube-yellow.png.asset.json";
import cubeRed from "@/assets/cube-red.png.asset.json";
import cubeGreen from "@/assets/cube-green.png.asset.json";

type ClassItem = {
  name: string;
  colorLabel: string;
  age: string;
  image: string;
  alt: string;
  rotate: string;
  colorClass: string;
  arrowBg: string;
};

const classes: ClassItem[] = [
  {
    name: "Modráčci",
    colorLabel: "Modrá kostička",
    age: "2–3 roky",
    image: cubeBlue.url,
    alt: "Modrá plastelínová kostička s obličejem",
    rotate: "-rotate-[8deg]",
    colorClass: "text-brand-blue",
    arrowBg: "bg-brand-blue",
  },
  {
    name: "Žluťásci",
    colorLabel: "Žlutá kostička",
    age: "3–4 roky",
    image: cubeYellow.url,
    alt: "Žlutá plastelínová kostička s obličejem",
    rotate: "rotate-[5deg]",
    colorClass: "text-brand-yellow",
    arrowBg: "bg-brand-yellow",
  },
  {
    name: "Červenáčci",
    colorLabel: "Červená kostička",
    age: "4–5 let",
    image: cubeRed.url,
    alt: "Červená plastelínová kostička s obličejem",
    rotate: "-rotate-[4deg]",
    colorClass: "text-brand-red",
    arrowBg: "bg-brand-red",
  },
  {
    name: "Zelenáčci",
    colorLabel: "Zelená kostička",
    age: "5–6 let",
    image: cubeGreen.url,
    alt: "Zelená plastelínová kostička s obličejem",
    rotate: "rotate-[7deg]",
    colorClass: "text-brand-green",
    arrowBg: "bg-brand-green",
  },
];

export function SiteClasses() {
  return (
    <section
      className="section-y"
      style={{
        background:
          "linear-gradient(145deg, #002356 0%, #002356 35%, #002047 100%)",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="reveal-up section-header-gap mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">
            Naše třídy
          </h2>
          <p className="mt-3 text-base text-white/70 md:text-lg">
            Čtyři kostičky, čtyři světy plné objevování.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {classes.map((c, i) => (
            <div
              key={c.name}
              className="reveal-up relative pt-16"
              style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}
            >
              <a
                href="#"
                className="group relative block transition-transform duration-[250ms] ease-out hover:-translate-y-0.5"
              >
                <img
                  src={c.image}
                  alt={c.alt}
                  className={`pointer-events-none absolute left-1/2 z-0 w-auto -translate-x-1/2 select-none ${
                    c.name === "Zelenáčci" ? "h-36 -top-24" : "h-24 -top-16"
                  } ${c.rotate}`}
                  loading="lazy"
                />
                <div className="relative z-10 rounded-2xl bg-white p-6 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)] transition-shadow duration-[250ms] ease-out group-hover:shadow-[0_18px_40px_-14px_rgba(0,0,0,0.32)]">
                  <p className={`text-xs font-medium uppercase tracking-[0.16em] ${c.colorClass}`}>
                    {c.colorLabel}
                  </p>
                  <h3 className={`mt-2 font-display text-2xl font-bold ${c.colorClass}`}>
                    {c.name}
                  </h3>
                  <p className="mt-1 text-sm text-body">{c.age}</p>

                  <div className="mt-6 flex items-center gap-2">
                    <span className={`text-sm font-medium ${c.colorClass}`}>
                      Více o třídě
                    </span>
                    <span
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-white transition-transform duration-[250ms] ease-out group-hover:translate-x-1 ${c.arrowBg}`}
                      aria-hidden
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 6h8m0 0L6.5 2.5M10 6l-3.5 3.5"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}