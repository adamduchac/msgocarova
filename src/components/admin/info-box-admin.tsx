import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { fetchInfoBox, type InfoBox, type InfoPage, type InfoState } from "@/lib/cms";
import { AdminHeader, AdminField, AdminInput, AdminTextarea, AdminSelect } from "@/components/admin/ui";

const STATE_LABEL: Record<InfoState, string> = {
  closed: "Uzavřeno / bez termínu",
  upcoming: "Připravujeme (známý termín)",
  open: "Otevřeno / právě probíhá",
};

export function InfoBoxAdmin({ page, heading, description }: { page: InfoPage; heading: string; description: string }) {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin", "info_box", page], queryFn: () => fetchInfoBox(page) });
  const [form, setForm] = useState<Partial<InfoBox>>({ page_key: page, state: "closed", heading: "", body: "" });
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (data) setForm(data);
    else setForm({ page_key: page, state: "closed", heading: "", body: "" });
    setDirty(false);
  }, [data, page]);

  const save = useMutation({
    mutationFn: async (v: Partial<InfoBox>) => {
      const payload = {
        page_key: page,
        state: (v.state ?? "closed") as InfoState,
        heading: v.heading ?? "",
        body: v.body ?? "",
        deadline_label: v.deadline_label || null,
        capacity_label: v.capacity_label || null,
        note: v.note || null,
      };
      if (v.id) {
        const { error } = await supabase.from("info_boxes").update(payload).eq("id", v.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("info_boxes").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "info_box", page] });
      qc.invalidateQueries({ queryKey: ["info_box", page] });
      setDirty(false);
    },
  });

  const update = <K extends keyof InfoBox>(key: K, value: InfoBox[K] | null) => {
    setForm((f) => ({ ...f, [key]: value as InfoBox[K] }));
    setDirty(true);
  };

  return (
    <div className="p-8 max-w-3xl">
      <AdminHeader
        title={heading}
        description={description}
        action={
          <button
            onClick={() => save.mutate(form)}
            disabled={!dirty || save.isPending || !form.heading}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            <Save className="h-4 w-4" /> {save.isPending ? "Ukládám…" : dirty ? "Uložit změny" : "Uloženo"}
          </button>
        }
      />

      {isLoading ? (
        <div className="mt-8 text-sm text-muted-foreground">Načítám…</div>
      ) : (
        <div className="mt-8 space-y-4 rounded-2xl bg-white p-6 border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
          <AdminField label="Stav" hint="Ovlivňuje barvu a ikonu boxu na veřejné stránce.">
            <AdminSelect value={form.state ?? "closed"} onChange={(e) => update("state", e.target.value as InfoState)}>
              {(Object.keys(STATE_LABEL) as InfoState[]).map((s) => (
                <option key={s} value={s}>{STATE_LABEL[s]}</option>
              ))}
            </AdminSelect>
          </AdminField>

          <AdminField label="Titulek">
            <AdminInput value={form.heading ?? ""} onChange={(e) => update("heading", e.target.value)} />
          </AdminField>

          <AdminField label="Text" hint="Odstavce oddělte prázdným řádkem.">
            <AdminTextarea rows={6} value={form.body ?? ""} onChange={(e) => update("body", e.target.value)} />
          </AdminField>

          <div className="grid grid-cols-2 gap-3">
            <AdminField label="Termín (volitelné)"><AdminInput value={form.deadline_label ?? ""} onChange={(e) => update("deadline_label", e.target.value)} placeholder="např. 5. května 2027" /></AdminField>
            <AdminField label="Kapacita (volitelné)"><AdminInput value={form.capacity_label ?? ""} onChange={(e) => update("capacity_label", e.target.value)} placeholder="např. 20 dětí" /></AdminField>
          </div>

          <AdminField label="Poznámka (volitelné, drobným písmem pod textem)">
            <AdminInput value={form.note ?? ""} onChange={(e) => update("note", e.target.value)} />
          </AdminField>
        </div>
      )}
    </div>
  );
}
