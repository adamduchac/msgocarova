import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import janaPhoto from "@/assets/teacher-jana-tuharska.webp.asset.json";

type Teacher = {
  name: string;
  role: string;
  roleColor: string;
  photo: string;
  alt: string;
  bio: string;
};

const teachers: Teacher[] = [
  {
    name: "Jana Tuharská",
    role: "Učitelka v Zelené kostičce",
    roleColor: "text-brand-green",
    photo: janaPhoto.url,
    alt: "Portrét paní učitelky Jany Tuharské",
    bio: "Jmenuji se Jana Tuharská a v této mateřské škole pracuji už 30 let. Zaměřuji se na rozvoj grafomotoriky a dovedností, které dětem usnadňují vstup do základní školy. Děti vedu ke kamarádství. Ráda s dětmi dělám legraci. Hraji na kytaru a baví mě s nimi zpívat i tancovat. Zaměřuji se také na pracovní činnosti a tvoření z různých materiálů, které podporují jejich zručnost a kreativitu. Ve volném čase ráda cestuji a mám vztah k přírodě a ke zvířatům.",
  },
];

const AUTOPLAY_MS = 7000;

export function SiteTeachers() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = teachers.length;
  const touchStartX = useRef<number | null>(null);

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + total) % total);
  const goTo = (i: number) => setIndex(((i % total) + total) % total);

  useEffect(() => {
    if (paused || total <= 1) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  return (
    <section id="tym" className="section-y bg-background">
      <div className="container mx-auto px-6">
        <div
          className="rounded-3xl border border-border/70 bg-background px-6 py-12 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.18)] md:px-12 md:py-16 lg:px-16 lg:py-20"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const start = touchStartX.current;
            if (start == null) return;
            const dx = e.changedTouches[0].clientX - start;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            touchStartX.current = null;
          }}
        >
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="reveal-up font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink/55">
              Náš tým
            </p>
            <h2 className="reveal-up mt-3 font-display text-[34px] text-ink md:text-[40px]">
              Lidé, kteří se o vaše děti{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(105deg, #2563EB 0%, #38BDF8 100%)",
                }}
              >
                starají
              </span>
            </h2>
          </div>

          {/* Slider */}
          <div
            className="reveal-fade relative mt-10 lg:mt-12"
            role="region"
            aria-roledescription="carousel"
            aria-label="Medailonky učitelů"
          >
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {teachers.map((t, i) => (
                  <div
                    key={t.name}
                    className="w-full shrink-0 px-1"
                    aria-hidden={i !== index}
                  >
                    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,360px)_1fr] md:gap-12 lg:gap-16">
                      <div className="mx-auto w-full max-w-[360px] overflow-hidden rounded-2xl border border-border/60 bg-muted">
                        <img
                          src={t.photo}
                          alt={t.alt}
                          className="aspect-[4/5] h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                        />
                      </div>
                      <div>
                        <p
                          className={`font-display text-sm font-semibold uppercase tracking-[0.16em] ${t.roleColor}`}
                        >
                          {t.role}
                        </p>
                        <h3 className="mt-2 font-display text-[28px] font-bold text-ink md:text-[34px]">
                          {t.name}
                        </h3>
                        <p className="mt-5 text-[15px] leading-relaxed text-body md:text-base">
                          {t.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            {total > 1 && (
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Předchozí učitel"
                  className="grid h-11 w-11 place-items-center rounded-full border border-border/70 bg-background text-ink transition-colors duration-200 hover:bg-offwhite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-2" role="tablist">
                  {teachers.map((t, i) => (
                    <button
                      key={t.name}
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      aria-label={`Zobrazit ${t.name}`}
                      onClick={() => goTo(i)}
                      className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                        i === index ? "w-6 bg-ink" : "w-2.5 bg-ink/25 hover:bg-ink/40"
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Další učitel"
                  className="grid h-11 w-11 place-items-center rounded-full border border-border/70 bg-background text-ink transition-colors duration-200 hover:bg-offwhite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
