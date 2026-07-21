import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, Upload, FileText, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { fetchDocuments, uploadToBucket, removeFromBucket, type DocumentWithUrl, type DocCategory } from "@/lib/cms";
import { AdminHeader, AdminField, AdminInput, AdminSelect, AdminModal } from "@/components/admin/ui";

const CAT_LABEL: Record<DocCategory, string> = {
  formulare: "Formuláře a žádosti",
  dokumenty: "Základní dokumenty",
};

type Draft = Partial<DocumentWithUrl> & { _file?: File | null };

export function DocumentsAdmin() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin", "documents"], queryFn: () => fetchDocuments(false) });
  const [editing, setEditing] = useState<Draft | null>(null);

  const save = useMutation({
    mutationFn: async (draft: Draft) => {
      let file_path = draft.file_path ?? "";
      if (draft._file) {
        if (file_path) await removeFromBucket("documents", file_path);
        file_path = await uploadToBucket("documents", draft._file);
      }
      if (!file_path) throw new Error("Chybí soubor.");
      const payload = {
        title: draft.title!,
        category: (draft.category ?? "dokumenty") as DocCategory,
        file_path,
        is_active: draft.is_active ?? true,
        sort_order: draft.sort_order ?? 0,
      };
      if (draft.id) {
        const { error } = await supabase.from("documents").update(payload).eq("id", draft.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("documents").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "documents"] });
      qc.invalidateQueries({ queryKey: ["documents", "active"] });
      setEditing(null);
    },
    onError: (e) => alert(`Uložení se nezdařilo: ${e instanceof Error ? e.message : e}`),
  });

  const del = useMutation({
    mutationFn: async (d: DocumentWithUrl) => {
      if (d.file_path) await removeFromBucket("documents", d.file_path);
      const { error } = await supabase.from("documents").delete().eq("id", d.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "documents"] });
      qc.invalidateQueries({ queryKey: ["documents", "active"] });
    },
    onError: (e) => alert(`Smazání se nezdařilo: ${e instanceof Error ? e.message : e}`),
  });

  const toggle = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase.from("documents").update({ is_active }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "documents"] });
      qc.invalidateQueries({ queryKey: ["documents", "active"] });
    },
  });

  const groups: DocCategory[] = ["formulare", "dokumenty"];

  return (
    <div className="p-8 max-w-5xl">
      <AdminHeader
        title="Dokumenty ke stažení"
        description="PDF soubory zobrazené na stránce Pro rodiče. Doplňují statické dokumenty vestavěné v šabloně."
        action={
          <button
            onClick={() => setEditing({ is_active: true, category: "dokumenty", sort_order: 0 })}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" /> Nový dokument
          </button>
        }
      />

      {isLoading ? (
        <div className="mt-8 text-sm text-muted-foreground">Načítám…</div>
      ) : (
        <div className="mt-8 space-y-8">
          {groups.map((cat) => {
            const items = (data ?? []).filter((d) => d.category === cat);
            return (
              <section key={cat}>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">{CAT_LABEL[cat]}</h2>
                {items.length === 0 ? (
                  <div className="rounded-2xl bg-white p-6 border border-dashed border-black/10 text-center text-sm text-muted-foreground">Žádné dokumenty v této kategorii.</div>
                ) : (
                  <ul className="space-y-2">
                    {items.map((d) => (
                      <li key={d.id} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 border border-black/5">
                        <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            {!d.is_active && <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">Skryto</span>}
                            <span className="text-xs text-muted-foreground">pořadí: {d.sort_order}</span>
                          </div>
                          <div className="font-medium text-foreground truncate">{d.title}</div>
                        </div>
                        {d.url && (
                          <a href={d.url} target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-black/5 text-muted-foreground" title="Otevřít"><ExternalLink className="h-4 w-4" /></a>
                        )}
                        <IconBtn onClick={() => toggle.mutate({ id: d.id, is_active: !d.is_active })} title={d.is_active ? "Skrýt" : "Zobrazit"}>
                          {d.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </IconBtn>
                        <IconBtn onClick={() => setEditing(d)} title="Upravit"><Pencil className="h-4 w-4" /></IconBtn>
                        <IconBtn onClick={() => { if (confirm(`Smazat "${d.title}"?`)) del.mutate(d); }} title="Smazat" danger><Trash2 className="h-4 w-4" /></IconBtn>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            );
          })}
        </div>
      )}

      {editing && (
        <DocEditor value={editing} onClose={() => setEditing(null)} onSave={(v) => save.mutate(v)} saving={save.isPending} />
      )}
    </div>
  );
}

function IconBtn({ children, onClick, title, danger }: { children: React.ReactNode; onClick: () => void; title: string; danger?: boolean }) {
  return (
    <button onClick={onClick} title={title} aria-label={title}
      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${danger ? "hover:bg-red-50 text-red-600" : "hover:bg-black/5 text-muted-foreground hover:text-foreground"}`}
    >{children}</button>
  );
}

function DocEditor({ value, onClose, onSave, saving }: { value: Draft; onClose: () => void; onSave: (v: Draft) => void; saving: boolean }) {
  const [form, setForm] = useState<Draft>(value);
  const [fileName, setFileName] = useState<string | null>(value.file_path?.split("-").slice(2).join("-") ?? null);
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <AdminModal title={form.id ? "Upravit dokument" : "Nový dokument"} onClose={onClose}>
      <div className="p-6 space-y-4">
        <AdminField label="Titulek"><AdminInput value={form.title ?? ""} onChange={(e) => setForm({ ...form, title: e.target.value })} /></AdminField>
        <div className="grid grid-cols-2 gap-3">
          <AdminField label="Kategorie">
            <AdminSelect value={form.category ?? "dokumenty"} onChange={(e) => setForm({ ...form, category: e.target.value as DocCategory })}>
              <option value="formulare">{CAT_LABEL.formulare}</option>
              <option value="dokumenty">{CAT_LABEL.dokumenty}</option>
            </AdminSelect>
          </AdminField>
          <AdminField label="Pořadí"><AdminInput type="number" value={form.sort_order ?? 0} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} /></AdminField>
        </div>

        <AdminField label="Soubor (PDF)" hint="Max ~20 MB. Nahrání nového souboru přepíše původní.">
          <button type="button" onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-2 rounded-lg border border-input px-3 py-2 text-sm hover:bg-black/5">
            <Upload className="h-4 w-4" /> {fileName ? "Vybrat jiný soubor" : "Vybrat soubor"}
          </button>
          <input ref={fileRef} type="file" accept="application/pdf" className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              setForm({ ...form, _file: f });
              setFileName(f.name);
            }}
          />
          {fileName && <p className="mt-2 text-xs text-muted-foreground truncate">Vybraný soubor: {fileName}</p>}
        </AdminField>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.is_active ?? true} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
          Zobrazit na webu
        </label>
      </div>
      <div className="p-6 border-t border-black/5 flex justify-end gap-2 shrink-0">
        <button onClick={onClose} className="rounded-lg px-4 py-2 text-sm hover:bg-black/5">Zrušit</button>
        <button onClick={() => onSave(form)} disabled={!form.title || (!form.id && !form._file) || saving}
          className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >{saving ? "Ukládám…" : "Uložit"}</button>
      </div>
    </AdminModal>
  );
}
