import { useEffect, useState } from "react";
import { Pin } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import calendarIcon from "@/assets/icon-calendar.webp.asset.json";
import newsIcon from "@/assets/icon-news.webp.asset.json";

type Slide = {
  pinned?: boolean;
  label: string;
  title: string;
  date: string;
  cta: string;
};

const slides: Slide[] = [
  {
    pinned: true,
    label: "Důležité",
    title: "Zápis pro školní rok 2026/2027 je otevřený — přihlášky do [DOPLNIT datum].",
    date: "Termín přihlášek: [DOPLNIT]",
    cta: "Více o zápisu",
  },
  {
    label: "Novinka",
    title: "Den otevřených dveří",
    date: "[DOPLNIT datum]",
    cta: "Detail",
  },
  {
    label: "Novinka",
    title: "Divadelní představení",
    date: "[DOPLNIT datum]",
    cta: "Detail",
  },
  {
    label: "Novinka",
    title: "Jak jsme slavili Den Země",
    date: "[DOPLNIT datum]",
    cta: "Detail",
  },
  {
    label: "Novinka",
    title: "Nový kroužek keramiky",
    date: "[DOPLNIT datum]",
    cta: "Detail",
  },
];

export function SiteNewsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

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

  return (
    <section className="section-y">
      <div className="container mx-auto px-6">
        <div className="section-header-gap reveal-up">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-blue">
            Aktuálně
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink md:text-4xl">
            Důležité &amp; novinky
          </h2>
        </div>

        <div
          className="reveal-up rounded-2xl p-4 md:p-8"
          style={{
            ["--reveal-delay" as string]: "120ms",
            background:
              "linear-gradient(145deg, var(--news-box) 0%, var(--news-box) 35%, color-mix(in oklab, var(--news-pinned) 55%, transparent) 100%)",
          }}
        >
          <Carousel
            opts={{ align: "start", loop: true }}
            setApi={setApi}
            className="relative"
          >
            <CarouselContent className="-ml-4">
              {slides.map((s, i) => (
                <CarouselItem
                  key={i}
                  className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <SlideCard slide={s} />
                </CarouselItem>
              ))}
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

function SlideCard({ slide }: { slide: Slide }) {
  const isPinned = slide.pinned;
  return (
    <article className="flex h-full flex-col gap-5 rounded-2xl border border-white p-6 bg-card">
      <div className="flex items-start justify-between gap-4">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white",
            isPinned ? "bg-brand-red" : "bg-brand-blue",
          )}
        >
          {isPinned && <Pin className="h-3 w-3" aria-hidden />}
          {slide.label}
        </span>
        <div
          aria-hidden
          className={cn(
            "h-[72px] w-[72px] shrink-0 rounded-lg p-1 flex items-center justify-center",
            isPinned ? "bg-brand-red/15" : "bg-brand-blue/15",
          )}
        >
          <img
            src={isPinned ? calendarIcon.url : newsIcon.url}
            alt=""
            aria-hidden
            loading="lazy"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      <h3 className="font-display text-xl font-semibold leading-snug text-ink">
        {slide.title}
      </h3>
      <p className="text-sm text-body">{slide.date}</p>

      <div className="mt-auto pt-2">
        {isPinned ? (
          <Button
            type="button"
            className="bg-brand-red text-white hover:bg-brand-red/90"
          >
            {slide.cta}
          </Button>
        ) : (
          <Button
            type="button"
            variant="outline"
            className="border-border bg-background text-ink hover:bg-offwhite hover:text-ink"
          >
            {slide.cta}
          </Button>
        )}
      </div>
    </article>
  );
}