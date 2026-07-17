import { AlertCircle, CalendarCheck, Clock } from "lucide-react";
import { fixPrepositions } from "@/lib/typography";

type Variant = "closed" | "open" | "upcoming";

type StatusBlockProps = {
  variant?: Variant;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
};

/**
 * Prominent, decently styled status card used on /zapis-do-skolky and
 * /predskolacek. Two variants:
 * - "closed" → uses brand-yellow accent (neběží / uzavřeno)
 * - "open"   → uses brand-green accent (běží — připraveno pro CMS)
 */
export function StatusBlock({
  variant = "closed",
  eyebrow,
  title,
  children,
}: StatusBlockProps) {
  const isOpen = variant === "open";
  const isUpcoming = variant === "upcoming";
  const defaultLabel =
    isOpen ? "Aktuální stav — právě běží" : isUpcoming ? "Aktuální stav — připravujeme" : "Aktuální stav";
  const label = eyebrow ?? defaultLabel;
  const Icon = isOpen ? CalendarCheck : isUpcoming ? Clock : AlertCircle;
  const accent = isOpen ? "bg-brand-green" : isUpcoming ? "bg-brand-blue" : "bg-brand-yellow";
  const iconBox = isOpen
    ? "bg-brand-green/15 text-brand-green"
    : isUpcoming
    ? "bg-brand-blue/15 text-brand-blue"
    : "bg-brand-yellow/25 text-ink";
  const eyebrowColor = isOpen ? "text-brand-green" : isUpcoming ? "text-brand-blue" : "text-ink/60";

  return (
    <div
      className="reveal-up relative overflow-hidden rounded-2xl border border-black/[0.06] bg-[#FEF8E7]/70 pl-6 pr-6 py-7 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_18px_40px_-20px_rgba(15,23,42,0.18)] sm:pl-8 sm:pr-8 sm:py-8"
    >
      <span aria-hidden className={`absolute inset-y-0 left-0 w-1.5 ${accent}`} />

      <div className="flex items-start gap-4">
        <span
          aria-hidden
          className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${iconBox}`}
        >
          <Icon className="h-5 w-5" />
        </span>

        <div className="min-w-0">
          <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${eyebrowColor}`}>
            {fixPrepositions(label)}
          </p>
          <h2 className="mt-1 font-display text-[22px] font-extrabold leading-snug text-ink md:text-[26px]">
            {fixPrepositions(title)}
          </h2>
          <div className="mt-3 text-[15px] leading-relaxed text-body md:text-base">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
