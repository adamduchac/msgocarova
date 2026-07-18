import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Save, RotateCcw } from "lucide-react";
import { SITE_COPY_REGISTRY, getPageRegistry } from "@/lib/site-copy/registry";
import { siteCopyQueryOptions, useCopyMap } from "@/lib/use-copy";
import { upsertSiteCopy, deleteSiteCopy } from "@/lib/site-copy.functions";
import { AdminHeader, AdminField, AdminTextarea } from "@/components/admin/ui";

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

function TextyEditor() {
  const { page } = useParams({ from: "/admin/texty/$page" });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const overrides = useCopyMap(page);
  const registry = getPageRegistry(page)!;

  const [drafts, setDrafts] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const key of Object.keys(registry)) {
      initial[key] = overrides[key] ?? "";
    }
    return initial;
  });
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [saving, setSaving] = useState<Record<string, boolean>>({});

  const setDraft = (key: string, value: string) => {
    setDrafts((prev) => ({ ...prev, [key]: value }));
  };

  const resetDraft = async (key: string) => {
    try {
      await deleteSiteCopy({ data: { page, key } });
      await queryClient.invalidateQueries({ queryKey: ["site-copy", page] });
      setDrafts((prev) => ({ ...prev, [key]: "" }));
      setSavedKey(key);
      setTimeout(() => setSavedKey((k) => (k === key ? null : k)), 2000);
    } catch {
      window.alert("Nepodařilo se obnovit výchozí text.");
    }
  };

  const saveDraft = async (key: string) => {
    setSaving((prev) => ({ ...prev, [key]: true }));
    try {
      await upsertSiteCopy({ data: { page, key, value: drafts[key] ?? "" } });
      await queryClient.invalidateQueries({ queryKey: ["site-copy", page] });
      setSavedKey(key);
      setTimeout(() => setSavedKey((k) => (k === key ? null : k)), 2000);
    } catch {
      window.alert("Nepodařilo se uložit text.");
    } finally {
      setSaving((prev) => ({ ...prev, [key]: false }));
    }
  };

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
        <AdminHeader title={`Texty: ${title}`} description="Výchozí text každého pole vidíte pod ním v kurzívě. Ponechejte prázdné, pokud chcete zachovat původní znění." />
      </div>

      <div className="mt-8 space-y-6">
        {Object.entries(registry).map(([key, entry]) => {
          const defaultText = entry.defaultText;
          const draft = drafts[key] ?? "";
          const isOverridden = draft !== defaultText && draft !== "";
          return (
            <div key={key} className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.08)]">
              <AdminField label={entry.label}>
                <AdminTextarea
                  value={draft}
                  onChange={(e) => setDraft(key, e.target.value)}
                  rows={4}
                  placeholder="Zadejte vlastní text nebo ponechte prázdné pro výchozí znění"
                />
              </AdminField>
              <div className="mt-3 flex items-center justify-between gap-4">
                <div className="text-sm italic text-muted-foreground line-clamp-2">
                  Výchozí: {defaultText}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {isOverridden && (
                    <button
                      onClick={() => void resetDraft(key)}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
                      title="Vrátit na výchozí"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Obnovit
                    </button>
                  )}
                  <button
                    onClick={() => void saveDraft(key)}
                    disabled={saving[key]}
                    className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    {saving[key] ? "Ukládám…" : "Uložit"}
                  </button>
                </div>
              </div>
              {savedKey === key && (
                <div className="mt-3 text-sm font-medium text-green-600">Uloženo ✓</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
