import { createFileRoute } from "@tanstack/react-router";
import { InfoBoxAdmin } from "@/components/admin/info-box-admin";

export const Route = createFileRoute("/admin/predskolacek")({
  component: () => (
    <InfoBoxAdmin
      page="predskolacek"
      heading="Předškoláček — infobox"
      description="Řídí stavový box na stránce /predskolacek. Pokud je vyplněný titulek, přepíše statický obsah."
    />
  ),
});
