import aboutPhoto from "@/assets/about-classroom.jpg.asset.json";

export function SiteAbout() {
  return (
    <section id="o-skolce" className="section-y">
      <div className="container mx-auto grid items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <div className="reveal-up">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-green">
            O školce
          </p>
          <h2 className="mt-3 font-display text-[34px] font-extrabold leading-[1.15] text-ink md:text-[40px]">
            Školka, která si z každého přístupu bere to&nbsp;nejlepší
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-body">
            Najdete nás v klidném a bezpečném vnitrobloku v centru Hradce Králové,
            jen pár kroků od nábřeží Labe. Děti nedržíme v jedné šabloně. Bereme
            si to nejlepší z Montessori, programu Začít spolu i lesních školek.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-body">
            Nenutíme je do jídla ani do spánku a dáváme jim bezpečné hranice,
            aby z nich rostly samostatné osobnosti.
          </p>

          <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-border pt-8">
            <div>
              <dt className="text-sm text-body">Založeno</dt>
              <dd className="mt-1 font-display text-2xl font-bold text-ink">1975</dd>
            </div>
            <div>
              <dt className="text-sm text-body">Tříd</dt>
              <dd className="mt-1 font-display text-2xl font-bold text-ink">4</dd>
            </div>
            <div>
              <dt className="text-sm text-body">Dětí</dt>
              <dd className="mt-1 font-display text-2xl font-bold text-ink">96</dd>
            </div>
          </dl>
        </div>

        <div
          className="reveal-fade relative"
          style={{ ["--reveal-delay" as string]: "160ms" }}
        >
          <div className="overflow-hidden rounded-[36px] shadow-[0_20px_60px_-22px_rgba(16,15,16,0.25)]">
            <img
              src={aboutPhoto.url}
              alt="Světlá moderní třída mateřské školy s dřevěným nábytkem a rostlinami"
              width={1280}
              height={1024}
              className="h-auto w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
