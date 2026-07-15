import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { fixPrepositions } from "@/lib/typography";
import logoAsset from "@/assets/logo.svg.asset.json";

type NavChild = {
  label: string;
  href: string;
  internal?: boolean;
  hash?: string;
};
type NavItem =
  | { label: string; href: string; external?: boolean; internal?: boolean; children?: undefined }
  | { label: string; href?: string; internal?: boolean; children: NavChild[] };

const navItems: NavItem[] = [
  {
    label: fixPrepositions("O školce"),
    href: "/o-skolce",
    internal: true,
    children: [
      { label: fixPrepositions("Představení a vize"), href: "/o-skolce", hash: "vize", internal: true },
      { label: fixPrepositions("Vzdělávání"), href: "/o-skolce", hash: "vzdelavani", internal: true },
      { label: fixPrepositions("Náš tým"), href: "/o-skolce", hash: "tym", internal: true },
      { label: fixPrepositions("Veřejné hřiště"), href: "/o-skolce", hash: "hriste", internal: true },
      { label: fixPrepositions("Školní jídelna"), href: "/o-skolce", hash: "jidelna", internal: true },
    ],
  },
  {
    label: fixPrepositions("Barevné třídy"),
    href: "/barevne-tridy",
    internal: true,
    children: [
      { label: fixPrepositions("Červená kostička"), href: "/barevne-tridy", hash: "cervena", internal: true },
      { label: fixPrepositions("Zelená kostička"), href: "/barevne-tridy", hash: "zelena", internal: true },
      { label: fixPrepositions("Modrá kostička"), href: "/barevne-tridy", hash: "modra", internal: true },
      { label: fixPrepositions("Žlutá kostička"), href: "/barevne-tridy", hash: "zluta", internal: true },
    ],
  },
  {
    label: fixPrepositions("Pro rodiče"),
    href: "/pro-rodice",
    internal: true,
    children: [
      { label: fixPrepositions("Zápis do MŠ"), href: "/zapis-do-skolky", internal: true },
      { label: fixPrepositions("Platby"), href: "/pro-rodice", hash: "platby", internal: true },
      { label: fixPrepositions("Program dne"), href: "/pro-rodice", hash: "program-dne", internal: true },
      { label: fixPrepositions("Výbava do školky"), href: "/pro-rodice", hash: "vybava", internal: true },
      { label: fixPrepositions("Dokumenty ke stažení"), href: "/pro-rodice", hash: "dokumenty", internal: true },
    ],
  },
  {
    label: fixPrepositions("ZŠ Josefa Gočára"),
    href: "https://zsgocarova.cz/",
    external: true,
  },
  {
    label: fixPrepositions("Kontakty"),
    href: "/kontakty",
    internal: true,
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

  const renderChild = (child: NavChild, isOpen: boolean, onNavigate: () => void) => {
    const cls =
      "block rounded-lg px-3 py-2.5 text-[15px] font-medium text-ink/85 transition-colors duration-200 hover:bg-offwhite hover:text-brand-blue focus-visible:bg-offwhite focus-visible:text-brand-blue";
    if (child.internal) {
      return (
        <Link
          to={child.href}
          hash={child.hash}
          role="menuitem"
          tabIndex={isOpen ? 0 : -1}
          onClick={onNavigate}
          className={cls}
        >
          {child.label}
        </Link>
      );
    }
    return (
      <a
        href={child.href}
        role="menuitem"
        tabIndex={isOpen ? 0 : -1}
        onClick={onNavigate}
        className={cls}
      >
        {child.label}
      </a>
    );
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 w-full px-6 pt-3 sm:pt-4">
      <div className="container mx-auto overflow-visible rounded-2xl border border-white/60 bg-background shadow-[0_10px_30px_-18px_rgba(15,23,42,0.25)] lg:bg-background/70 lg:backdrop-blur-md">
        <div className="flex h-20 items-center justify-between px-6 lg:px-8">
          <Link to="/" className="flex items-center" aria-label="Mateřská škola Josefa Gočára — domů">
            <img src={logoAsset.url} alt="Mateřská škola Josefa Gočára" className="h-[1.875rem] w-auto md:h-10" />
          </Link>

          <div className="flex items-center gap-8 xl:gap-10">
            <nav ref={navRef} className="hidden items-center gap-9 lg:flex xl:gap-12" aria-label="Hlavní navigace">

              {navItems.map((item) => {
                if (item.children) {
                  const isOpen = openMenu === item.label;
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => openNow(item.label)}
                      onMouseLeave={scheduleClose}
                    >
                      <Link
                        to={item.href!}
                        aria-haspopup="true"
                        aria-expanded={isOpen}
                        onFocus={() => openNow(item.label)}
                        onClick={() => setOpenMenu(null)}
                        className="nav-link inline-flex items-center text-[15px] font-medium text-ink/85 transition-colors duration-200 hover:text-ink focus-visible:text-ink"
                      >
                        {item.label}
                      </Link>


                      <div
                        role="menu"
                        aria-label={item.label}
                        data-open={isOpen}
                        className="nav-submenu absolute -left-3 top-full z-50 mt-3 min-w-60 rounded-2xl border border-border/60 bg-background p-3 shadow-[0_18px_40px_-20px_rgba(15,23,42,0.25)]"
                      >
                        <div
                          aria-hidden
                          className="absolute -top-3 left-0 right-0 h-3"
                        />
                        <ul className="flex flex-col gap-0.5">
                          {item.children.map((child, ci) => (
                            <li
                              key={`${child.href}${child.hash ?? ""}`}
                              className="nav-submenu-item"
                              style={{ ["--i" as string]: ci }}
                            >
                              {renderChild(child, isOpen, () => setOpenMenu(null))}
                            </li>
                          ))}
                        </ul>

                      </div>
                    </div>
                  );
                }

                if (item.internal) {
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="nav-link inline-flex items-center text-[15px] font-medium text-ink/85 transition-colors duration-200 hover:text-ink focus-visible:text-ink"
                    >
                      {item.label}
                    </Link>
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
              href="#nase-ms"
              className="hidden h-11 items-center rounded-md bg-brand-blue px-5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-brand-blue/90 lg:inline-flex"
            >
              {fixPrepositions("Naše MŠ")}
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
              if (item.children) {
                const isOpen = mobileSubmenu === item.label;
                return (
                  <div
                    key={item.label}
                    className="mobile-nav-item"
                    style={{ ["--mobile-nav-delay" as string]: `${i * 40}ms` }}
                  >
                    <div className="flex items-center gap-1">
                      <Link
                        to={item.href!}
                        onClick={() => setOpen(false)}
                        tabIndex={open ? 0 : -1}
                        className="flex-1 rounded-lg px-3 py-3 text-base font-medium text-ink/90 transition-colors duration-200 hover:bg-offwhite hover:text-brand-blue"
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileSubmenu(isOpen ? null : item.label)}
                        aria-expanded={isOpen}
                        aria-label={`${isOpen ? "Zavřít" : "Otevřít"} podmenu ${item.label}`}
                        tabIndex={open ? 0 : -1}
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-ink/70 transition-colors duration-200 hover:bg-offwhite hover:text-brand-blue"
                      >
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                          aria-hidden
                        />
                      </button>
                    </div>

                    <div
                      className="grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <div className="min-h-0">
                        <div className="flex flex-col gap-0.5 pl-6 pr-3 py-1">
                          {item.children.map((child) => {
                            const cls =
                              "rounded-lg px-3 py-2 text-[15px] font-medium text-ink/80 transition-colors duration-200 hover:bg-offwhite hover:text-brand-blue";
                            if (child.internal) {
                              return (
                                <Link
                                  key={`${child.href}${child.hash ?? ""}`}
                                  to={child.href}
                                  hash={child.hash}
                                  onClick={() => setOpen(false)}
                                  tabIndex={open && isOpen ? 0 : -1}
                                  className={cls}
                                >
                                  {child.label}
                                </Link>
                              );
                            }
                            return (
                              <a
                                key={child.href}
                                href={child.href}
                                onClick={() => setOpen(false)}
                                tabIndex={open && isOpen ? 0 : -1}
                                className={cls}
                              >
                                {child.label}
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              if (item.internal) {
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    tabIndex={open ? 0 : -1}
                    className="mobile-nav-item rounded-lg px-3 py-3 text-base font-medium text-ink/90 transition-colors duration-200 hover:bg-offwhite hover:text-brand-blue"
                    style={{ ["--mobile-nav-delay" as string]: `${i * 40}ms` }}
                  >
                    {item.label}
                  </Link>
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
              href="#nase-ms"
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="mobile-nav-item mt-2 inline-flex h-12 items-center justify-center rounded-md bg-brand-blue px-5 text-base font-semibold text-white transition-colors duration-200 hover:bg-brand-blue/90"
              style={{ ["--mobile-nav-delay" as string]: `${navItems.length * 40}ms` }}
            >
              {fixPrepositions("Naše MŠ")}
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
