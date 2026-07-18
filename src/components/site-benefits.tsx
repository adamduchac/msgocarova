import { fixPrepositions } from "@/lib/typography";
import { useCopyPage } from "@/lib/use-copy";
import zahrada from "@/assets/vyhoda-zahrada.webp.asset.json";
import robot from "@/assets/vyhoda-robot.webp.asset.json";
import komunikace from "@/assets/vyhoda-komunikace.webp.asset.json";
import srdce from "@/assets/vyhoda-srdce.webp.asset.json";

type Benefit = {
  titleMain: string;
  titleSub: string;
  text: string;
  image: string;
  alt: string;
  tint: string;
};

function useBenefits(): Benefit[] {
  const c = useCopyPage("index");
  return [
    {
      titleMain: c("benefits.card1.titleMain", "Velká zahrada"),
      titleSub: c("benefits.card1.titleSub", "s dopravním hřištěm"),
      text: c(
        "benefits.card1.text",
        "Naše zelená oáza v centru města u Labe žije celý rok — podzimní hrátky, zimní bobování, letní osvěžení v bazénu a prvky přírodní zahrady. Součástí je dopravní hřiště i trampolína. Ven chodíme za každého počasí."
      ),
      image: zahrada.url,
      alt: "Plastelínový strom a malé hřiště se skluzavkou",
      tint: "bg-mint",
    },
    {
      titleMain: c("benefits.card2.titleMain", "Angličtina"),
      titleSub: c("benefits.card2.titleSub", "a moderní technologie"),
      text: c(
        "benefits.card2.text",
        "Angličtinu máme přirozeně ve všech třídách. Jdeme s dobou. Tradiční hru doplňujeme o interaktivní tabule, robotické myši, mikroskopy i světelný panel."
      ),
      image: robot.url,
      alt: "Plastelínový robot s britskou vlajkou",
      tint: "bg-sky",
    },
    {
      titleMain: c("benefits.card3.titleMain", "Respektující"),
      titleSub: c("benefits.card3.titleSub", "a individuální přístup"),
      text: c(
        "benefits.card3.text",
        "Stavíme na důvěře, bezpečí a partnerské komunikaci mezi dětmi, učiteli i rodiči. Dáváme dětem prostor hledat vlastní řešení, spolupracovat a rozvíjet se vlastním tempem."
      ),
      image: komunikace.url,
      alt: "Plastelínová bublina s usměvavým smajlíkem",
      tint: "bg-cream",
    },
    {
      titleMain: c("benefits.card4.titleMain", "Otevřená"),
      titleSub: c("benefits.card4.titleSub", "a snadná komunikace"),
      text: c(
        "benefits.card4.text",
        "Jsme otevřená školka, pro kterou je spolupráce s rodinou klíčová. Pro omlouvání a přehled o dění využíváme aplikaci Naše MŠ, o víkendech otevíráme zahradu veřejnosti."
      ),
      image: srdce.url,
      alt: "Plastelínové červené srdce",
      tint: "bg-blush",
    },
  ];
}

export function SiteBenefits() {
  const c = useCopyPage("index");
  const benefits = useBenefits();
  return (
    <section
      id="vyhody"
      className="section-y"
      style={{
        background:
          "linear-gradient(to bottom, #ffffff 0%, #ffffff 10%, var(--blue-soft) 55%, var(--blue-soft) 100%)",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="reveal-up section-header-gap mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink/55">
            {c("benefits.eyebrow", "Přijďte se podívat")}
          </p>
          <h2 className="mt-3 font-display text-[34px] text-ink md:text-[40px]">
            {c("benefits.h2", "To pravé místo pro vaše děti")}
          </h2>

        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {benefits.map((b, i) => (
            <article
              key={b.titleMain}
              className="card-hover reveal-up group flex flex-col gap-5 rounded-3xl border border-white/60 bg-background p-5 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.18)] sm:flex-row sm:items-center sm:gap-6 sm:p-6"
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
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
                <h3 className="font-display font-semibold leading-tight text-ink">
                  <span className="block text-3xl md:text-[36px]">{b.titleMain}</span>
                  <span className="mt-1 block text-lg font-medium opacity-80 sm:text-xl">
                    {b.titleSub}
                  </span>
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
