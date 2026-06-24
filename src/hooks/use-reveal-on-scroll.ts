import { useEffect } from "react";

/**
 * Global scroll-reveal: finds every element with `.reveal-up`, `.reveal-right`,
 * `.reveal-fade`, or `.reveal-scale` and adds `.is-visible` when it enters the
 * viewport. One-shot per element. Re-scans on DOM mutations so route changes
 * and dynamically rendered carousels/cards get observed too.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const SELECTOR = ".reveal-up, .reveal-right, .reveal-fade, .reveal-scale";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      document.querySelectorAll(SELECTOR).forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0.12 },
    );

    const observeAll = () => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (!el.classList.contains("is-visible")) observer.observe(el);
      });
    };

    observeAll();

    const mo = new MutationObserver(() => observeAll());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);
}