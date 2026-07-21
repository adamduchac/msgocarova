import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { fetchStaff, staffFullName, uploadToBucket, removeFromBucket, CLASS_COLOR_LABEL, type StaffWithPhoto, type ClassColor } from "@/lib/cms";
import { AdminHeader, AdminField, AdminInput, AdminTextarea, AdminSelect, AdminModal } from "@/components/admin/ui";

type Draft = Partial<StaffWithPhoto> & { _file?: File | null };

const CLASS_ORDER: ClassColor[] = ["red", "green", "blue", "yellow", "none"];

export function StaffAdmin() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin", "staff"], queryFn: () => fetchStaff(false) });
  const [editing, setEditing] = useState<Draft | null>(null);

  const save = useMutation({
    mutationFn: async (draft: Draft) => {
      let photo_path = draft.photo_path ?? null;
      if (draft._file) {
        if (photo_path) await removeFromBucket("staff-photos", photo_path);
        photo_path = await uploadToBucket("staff-photos", draft._file);
      }
      const payload = {
        first_name: draft.first_name!,
        last_name: draft.last_name!,
        title_prefix: draft.title_prefix || null,
        title_suffix: draft.title_suffix || null,
        position: draft.position || "Učitelka",
        class_color: (draft.class_color ?? "none") as ClassColor,
        phone: draft.phone || null,
        bio: draft.bio || null,
        photo_path,
        is_active: draft.is_active ?? true,
        sort_order: draft.sort_order ?? 0,
      };
      if (draft.id) {
        const { error } = await supabase.from("staff").update(payload).eq("id", draft.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("staff").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "staff"] });
      qc.invalidateQueries({ queryKey: ["staff"] });
      setEditing(null);
    },
  });

  const del = useMutation({
    mutationFn: async (s: StaffWithPhoto) => {
      if (s.photo_path) await removeFromBucket("staff-photos", s.photo_path);
      const { error } = await supabase.from("staff").delete().eq("id", s.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "staff"] });
      qc.invalidateQueries({ queryKey: ["staff"] });
    },
  });

  const toggle = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase.from("staff").update({ is_active }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "staff"] });
      qc.invalidateQueries({ queryKey: ["staff"] });
    },
  });

  const grouped = CLASS_ORDER.map((c) => ({
    color: c,
    items: (data ?? []).filter((s) => s.class_color === c),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="p-8 max-w-6xl">
      <AdminHeader
        title="Medailonky zaměstnanců"
        description="Fotky, jména a texty učitelek a personálu. Zobrazují se v carouselu na úvodní stránce a na stránkách jednotlivých tříd."
        action={
          <button
            onClick={() => setEditing({ is_active: true, class_color: "none", position: "Učitelka", sort_order: 0 })}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" /> Nový medailonek
          </button>
        }
      />

      {isLoading ? (
        <div className="mt-8 text-sm text-muted-foreground">Načítám…</div>
      ) : (data ?? []).length === 0 ? (
        <div className="mt-8 rounded-2xl bg-white p-8 border border-dashed border-black/10 text-center text-sm text-muted-foreground">
          Zatím žádné medailonky. Přidejte nový tlačítkem nahoře.
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          {grouped.map((g) => (
            <section key={g.color}>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                {CLASS_COLOR_LABEL[g.color]}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((s) => (
                  <article key={s.id} className="rounded-2xl bg-white p-4 border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex gap-3">
                    <div className="h-16 w-16 shrink-0 rounded-full bg-black/5 overflow-hidden">
                      {s.photo_url ? <img src={s.photo_url} alt="" className="h-full w-full object-cover" /> : null}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {!s.is_active && <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">Skrytý</span>}
                      </div>
                      <div className="font-medium text-foreground truncate">{staffFullName(s)}</div>
                      <div className="text-xs text-muted-foreground truncate">{s.position}</div>
                      <div className="mt-2 flex gap-1">
                        <IconBtn onClick={() => toggle.mutate({ id: s.id, is_active: !s.is_active })} title={s.is_active ? "Skrýt" : "Zobrazit"}>
                          {s.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </IconBtn>
                        <IconBtn onClick={() => setEditing(s)} title="Upravit"><Pencil className="h-4 w-4" /></IconBtn>
                        <IconBtn onClick={() => { if (confirm(`Smazat ${staffFullName(s)}?`)) del.mutate(s); }} title="Smazat" danger><Trash2 className="h-4 w-4" /></IconBtn>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {editing && (
        <StaffEditor value={editing} onClose={() => setEditing(null)} onSave={(v) => save.mutate(v)} saving={save.isPending} />
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

function StaffEditor({ value, onClose, onSave, saving }: { value: Draft; onClose: () => void; onSave: (v: Draft) => void; saving: boolean }) {
  const [form, setForm] = useState<Draft>(value);
  const [previewUrl, setPreviewUrl] = useState<string | null>(value.photo_url ?? null);
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <AdminModal title={form.id ? "Upravit medailonek" : "Nový medailonek"} onClose={onClose}>
      <div className="p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="h-24 w-24 shrink-0 rounded-full bg-black/5 overflow-hidden relative">
            {previewUrl && <img src={previewUrl} alt="" className="h-full w-full object-cover" />}
            {previewUrl && (
              <button
                type="button"
                onClick={() => { setForm({ ...form, _file: null, photo_path: null }); setPreviewUrl(null); }}
                className="absolute top-1 right-1 h-6 w-6 rounded-full bg-white/90 flex items-center justify-center shadow"
                aria-label="Odstranit fotku"
              ><X className="h-3 w-3" /></button>
            )}
          </div>
          <div className="flex-1">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-lg border border-input px-3 py-2 text-sm hover:bg-black/5"
            >
              <Upload className="h-4 w-4" /> Nahrát fotku
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                setForm({ ...form, _file: f });
                setPreviewUrl(URL.createObjectURL(f));
              }}
            />
            <p className="mt-2 text-xs text-muted-foreground">JPG/PNG, čtvercový ořez, cca 600×600 px.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <AdminField label="Titul před jménem"><AdminInput value={form.title_prefix ?? ""} onChange={(e) => setForm({ ...form, title_prefix: e.target.value })} placeholder="Mgr." /></AdminField>
          <AdminField label="Titul za jménem"><AdminInput value={form.title_suffix ?? ""} onChange={(e) => setForm({ ...form, title_suffix: e.target.value })} placeholder="DiS." /></AdminField>
          <AdminField label="Jméno"><AdminInput value={form.first_name ?? ""} onChange={(e) => setForm({ ...form, first_name: e.target.value })} /></AdminField>
          <AdminField label="Příjmení"><AdminInput value={form.last_name ?? ""} onChange={(e) => setForm({ ...form, last_name: e.target.value })} /></AdminField>
          <AdminField label="Pozice"><AdminInput value={form.position ?? ""} onChange={(e) => setForm({ ...form, position: e.target.value })} placeholder="Učitelka" /></AdminField>
          <AdminField label="Třída">
            <AdminSelect value={form.class_color ?? "none"} onChange={(e) => setForm({ ...form, class_color: e.target.value as ClassColor })}>
              {CLASS_ORDER.map((c) => <option key={c} value={c}>{CLASS_COLOR_LABEL[c]}</option>)}
            </AdminSelect>
          </AdminField>
          <AdminField label="Telefon"><AdminInput value={form.phone ?? ""} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></AdminField>
          <AdminField label="Pořadí"><AdminInput type="number" value={form.sort_order ?? 0} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} /></AdminField>
        </div>

        <AdminField label="Text (bio) – zobrazí se v carouselu a na stránce třídy">
          <AdminTextarea rows={5} value={form.bio ?? ""} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
        </AdminField>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.is_active ?? true} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
          Zobrazit na webu
        </label>
      </div>
      <div className="p-6 border-t border-black/5 flex justify-end gap-2 shrink-0">
        <button onClick={onClose} className="rounded-lg px-4 py-2 text-sm hover:bg-black/5">Zrušit</button>
        <button
          onClick={() => onSave(form)}
          disabled={!form.first_name || !form.last_name || saving}
          className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >{saving ? "Ukládám…" : "Uložit"}</button>
      </div>
    </AdminModal>
  );
}
