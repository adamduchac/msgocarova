import { useEffect, useState } from "react";
import heroKids from "@/assets/hero-kids.jpg.asset.json";
import heroKids2 from "@/assets/hero-kids-2.webp.asset.json";
import heroKids3 from "@/assets/hero-kids-3.webp.asset.json";
import heroKids4 from "@/assets/hero-kids-4.webp.asset.json";
import heroShape from "@/assets/hero-shape.svg.asset.json";
import cubeA from "@/assets/cube-hero-a.png.asset.json";
import cubeB from "@/assets/cube-hero-b.png.asset.json";
import { ArrowRight } from "lucide-react";

const SLIDES = [
  { url: heroKids.url, alt: "Děti si hrají s dřevěnými kostkami na školní zahradě" },
  { url: heroKids2.url, alt: "Paní učitelka čte dětem pohádku v útulné herně" },
  { url: heroKids3.url, alt: "Děti si hrají na pískovišti a staví hrad z písku" },
  { url: heroKids4.url, alt: "Děti malují prsty barvami u stolu ve třídě" },
];

export function SiteHero() {
  const [index, setIndex] = useState(0);
  const [cubesFloating, setCubesFloating] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, []);

  // Start floating animation after entrance animation completes
  const cubeAStart = 1000;
  const cubeBDelay = 600;
  const enterDuration = 1100;
  useEffect(() => {
    const t = window.setTimeout(
      () => setCubesFloating(true),
      cubeAStart + cubeBDelay + enterDuration + 100,
    );
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="hero-y container mx-auto grid items-center gap-12 px-6 lg:grid-cols-12 lg:gap-10">
        {/* Text */}
        <div className="reveal-up lg:col-span-5">
          <h1 className="font-display text-[44px] font-extrabold leading-[1.04] tracking-tight text-ink sm:text-5xl lg:text-[58px]">
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

        {/* Photo with floating cubes */}
        <div
          className="reveal-fade relative w-full lg:col-span-7"
          style={{ ["--reveal-delay" as string]: "260ms" }}
        >
          <div
            className="relative aspect-[1000/979] w-full"
            style={{
              filter: "drop-shadow(0 24px 40px rgba(16,15,16,0.22))",
              WebkitMaskImage: `url(${heroShape.url})`,
              maskImage: `url(${heroShape.url})`,
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
          >
            {SLIDES.map((slide, i) => (
              <img
                key={i}
                src={slide.url}
                alt={i === index ? slide.alt : ""}
                width={1024}
                height={1024}
                className="hero-slide select-none object-cover"
                data-active={i === index}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
              />
            ))}
          </div>

          {/* Floating cube A — top-left, closer to centre */}
          <img
            src={cubeA.url}
            alt=""
            aria-hidden
            className={`hero-cube pointer-events-none absolute left-[4%] top-[2%] z-10 w-24 sm:w-28 lg:w-40 ${
              cubesFloating ? "is-floating" : "is-entering"
            }`}
            style={{
              ["--cube-delay" as string]: `${cubeAStart}ms`,
              ["--cube-float" as string]: "hero-cube-float-a",
              ["--cube-float-duration" as string]: "7s",
            }}
          />
          {/* Floating cube B — lower-right, pulled in toward centre */}
          <img
            src={cubeB.url}
            alt=""
            aria-hidden
            className={`hero-cube pointer-events-none absolute bottom-[6%] right-[15%] z-10 w-[6.3rem] sm:w-[7.2rem] lg:w-[9.9rem] ${
              cubesFloating ? "is-floating" : "is-entering"
            }`}
            style={{
              ["--cube-delay" as string]: `${cubeAStart + cubeBDelay}ms`,
              ["--cube-float" as string]: "hero-cube-float-b",
              ["--cube-float-duration" as string]: "8.5s",
              animationDelay: cubesFloating ? "-2s" : undefined,
            }}
          />

        </div>
      </div>

      <div className="h-6 lg:h-10" aria-hidden />
    </section>
  );
}
