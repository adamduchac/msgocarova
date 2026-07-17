import { createFileRoute } from "@tanstack/react-router";
import { StaffAdmin } from "@/components/admin/staff-admin";

export const Route = createFileRoute("/admin/zamestnanci")({
  component: StaffAdmin,
});
