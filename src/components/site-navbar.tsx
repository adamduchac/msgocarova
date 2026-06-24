import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/logo.svg.asset.json";

type NavChild = { label: string; href: string };
type NavItem =
  | { label: string; href: string; external?: boolean }
  | { label: string; children: NavChild[] };

const navItems: NavItem[] = [
  {
    label: "O školce",
    children: [
      { label: "Představení a vize", href: "#predstaveni" },
      { label: "Náš tým", href: "#tym" },
      { label: "Veřejné hřiště", href: "#hriste" },
      { label: "Školní jídelna", href: "#jidelna" },
    ],
  },
  {
    label: "Barevné třídy",
    children: [
      { label: "Modrá kostička", href: "#trida-modra" },
      { label: "Červená kostička", href: "#trida-cervena" },
      { label: "Zelená kostička", href: "#trida-zelena" },
      { label: "Žlutá kostička", href: "#trida-zluta" },
    ],
  },
  {
    label: "Pro rodiče",
    children: [
      { label: "Zápis do MŠ", href: "#zapis" },
      { label: "Organizace a Platby", href: "#organizace" },
      { label: "Program a aktivity", href: "#program" },
      { label: "Dokumenty ke stažení", href: "#dokumenty" },
    ],
  },
  {
    label: "ZŠ Josefa Gočára",
    href: "https://zsgocarova.cz/",
    external: true,
  },
];

export function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };
  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const openNow = (label: string) => {
    cancelClose();
    setOpenMenu(label);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  return (
    <header className="relative z-50 w-full bg-offwhite px-6 pt-3 sm:pt-4">
      <div className="container mx-auto overflow-visible rounded-2xl bg-transparent">

        <div className="flex h-20 items-center justify-between px-6 lg:px-8">
          <a href="/" className="flex items-center" aria-label="MŠ Josefa Gočára — domů">
            <img src={logoAsset.url} alt="MŠ Josefa Gočára" className="h-10 w-auto" />
          </a>

          <div className="flex items-center gap-8 xl:gap-10">
            <nav ref={navRef} className="hidden items-center gap-9 lg:flex xl:gap-12" aria-label="Hlavní navigace">

              {navItems.map((item) => {
                if ("children" in item) {
                  const isOpen = openMenu === item.label;
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => openNow(item.label)}
                      onMouseLeave={scheduleClose}
                    >
                      <button
                        type="button"
                        aria-haspopup="true"
                        aria-expanded={isOpen}
                        onFocus={() => openNow(item.label)}
                        onClick={() => setOpenMenu(isOpen ? null : item.label)}
                        className="nav-link inline-flex items-center text-[15px] font-medium text-ink/85 transition-colors duration-200 hover:text-ink focus-visible:text-ink"
                      >
                        {item.label}
                      </button>

                      <div
                        role="menu"
                        aria-label={item.label}
                        data-open={isOpen}
                        className="nav-submenu absolute left-0 top-full z-50 mt-3 min-w-56 rounded-2xl border border-border/60 bg-background p-1.5 shadow-[0_18px_40px_-20px_rgba(15,23,42,0.25)]"
                      >
                        <div
                          aria-hidden
                          className="absolute -top-3 left-0 right-0 h-3"
                        />
                        <ul className="flex flex-col">
                          {item.children.map((child, ci) => (
                            <li
                              key={child.href}
                              className="nav-submenu-item"
                              style={{ ["--i" as string]: ci }}
                            >
                              <a
                                href={child.href}
                                role="menuitem"
                                tabIndex={isOpen ? 0 : -1}
                                onClick={() => setOpenMenu(null)}
                                className="block rounded-lg px-3 py-2 text-[15px] font-medium text-ink/85 transition-colors duration-200 hover:bg-offwhite hover:text-brand-blue focus-visible:bg-offwhite focus-visible:text-brand-blue"
                              >
                                {child.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                }

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="nav-link inline-flex items-center text-[15px] font-medium text-ink/85 transition-colors duration-200 hover:text-ink focus-visible:text-ink"
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <a
              href="#zapis"
              className="hidden h-11 items-center rounded-md bg-brand-blue px-5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-brand-blue/90 lg:inline-flex"
            >
              Naše školka
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
            {navItems.map((item, i) => {
              if ("children" in item) {
                const isOpen = mobileSubmenu === item.label;
                return (
                  <div
                    key={item.label}
                    className="mobile-nav-item"
                    style={{ ["--mobile-nav-delay" as string]: `${i * 40}ms` }}
                  >
                    <button
                      type="button"
                      onClick={() => setMobileSubmenu(isOpen ? null : item.label)}
                      aria-expanded={isOpen}
                      tabIndex={open ? 0 : -1}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-ink/90 transition-colors duration-200 hover:bg-offwhite hover:text-brand-blue"
                    >
                      <span>{item.label}</span>
                    </button>
                    <div
                      className="grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <div className="min-h-0">
                        <div className="flex flex-col gap-0.5 pl-6 pr-3 py-1">
                          {item.children.map((child) => (
                            <a
                              key={child.href}
                              href={child.href}
                              onClick={() => setOpen(false)}
                              tabIndex={open && isOpen ? 0 : -1}
                              className="rounded-lg px-3 py-2 text-[15px] font-medium text-ink/80 transition-colors duration-200 hover:bg-offwhite hover:text-brand-blue"
                            >
                              {child.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={item.label}
                  href={item.href}
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="mobile-nav-item rounded-lg px-3 py-3 text-base font-medium text-ink/90 transition-colors duration-200 hover:bg-offwhite hover:text-brand-blue"
                  style={{ ["--mobile-nav-delay" as string]: `${i * 40}ms` }}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="#zapis"
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="mobile-nav-item mt-2 inline-flex h-12 items-center justify-center rounded-md bg-brand-blue px-5 text-base font-semibold text-white transition-colors duration-200 hover:bg-brand-blue/90"
              style={{ ["--mobile-nav-delay" as string]: `${navItems.length * 40}ms` }}
            >
              Naše školka
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
