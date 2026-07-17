import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderSection } from "@/components/admin/placeholder-section";

export const Route = createFileRoute("/admin/zapis")({
  component: () => (
    <PlaceholderSection
      title="Zápis"
      description="Stavový infobox nahoře na stránce /zapis-do-skolky – termíny, kapacita a aktuální stav."
    />
  ),
});
