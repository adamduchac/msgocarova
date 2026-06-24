import { ArrowUpRight, MapPin } from "lucide-react";
import cubeRed from "@/assets/cube-red.png.asset.json";
import cubeYellow from "@/assets/cube-yellow.png.asset.json";

type ClassRow = {
  name: string;
  phone: string;
  href: string;
  dotClass: string;
};

const classes: ClassRow[] = [
  { name: "Modrá kostička", phone: "495 444 423", href: "#tridy-modra", dotClass: "bg-brand-blue" },
  { name: "Žlutá kostička", phone: "495 444 424", href: "#tridy-zluta", dotClass: "bg-brand-yellow" },
  { name: "Červená kostička", phone: "495 444 425", href: "#tridy-cervena", dotClass: "bg-brand-red" },
  { name: "Zelená kostička", phone: "495 444 426", href: "#tridy-zelena", dotClass: "bg-brand-green" },
];

export function SiteFooter() {
  return (
    <footer className="relative bg-transparent pt-24 md:pt-32 pb-16 md:pb-20">
      <div className="container mx-auto px-6 relative z-10">
        <div className="relative">
          {/* Červená kostička — sedí na horní hraně tmavé karty, ~10 px schovaných pod */}
          <img
            src={cubeRed.url}
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-[6%] bottom-[calc(100%-20px)] z-0 w-[6.3rem] select-none sm:bottom-[calc(100%-10px)] sm:left-[4%] sm:w-[7.35rem] lg:w-[10.5rem]"
            loading="lazy"
            decoding="async"
          />

          <div className="relative rounded-2xl bg-ink text-white">
            <img
              src={cubeYellow.url}
              alt=""
              aria-hidden
              className="pointer-events-none absolute bottom-[-10px] right-[-10px] z-20 w-[8rem] select-none sm:w-[9.6rem] lg:w-[12rem] scale-x-[-1]"
              loading="lazy"
              decoding="async"
            />


          <div className="relative z-10 px-6 py-14 md:px-12 md:py-16">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
              {/* Vedení školky */}
              <div>
                <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                  Vedení školky
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
                  Kontakt
                </h3>

                <div className="mt-6 flex items-start gap-3 text-[15px] leading-relaxed text-white/75">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-white/50" aria-hidden />
                  <address className="not-italic">
                    <span className="block font-medium text-white">Mateřská škola Josefa Gočára</span>
                    <span className="block">Škroupova 693</span>
                    <span className="block">500 02 Hradec Králové 2</span>
                  </address>
                </div>
              </div>

              {/* Jednotlivé třídy */}
              <div>
                <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                  Jednotlivé třídy
                </h3>

                <ul className="mt-6 flex flex-col gap-3">
                  {classes.map((c) => (
                    <li key={c.name}>
                      <a
                        href={c.href}
                        className="group flex items-center gap-3 transition-colors duration-200 hover:text-brand-yellow focus-visible:outline-none"
                        aria-label={`${c.name} — telefon ${c.phone}, vstup do třídy`}
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
              <span>© 2026 MŠ Josefa Gočára. Všechna práva vyhrazena.</span>
              <span className="mx-2 text-white/30" aria-hidden>|</span>
              <span>Používáme pouze technické cookies</span>
              <span className="mx-2 text-white/30" aria-hidden>|</span>
              <a
                href="https://www.addu.cz"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-brand-yellow"
              >
                Design a realizace ADDU.cz
              </a>
            </div>
          </div>

          </div>
        </div>
      </div>
    </footer>

  );
}
