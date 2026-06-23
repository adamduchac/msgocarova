import heroKids from "@/assets/hero-kids.jpg.asset.json";
import cubeBlue from "@/assets/cube-blue.png.asset.json";
import cubeRed from "@/assets/cube-red.png.asset.json";
import cubeGreen from "@/assets/cube-green.png.asset.json";
import cubeYellow from "@/assets/cube-yellow.png.asset.json";
import { ArrowRight } from "lucide-react";

export function SiteHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-y container mx-auto grid items-center gap-12 px-6 lg:grid-cols-12 lg:gap-10">
        {/* Text */}
        <div className="reveal-up lg:col-span-5">
          <h1 className="font-display text-[44px] font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl lg:text-[58px]">
            Místo, kde si děti{" "}
            <span className="text-brand-blue">hrají</span>,{" "}
            <span className="text-brand-green">objevují</span>
            <br className="hidden sm:block" />
            {" "}a <span className="text-brand-yellow">rostou</span>
          </h1>

          <p
            className="reveal-up mt-7 max-w-prose text-lg leading-relaxed text-body"
            style={{ ["--reveal-delay" as string]: "120ms" }}
          >
            Pomáháme dětem přirozeně objevovat svět. Klidné a bezpečné zázemí
            v centru Hradce Králové s velkou zahradou a respektujícím přístupem.
          </p>

          <div
            className="reveal-up mt-8 flex flex-wrap gap-3"
            style={{ ["--reveal-delay" as string]: "220ms" }}
          >
            <a
              href="#o-skolce"
              className="group inline-flex h-12 items-center gap-2 rounded-md bg-brand-blue px-6 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-brand-blue/90"
            >
              Vítejte u nás
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
            </a>
            <a
              href="#tridy"
              className="inline-flex h-12 items-center rounded-md border border-ink/15 bg-background px-6 text-[15px] font-semibold text-ink transition-colors duration-200 hover:bg-offwhite"
            >
              Prohlédnout třídy
            </a>
          </div>
        </div>

        {/* Photo with cubes */}
        <div
          className="reveal-fade relative w-full lg:col-span-7"
          style={{ ["--reveal-delay" as string]: "260ms" }}
        >
          {/* doodles */}
          <svg
            aria-hidden
            className="pointer-events-none absolute -top-2 left-6 h-12 w-12 text-brand-green/70"
            viewBox="0 0 48 48"
            fill="none"
          >
            <path d="M6 24 C 14 8, 34 8, 42 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <svg
            aria-hidden
            className="pointer-events-none absolute -top-4 right-10 h-7 w-7 text-brand-red/70"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" />
          </svg>

          <div className="relative overflow-hidden rounded-[36px] shadow-[0_20px_60px_-20px_rgba(16,15,16,0.25)]">
            <img
              src={heroKids.url}
              alt="Dvě usměvavé děti si hrají s dřevěnými kostkami u stolečku ve světlé třídě"
              width={1280}
              height={1024}
              className="h-auto w-full select-none object-cover"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </div>

          {/* Cubes breaking out of bottom */}
          <div className="pointer-events-none absolute inset-x-0 -bottom-6 flex items-end justify-center gap-4 sm:gap-7 lg:-bottom-8 lg:gap-9">
            <img src={cubeBlue.url} alt="" aria-hidden className="h-16 w-16 -rotate-[10deg] drop-shadow-[0_10px_20px_rgba(46,125,244,0.35)] sm:h-20 sm:w-20 lg:h-24 lg:w-24" />
            <img src={cubeRed.url} alt="" aria-hidden className="h-20 w-20 rotate-[6deg] drop-shadow-[0_12px_22px_rgba(226,59,51,0.35)] sm:h-24 sm:w-24 lg:h-28 lg:w-28" />
            <img src={cubeGreen.url} alt="" aria-hidden className="h-20 w-20 -rotate-[4deg] drop-shadow-[0_12px_22px_rgba(61,163,93,0.35)] sm:h-24 sm:w-24 lg:h-28 lg:w-28" />
            <img src={cubeYellow.url} alt="" aria-hidden className="h-16 w-16 rotate-[8deg] drop-shadow-[0_10px_20px_rgba(245,184,30,0.4)] sm:h-20 sm:w-20 lg:h-24 lg:w-24" />
          </div>
        </div>
      </div>

      {/* spacer so cubes don't collide with next section */}
      <div className="h-10 lg:h-16" aria-hidden />
    </section>
  );
}
