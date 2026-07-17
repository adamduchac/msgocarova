import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderSection } from "@/components/admin/placeholder-section";

export const Route = createFileRoute("/admin/zpravy")({
  component: () => (
    <PlaceholderSection
      title="Top zprávy"
      description="Aktuality zobrazené na úvodní stránce pod hero sekcí. Maximálně 3 aktivní zprávy."
    />
  ),
});
