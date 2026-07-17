import { ArrowUpRight, MapPin } from "lucide-react";
import { fixPrepositions } from "@/lib/typography";
import cubeRed from "@/assets/cube-red.png.asset.json";
import cubeYellow from "@/assets/cube-yellow.png.asset.json";
import cubeBlue from "@/assets/cube-blue.png.asset.json";


type ClassRow = {
  name: string;
  phone: string;
  href: string;
  dotClass: string;
};

const classes: ClassRow[] = [
  { name: "Červená kostička", phone: "495 444 425", href: "#tridy-cervena", dotClass: "bg-brand-red" },
  { name: "Zelená kostička", phone: "495 444 426", href: "#tridy-zelena", dotClass: "bg-brand-green" },
  { name: "Modrá kostička", phone: "495 444 423", href: "#tridy-modra", dotClass: "bg-brand-blue" },
  { name: "Žlutá kostička", phone: "495 444 424", href: "#tridy-zluta", dotClass: "bg-brand-yellow" },
];

type SiteFooterProps = {
  cubeVariant?: "default" | "kontakty";
  topCubeColor?: "red" | "blue" | "yellow";
  topCubePosition?: "left" | "right";
  showBottomCube?: boolean;
};

export function SiteFooter({
  cubeVariant = "default",
  topCubeColor,
  topCubePosition,
  showBottomCube,
}: SiteFooterProps) {
  // Backwards-compat mapping from cubeVariant
  const resolvedColor: "red" | "blue" | "yellow" =
    topCubeColor ?? (cubeVariant === "kontakty" ? "blue" : "red");
  const resolvedPosition: "left" | "right" =
    topCubePosition ?? (cubeVariant === "kontakty" ? "right" : "left");
  const resolvedShowBottom =
    showBottomCube ?? (cubeVariant !== "kontakty");

  const topCube =
    resolvedColor === "blue"
      ? cubeBlue
      : resolvedColor === "yellow"
        ? cubeYellow
        : cubeRed;
  const bottomCube = resolvedShowBottom ? cubeYellow : null;
  const topPositionClass =
    resolvedPosition === "right"
      ? "right-[6%] sm:right-[4%]"
      : "left-[6%] sm:left-[4%]";
  return (
    <footer className="relative bg-transparent pt-24 md:pt-32 pb-16 md:pb-20">
      <div className="container mx-auto px-6 relative z-10">
        <div className="relative">
          {/* Horní kostička — sedí na horní hraně tmavé karty */}
          <img
            src={topCube.url}
            alt=""
            aria-hidden
            className={`pointer-events-none absolute ${topPositionClass} bottom-[calc(100%-35px)] z-0 w-[6.3rem] select-none sm:bottom-[calc(100%-25px)] sm:w-[7.35rem] lg:w-[10.5rem]`}
            loading="lazy"
            decoding="async"
          />


          <div className="relative rounded-2xl bg-ink text-white">
            {bottomCube && (
              <img
                src={bottomCube.url}
                alt=""
                aria-hidden
                className="pointer-events-none absolute bottom-3 right-3 z-20 hidden w-[8rem] select-none sm:bottom-[-30px] sm:right-[-30px] sm:block sm:w-[9.6rem] lg:w-[12rem] scale-x-[-1]"
                loading="lazy"
                decoding="async"
              />
            )}


          <div className="relative z-10 px-6 py-14 md:px-12 md:py-16">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
              {/* Vedení školky */}
              <div>
                <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                  {fixPrepositions("Vedení školky")}
                </h3>

                <div className="mt-6 flex flex-col gap-2">
                  <a
                    href="mailto:kosticky@msjghk.cz"
                    className="font-display text-2xl font-semibold text-white transition-colors duration-200 hover:text-brand-yellow md:text-[28px]"
                  >
                    kosticky@msjghk.cz
                  </a>
                  <a
                    href="tel:+420495444421"
                    className="font-display text-2xl font-semibold text-white transition-colors duration-200 hover:text-brand-yellow md:text-[28px]"
                  >
                    495 444 421
                  </a>
                </div>
              </div>

              {/* Kontakt */}
              <div>
                <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                  {fixPrepositions("Kontakt")}
                </h3>

                <div className="mt-6 flex items-start gap-3 text-[15px] leading-relaxed text-white/75">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-white/50" aria-hidden />
                  <address className="not-italic">
                    <span className="block font-medium text-white">{fixPrepositions("Mateřská škola Josefa Gočára")}</span>
                    <span className="block">Škroupova 693</span>
                    <span className="block">500 02 Hradec Králové 2</span>
                  </address>
                </div>
              </div>

              {/* Jednotlivé třídy */}
              <div>
                <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                  {fixPrepositions("Jednotlivé třídy")}
                </h3>

                <ul className="mt-6 flex flex-col gap-3">
                  {classes.map((c) => (
                    <li key={c.name}>
                      <a
                        href={c.href}
                        className="group flex items-center gap-3 transition-colors duration-200 hover:text-brand-yellow focus-visible:outline-none"
                        aria-label={fixPrepositions(`${c.name} — telefon ${c.phone}, vstup do třídy`)}
                      >
                        <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${c.dotClass}`} aria-hidden />
                        <span className="flex-1 font-display text-[15px] font-medium text-white group-hover:text-brand-yellow transition-colors duration-200">
                          {c.name}
                        </span>
                        <span className="text-[15px] tabular-nums text-white/75 group-hover:text-brand-yellow transition-colors duration-200">{c.phone}</span>
                        <ArrowUpRight
                          className="h-4 w-4 text-white/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-yellow"
                          aria-hidden
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="relative z-10 border-t border-white/10">
            <div className="px-6 py-5 md:px-12 text-left text-sm text-white/55">
              <span>{fixPrepositions("© 2026 Mateřská škola Josefa Gočára. Všechna práva vyhrazena.")}</span>
              <span className="mx-2 text-white/30" aria-hidden>|</span>
              <span>{fixPrepositions("Používáme pouze technické cookies")}</span>
              <span className="mx-2 text-white/30" aria-hidden>|</span>
              <a
                href="https://www.addu.cz"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-brand-yellow"
              >
                {fixPrepositions("Design a realizace ADDU.cz")}
              </a>
            </div>
          </div>

          </div>
        </div>
      </div>
    </footer>

  );
}
