import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, GripVertical, Sparkles } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { fetchAllAnnouncements, type Announcement } from "@/lib/cms";
import { formatAnnouncementContent } from "@/lib/announcements.functions";
import { AdminHeader } from "@/components/admin/ui";


const MAX_ACTIVE = 3;

export function AnnouncementsAdmin() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin", "announcements"], queryFn: fetchAllAnnouncements });
  const [editing, setEditing] = useState<Partial<Announcement> | null>(null);

  const upsert = useMutation({
    mutationFn: async (a: Partial<Announcement>) => {
      if (a.id) {
        const { error } = await supabase.from("announcements").update({
          title: a.title!, content: a.content ?? "", is_active: a.is_active ?? true, position: a.position ?? 0,
        }).eq("id", a.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("announcements").insert({
          title: a.title!, content: a.content ?? "", is_active: a.is_active ?? true, position: a.position ?? 0,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "announcements"] });
      qc.invalidateQueries({ queryKey: ["announcements", "active"] });
      setEditing(null);
    },
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("announcements").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "announcements"] });
      qc.invalidateQueries({ queryKey: ["announcements", "active"] });
    },
  });

  const toggle = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase.from("announcements").update({ is_active }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "announcements"] });
      qc.invalidateQueries({ queryKey: ["announcements", "active"] });
    },
  });

  const activeCount = (data ?? []).filter((a) => a.is_active).length;
  const overLimit = activeCount > MAX_ACTIVE;

  return (
    <div className="p-8 max-w-5xl">
      <AdminHeader
        title="Top zprávy"
        description="Aktuality zobrazené na úvodní stránce pod hero sekcí. Kliknutí na zprávu otevře plný obsah v modálním okně."
        action={
          <button
            onClick={() => setEditing({ title: "", content: "", is_active: true, position: 0 })}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" /> Nová zpráva
          </button>
        }
      />

      <div className="mt-4 text-sm text-muted-foreground">
        Aktivních: <strong className={overLimit ? "text-red-600" : "text-foreground"}>{activeCount}</strong> / doporučeno max {MAX_ACTIVE}.
        {overLimit && <span className="ml-2 text-red-600">Zvažte deaktivaci některých zpráv.</span>}
      </div>

      {isLoading ? (
        <div className="mt-6 text-sm text-muted-foreground">Načítám…</div>
      ) : (
        <ul className="mt-6 space-y-3">
          {(data ?? []).map((a) => (
            <li key={a.id} className="flex items-start gap-3 rounded-2xl bg-white p-5 border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
              <GripVertical className="mt-1 h-4 w-4 text-muted-foreground/50" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {a.is_active ? (
                    <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-green-100 text-green-700">Aktivní</span>
                  ) : (
                    <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">Skrytá</span>
                  )}
                  <span className="text-xs text-muted-foreground">pořadí: {a.position}</span>
                </div>
                <div className="mt-1 font-medium text-foreground">{a.title}</div>
                {a.content && <div className="mt-1 text-sm text-muted-foreground line-clamp-2">{a.content}</div>}
              </div>
              <div className="flex gap-1">
                <IconBtn onClick={() => toggle.mutate({ id: a.id, is_active: !a.is_active })} title={a.is_active ? "Deaktivovat" : "Aktivovat"}>
                  {a.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </IconBtn>
                <IconBtn onClick={() => setEditing(a)} title="Upravit"><Pencil className="h-4 w-4" /></IconBtn>
                <IconBtn onClick={() => { if (confirm("Opravdu smazat zprávu?")) del.mutate(a.id); }} title="Smazat" danger><Trash2 className="h-4 w-4" /></IconBtn>
              </div>
            </li>
          ))}
          {(data ?? []).length === 0 && (
            <li className="rounded-2xl bg-white p-8 border border-dashed border-black/10 text-center text-sm text-muted-foreground">
              Zatím žádné zprávy. Přidejte novou tlačítkem nahoře.
            </li>
          )}
        </ul>
      )}

      {editing && (
        <EditorModal
          value={editing}
          onClose={() => setEditing(null)}
          onSave={(v) => upsert.mutate(v)}
          saving={upsert.isPending}
        />
      )}
    </div>
  );
}

function IconBtn({ children, onClick, title, danger }: { children: React.ReactNode; onClick: () => void; title: string; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={title}
      className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${danger ? "hover:bg-red-50 text-red-600" : "hover:bg-black/5 text-muted-foreground hover:text-foreground"}`}
    >
      {children}
    </button>
  );
}

function EditorModal({ value, onClose, onSave, saving }: {
  value: Partial<Announcement>;
  onClose: () => void;
  onSave: (v: Partial<Announcement>) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState(value);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-black/5">
        <div className="p-6 border-b border-black/5">
          <h2 className="text-lg font-semibold">{form.id ? "Upravit zprávu" : "Nová zpráva"}</h2>
        </div>
        <div className="p-6 space-y-4">
          <Field label="Titulek">
            <input
              value={form.title ?? ""}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </Field>
          <Field label="Obsah (zobrazí se v modálním okně po kliknutí)">
            <textarea
              value={form.content ?? ""}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={8}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Odstavce oddělte prázdným řádkem."
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Pořadí (nižší = výše)">
              <input
                type="number"
                value={form.position ?? 0}
                onChange={(e) => setForm({ ...form, position: parseInt(e.target.value) || 0 })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </Field>
            <Field label="Stav">
              <label className="flex items-center gap-2 h-[38px]">
                <input type="checkbox" checked={form.is_active ?? true} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
                <span className="text-sm">Zobrazit na webu</span>
              </label>
            </Field>
          </div>
        </div>
        <div className="p-6 border-t border-black/5 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-lg px-4 py-2 text-sm hover:bg-black/5">Zrušit</button>
          <button
            onClick={() => onSave(form)}
            disabled={!form.title || saving}
            className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {saving ? "Ukládám…" : "Uložit"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
      {children}
    </div>
  );
}
