import { useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { getSiteCopy } from "./site-copy.functions";
import { SITE_COPY_REGISTRY } from "./site-copy/registry";
import { fixPrepositions } from "./typography";

export const siteCopyQueryOptions = (page: string) =>
  queryOptions({
    queryKey: ["site-copy", page],
    queryFn: () => getSiteCopy({ data: { page } }),
    staleTime: 60_000,
  });

export function useCopy(page: string, key: string, fallback: string): string {
  const { data } = useSuspenseQuery(siteCopyQueryOptions(page));
  return useMemo(() => {
    const override = data?.[key];
    if (override !== undefined && override !== null && override !== "") {
      return override;
    }
    return fallback;
  }, [data, key, fallback]);
}

export function useCopyMap(page: string): Record<string, string> {
  const { data } = useSuspenseQuery(siteCopyQueryOptions(page));
  const defaults = useMemo(() => SITE_COPY_REGISTRY[page] ?? {}, [page]);
  return useMemo(() => {
    const result: Record<string, string> = {};
    for (const key of Object.keys(defaults)) {
      const override = data?.[key];
      result[key] = override !== undefined && override !== null && override !== ""
        ? override
        : defaults[key].defaultText;
    }
    return result;
  }, [data, defaults, page]);
}

export function useCopyPage(page: string): (key: string, fallback: string) => string {
  const map = useCopyMap(page);
  return (key: string, fallback: string) => fixPrepositions(map[key] || fallback);
}
