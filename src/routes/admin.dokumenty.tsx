import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderSection } from "@/components/admin/placeholder-section";

export const Route = createFileRoute("/admin/dokumenty")({
  component: () => (
    <PlaceholderSection
      title="Dokumenty"
      description="Nahrávání a mazání dokumentů ke stažení – formuláře a základní dokumenty na stránce Pro rodiče."
    />
  ),
});
