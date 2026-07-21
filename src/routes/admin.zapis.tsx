import { createFileRoute } from "@tanstack/react-router";
import { InfoBoxAdmin } from "@/components/admin/info-box-admin";

export const Route = createFileRoute("/admin/zapis")({
  component: () => (
    <InfoBoxAdmin
      page="zapis"
      heading="Zápis – infobox"
      description="Řídí stavový box na stránce /zapis-do-skolky. Pokud je vyplněný titulek, přepíše statický obsah."
    />
  ),
});
