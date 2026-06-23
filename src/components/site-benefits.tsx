import vyhoda1 from "@/assets/vyhoda1.webp.asset.json";
import vyhoda2 from "@/assets/vyhoda2.webp.asset.json";
import vyhoda3 from "@/assets/vyhoda3.webp.asset.json";
import vyhoda4 from "@/assets/vyhoda4.webp.asset.json";

type Benefit = {
  title: string;
  text: string;
  image: string;
  alt: string;
  tint: string;
  flip?: boolean;
};

const benefits: Benefit[] = [
  {
    title: "Velká zahrada s dopravním hřištěm",
    text: "Naše vlastní zelená oáza v centru města. Děti tu jezdí na koloběžkách, skáčou na zemní trampolíně a v létě se chladí v bazénku. Ven chodíme za každého počasí.",
    image: vyhoda1.url,
    alt: "Plastelínový strom a malé hřiště se skluzavkou",
    tint: "bg-mint",
  },
  {
    title: "Angličtina a moderní technologie",
    text: "Jdeme s dobou. Tradiční hru doplňujeme o interaktivní tabule, základy programování s robotickými myšmi a předškoláky hravou formou seznamujeme s angličtinou.",
    image: vyhoda2.url,
    alt: "Plastelínový robot s britskou vlajkou",
    tint: "bg-sky",
  },
  {
    title: "Respektující a individuální přístup",
    text: "Inspirujeme se Montessori a programem Začít spolu. Respektujeme tempo každého dítěte, komunikujeme partnersky a vedeme děti k přirozené samostatnosti.",
    image: vyhoda3.url,
    alt: "Plastelínová bublina s usměvavým smajlíkem",
    tint: "bg-cream",
    flip: true,
  },
  {
    title: "Otevřená a snadná komunikace",
    text: "Žádné papírové vzkazy na šatních skříňkách. Omluvenky i fotky z akcí máte v mobilní aplikaci. O víkendech navíc naši zahradu otevíráme veřejnosti.",
    image: vyhoda4.url,
    alt: "Plastelínové červené srdce",
    tint: "bg-blush",
  },
];

export function SiteBenefits() {
  return (
    <section id="vyhody" className="section-y bg-offwhite">
      <div className="container mx-auto px-6">
        <div className="reveal-up section-header-gap mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-blue">
            Proč k nám
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink md:text-[40px]">
            Proč si nás rodiče <span className="text-brand-green">vybírají?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {benefits.map((b, i) => (
            <article
              key={b.title}
              className="reveal-up group flex flex-col rounded-2xl border border-border/60 bg-card p-7 transition-[box-shadow,transform] duration-[280ms] ease-out hover:-translate-y-0.5 hover:shadow-[0_22px_45px_-22px_rgba(16,15,16,0.22)]"
              style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}
            >
              <div className={`mb-6 flex h-40 items-center justify-center rounded-xl ${b.tint}`}>
                <img
                  src={b.image}
                  alt={b.alt}
                  width={420}
                  height={420}
                  className={`h-32 w-32 object-contain ${b.flip ? "-scale-x-100" : ""}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3 className="font-display text-xl font-semibold leading-snug text-ink">
                {b.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-body">{b.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
