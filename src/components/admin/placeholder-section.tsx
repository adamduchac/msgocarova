import { Wrench } from "lucide-react";

export function PlaceholderSection({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>

      <div className="mt-8 rounded-2xl bg-white p-8 border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
        <div className="flex flex-col items-center text-center gap-3 py-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Wrench className="h-5 w-5 text-primary" />
          </div>
          <div className="text-base font-medium text-foreground">Sekce bude aktivní ve fázi 2</div>
          <div className="text-sm text-muted-foreground max-w-md">
            Základ CMS (přihlášení, role a menu) je hotový. V další fázi zapneme editaci obsahu této sekce.
          </div>
        </div>
      </div>
    </div>
  );
}
