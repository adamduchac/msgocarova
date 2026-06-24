import { ArrowUpRight, MapPin } from "lucide-react";
import logoAsset from "@/assets/logo.svg.asset.json";
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
    <footer className="relative bg-transparent pt-24 md:pt-32 pb-10 md:pb-14">
      <img
        src={cubeRed.url}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-[4%] top-[-10px] z-0 w-[6.3rem] select-none sm:w-[7.35rem] lg:w-[10.5rem]"
        loading="lazy"
        decoding="async"
      />
      <div className="container mx-auto px-6 relative z-10">
        <div className="relative rounded-2xl bg-ink text-white">
          <img
            src={cubeYellow.url}
            alt=""
            aria-hidden
            className="pointer-events-none absolute bottom-[-1.5rem] right-[-1.5rem] z-20 w-[8rem] select-none sm:w-[9.6rem] lg:w-[12rem] scale-x-[-1]"
            loading="lazy"
            decoding="async"
          />

          <div className="relative z-10 px-6 py-14 md:px-12 md:py-16">
            {/* Brand */}
            <div className="flex flex-col items-start gap-5 border-b border-white/10 pb-10 md:flex-row md:items-center md:justify-between md:gap-8">
              <a href="/" className="inline-flex items-center" aria-label="MŠ Josefa Gočára — domů">
                <img src={logoAsset.url} alt="MŠ Josefa Gočára" className="h-10 w-auto brightness-0 invert" />
              </a>
              <p className="max-w-md text-[15px] leading-relaxed text-white/70 md:text-right">
                Místo, kde děti rostou v bezpečí, hře a radosti.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
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

                <div className="mt-8">
                  <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                    Vedení školky
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
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
              </div>

              {/* Jednotlivé třídy */}
              <div>
                <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                  Jednotlivé třídy
                </h3>

                <ul className="mt-6 flex flex-col divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03]">
                  {classes.map((c) => (
                    <li key={c.name}>
                      <a
                        href={c.href}
                        className="group flex items-center gap-4 px-5 py-4 transition-colors duration-200 hover:bg-white/[0.05] focus-visible:bg-white/[0.05] focus-visible:outline-none"
                        aria-label={`${c.name} — telefon ${c.phone}, vstup do třídy`}
                      >
                        <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${c.dotClass}`} aria-hidden />
                        <span className="flex-1 font-display text-[16px] font-medium text-white">
                          {c.name}
                        </span>
                        <span className="text-[15px] tabular-nums text-white/75">{c.phone}</span>
                        <ArrowUpRight
                          className="h-4 w-4 text-white/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
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
            <div className="px-6 py-5 md:px-12">
              <p className="text-center text-sm text-white/55">
                © 2026 MŠ Josefa Gočára. Všechna práva vyhrazena.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
