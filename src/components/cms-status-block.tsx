import type { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { StatusBlock } from "@/components/status-block";
import { fetchInfoBox, type InfoPage, type InfoState } from "@/lib/cms";

type Variant = "closed" | "open" | "upcoming";

const STATE_TO_VARIANT: Record<InfoState, Variant> = {
  closed: "closed",
  open: "open",
  upcoming: "upcoming",
};

type CmsStatusBlockProps = {
  page: InfoPage;
  fallbackVariant: Variant;
  fallbackTitle: string;
  fallbackBody: ReactNode;
};

/**
 * Reads status/heading/body from public.info_boxes; if the row exists and has
 * a non-empty heading, uses the DB values. Otherwise falls back to the
 * hardcoded text so the site is never blank.
 */
export function CmsStatusBlock({ page, fallbackVariant, fallbackTitle, fallbackBody }: CmsStatusBlockProps) {
  const { data } = useQuery({
    queryKey: ["info_box", page],
    queryFn: () => fetchInfoBox(page),
    staleTime: 60_000,
  });

  const useDb = !!data && (data.heading?.trim() || data.body?.trim());

  if (!useDb) {
    return (
      <StatusBlock variant={fallbackVariant} title={fallbackTitle}>
        {fallbackBody}
      </StatusBlock>
    );
  }

  const variant = STATE_TO_VARIANT[data.state];
  return (
    <StatusBlock variant={variant} title={data.heading || fallbackTitle}>
      <div className="space-y-3">
        {data.body.split(/\n{2,}/).map((p, i) => (
          <p key={i} className="whitespace-pre-line">{p}</p>
        ))}
        {(data.deadline_label || data.capacity_label) && (
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-ink/80">
            {data.deadline_label && <span><strong className="text-ink">Termín:</strong> {data.deadline_label}</span>}
            {data.capacity_label && <span><strong className="text-ink">Kapacita:</strong> {data.capacity_label}</span>}
          </div>
        )}
        {data.note && <p className="text-sm text-body/80 italic">{data.note}</p>}
      </div>
    </StatusBlock>
  );
}
