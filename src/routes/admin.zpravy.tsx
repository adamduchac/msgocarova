import { createFileRoute } from "@tanstack/react-router";
import { AnnouncementsAdmin } from "@/components/admin/announcements-admin";

export const Route = createFileRoute("/admin/zpravy")({
  component: AnnouncementsAdmin,
});
