import { Calendar, MapPin, ArrowRight } from "lucide-react";

export function SiteCtaBanner() {
  return (
    <section id="kontakt" className="pb-16 pt-2 md:pb-24">
      <div className="container mx-auto px-6">
        <div
          className="reveal-up overflow-hidden rounded-[32px] px-8 py-10 md:px-12 md:py-12"
          style={{ background: "linear-gradient(135deg, var(--brand-green) 0%, var(--brand-green-hover) 100%)" }}
        >
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="font-display text-3xl font-extrabold leading-tight text-white md:text-4xl">
                Přijďte nás navštívit!
              </h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/85">
                Rádi vás provedeme naší školkou a zodpovíme všechny vaše dotazy.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-5">
              <div className="flex items-start gap-3 text-white">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <Calendar className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/75">Domluvit návštěvu</p>
                  <a href="tel:+420123456789" className="mt-0.5 block text-base font-semibold text-white hover:underline">
                    +420 123 456 789
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 text-white">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/75">Naše adresa</p>
                  <p className="mt-0.5 text-base font-semibold text-white">Kollárova, Hradec Králové</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 lg:justify-self-end">
              <a
                href="#kontakt-form"
                className="group inline-flex h-12 items-center gap-2 rounded-md bg-white px-6 text-[15px] font-semibold text-brand-green transition-colors duration-200 hover:bg-white/95"
              >
                Kontaktovat nás
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
