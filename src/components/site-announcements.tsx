import { useQuery } from "@tanstack/react-query";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchActiveAnnouncements, type Announcement } from "@/lib/cms";
import { fixPrepositions } from "@/lib/typography";
import { renderRichText } from "@/lib/rich-text";
import iconNews from "@/assets/icon-news-claymation.webp.asset.json";


export function SiteAnnouncements() {
  const { data } = useQuery({
    queryKey: ["announcements", "active"],
    queryFn: fetchActiveAnnouncements,
    staleTime: 60_000,
  });
  const [open, setOpen] = useState<Announcement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const items = data ?? [];
  if (items.length === 0) return null;

  return (
    <section aria-label="Aktuální oznámení" className="px-6 pt-2 pb-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-3">
          {items.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setOpen(a)}
              aria-label={`Zobrazit podrobnosti — ${a.title}`}
              className="group relative block w-full cursor-pointer text-left rounded-2xl bg-cream shadow-[0_8px_24px_-18px_rgba(16,15,16,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background px-4 py-5 sm:px-5 sm:py-3.5"
            >
              <div className="pointer-events-none flex flex-col items-center gap-4 sm:hidden">
                <span className="grid h-[72px] w-[72px] shrink-0 place-items-center rounded-full bg-white">
                  <img src={iconNews.url} alt="" aria-hidden className="h-12 w-12 object-contain" loading="lazy" />
                </span>
                <p className="text-center text-base leading-relaxed text-ink font-medium">
                  <span className="font-semibold">{fixPrepositions(a.title)}</span>
                </p>
                <span className="inline-flex h-11 items-center rounded-full bg-ink px-5 text-sm font-medium text-white" aria-hidden>
                  {fixPrepositions("Podrobnosti")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </div>

              <div className="pointer-events-none hidden sm:block">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 grid h-20 w-20 shrink-0 place-items-center rounded-full bg-white">
                  <img src={iconNews.url} alt="" aria-hidden className="h-14 w-14 object-contain" loading="lazy" />
                </div>
                <p className="min-h-20 flex items-center justify-center text-center text-lg leading-relaxed text-ink font-medium px-[112px]">
                  <span className="font-semibold">{fixPrepositions(a.title)}</span>
                </p>
                <span className="absolute right-5 top-1/2 -translate-y-1/2 flex" aria-hidden>
                  <span className="inline-flex items-center h-12 rounded-full bg-ink text-white overflow-hidden">
                    <span
                      className="inline-block max-w-0 opacity-0 whitespace-nowrap overflow-hidden group-hover:max-w-[160px] group-hover:opacity-100 group-hover:pl-5 group-focus-visible:max-w-[160px] group-focus-visible:opacity-100 group-focus-visible:pl-5 transition-[max-width,opacity,padding] duration-300 ease-out text-sm font-medium"
                    >
                      {fixPrepositions("Podrobnosti")}
                    </span>
                    <span className="px-4">
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5" />
                    </span>
                  </span>
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {open && <AnnouncementModal announcement={open} onClose={() => setOpen(null)} />}
    </section>
  );
}


function AnnouncementModal({ announcement, onClose }: { announcement: Announcement; onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="announcement-title"
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
    >
      <button
        type="button"
        aria-label="Zavřít"
        onClick={onClose}
        className="absolute inset-0 bg-cream/95 backdrop-blur-sm"
      />
      <div className="relative z-10 max-w-2xl w-full rounded-2xl bg-white shadow-[0_20px_60px_-10px_rgba(0,0,0,0.25)] border border-black/[0.06] max-h-[85vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          aria-label="Zavřít"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 text-ink hover:bg-ink/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="p-8 sm:p-10">
          <h2 id="announcement-title" className="font-display text-[26px] sm:text-[32px] font-extrabold leading-tight text-ink pr-12">
            {fixPrepositions(announcement.title)}
          </h2>
          <div className="mt-5 space-y-4 text-[16px] leading-relaxed text-body">
            {renderRichText(announcement.content)}
          </div>

        </div>
      </div>
    </div>
  );
}
