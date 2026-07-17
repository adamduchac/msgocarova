import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderSection } from "@/components/admin/placeholder-section";

export const Route = createFileRoute("/admin/predskolacek")({
  component: () => (
    <PlaceholderSection
      title="Předškoláček"
      description="Stavový infobox nahoře na stránce /predskolacek – termíny, kapacita a aktuální stav."
    />
  ),
});
