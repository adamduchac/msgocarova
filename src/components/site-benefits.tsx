import zahrada from "@/assets/vyhoda-zahrada.webp.asset.json";
import robot from "@/assets/vyhoda-robot.webp.asset.json";
import komunikace from "@/assets/vyhoda-komunikace.webp.asset.json";
import srdce from "@/assets/vyhoda-srdce.webp.asset.json";

type DoodleProps = { color: string; className?: string; style?: React.CSSProperties };

function DoodleFajfka({ color, className, style }: DoodleProps) {
  return (
    <svg viewBox="0 0 224.55 209.62" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden="true">
      <path fill={color} d="M49.7,208.14c-16.82-27.03-30.34-54.24-49-79.58-1.77-2.4.2-7.38,1.6-8.8,1.78-1.81,5.73-3.09,9.52-2.13,5.11,1.74,8.6,5.85,11.86,10.08l33.52,52.18c35.44-48.11,70.33-94.24,110.23-137.69C182.86,25.4,210.11-5.95,221.38.99c3.16,1.95,4.44,7.35,1.56,10.41l-31.19,33.15c-45.24,51.7-86.38,105.33-125.94,161.67-2.26,3.21-12.55,4.76-16.11,1.92Z"/>
    </svg>
  );
}

function DoodleHvezda({ color, className, style }: DoodleProps) {
  return (
    <svg viewBox="0 0 260.53 246.86" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden="true">
      <path fill={color} d="M140.2,193l-67.18,50.9c-3.99,3.02-8.43,3.83-12.29,1.99-4.1-1.95-7.19-6.96-6.01-12.46l16.8-78L3.01,108.73c-2.97-2.02-3.48-7.36-2.65-9.88.74-2.25,3.39-6.07,7.18-6.53l86.56-10.61L113.95,9.01c1.37-5.03,5.27-8.41,9.69-8.95,4.16-.51,9.17,2,11.51,6.57l35.02,68.42,78.1-4.49c5.22-.3,9.76,2.75,11.39,6.5,2.07,4.75.27,9.94-3.89,13.79l-54.81,50.72,22.59,84.39c1.2,4.48-.37,8.78-2.77,10.95-3.48,3.14-8.98,3.9-13.25,1.05l-67.34-44.97ZM145.42,176.23l57.3,37.45-19.95-70.83c-1.36-4.81,1.17-9.48,4.99-12.08l43.85-41.9-63.43,3.41c-5.78.61-10.18-3.01-13.25-7.82l-28.14-58-17.45,63.94c-1.87,6.85-8.8,8.25-14.93,9.02l-61.78,7.79,50.71,35.06c4.77,3.3,7.55,8.09,5.98,14.2l-13.47,63.43,53.64-41.39c4.69-3.62,10.45-5.86,15.94-2.28Z"/>
    </svg>
  );
}

function DoodleSrdce({ color, className, style }: DoodleProps) {
  return (
    <svg viewBox="0 0 265.97 234.29" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden="true">
      <path fill={color} d="M203.57,165.27l-72.28,64.62c-4.08,3.65-10.79,6.53-16,2.25l-47.12-38.68-33.76-37.7C4.93,122.84-13.6,66.04,12.4,27.54,30.84,3.5,60.97-7.41,88.65,5.45c22.15,10.29,34.84,30.24,43.7,53.95,17.37-28.5,42.74-47.57,74-52.15,30.43-4.46,55.76,15.33,59.22,45.41,4.61,40.02-30.83,84.75-61.99,112.61ZM234.82,31.77c-27.59-20.73-76.18,8.46-95.82,51.91-2.19,4.84-6.48,7.34-10.44,6.5-12.21-2.58-6.74-31.36-30.38-56.24-10.6-11.15-26.02-18.36-41.41-14.66-24.49,5.87-39.61,28.88-38.48,54.29,2.44,55.1,58.62,106.81,102.47,140.66l60.52-54.29c18.57-16.66,35.88-33.63,49.41-54.52,16.27-25.12,25.57-57.54,4.14-73.64Z"/>
    </svg>
  );
}

function DoodleSipka({ color, className, style }: DoodleProps) {
  return (
    <svg viewBox="0 0 324.85 142.2" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden="true">
      <path fill={color} d="M204.85,138.88c-5.68,3.62-10.76,4.36-14.72,1.82-4.41-2.83-6.2-8.12-4.57-13.62l19.83-66.78-123.32,76.89c-4.36,2.72-9.02,2.75-12.91.62-3.26-1.79-6.33-8.16-4.16-13.65l24.34-61.22,16.53-39.08L11.75,77.06c-3.94,2.23-9.8.22-11.06-2.45-1.58-3.36-.46-8.77,3.51-11.45C38.58,39.99,74.43,19.56,112.01,1.59c5.02-2.4,11.18-2.04,14.44.79,3.49,3.02,4.52,8.86,2.37,14l-40.01,95.62,117.6-71.82c4.75-2.9,10.38-2.96,14.68-.44,4.32,2.53,5.82,8.98,4.08,14.82l-18.32,61.43,75.48-47.97,31.91-16.42c3.24-1.67,7.11.33,9.04,2.11,1.91,1.75,2.63,8.05-.95,10.33l-117.46,74.84Z"/>
    </svg>
  );
}




type Benefit = {
  title: string;
  text: string;
  image: string;
  alt: string;
  tint: string;
};

const benefits: Benefit[] = [
  {
    title: "Velká zahrada s dopravním hřištěm",
    text: "Naše vlastní zelená oáza v centru města. Děti tu jezdí na koloběžkách, skáčou na zemní trampolíně a v létě se chladí v bazénku. Ven chodíme za každého počasí.",
    image: zahrada.url,
    alt: "Plastelínový strom a malé hřiště se skluzavkou",
    tint: "bg-mint",
  },
  {
    title: "Angličtina a moderní technologie",
    text: "Jdeme s dobou. Tradiční hru doplňujeme o interaktivní tabule, základy programování s robotickými myšmi a předškoláky hravou formou seznamujeme s angličtinou.",
    image: robot.url,
    alt: "Plastelínový robot s britskou vlajkou",
    tint: "bg-sky",
  },
  {
    title: "Respektující a individuální přístup",
    text: "Inspirujeme se Montessori a programem Začít spolu. Respektujeme tempo každého dítěte, komunikujeme partnersky a vedeme děti k přirozené samostatnosti.",
    image: komunikace.url,
    alt: "Plastelínová bublina s usměvavým smajlíkem",
    tint: "bg-cream",
  },
  {
    title: "Otevřená a snadná komunikace",
    text: "Žádné papírové vzkazy na šatních skříňkách. Omluvenky i fotky z akcí máte v mobilní aplikaci. O víkendech navíc naši zahradu otevíráme veřejnosti.",
    image: srdce.url,
    alt: "Plastelínové červené srdce",
    tint: "bg-blush",
  },
];

export function SiteBenefits() {
  return (
    <section
      id="vyhody"
      className="section-y relative overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #ffffff 0%, #ffffff 10%, var(--mint-soft) 55%, var(--mint-soft) 100%)",
      }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <DoodleFajfka
          color="var(--brand-green)"
          className="absolute hidden sm:block"
          style={{ top: "7%", left: "5%", width: "clamp(60px, 6.5vw, 104px)", height: "auto", transform: "rotate(-14deg)", opacity: 0.38 }}
        />
        <DoodleHvezda
          color="var(--brand-yellow)"
          className="absolute"
          style={{ top: "3%", right: "5%", width: "clamp(56px, 6vw, 96px)", height: "auto", transform: "rotate(14deg)", opacity: 0.55 }}
        />
        <DoodleSipka
          color="var(--brand-blue)"
          className="absolute hidden sm:block"
          style={{ top: "16%", right: "7%", width: "clamp(80px, 9vw, 140px)", height: "auto", transform: "rotate(6deg)", opacity: 0.4 }}
        />
        <DoodleSrdce
          color="var(--coral)"
          className="absolute hidden md:block"
          style={{ bottom: "6%", left: "4%", width: "clamp(64px, 6.5vw, 104px)", height: "auto", transform: "rotate(-10deg)", opacity: 0.45 }}
        />
      </div>




      <div className="container relative z-10 mx-auto px-6">
        <div className="reveal-up section-header-gap mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-ink md:text-[40px]">
            To pravé místo pro vaše děti
          </h2>
        </div>


        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {benefits.map((b, i) => (
            <article
              key={b.title}
              className="card-hover reveal-up group flex flex-col gap-5 rounded-3xl border border-white/60 bg-background p-5 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.18)] sm:flex-row sm:items-center sm:gap-6 sm:p-6"
              style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}
            >
              <div
                className={`relative aspect-square w-full shrink-0 overflow-hidden rounded-2xl ring-1 ring-black/[0.04] sm:w-[40%] ${b.tint}`}
              >
                <img
                  src={b.image}
                  alt={b.alt}
                  width={640}
                  height={640}
                  className="absolute inset-0 m-auto h-[75%] w-[75%] object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-[22px] font-semibold leading-snug text-ink sm:text-2xl">
                  {b.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-body">{b.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
