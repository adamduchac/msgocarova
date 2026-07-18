import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Phone } from "lucide-react";
import { fixPrepositions } from "@/lib/typography";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { siteCopyQueryOptions, useCopyPage } from "@/lib/use-copy";
import cervenaPhoto from "@/assets/trida-cervena.webp.asset.json";
import zelenaPhoto from "@/assets/trida-zelena.webp.asset.json";
import modraPhoto from "@/assets/trida-modra.webp.asset.json";
import zlutaPhoto from "@/assets/trida-zluta.webp.asset.json";
import jitkaPhoto from "@/assets/teacher-jitka-kouklikova-v2.webp.asset.json";
import nikolaPhoto from "@/assets/teacher-nikola-sorfova-v2.webp.asset.json";
import janaPhoto from "@/assets/teacher-jana-tuharska-v2.webp.asset.json";

export const Route = createFileRoute("/barevne-tridy")({
  head: () => ({
    meta: [
      { title: "Barevné třídy — Mateřská škola Josefa Gočára" },
      {
        name: "description",
        content:
          "Poznejte naše čtyři třídy — Červená, Zelená, Modrá a Žlutá kostička. Paní učitelky, věkové skupiny a kontaktní telefony.",
      },
      { property: "og:title", content: "Barevné třídy — Mateřská škola Josefa Gočára" },
      {
        property: "og:description",
        content:
          "Čtyři barevné kostičky — Červená, Zelená, Modrá a Žlutá třída Mateřské školy Josefa Gočára.",
      },
      { property: "og:url", content: "/barevne-tridy" },
    ],
    links: [{ rel: "canonical", href: "/barevne-tridy" }],
  }),
  component: BarevneTridyPage,
});

type Teacher = {
  name: string;
  role: string;
  photo: string | null;
  bio: string | null;
};

type ClassData = {
  id: string;
  name: string;
  ageRange: string;
  description: string;
  specialty?: { label: string; text: string };
  phone: string;
  phoneHref: string;
  heroPhoto: string;
  alt: string;
  textColor: string;
  bgColor: string;
  pillText: string;
  teachers: Teacher[];
};

const classes: ClassData[] = [
  {
    id: "cervena",
    name: "Červená kostička",
    ageRange: "4–7 let",
    description:
      "Třída pro starší děti, která podporuje samostatnost, spolupráci a předškolní dovednosti.",
    specialty: {
      label: "Specialita třídy",
      text: "MIU pro předškoláky — rozvoj myšlení a strategií.",
    },
    phone: "495 444 425",
    phoneHref: "tel:+420495444425",
    heroPhoto: cervenaPhoto.url,
    alt: "Červená plastelínová kostička na hřišti se skluzavkou",
    textColor: "text-brand-red",
    bgColor: "bg-brand-red",
    pillText: "text-white",
    teachers: [
      {
        name: "Mgr. Nikola Šorfová",
        role: "Učitelka v Červené kostičce",
        photo: nikolaPhoto.url,
        bio: "Povolání učitelky mateřské školy jsem si zvolila, protože mě práce s dětmi velice naplňuje a zároveň je to pro mě posláním předávat dětem základy, které si ponesou do dalších životních etap. Mým cílem je, a považuji to za velmi důležité, aby se děti v prostředí mateřské školy cítily spokojeně, bezpečně a aby se hlavně rozvíjely tím správným směrem. Ve svém volném čase se ráda věnuji cyklistice, turistice a ze zimních sportů se nejvíce věnuji lyžování a běhu na lyžích. Miluji také hudbu a když jsem byla oslovena Základní uměleckou školou Melodie v Hořicích, kde jsem měla na 4 měsíce působit jako učitelka hry na zobcovou flétnu, neváhala jsem.",
      },
      {
        name: "Mgr. Jitka Kouklíková",
        role: "Zástupkyně ředitele pro MŠ",
        photo: jitkaPhoto.url,
        bio: "Jako zástupkyně ředitele pro MŠ propojuji každodenní práci s dětmi s vedením týmu mateřské školy a organizací provozu. Velkou radostí je pro mě vidět aktivní děti a spokojené paní učitelky, kterým se daří připravovat pro děti zajímavé aktivity a vytvářet smysluplné, podnětné prostředí — ve třídách i na školní zahradě. Dětem nejraději připravuji aktivity podporující jejich myšlení, tvořivost a radost z objevování. Záleží mi na tom, aby jim u nás bylo opravdu dobře.",
      },
      {
        name: "Hana Hloušková",
        role: "Učitelka v Červené kostičce",
        photo: null,
        bio: null,
      },
    ],
  },
  {
    id: "zelena",
    name: "Zelená kostička",
    ageRange: "4–7 let",
    description:
      "Třída pro starší děti se zaměřením na samostatnost a přípravu na školu.",
    specialty: {
      label: "Specialita třídy",
      text: "Jazykové hrátky — rozvoj řeči a komunikace.",
    },
    phone: "495 444 426",
    phoneHref: "tel:+420495444426",
    heroPhoto: zelenaPhoto.url,
    alt: "Zelená plastelínová kostička v parku",
    textColor: "text-brand-green",
    bgColor: "bg-brand-green",
    pillText: "text-white",
    teachers: [
      {
        name: "Jana Tuharská",
        role: "Učitelka v Zelené kostičce",
        photo: janaPhoto.url,
        bio: "Jmenuji se Jana Tuharská a v této mateřské škole pracuji už 30 let. Zaměřuji se na rozvoj grafomotoriky a dovedností, které dětem usnadňují vstup do základní školy. Děti vedu ke kamarádství. Ráda s dětmi dělám legraci. Hraji na kytaru a baví mě s nimi zpívat i tancovat. Zaměřuji se také na pracovní činnosti a tvoření z různých materiálů, které podporují jejich zručnost a kreativitu. Ve volném čase ráda cestuji a mám vztah k přírodě a ke zvířatům.",
      },
      {
        name: "Kristýna Vaňátková, DiS.",
        role: "Učitelka v Zelené kostičce",
        photo: null,
        bio: "Jmenuji se Kristýna a práci v mateřské škole vnímám jako smysluplné poslání. Práce s dětmi pro mě není jen zaměstnáním, ale také dlouhodobým zájmem. Odjakživa jsem věděla, že se chci věnovat právě vzdělávání. U dětí považuji za nejdůležitější jejich pohodu, bezpečí a důvěru. Snažím se proto vytvářet prostředí, ve kterém se děti nebojí vyjádřit svůj názor a mohou rozvíjet své schopnosti svým vlastním tempem. Důležitou součástí mé práce je výtvarná výchova, ve které ráda experimentuji s různými technikami a podporuji dětskou kreativitu.",
      },
    ],
  },
  {
    id: "modra",
    name: "Modrá kostička",
    ageRange: "3–5 let",
    description:
      "Třída pro mladší děti s důrazem na pozvolný a citlivý vstup do kolektivu.",
    phone: "495 444 423",
    phoneHref: "tel:+420495444423",
    heroPhoto: modraPhoto.url,
    alt: "Modrá plastelínová kostička u bazénku",
    textColor: "text-brand-blue",
    bgColor: "bg-brand-blue",
    pillText: "text-white",
    teachers: [
      {
        name: "Bc. Veronika Kremláčková",
        role: "Učitelka v Modré kostičce",
        photo: null,
        bio: "Snažím se pro děti i rodiče vytvářet klidné a přátelské klima na základě emocionálně bezpečného prostředí, vstřícnosti a efektivní komunikace. Důvěra, zodpovědnost a férový přístup jsou pro mě vždy na prvním místě. Věřím, že podpora samostatnosti, vzájemného respektu a dovednosti spolupracovat otevírá dětem dveře k naplněnému životu.",
      },
      {
        name: "Elena Špicarová",
        role: "Učitelka v Modré kostičce",
        photo: null,
        bio: null,
      },
    ],
  },
  {
    id: "zluta",
    name: "Žlutá kostička",
    ageRange: "3–5 let",
    description:
      "Třída pro mladší děti s klidným adaptačním režimem; ráno se zde scházejí děti z celé školky.",
    phone: "495 444 424",
    phoneHref: "tel:+420495444424",
    heroPhoto: zlutaPhoto.url,
    alt: "Žlutá plastelínová kostička na pískovišti",
    textColor: "text-brand-yellow",
    bgColor: "bg-brand-yellow",
    pillText: "text-ink",
    teachers: [
      {
        name: "Magdaléna Sováková",
        role: "Učitelka ve Žluté kostičce",
        photo: null,
        bio: null,
      },
      {
        name: "Milena Svobodová, DiS.",
        role: "Učitelka ve Žluté kostičce",
        photo: null,
        bio: "Ve své pedagogické praxi propojuji současné vzdělávací přístupy, zejména Montessori pedagogiku, program Začít spolu, principy zážitkové pedagogiky a výuku anglického jazyka. Důraz kladu na přirozený rozvoj dítěte, podporu jeho individuality a vytváření prostředí založeného na respektující komunikaci inspirované konceptem Respektovat a být respektován. Usiluji o vytváření bezpečného, podnětného a laskavého vzdělávacího prostředí, které dětem umožňuje objevovat, rozvíjet vlastní potenciál a zažívat radost z učení.",
      },
    ],
  },
];

function getInitials(name: string): string {
  return name
    .replace(/,.*$/, "")
    .split(/\s+/)
    .filter((part) => !/\./.test(part) && part.length > 0)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function TeacherCard({
  teacher,
  isOpen,
  onToggle,
  accentColor,
  cardId,
}: {
  teacher: Teacher;
  isOpen: boolean;
  onToggle: () => void;
  accentColor: string;
  cardId: string;
}) {
  const canExpand = teacher.bio !== null;
  const panelId = `${cardId}-panel`;

  return (
    <div className="overflow-hidden rounded-2xl border border-border/70 bg-background shadow-[0_10px_28px_-20px_rgba(15,23,42,0.2)]">
      <button
        type="button"
        onClick={canExpand ? onToggle : undefined}
        disabled={!canExpand}
        aria-expanded={canExpand ? isOpen : undefined}
        aria-controls={canExpand ? panelId : undefined}
        className={`flex w-full items-center gap-4 p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
          canExpand ? "cursor-pointer hover:bg-offwhite/50" : "cursor-default"
        }`}
      >
        <div
          className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl border border-border/60"
          style={teacher.photo ? undefined : { backgroundColor: "#FEF8E7" }}
        >
          {teacher.photo ? (
            <img
              src={teacher.photo}
              alt={`Portrét — ${teacher.name}`}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          ) : (
            <span className="font-display text-lg font-bold text-ink/30">
              {getInitials(teacher.name)}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display text-[15px] font-bold text-ink">
            {fixPrepositions(teacher.name)}
          </p>
          <p className={`mt-0.5 text-[13px] ${accentColor}`}>
            {fixPrepositions(teacher.role)}
          </p>
        </div>
        {canExpand && (
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-ink/50 transition-transform duration-300 motion-reduce:transition-none ${
              isOpen ? "rotate-180" : ""
            }`}
            aria-hidden
          />
        )}
      </button>
      {canExpand && (
        <div
          id={panelId}
          role="region"
          aria-label={`Medailonek — ${teacher.name}`}
          className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <p className="border-t border-border/60 px-4 py-4 text-[14px] leading-relaxed text-body">
              {fixPrepositions(teacher.bio!)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function ClassSection({ data, isLast }: { data: ClassData; isLast?: boolean }) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <section
      id={data.id}
      className="section-y-sm scroll-mt-28"
      style={
        isLast
          ? {
              background:
                "linear-gradient(to bottom, #FFFFFF 0%, #FEF8E7 60%, #FEF8E7 100%)",
            }
          : undefined
      }
    >
      <div className="container mx-auto px-6">
        <div className="reveal-up rounded-2xl border border-border/60 bg-background p-6 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.18)] md:p-10">
          {/* Hero ilustrace bez rámečku */}
          <img
            src={data.heroPhoto}
            alt={data.alt}
            className="aspect-[16/10] w-full object-cover"
            loading="lazy"
            decoding="async"
          />

          {/* Nadpis + info */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <h2
              className={`font-display text-[32px] font-extrabold leading-tight text-ink md:text-[40px]`}
            >
              {fixPrepositions(data.name)}
            </h2>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 font-display text-[13px] font-semibold ${data.bgColor} ${data.pillText}`}
            >
              {data.ageRange}
            </span>
          </div>

          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-body">
            {fixPrepositions(data.description)}
          </p>

          {data.specialty && (
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-body">
              <span className={`font-semibold ${data.textColor}`}>
                {fixPrepositions(data.specialty.label)}:
              </span>{" "}
              {fixPrepositions(data.specialty.text)}
            </p>
          )}

          <a
            href={data.phoneHref}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-4 py-2 font-display text-[14px] font-semibold text-ink transition-colors duration-200 hover:bg-offwhite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Phone className={`h-4 w-4 ${data.textColor}`} aria-hidden />
            <span>
              {fixPrepositions("Telefon do třídy")}: {data.phone}
            </span>
          </a>

          {/* Učitelky */}
          <div className="mt-10">
            <h3 className="font-display text-[20px] font-bold text-ink md:text-[22px]">
              {fixPrepositions("Paní učitelky")}
            </h3>
            <div className="mt-4 grid grid-cols-1 items-start gap-3 md:grid-cols-2">
              {data.teachers.map((t, i) => {
                const cardId = `${data.id}-t${i}`;
                return (
                  <TeacherCard
                    key={t.name}
                    teacher={t}
                    cardId={cardId}
                    isOpen={openIds.has(cardId)}
                    onToggle={() => toggle(cardId)}
                    accentColor={data.textColor}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BarevneTridyPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />

      <div
        style={{ background: "linear-gradient(to bottom, #FEF8E7 0%, #FFFFFF 100%)" }}
        className="pt-28 sm:pt-32"
      >
        <section className="section-y">
          <div className="container mx-auto px-6">
            <h1 className="font-display text-[42px] font-extrabold leading-[1.05] text-ink md:text-[56px]">
              {fixPrepositions("Barevné třídy")}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-body">
              {fixPrepositions(
                "Naše třídy nesou názvy barevných kostiček — symbolu dětské hry, té nejpřirozenější a nejdůležitější činnosti předškoláka. Cílem je podnětné prostředí plné hraček a zajímavých aktivit, kam se děti každý den těší."
              )}
            </p>
          </div>
        </section>
      </div>

      <main>
        {classes.map((c, i) => (
          <ClassSection key={c.id} data={c} isLast={i === classes.length - 1} />
        ))}

        <div style={{ backgroundColor: "#FEF8E7" }}>
          <SiteFooter topCubeColor="red" topCubePosition="right" showBottomCube={false} />
        </div>
      </main>
    </div>
  );
}
