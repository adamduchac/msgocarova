import { createFileRoute } from "@tanstack/react-router";
import { DocumentsAdmin } from "@/components/admin/documents-admin";

export const Route = createFileRoute("/admin/dokumenty")({
  component: DocumentsAdmin,
});
