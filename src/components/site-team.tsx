import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type Member = {
  name: string;
  role: string;
  bio: string;
};

const members: Member[] = [
  {
    name: "Mgr. Jana Novotná",
    role: "ředitelka",
    bio: "Miluje děti, přírodu a dobrou kávu. Ve školství pracuje více než 15 let.",
  },
  {
    name: "Bc. Petra Žáková",
    role: "učitelka",
    bio: "S dětmi objevuje svět každý den znovu a znovu. Má cit pro hru i řád.",
  },
  {
    name: "Lucie Dvořáková",
    role: "učitelka",
    bio: "Podporuje samostatnost a tvořivost. Ráda zpívá a čte pohádky.",
  },
  {
    name: "Martina Svobodová",
    role: "učitelka",
    bio: "Trpělivá průvodkyně dětskou zvídavostí. Miluje výlety a přírodu.",
  },
  {
    name: "Monika Králová",
    role: "asistentka pedagoga",
    bio: "Opora pro děti i kolegyně. Pomáhá tam, kde je právě potřeba.",
  },
];

const palette = [
  { bg: "bg-sky", role: "text-brand-blue" },
  { bg: "bg-cream", role: "text-brand-yellow" },
  { bg: "bg-mint", role: "text-brand-green" },
  { bg: "bg-blush", role: "text-brand-red" },
  { bg: "bg-sky", role: "text-brand-blue" },
];

function getInitials(name: string) {
  const parts = name.replace(/\b(Mgr|Bc|Ing|Mgr\.|Bc\.|Ing\.)\.?/g, "").trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts[parts.length - 1]?.[0] ?? "";
  return (first + last).toUpperCase();
}

export function SiteTeam() {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    setSnaps(api.scrollSnapList());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", () => {
      setSnaps(api.scrollSnapList());
      onSelect();
    });
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api || paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const id = window.setInterval(() => api.scrollNext(), 6000);
    return () => window.clearInterval(id);
  }, [api, paused]);

  return (
    <section className="section-y">
      <div className="container mx-auto px-6">
        <div className="reveal-up section-header-gap mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-blue">
            Lidé
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink md:text-4xl">
            Náš tým
          </h2>
          <p className="mt-3 text-base text-body md:text-lg">
            Vaše dítě budou provázet lidé, kteří svou práci dělají srdcem.
          </p>
        </div>

        <div
          className="reveal-up"
          style={{ ["--reveal-delay" as string]: "120ms" }}
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <Carousel opts={{ align: "start", loop: true }} setApi={setApi} className="relative">
            <CarouselContent className="-ml-4">
              {members.map((m, i) => {
                const p = palette[i % palette.length];
                return (
                  <CarouselItem
                    key={m.name}
                    className="pl-4 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <article className="flex h-full flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-[0_10px_30px_-18px_rgba(0,35,86,0.18)] transition-shadow duration-[250ms] ease-out hover:shadow-[0_18px_40px_-20px_rgba(0,35,86,0.25)]">
                      <div
                        aria-hidden
                        className={cn(
                          "flex h-24 w-24 items-center justify-center rounded-full",
                          p.bg,
                        )}
                      >
                        <span className="font-display text-2xl font-semibold text-ink">
                          {getInitials(m.name)}
                        </span>
                      </div>
                      <h3 className="mt-5 font-display text-lg font-bold text-ink">
                        {m.name}
                      </h3>
                      <p className={cn("mt-1 text-sm font-medium", p.role)}>{m.role}</p>
                      <p className="mt-3 text-sm text-body">{m.bio}</p>
                    </article>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            <CarouselPrevious
              aria-label="Předchozí"
              className="-left-3 md:-left-5 h-10 w-10 border-border bg-background text-ink hover:bg-offwhite hover:text-ink"
            />
            <CarouselNext
              aria-label="Další"
              className="-right-3 md:-right-5 h-10 w-10 border-border bg-background text-ink hover:bg-offwhite hover:text-ink"
            />
          </Carousel>

          <div className="mt-6 flex items-center justify-center gap-2">
            {snaps.map((_, i) => {
              const active = i === selectedIndex;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`Přejít na slide ${i + 1}`}
                  aria-current={active}
                  className={cn(
                    "h-2 rounded-full transition-all duration-[250ms]",
                    active ? "w-6 bg-brand-blue" : "w-2 bg-border hover:bg-ink/30",
                  )}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}