import { useEffect, useRef, useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { fixPrepositions } from "@/lib/typography";
import janaPhoto from "@/assets/teacher-jana-tuharska.webp.asset.json";
import jitkaPhoto from "@/assets/teacher-jitka-kouklikova.webp.asset.json";
import nikolaPhoto from "@/assets/teacher-nikola-sorfova.webp.asset.json";
import martinaPhoto from "@/assets/teacher-martina-bartosova.webp.asset.json";

type Teacher = {
  name: string;
  role: string;
  roleColor: string;
  photo: string | null;
  alt: string;
  bio: string;
};

const teachers: Teacher[] = [
  {
    name: "Mgr. Jitka Kouklíková",
    role: fixPrepositions("Zástupkyně ředitele pro MŠ"),
    roleColor: "text-ink/70",
    photo: jitkaPhoto.url,
    alt: "Portrét paní Mgr. Jitky Kouklíkové",
    bio: fixPrepositions(
      "Jako zástupkyně ředitele pro MŠ propojuji každodenní práci s dětmi s vedením týmu mateřské školy a organizací provozu. Velkou radostí je pro mě vidět aktivní děti a spokojené paní učitelky, kterým se daří připravovat pro děti zajímavé aktivity a vytvářet smysluplné, podnětné prostředí — ve třídách i na školní zahradě. Vzdělávám se v oblasti předškolního vzdělávání, aby naše mateřská škola mohla stále růst a rozvíjet se. Dětem nejraději připravuji aktivity podporující jejich myšlení, tvořivost a radost z objevování. Všímám si toho, co děti zajímá a snažím se jim to nabídnout. Záleží mi na tom, aby jim u nás bylo opravdu dobře. Mám ráda zpěv, hudbu, přírodu a cestování."
    ),
  },
  {
    name: "Mgr. Nikola Šorfová",
    role: fixPrepositions("Učitelka v Červené kostičce"),
    roleColor: "text-brand-red",
    photo: nikolaPhoto.url,
    alt: "Portrét paní učitelky Mgr. Nikoly Šorfové",
    bio: fixPrepositions(
      "Povolání učitelky mateřské školy jsem si zvolila, protože mě práce s dětmi velice naplňuje a zároveň je to pro mě posláním předávat dětem základy, které si ponesou do dalších životních etap. Mým cílem je, a považuji to za velmi důležité, aby se děti v prostředí mateřské školy cítily spokojeně, bezpečně a aby se hlavně rozvíjely tím správným směrem. Ve svém volném čase se ráda věnuji cyklistice, turistice a ze zimních sportů se nejvíce věnuji lyžování a běhu na lyžích. Miluji také hudbu a když jsem byla oslovena Základní uměleckou školou Melodie v Hořicích, kde jsem měla na 4 měsíce působit jako učitelka hry na zobcovou flétnu, neváhala jsem. Ráda zpívám a hraji na zobcové flétny, proto jsem dlouhodobě také členkou flétnového souboru z Lázní Bělohrad. Hudbě bych se více ráda věnovala i při práci s dětmi, neboť hudba léčí, navozuje příjemnou a uklidňující atmosféru, která je pro mě v prostředí mateřské školy klíčová."
    ),
  },
  {
    name: "Jana Tuharská",
    role: fixPrepositions("Učitelka v Zelené kostičce"),
    roleColor: "text-brand-green",
    photo: janaPhoto.url,
    alt: "Portrét paní učitelky Jany Tuharské",
    bio: fixPrepositions(
      "Jmenuji se Jana Tuharská a v této mateřské škole pracuji už 30 let. Zaměřuji se na rozvoj grafomotoriky a dovedností, které dětem usnadňují vstup do základní školy. Děti vedu ke kamarádství. Ráda s dětmi dělám legraci. Hraji na kytaru a baví mě s nimi zpívat i tancovat. Zaměřuji se také na pracovní činnosti a tvoření z různých materiálů, které podporují jejich zručnost a kreativitu. Ve volném čase ráda cestuji a mám vztah k přírodě a ke zvířatům."
    ),
  },
  {
    name: "Kristýna Vaňátková, DiS.",
    role: fixPrepositions("Učitelka v Zelené kostičce"),
    roleColor: "text-brand-green",
    photo: null,
    alt: "Paní učitelka Kristýna Vaňátková",
    bio: fixPrepositions(
      "Jmenuji se Kristýna a práci v mateřské škole vnímám jako smysluplné poslání. Práce s dětmi pro mě není jen zaměstnáním, ale také dlouhodobým zájmem. Odjakživa jsem věděla, že se chci věnovat právě vzdělávání. U dětí považuji za nejdůležitější jejich pohodu, bezpečí a důvěru. Snažím se proto vytvářet prostředí, ve kterém se děti nebojí vyjádřit svůj názor a mohou rozvíjet své schopnosti svým vlastním tempem. Důležitou součástí mé práce je výtvarná výchova, ve které ráda experimentuji s různými technikami a podporuji dětskou kreativitu."
    ),
  },
  {
    name: "Bc. Veronika Kremláčková",
    role: fixPrepositions("Učitelka v Modré kostičce"),
    roleColor: "text-brand-blue",
    photo: null,
    alt: "Paní učitelka Bc. Veronika Kremláčková",
    bio: fixPrepositions(
      "Snažím se pro děti i rodiče vytvářet klidné a přátelské klima na základě emocionálně bezpečného prostředí, vstřícnosti a efektivní komunikace. Důvěra, zodpovědnost a férový přístup jsou pro mě vždy na prvním místě. Věřím, že podpora samostatnosti, vzájemného respektu a dovednosti spolupracovat otevírá dětem dveře k naplněnému životu."
    ),
  },
  {
    name: "Milena Svobodová, DiS.",
    role: fixPrepositions("Učitelka ve Žluté kostičce"),
    roleColor: "text-brand-yellow",
    photo: null,
    alt: "Paní učitelka Milena Svobodová, DiS.",
    bio: fixPrepositions(
      "Ve své pedagogické praxi propojuji současné vzdělávací přístupy, zejména Montessori pedagogiku, program Začít spolu, principy zážitkové pedagogiky a výuku anglického jazyka. Důraz kladu na přirozený rozvoj dítěte, podporu jeho individuality a vytváření prostředí založeného na respektující komunikaci inspirované konceptem Respektovat a být respektován. Usiluji o vytváření bezpečného, podnětného a laskavého vzdělávacího prostředí, které dětem umožňuje objevovat, rozvíjet vlastní potenciál a zažívat radost z učení. Ve výuce využívám také cvičební metodu Lerngymnastiky, která přirozenou cestou podporuje soustředění, koordinaci i celkovou pohodu při učení. Aktivně se zapojuji do mezinárodní spolupráce prostřednictvím platformy eTwinning, kde jsem byla oceněna za realizaci projektů. Podílím se na projektech zaměřených na environmentální výchovu, podporu pohybu, rozvoj spolupráce mezi dětmi i šíření respektujícího přístupu ve vzdělávání napříč Evropou. Ve volném čase se věnuji pohybovým aktivitám, zejména józe, cyklistice a lyžování, které pro mě představují důležitý zdroj rovnováhy, inspirace a osobní pohody."
    ),
  },
  {
    name: "Martina Bartošová",
    role: fixPrepositions("Učitelka mateřské školy"),
    roleColor: "text-ink/70",
    photo: martinaPhoto.url,
    alt: "Portrét paní učitelky Martiny Bartošové",
    bio: fixPrepositions(
      "Jsem kvalifikovaná učitelka mateřské školy s bohatými zkušenostmi z praxe i dalších oborů. Působila jsem v různých mateřských školách, díky čemuž čerpám z pestré pedagogické zkušenosti. Ve své profesní dráze jsem se věnovala také financím a dlouhodobě návrhům interiérů a zahrad pro mateřské školy. Tyto zkušenosti mi pomáhají vytvářet podnětné a bezpečné prostředí pro děti. Blízká je mi kreativní a výtvarná činnost, ráda zkouším nové techniky a předávám je dětem. Hudba je nedílnou součástí mého života a často ji zapojuji do práce s dětmi. Věřím v celoživotní učení a ve své práci propojuji odbornost, kreativitu a individuální přístup k dětem."
    ),
  },
];

const AUTOPLAY_MS = 7000;

function getInitials(name: string): string {
  return name
    .replace(/,.*$/, "")
    .split(/\s+/)
    .filter((part) => !/\./.test(part) && part.length > 0)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function SiteTeachers() {
  const [index, setIndex] = useState(0);
  const total = teachers.length;
  const touchStartX = useRef<number | null>(null);

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + total) % total);
  const goTo = (i: number) => setIndex(((i % total) + total) % total);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);


  return (
    <section id="tym" className="section-y">
      <div className="container mx-auto px-6">
        <div
          className="rounded-3xl border border-border/70 bg-background px-6 py-12 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.18)] md:px-12 md:py-16 lg:px-16 lg:py-20"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const start = touchStartX.current;
            if (start == null) return;
            const dx = e.changedTouches[0].clientX - start;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            touchStartX.current = null;
          }}
        >
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="reveal-up font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink/55">
              {fixPrepositions("Náš tým")}
            </p>
            <h2 className="reveal-up mt-3 font-display text-[34px] text-ink md:text-[40px]">
              {fixPrepositions("Lidé, kteří se o vaše děti")}{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(105deg, #2563EB 0%, #38BDF8 100%)",
                }}
              >
                {fixPrepositions("starají")}
              </span>
            </h2>
          </div>

          {/* Slider */}
          <div
            className="reveal-fade relative mt-10 lg:mt-12"
            role="region"
            aria-roledescription="carousel"
            aria-label="Medailonky učitelů"
          >
            <div className="relative">
              <div key={index} className="animate-fade-in">
                {(() => {
                  const t = teachers[index];
                  return (
                    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,360px)_1fr] md:gap-12 lg:gap-16">
                      <div
                        className="mx-auto w-full max-w-[360px] overflow-hidden rounded-2xl border border-border/60"
                        style={t.photo ? undefined : { backgroundColor: "#FEF8E7" }}
                      >
                        {t.photo ? (
                          <img
                            src={t.photo}
                            alt={t.alt}
                            className="aspect-[4/5] h-full w-full object-cover"
                            loading="eager"
                            decoding="async"
                            draggable={false}
                          />
                        ) : (
                          <div
                            className="flex aspect-[4/5] w-full items-center justify-center"
                            aria-label={t.alt}
                            role="img"
                          >
                            <span className="font-display text-[72px] font-bold leading-none text-ink/20">
                              {getInitials(t.name)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <p
                          className={`font-display text-sm font-semibold uppercase tracking-[0.16em] ${t.roleColor}`}
                        >
                          {t.role}
                        </p>
                        <h3 className="mt-2 font-display text-[28px] font-bold text-ink md:text-[34px]">
                          {t.name}
                        </h3>
                        <p className="mt-5 text-[15px] leading-relaxed text-body md:text-base">
                          {t.bio}
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>


            {/* Controls */}
            {total > 1 && (
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Předchozí učitel"
                  className="grid h-11 w-11 place-items-center rounded-full border border-border/70 bg-background text-ink transition-colors duration-200 hover:bg-offwhite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-2" role="tablist">
                  {teachers.map((t, i) => (
                    <button
                      key={t.name}
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      aria-label={`Zobrazit ${t.name}`}
                      onClick={() => goTo(i)}
                      className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                        i === index ? "w-6 bg-ink" : "w-2.5 bg-ink/25 hover:bg-ink/40"
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Další učitel"
                  className="grid h-11 w-11 place-items-center rounded-full border border-border/70 bg-background text-ink transition-colors duration-200 hover:bg-offwhite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
