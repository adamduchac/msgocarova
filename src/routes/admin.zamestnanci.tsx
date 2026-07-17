import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderSection } from "@/components/admin/placeholder-section";

export const Route = createFileRoute("/admin/zamestnanci")({
  component: () => (
    <PlaceholderSection
      title="Zaměstnanci"
      description="Fotky, jména, tituly, medailonky a přiřazení ke třídám. Změny se propíšou na hlavní stránku, do sekce „Náš tým" a k jednotlivým třídám."
    />
  ),
});
