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

const t = fixPrepositions;

export const Route = createFileRoute("/vzdelavani-a-rozvoj")({
  head: () => ({
    meta: [
      { title: "Vzdělávání a rozvoj — Mateřská škola Josefa Gočára" },
      {
        name: "description",
        content:
          "Pestrý program pro rozvoj jazyka, myšlení, pohybu i vztahu k přírodě a technologiím — angličtina, MIU, plavání, škola v přírodě i lyžařský kurz.",
      },
      { property: "og:title", content: "Vzdělávání a rozvoj — Mateřská škola Josefa Gočára" },
      {
        property: "og:description",
        content:
          "Jak v naší školce rozvíjíme jazyk, myšlení, technologie i pohyb — od angličtiny po lyžařský kurz.",
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
  eyebrow: string;
  title: string;
  photoLabel: string;
  photoBg: string;
  iconColor: string;
  iconBg: string;
  activities: Activity[];
};

const areas: Area[] = [
  {
    id: "jazyk",
    eyebrow: "Oblast 01",
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
    id: "mysleni",
    eyebrow: "Oblast 02",
    title: "Myšlení a příprava na školu",
    photoLabel: "Předškoláci",
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
    ],
  },
  {
    id: "technologie",
    eyebrow: "Oblast 03",
    title: "Moderní technologie",
    photoLabel: "Digitální pomůcky",
    photoBg: "#EAF5EC",
    iconColor: "text-brand-green",
    iconBg: "bg-brand-green/10",
    activities: [
      {
        icon: Cpu,
        title: "Digitální gramotnost",
        text:
          "Interaktivní tabule ve všech třídách, robotické myši, mikroskopy, světelný panel a další pomůcky.",
      },
    ],
  },
  {
    id: "pohyb",
    eyebrow: "Oblast 04",
    title: "Pohyb a pobyt v přírodě",
    photoLabel: "Plavání, hory, sníh",
    photoBg: "#FEF6E6",
    iconColor: "text-brand-yellow",
    iconBg: "bg-brand-yellow/15",
    activities: [
      {
        icon: Waves,
        title: "Plavecká výuka",
        text:
          "Děti se bezpečně seznamují s vodou, učí se základní plavecké dovednosti a získávají jistotu, koordinaci i odvahu. Kurz zajišťuje Plavecké středisko Zéva z. s. ve třech navazujících cyklech během roku; každý cyklus má 11 lekcí (á 45 min) včetně návštěvy aquacentra. Hradí rodiče.",
      },
      {
        icon: Mountain,
        title: "Škola v přírodě",
        text:
          "Pro děti z Červené a Zelené kostičky organizujeme čtyřdenní školu v přírodě v Krkonoších.",
      },
      {
        icon: Snowflake,
        title: "Lyžařský kurz",
        text:
          "Předškoláci mohou vyjet na pětidenní lyžařskou školu, kde se hravou formou učí základům lyžování a získávají jistotu na sněhu.",
      },
    ],
  },
];

function AreaBlock({ area, index }: { area: Area; index: number }) {
  const photoRight = index % 2 === 0;
  return (
    <section id={area.id} className="section-y-md scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
          {/* Photo */}
          <div
            className={`reveal-fade ${photoRight ? "md:order-2" : "md:order-1"}`}
          >
            <div
              className="flex aspect-[4/3] w-full items-end justify-start overflow-hidden rounded-2xl border border-border/60 p-6"
              style={{ backgroundColor: area.photoBg }}
            >
              <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
                {t("Foto brzy doplníme")}
              </span>
            </div>
          </div>

          {/* Content */}
          <div
            className={`reveal-up ${photoRight ? "md:order-1" : "md:order-2"}`}
          >
            <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink/55">
              {t(area.eyebrow)}
            </p>
            <h2 className="mt-3 font-display text-[32px] font-extrabold leading-[1.1] text-ink md:text-[42px]">
              {t(area.title)}
            </h2>

            <ul className="mt-8 flex flex-col gap-7">
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
                      <h3 className="font-display text-lg font-semibold text-ink md:text-xl">
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
          </div>
        </div>
      </div>
    </section>
  );
}

function VzdelavaniPage() {
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
              <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand-green">
                {t("O školce")}
              </p>
              <h1 className="mt-3 font-display text-[42px] font-extrabold leading-[1.05] text-ink md:text-[56px]">
                {t("Vzdělávání a rozvoj")}
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
        {areas.map((area, i) => (
          <AreaBlock key={area.id} area={area} index={i} />
        ))}

        <SiteFooter topCubeColor="blue" topCubePosition="right" showBottomCube={false} />
      </main>
    </div>
  );
}
