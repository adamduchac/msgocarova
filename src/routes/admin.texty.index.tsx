import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SITE_COPY_PAGES, SITE_COPY_REGISTRY } from "@/lib/site-copy/registry";
import { AdminHeader } from "@/components/admin/ui";

export const Route = createFileRoute("/admin/texty/")({
  component: TextyOverview,
});

const PAGE_TITLES: Record<string, string> = {
  "o-skolce": "O školce",
  "pro-rodice": "Pro rodiče",
};

function TextyOverview() {
  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <AdminHeader title="Texty na webu" description="Upravte texty vybraných stránek přímo v administraci." />

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {SITE_COPY_PAGES.map((page) => {
          const count = Object.keys(SITE_COPY_REGISTRY[page] ?? {}).length;
          const title = PAGE_TITLES[page] ?? page;
          return (
            <Link
              key={page}
              to="/admin/texty/$page"
              params={{ page }}
              className="group flex items-center justify-between rounded-2xl border border-black/5 bg-white p-5 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.10)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-18px_rgba(15,23,42,0.12)]"
            >
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{count} editovatelných textů</p>
              </div>
              <ArrowRight className="h-5 w-5 text-ink/30 transition-transform group-hover:translate-x-1 group-hover:text-ink/60" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
