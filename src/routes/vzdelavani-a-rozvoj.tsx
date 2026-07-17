import { createFileRoute } from "@tanstack/react-router";
import {
  Languages,
  MessageCircle,
  Brain,
  Cpu,
  Waves,
  Mountain,
  Snowflake,
  type LucideIcon,
} from "lucide-react";
import { fixPrepositions } from "@/lib/typography";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import anglictinaImg from "@/assets/vzdelavani/anglictina.webp.asset.json";
import robotImg from "@/assets/vzdelavani/robot-2.webp.asset.json";
import plavaniImg from "@/assets/vzdelavani/plavani.webp.asset.json";
import skolaPrirodeImg from "@/assets/vzdelavani/skolavprirode.webp.asset.json";
import lyzeImg from "@/assets/vzdelavani/lyze.webp.asset.json";

const t = fixPrepositions;

export const Route = createFileRoute("/vzdelavani-a-rozvoj")({
  head: () => ({
    meta: [
      { title: "Vzdělávání a aktivity — Mateřská škola Josefa Gočára" },
      {
        name: "description",
        content:
          "Jak v naší školce rozvíjíme jazyk, myšlení a technologie a jaké aktivity dětem nabízíme — od plavání přes školu v přírodě po lyžařský kurz.",
      },
      { property: "og:title", content: "Vzdělávání a aktivity — Mateřská škola Josefa Gočára" },
      {
        property: "og:description",
        content:
          "Vzdělávací program a aktivity naší mateřské školy — angličtina, MIU, digitální gramotnost, plavání, škola v přírodě i lyžařský kurz.",
      },
      { property: "og:url", content: "/vzdelavani-a-rozvoj" },
    ],
    links: [{ rel: "canonical", href: "/vzdelavani-a-rozvoj" }],
  }),
  component: VzdelavaniPage,
});

type Activity = {
  icon: LucideIcon;
  title: string;
  text: string;
};

type Area = {
  id: string;
  title: string;
  photoLabel: string;
  photoBg: string;
  iconColor: string;
  iconBg: string;
  activities: Activity[];
};

const vzdelavaniAreas: Area[] = [
  {
    id: "jazyk",
    title: "Jazyk a komunikace",
    photoLabel: "Angličtina a řeč",
    photoBg: "#E3EEFB",
    iconColor: "text-brand-blue",
    iconBg: "bg-brand-blue/10",
    activities: [
      {
        icon: Languages,
        title: "Angličtina ve všech třídách",
        text:
          "Výuku vedou metodicky proškolení učitelé naší MŠ. Děti se přes hry, tanečky, obrázky a jednoduché aktivity seznamují se základní slovní zásobou a běžnými vazbami (It is…, I like…, My name is…). Postupně zvládají i jednoduché otázky (What's your name?, Do you like…?). Témata: barvy, čísla, ovoce a zelenina, svátky, oblečení, části těla, zvířata, dopravní prostředky a další dle věku.",
      },
      {
        icon: MessageCircle,
        title: "Jazykové hrátky (Zelená kostička)",
        text:
          "Hravou formou rozvíjíme řeč a komunikaci. Rozhýbáváme mluvidla, pracujeme s dechovými hrami, říkadly, písničkami i pohybem. Vše přirozeně a s ohledem na věk dětí.",
      },
    ],
  },
  {
    id: "priprava-a-technologie",
    title: "Příprava na školu a moderní technologie",
    photoLabel: "Předškoláci a digitální pomůcky",
    photoBg: "#FCEDED",
    iconColor: "text-brand-red",
    iconBg: "bg-brand-red/10",
    activities: [
      {
        icon: Brain,
        title: "MIU — předškoláci (Červená kostička)",
        text:
          "Metoda MIU rozvíjí myšlení a kognitivní funkce a vede děti k uvědomovanému řešení úkolů, plánování a hledání strategií. Pracujeme s instrumentem Spojování bodů.",
      },
      {
        icon: Cpu,
        title: "Digitální gramotnost",
        text:
          "Interaktivní tabule ve všech třídách, robotické myši, mikroskopy, světelný panel a další pomůcky.",
      },
    ],
  },
];

const aktivityAreas: Area[] = [
  {
    id: "plavani",
    title: "Plavecká výuka",
    photoLabel: "Plavání",
    photoBg: "#E3EEFB",
    iconColor: "text-brand-blue",
    iconBg: "bg-brand-blue/10",
    activities: [
      {
        icon: Waves,
        title: "Kurz s Plaveckým střediskem Zéva",
        text:
          "Děti se bezpečně seznamují s vodou, učí se základní plavecké dovednosti a získávají jistotu, koordinaci i odvahu. Kurz probíhá ve třech navazujících cyklech během roku; každý cyklus má 11 lekcí (á 45 min) včetně návštěvy aquacentra. Hradí rodiče.",
      },
    ],
  },
  {
    id: "skola-v-prirode",
    title: "Škola v přírodě",
    photoLabel: "Krkonoše",
    photoBg: "#EAF5EC",
    iconColor: "text-brand-green",
    iconBg: "bg-brand-green/10",
    activities: [
      {
        icon: Mountain,
        title: "Čtyři dny v Krkonoších",
        text:
          "Pro děti z Červené a Zelené kostičky organizujeme čtyřdenní školu v přírodě v Krkonoších.",
      },
    ],
  },
  {
    id: "lyzarsky-kurz",
    title: "Lyžařský kurz",
    photoLabel: "Sníh a lyže",
    photoBg: "#FEF6E6",
    iconColor: "text-brand-yellow",
    iconBg: "bg-brand-yellow/15",
    activities: [
      {
        icon: Snowflake,
        title: "Pětidenní lyžařská škola pro předškoláky",
        text:
          "Předškoláci mohou vyjet na pětidenní lyžařskou školu, kde se hravou formou učí základům lyžování a získávají jistotu na sněhu.",
      },
    ],
  },
];

function AreaPhoto({ area, aspect = "aspect-[4/5]" }: { area: Area; aspect?: string }) {
  return (
    <div
      className={`flex ${aspect} w-full items-end justify-start overflow-hidden rounded-2xl border border-border/60 p-6`}
      style={{ backgroundColor: area.photoBg }}
    >
      <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
        {t("Foto brzy doplníme")}
      </span>
    </div>
  );
}

function AreaActivities({ area }: { area: Area }) {
  return (
    <ul className="mt-6 flex flex-col gap-6">
      {area.activities.map((a) => {
        const Icon = a.icon;
        return (
          <li key={a.title} className="flex gap-4">
            <span
              className={`mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${area.iconBg}`}
              aria-hidden
            >
              <Icon className={`h-5 w-5 ${area.iconColor}`} />
            </span>
            <div className="flex-1">
              <h3 className="font-display text-lg font-semibold text-ink">
                {t(a.title)}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-body">
                {t(a.text)}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function AreaCard({ area }: { area: Area }) {
  return (
    <article id={area.id} className="reveal-up scroll-mt-28">
      <AreaPhoto area={area} />
      <div className="mt-7">
        <h3 className="font-display text-[26px] font-extrabold leading-[1.15] text-ink md:text-[30px]">
          {t(area.title)}
        </h3>
        <AreaActivities area={area} />
      </div>
    </article>
  );
}

function AreaCardWide({ area }: { area: Area }) {
  return (
    <article id={area.id} className="reveal-up scroll-mt-28">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <AreaPhoto area={area} />
        </div>
        <div>
          <h3 className="font-display text-[28px] font-extrabold leading-[1.15] text-ink md:text-[34px]">
            {t(area.title)}
          </h3>
          <AreaActivities area={area} />
        </div>
      </div>
    </article>
  );
}

function GroupHeader({ title }: { title: string }) {
  return (
    <div className="reveal-up mb-10 md:mb-14">
      <h2 className="font-display text-[32px] font-extrabold leading-[1.1] text-ink md:text-[42px]">
        {t(title)}
      </h2>
    </div>
  );
}

function VzdelavaniPage() {
  const [lyzak, ...rest] = [...aktivityAreas].reverse();
  const firstTwoAktivity = rest.reverse();

  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />

      {/* Hero */}
      <div
        style={{ background: "linear-gradient(to bottom, #FEF8E7 0%, #FFFFFF 100%)" }}
        className="pt-28 sm:pt-32"
      >
        <section className="section-y-sm">
          <div className="container mx-auto px-6">
            <div className="reveal-up max-w-3xl">
              <h1 className="font-display text-[42px] font-extrabold leading-[1.05] text-ink md:text-[56px]">
                {t("Vzdělávání a aktivity")}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-body md:text-xl">
                {t(
                  "Vedle každodenní hry nabízíme dětem pestrý program, který přirozeně rozvíjí jazyk, myšlení, pohyb i vztah k přírodě a technologiím. Aktivity přizpůsobujeme věku dětí a jednotlivým třídám."
                )}
              </p>
            </div>
          </div>
        </section>
      </div>

      <main>
        {/* Vzdělávání */}
        <section className="section-y-md">
          <div className="container mx-auto px-6">
            <GroupHeader title="Vzdělávání" />
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-14">
              {vzdelavaniAreas.map((a) => (
                <AreaCard key={a.id} area={a} />
              ))}
            </div>
          </div>
        </section>

        {/* Aktivity */}
        <section className="section-y-md">
          <div className="container mx-auto px-6">
            <GroupHeader title="Aktivity" />
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-14">
              {firstTwoAktivity.map((a) => (
                <AreaCard key={a.id} area={a} />
              ))}
            </div>
            <div className="mt-12 md:mt-14">
              <AreaCardWide area={lyzak} />
            </div>
          </div>
        </section>

        <SiteFooter topCubeColor="blue" topCubePosition="right" showBottomCube={false} />
      </main>
    </div>
  );
}
