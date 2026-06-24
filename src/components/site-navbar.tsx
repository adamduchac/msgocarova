import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import logoAsset from "@/assets/logo.svg.asset.json";

const navLinks = [
  { label: "O školce", href: "#o-skolce" },
  { label: "Třídy", href: "#tridy" },
  { label: "Pro rodiče", href: "#rodice" },
  { label: "Aktuality", href: "#aktuality" },
  { label: "Kontakt", href: "#kontakt" },
];

export function SiteNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full px-6 pt-3 sm:pt-4">
      <div className="container mx-auto overflow-hidden rounded-2xl border border-white/50 bg-background/80 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.25)] backdrop-blur-lg">
        <div className="flex h-20 items-center justify-between px-6 lg:px-8">
          <a href="/" className="flex items-center" aria-label="MŠ Josefa Gočára — domů">
            <img src={logoAsset.url} alt="MŠ Josefa Gočára" className="h-10 w-auto" />
          </a>

          <div className="flex items-center gap-8">
            <nav className="hidden items-center gap-8 lg:flex" aria-label="Hlavní navigace">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="nav-link relative text-[15px] font-medium text-ink/85 transition-colors duration-200 hover:text-ink focus-visible:text-ink"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              href="#zapis"
              className="group hidden h-11 items-center gap-2 rounded-md bg-brand-blue px-5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-brand-blue/90 lg:inline-flex"
            >
              Přihlásit dítě
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Zavřít menu" : "Otevřít menu"}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-md bg-news-pinned text-ink transition-colors duration-200 hover:brightness-95 lg:hidden"
            >
              <Menu className={`h-5 w-5 absolute transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`} aria-hidden />
              <X className={`h-5 w-5 absolute transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`} aria-hidden />
            </button>
          </div>
        </div>

        <div
          id="mobile-nav"
          className={`mobile-nav-panel lg:hidden border-t border-border/60 origin-top overflow-y-auto overscroll-contain transition-[opacity,transform,max-height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open
              ? "opacity-100 translate-y-0 max-h-[calc(100dvh-6rem)] pointer-events-auto"
              : "opacity-0 -translate-y-1 max-h-0 pointer-events-none border-transparent"
          }`}
          aria-hidden={!open}
        >
          <nav className="flex flex-col gap-1 px-6 py-4" aria-label="Mobilní navigace">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="mobile-nav-item rounded-lg px-3 py-3 text-base font-medium text-ink/90 transition-colors duration-200 hover:bg-offwhite hover:text-brand-blue"
                style={{ ["--mobile-nav-delay" as string]: `${i * 40}ms` }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#zapis"
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="mobile-nav-item mt-2 inline-flex h-12 items-center justify-center rounded-md bg-brand-blue px-5 text-base font-semibold text-white transition-colors duration-200 hover:bg-brand-blue/90"
              style={{ ["--mobile-nav-delay" as string]: `${navLinks.length * 40}ms` }}
            >
              Přihlásit dítě
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

