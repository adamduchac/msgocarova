import { Trees, Languages, HeartHandshake, MessageCircle, type LucideIcon } from "lucide-react";

type Benefit = {
  title: string;
  text: string;
  icon: LucideIcon;
  circleBg: string;
  iconColor: string;
};

const benefits: Benefit[] = [
  {
    title: "Velká zahrada s dopravním hřištěm",
    text: "Ačkoliv jsme v klidném centru u Labe, děti mají k dispozici zahradu se vzrostlými stromy. Její součástí je oblíbená zemní trampolína, letní bazén i naše vlastní dopravní hřiště, kde děti jezdí na koloběžkách.",
    icon: Trees,
    circleBg: "bg-mint",
    iconColor: "text-brand-green",
  },
  {
    title: "Angličtina a moderní technologie",
    text: "Jdeme s dobou. Tradiční hraní doplňujeme o interaktivní tabule, tablety a základy programování s robotickými myšmi. Starší děti se navíc během týdne přirozenou a hravou formou seznamují s angličtinou.",
    icon: Languages,
    circleBg: "bg-sky",
    iconColor: "text-brand-blue",
  },
  {
    title: "Respektující a individuální přístup",
    text: "Inspirujeme se prvky Montessori a programu Začít spolu. Vedeme děti k samostatnosti, respektujeme jejich potřeby (nenutíme je do jídla ani do spánku) a komunikujeme s nimi partnersky pomocí popisného jazyka.",
    icon: HeartHandshake,
    circleBg: "bg-cream",
    iconColor: "text-brand-yellow",
  },
  {
    title: "Otevřená a snadná komunikace",
    text: "Zakládáme si na důvěře mezi školkou a rodinou. Pro snadné omlouvání a rychlý přehled o akcích využíváme aplikaci Naše MŠ. O víkendech na jaře a na podzim navíc otevíráme naši zahradu veřejnosti.",
    icon: MessageCircle,
    circleBg: "bg-blush",
    iconColor: "text-brand-red",
  },
];

export function SiteBenefits() {
  return (
    <section className="section-y">
      <div className="container mx-auto px-6">
        <div className="section-header-gap reveal-up max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-blue">
            Proč k nám
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink md:text-4xl">
            Proč MŠ Gočárova?
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-4">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="reveal-up flex flex-col"
                style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}
              >
                <div
                  className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full ${b.circleBg}`}
                  aria-hidden
                >
                  <Icon className={`h-7 w-7 ${b.iconColor}`} strokeWidth={2} />
                </div>
                <h3 className="font-display text-lg font-semibold leading-snug text-ink">
                  {b.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-body">{b.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}