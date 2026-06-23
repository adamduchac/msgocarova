import heroAsset from "@/assets/hero-blocks.webp.asset.json";
import { Button } from "@/components/ui/button";

export function SiteHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-y container mx-auto grid items-center gap-10 px-6 lg:grid-cols-5 lg:gap-14">
        <div className="reveal-up lg:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-blue">
            Zažijte MŠ Gočárova
          </p>

          <h1
            className="reveal-up mt-5 text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl"
            style={{ ["--reveal-delay" as string]: "120ms" }}
          >
            Těšíme se do školky!
          </h1>

          <p
            className="reveal-up mt-7 max-w-prose text-lg text-body"
            style={{ ["--reveal-delay" as string]: "240ms" }}
          >
            Mateřská škola v centru Hradce Králové, kde vaše dítě objevuje svět vlastním tempem.
            Dny jsou u nás plné her i opravdových zážitků.
          </p>

          <div
            className="reveal-up mt-7 flex flex-wrap gap-4"
            style={{ ["--reveal-delay" as string]: "320ms" }}
          >
            <Button asChild variant="coral" size="lg" className="rounded-md px-7">
              <a href="/zapis">Zápis</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-md border-ink/15 bg-background px-7 text-ink hover:bg-ink/[0.04] hover:text-ink"
            >
              <a href="/o-nas">Poznejte naší školku</a>
            </Button>
          </div>
        </div>

        <div
          className="reveal-fade relative w-full lg:col-span-3"
          style={{ ["--reveal-delay" as string]: "360ms" }}
        >
          <img
            src={heroAsset.url}
            alt="Barevné plastelínové kostičky s obličeji, dřevěné hračky a rostlinka"
            className="h-auto w-full select-none"
            loading="eager"
            decoding="async"
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
}
