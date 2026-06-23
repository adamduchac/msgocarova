import { useState } from "react";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/logo.svg.asset.json";

const navLinks = [
  { label: "O nás", href: "#o-nas" },
  { label: "Naše třídy", href: "#tridy" },
  { label: "Pro rodiče", href: "#rodice" },
  { label: "Aktuality", href: "#aktuality" },
  { label: "Galerie", href: "#galerie" },
  { label: "Kontakt", href: "#kontakt" },
];

export function SiteNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
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
            href="#nase-ms"
            className="hidden h-11 items-center rounded-md bg-brand-green px-5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-brand-green-hover lg:inline-flex"
          >
            Naše MŠ
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Zavřít menu" : "Otevřít menu"}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-md bg-news-pinned text-ink transition-colors duration-200 hover:brightness-95 lg:hidden"
          >
            <Menu
              className={`h-5 w-5 absolute transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}
              aria-hidden="true"
            />
            <X
              className={`h-5 w-5 absolute transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`mobile-nav-panel lg:hidden border-t border-border/60 bg-background origin-top overflow-hidden transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4" aria-label="Mobilní navigace">
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
            href="#nase-ms"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            className="mobile-nav-item mt-2 inline-flex h-12 items-center justify-center rounded-md bg-brand-green px-5 text-base font-semibold text-white transition-colors duration-200 hover:bg-brand-green-hover"
            style={{ ["--mobile-nav-delay" as string]: `${navLinks.length * 40}ms` }}
          >
            Naše MŠ
          </a>
        </nav>
      </div>
    </header>
  );
}