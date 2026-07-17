import { AlertCircle, CalendarCheck } from "lucide-react";
import { fixPrepositions } from "@/lib/typography";

type Variant = "closed" | "open";

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
  const label = eyebrow ?? (isOpen ? "Aktuální stav — právě běží" : "Aktuální stav");
  const Icon = isOpen ? CalendarCheck : AlertCircle;

  return (
    <div
      className="reveal-up relative overflow-hidden rounded-2xl border border-black/[0.06] bg-[#FEF8E7]/70 pl-6 pr-6 py-7 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_18px_40px_-20px_rgba(15,23,42,0.18)] sm:pl-8 sm:pr-8 sm:py-8"
    >
      <span
        aria-hidden
        className={`absolute inset-y-0 left-0 w-1.5 ${
          isOpen ? "bg-brand-green" : "bg-brand-yellow"
        }`}
      />

      <div className="flex items-start gap-4">
        <span
          aria-hidden
          className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
            isOpen
              ? "bg-brand-green/15 text-brand-green"
              : "bg-brand-yellow/25 text-ink"
          }`}
        >
          <Icon className="h-5 w-5" />
        </span>

        <div className="min-w-0">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.14em] ${
              isOpen ? "text-brand-green" : "text-ink/60"
            }`}
          >
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
