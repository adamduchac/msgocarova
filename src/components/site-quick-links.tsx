import { CalendarX2, UtensilsCrossed, Wallet, Smartphone, ArrowRight, type LucideIcon } from "lucide-react";

type Link = {
  label: string;
  desc: string;
  href: string;
  icon: LucideIcon;
  tint: string;
  iconColor: string;
};

const links: Link[] = [
  { label: "Omluvenky", desc: "Omluvte dítě jedním klikem", href: "#omluvenky", icon: CalendarX2, tint: "bg-blush", iconColor: "text-brand-red" },
  { label: "Jídelníček", desc: "Co se dnes vaří", href: "#jidelnicek", icon: UtensilsCrossed, tint: "bg-cream", iconColor: "text-brand-yellow" },
  { label: "Platby a účty", desc: "Přehled plateb školky", href: "#platby", icon: Wallet, tint: "bg-mint", iconColor: "text-brand-green" },
  { label: "Aplikace Naše MŠ", desc: "Vše důležité v mobilu", href: "#nase-ms", icon: Smartphone, tint: "bg-sky", iconColor: "text-brand-blue" },
];

export function SiteQuickLinks() {
  return (
    <section aria-label="Rychlý rozcestník pro rodiče" className="relative py-12 md:py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l, i) => {
            const Icon = l.icon;
            return (
              <a
                key={l.href}
                href={l.href}
                className="card-hover-soft reveal-up group flex items-center gap-4 rounded-2xl border border-border/70 bg-card px-5 py-4 hover:border-border"
                style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
              >
                <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${l.tint}`} aria-hidden>
                  <Icon className={`h-5 w-5 ${l.iconColor}`} strokeWidth={2.25} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[15px] font-semibold text-ink">{l.label}</span>
                  <span className="block text-sm text-body">{l.desc}</span>
                </span>
                <ArrowRight className="h-4 w-4 text-ink/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-ink" aria-hidden />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
