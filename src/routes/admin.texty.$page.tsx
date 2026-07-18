import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useMemo, useRef, useState, useLayoutEffect } from "react";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, Save, RotateCcw, Search, X, ChevronDown, ChevronRight, AlertTriangle } from "lucide-react";
import { SITE_COPY_REGISTRY, getPageRegistry, type CopyEntry } from "@/lib/site-copy/registry";
import { siteCopyQueryOptions } from "@/lib/use-copy";
import { upsertSiteCopy, deleteSiteCopy } from "@/lib/site-copy.functions";
import { AdminHeader } from "@/components/admin/ui";

export const Route = createFileRoute("/admin/texty/$page")({
  loader: ({ params, context }) => {
    const page = params.page;
    if (!SITE_COPY_REGISTRY[page]) {
      throw new Error("Neznámá stránka");
    }
    return context.queryClient.ensureQueryData(siteCopyQueryOptions(page));
  },
  component: TextyEditor,
});

const PAGE_TITLES: Record<string, string> = {
  "o-skolce": "O školce",
  "pro-rodice": "Pro rodiče",
};

const GROUP_LABELS: Record<string, string> = {
  hero: "Hero",
  vision: "Představení a vize",
  education: "Vzdělávání a aktivity",
  team: "Tým",
  playground: "Veřejné hřiště",
  canteen: "Školní jídelna",
  payments: "Platby",
  schedule: "Program dne",
  clubs: "Kroužky a aktivity",
  equipment: "Co dítě potřebuje",
  documents: "Dokumenty",
  other: "Ostatní",
};

function groupOf(key: string): string {
  const i = key.indexOf(".");
  return i === -1 ? "other" : key.slice(0, i);
}

function AutoTextarea({
  value,
  onChange,
  highlight,
}: {
  value: string;
  onChange: (v: string) => void;
  highlight: boolean;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.max(el.scrollHeight, 40)}px`;
  }, [value]);
  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      data-copy-textarea
      placeholder="Ponechte prázdné pro výchozí znění"
      className={`w-full resize-none rounded-md border px-3 py-2 text-sm outline-none transition-colors bg-white ${
        highlight
          ? "border-brand-yellow ring-2 ring-brand-yellow/40"
          : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
      }`}
      rows={1}
    />
  );
}

function TextyEditor() {
  const { page } = useParams({ from: "/admin/texty/$page" });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: overrides } = useSuspenseQuery(siteCopyQueryOptions(page));
  const registry = getPageRegistry(page)!;

  // Draft state: raw override values. "" = no override (use default).
  const [drafts, setDrafts] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const key of Object.keys(registry)) {
      initial[key] = overrides?.[key] ?? "";
    }
    return initial;
  });
  const [query, setQuery] = useState("");
  const [savingAll, setSavingAll] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const setDraft = (key: string, value: string) => {
    setDrafts((prev) => ({ ...prev, [key]: value }));
  };

  // Persisted (server) override for each key — empty string when none.
  const persisted = (key: string) => overrides?.[key] ?? "";

  // Dirty = draft differs from persisted.
  const dirtyKeys = useMemo(() => {
    const s = new Set<string>();
    for (const key of Object.keys(registry)) {
      if ((drafts[key] ?? "") !== persisted(key)) s.add(key);
    }
    return s;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drafts, overrides, registry]);

  // Overridden = the current server state has an override (non-empty).
  const overriddenKeys = useMemo(() => {
    const s = new Set<string>();
    for (const key of Object.keys(registry)) {
      if (persisted(key) !== "") s.add(key);
    }
    return s;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overrides, registry]);

  const q = query.trim().toLowerCase();
  const matches = (key: string, entry: CopyEntry) => {
    if (!q) return true;
    const draft = drafts[key] ?? "";
    return (
      entry.defaultText.toLowerCase().includes(q) ||
      draft.toLowerCase().includes(q) ||
      entry.label.toLowerCase().includes(q)
    );
  };

  // Group entries by prefix.
  const groups = useMemo(() => {
    const out = new Map<string, Array<[string, CopyEntry]>>();
    for (const [key, entry] of Object.entries(registry)) {
      const g = groupOf(key);
      if (!out.has(g)) out.set(g, []);
      out.get(g)!.push([key, entry]);
    }
    return out;
  }, [registry]);

  const saveAll = async () => {
    if (dirtyKeys.size === 0) return;
    setSavingAll(true);
    try {
      for (const key of dirtyKeys) {
        const val = drafts[key] ?? "";
        if (val === "") {
          if (persisted(key) !== "") {
            await deleteSiteCopy({ data: { page, key } });
          }
        } else {
          await upsertSiteCopy({ data: { page, key, value: val } });
        }
      }
      await queryClient.invalidateQueries({ queryKey: ["site-copy", page] });
      setFlash(`Uloženo ${dirtyKeys.size} ${dirtyKeys.size === 1 ? "změna" : "změn"}`);
      setTimeout(() => setFlash(null), 2500);
    } catch {
      window.alert("Nepodařilo se uložit změny.");
    } finally {
      setSavingAll(false);
    }
  };

  const discardAll = () => {
    if (dirtyKeys.size === 0) return;
    if (!window.confirm(`Zahodit ${dirtyKeys.size} neuložených změn?`)) return;
    const reset: Record<string, string> = {};
    for (const key of Object.keys(registry)) {
      reset[key] = persisted(key);
    }
    setDrafts(reset);
  };

  const resetOne = async (key: string) => {
    try {
      await deleteSiteCopy({ data: { page, key } });
      await queryClient.invalidateQueries({ queryKey: ["site-copy", page] });
      setDrafts((prev) => ({ ...prev, [key]: "" }));
      setFlash("Obnoveno na výchozí");
      setTimeout(() => setFlash(null), 2000);
    } catch {
      window.alert("Nepodařilo se obnovit výchozí text.");
    }
  };

  const scrollToKey = (key: string) => {
    const el = document.querySelector<HTMLElement>(`[data-copy-key="${key}"]`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    const ta = el.querySelector<HTMLTextAreaElement>("[data-copy-textarea]");
    setTimeout(() => ta?.focus(), 350);
  };

  const searchResults = useMemo(() => {
    if (!q) return [] as Array<[string, CopyEntry]>;
    const list: Array<[string, CopyEntry]> = [];
    for (const [key, entry] of Object.entries(registry)) {
      if (matches(key, entry)) list.push([key, entry]);
    }
    return list.slice(0, 8);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, registry, drafts]);

  const title = PAGE_TITLES[page] ?? page;

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <button
        onClick={() => void navigate({ to: "/admin/texty" })}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ink transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Zpět na přehled
      </button>

      <div className="mt-4">
        <AdminHeader
          title={`Texty: ${title}`}
          description="Ponechte pole prázdné pro výchozí znění (šedě v kurzívě). Upravená pole mají žlutý pruh."
        />
      </div>

      {/* Sticky toolbar: search + save-all */}
      <div className="sticky top-0 z-10 -mx-6 md:-mx-8 mt-6 bg-gradient-to-b from-white via-white to-white/90 backdrop-blur px-6 md:px-8 py-3 border-b border-black/5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Najít text na stránce…"
              className="w-full rounded-md border border-border bg-white pl-9 pr-9 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-ink"
                aria-label="Vymazat"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {/* Search dropdown */}
            {q && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 z-20 rounded-lg border border-black/10 bg-white shadow-lg overflow-hidden">
                {searchResults.map(([key, entry]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setQuery("");
                      scrollToKey(key);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-muted border-b border-black/5 last:border-b-0"
                  >
                    <div className="text-xs text-muted-foreground">{entry.label}</div>
                    <div className="text-sm text-ink line-clamp-1">
                      {drafts[key] || entry.defaultText}
                    </div>
                  </button>
                ))}
              </div>
            )}
            {q && searchResults.length === 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 z-20 rounded-lg border border-black/10 bg-white shadow-lg px-3 py-2 text-sm text-muted-foreground">
                Žádné shody
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {dirtyKeys.size > 0 && (
              <>
                <span className="text-xs text-muted-foreground">
                  {dirtyKeys.size} {dirtyKeys.size === 1 ? "neuložená změna" : "neuložených změn"}
                </span>
                <button
                  onClick={discardAll}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
                >
                  Zahodit
                </button>
              </>
            )}
            <button
              onClick={() => void saveAll()}
              disabled={savingAll || dirtyKeys.size === 0}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="h-4 w-4" />
              {savingAll ? "Ukládám…" : "Uložit vše"}
            </button>
          </div>
        </div>
        {flash && (
          <div className="mt-2 text-sm font-medium text-green-600">✓ {flash}</div>
        )}
      </div>

      {/* Grouped fields */}
      <div className="mt-6 space-y-4">
        {Array.from(groups.entries()).map(([group, entries]) => {
          const visible = entries.filter(([key, entry]) => matches(key, entry));
          if (q && visible.length === 0) return null;
          const dirtyInGroup = entries.filter(([key]) => dirtyKeys.has(key)).length;
          const overriddenInGroup = entries.filter(([key]) => overriddenKeys.has(key)).length;
          const isCollapsed = collapsed[group];

          return (
            <section
              key={group}
              className="rounded-xl border border-black/5 bg-white shadow-[0_10px_30px_-18px_rgba(15,23,42,0.08)]"
            >
              <button
                onClick={() => setCollapsed((prev) => ({ ...prev, [group]: !prev[group] }))}
                className="w-full flex items-center justify-between gap-3 px-5 py-3 text-left border-b border-black/5"
              >
                <div className="flex items-center gap-2">
                  {isCollapsed ? (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="font-display text-sm font-semibold text-ink">
                    {GROUP_LABELS[group] ?? group}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({entries.length} {entries.length === 1 ? "pole" : "polí"})
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {overriddenInGroup > 0 && (
                    <span className="rounded-full bg-brand-yellow/20 px-2 py-0.5 text-ink font-medium">
                      {overriddenInGroup} upraveno
                    </span>
                  )}
                  {dirtyInGroup > 0 && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary font-medium">
                      {dirtyInGroup} neuloženo
                    </span>
                  )}
                </div>
              </button>

              {!isCollapsed && (
                <div className="p-5 space-y-3">
                  {(q ? visible : entries).map(([key, entry]) => {
                    const draft = drafts[key] ?? "";
                    const isOverridden = overriddenKeys.has(key) || (draft !== "" && draft !== persisted(key));
                    const isDirty = dirtyKeys.has(key);
                    const isMatch = !!q && matches(key, entry);

                    return (
                      <div
                        key={key}
                        data-copy-key={key}
                        className={`rounded-lg p-3 transition-colors ${
                          isOverridden
                            ? "border-l-4 border-brand-yellow bg-brand-yellow/[0.06] pl-3"
                            : "border-l-4 border-transparent"
                        } ${isMatch ? "ring-2 ring-brand-yellow/50" : ""}`}
                      >
                        <div className="flex items-center justify-between gap-3 mb-1.5">
                          <label className="text-xs font-medium text-muted-foreground">
                            {entry.label}
                          </label>
                          <div className="flex items-center gap-2 shrink-0">
                            {isDirty && (
                              <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">
                                neuloženo
                              </span>
                            )}
                            {isOverridden && !isDirty && (
                              <span className="text-[10px] uppercase tracking-wider text-ink font-semibold">
                                upraveno
                              </span>
                            )}
                            {(isOverridden || draft !== "") && (
                              <button
                                onClick={() => void resetOne(key)}
                                title="Obnovit výchozí"
                                className="rounded p-1 text-muted-foreground hover:text-ink hover:bg-muted transition-colors"
                              >
                                <RotateCcw className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                        <AutoTextarea
                          value={draft}
                          onChange={(v) => setDraft(key, v)}
                          highlight={isMatch}
                        />
                        <div
                          className="mt-1.5 text-xs italic text-muted-foreground/80 line-clamp-1"
                          title={entry.defaultText}
                        >
                          Výchozí: {entry.defaultText}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Bottom safety warning */}
      <div className="mt-8 flex items-start gap-2 rounded-lg border border-brand-yellow/30 bg-brand-yellow/10 p-3 text-xs text-ink/80">
        <AlertTriangle className="h-4 w-4 shrink-0 text-ink mt-0.5" />
        <span>
          Pokročilé nastavení. Změny v textech se okamžitě projeví na veřejné stránce po uložení.
        </span>
      </div>
    </div>
  );
}
