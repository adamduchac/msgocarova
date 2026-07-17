import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: AdminHome,
});

function AdminHome() {
  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-2xl font-semibold text-foreground">Přehled</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Vítejte v administraci webu MŠ Josefa Gočára. V levém menu vyberte sekci, kterou chcete upravovat.
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { title: "Top zprávy", desc: "Aktuality na úvodní stránce pod hlavičkou." },
          { title: "Zaměstnanci", desc: "Fotky, jména, medailonky a přiřazení ke třídám." },
          { title: "Dokumenty", desc: "Formuláře a základní dokumenty ke stažení." },
          { title: "Předškoláček", desc: "Informace o zápisu do Předškoláčka." },
          { title: "Zápis", desc: "Informace o zápisu do mateřské školy." },
        ].map((s) => (
          <div key={s.title} className="rounded-2xl bg-white p-5 border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
            <div className="text-sm font-medium text-foreground">{s.title}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
