import { useEffect } from "react";

/**
 * Global scroll-reveal: finds every element with `.reveal-up`, `.reveal-right`,
 * `.reveal-fade`, or `.reveal-scale` and adds `.is-visible` when it enters the
 * viewport. One-shot per element.
 *
 * Re-scans on demand via `window.dispatchEvent(new Event("reveal:rescan"))` —
 * call from any carousel/dynamic content that mounts after initial paint.
 * We deliberately avoid a body-wide MutationObserver: on mobile it causes
 * measurable jank during scroll.
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

    const isCoarse = window.matchMedia("(pointer: coarse), (max-width: 767px)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: isCoarse ? 0.08 : 0,
      },
    );

    const observeAll = () => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (!el.classList.contains("is-visible")) observer.observe(el);
      });
    };

    observeAll();
    // Catch elements that mount on the next frame (route data, hydration).
    const raf = requestAnimationFrame(observeAll);

    const onRescan = () => observeAll();
    window.addEventListener("reveal:rescan", onRescan);

    // Lightweight MutationObserver — only childList on body, no subtree
    // attribute watching (that was the original jank source). Re-scans are
    // throttled via requestIdleCallback so they happen during browser idle.
    type IdleScheduler = (cb: () => void, opts?: { timeout?: number }) => number;
    const ric: IdleScheduler =
      (window as unknown as { requestIdleCallback?: IdleScheduler }).requestIdleCallback ??
      ((cb) => window.setTimeout(cb, 200));
    let scheduled = false;
    const scheduleRescan = () => {
      if (scheduled) return;
      scheduled = true;
      ric(
        () => {
          scheduled = false;
          observeAll();
        },
        { timeout: 500 },
      );
    };
    const mo = new MutationObserver(scheduleRescan);
    mo.observe(document.body, { childList: true, subtree: true });

    // Safety net: if anything stays unrevealed after 1.5s (slow hydrate, route
    // transition, IO miss), force-show it so nothing is permanently invisible.
    const safety = window.setTimeout(() => {
      document.querySelectorAll(SELECTOR).forEach((el) => el.classList.add("is-visible"));
    }, 1500);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(safety);
      observer.disconnect();
      mo.disconnect();
      window.removeEventListener("reveal:rescan", onRescan);
    };
  }, []);
}
