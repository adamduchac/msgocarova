import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { fixPrepositions } from "./typography";

export type Announcement = Database["public"]["Tables"]["announcements"]["Row"];
export type StaffRow = Database["public"]["Tables"]["staff"]["Row"];
export type DocumentRow = Database["public"]["Tables"]["documents"]["Row"];
export type InfoBox = Database["public"]["Tables"]["info_boxes"]["Row"];
export type ClassColor = Database["public"]["Enums"]["class_color"];
export type DocCategory = Database["public"]["Enums"]["doc_category"];
export type InfoState = Database["public"]["Enums"]["info_state"];
export type InfoPage = Database["public"]["Enums"]["info_page"];
export type StaffGroup = Database["public"]["Enums"]["staff_group"];

// -------------------- ANNOUNCEMENTS --------------------

export async function fetchActiveAnnouncements(): Promise<Announcement[]> {
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("is_active", true)
    .order("position", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(3);
  if (error) throw error;
  return data ?? [];
}

export async function fetchAllAnnouncements(): Promise<Announcement[]> {
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .order("position", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

// -------------------- INFO BOXES --------------------

export async function fetchInfoBox(page: InfoPage): Promise<InfoBox | null> {
  const { data, error } = await supabase
    .from("info_boxes")
    .select("*")
    .eq("page_key", page)
    .maybeSingle();
  if (error) throw error;
  return data ?? null;
}

// -------------------- DOCUMENTS --------------------

export type DocumentWithUrl = DocumentRow & { url: string | null };

// Rows seeded from the pre-CMS content (supabase/seed-cms-content.sql) reference
// the site's already-hosted asset URLs directly; admin uploads store bucket paths.
function storagePublicUrl(bucket: "staff-photos" | "documents", path: string): string {
  if (path.startsWith("/") || path.startsWith("http")) return path;
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}

export async function fetchDocuments(activeOnly = true): Promise<DocumentWithUrl[]> {
  let q = supabase
    .from("documents")
    .select("*")
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (activeOnly) q = q.eq("is_active", true);
  const { data, error } = await q;
  if (error) throw error;
  if (!data || data.length === 0) return [];
  // Buckets are public (migration 20260721000000) — build stable public URLs
  // instead of signing each file (removes an N+1 round-trip per row).
  return data.map((d) => ({
    ...d,
    url: storagePublicUrl("documents", d.file_path),
  }));
}

// -------------------- STAFF --------------------

export type StaffWithPhoto = StaffRow & { photo_url: string | null };

export async function fetchStaff(activeOnly = true): Promise<StaffWithPhoto[]> {
  let q = supabase
    .from("staff")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("last_name", { ascending: true });
  if (activeOnly) q = q.eq("is_active", true);
  const { data, error } = await q;
  if (error) throw error;
  if (!data) return [];
  return data.map((s) => ({
    ...s,
    photo_url: s.photo_path ? storagePublicUrl("staff-photos", s.photo_path) : null,
  }));
}

export function staffFullName(s: Pick<StaffRow, "title_prefix" | "first_name" | "last_name" | "title_suffix">): string {
  const parts: string[] = [];
  if (s.title_prefix) parts.push(s.title_prefix);
  parts.push(s.first_name);
  parts.push(s.last_name);
  const base = parts.filter(Boolean).join(" ");
  return s.title_suffix ? `${base}, ${s.title_suffix}` : base;
}

// -------------------- STORAGE HELPERS --------------------

export async function uploadToBucket(bucket: "staff-photos" | "documents", file: File): Promise<string> {
  const ext = file.name.split(".").pop() ?? "bin";
  const safe = file.name.replace(/[^a-zA-Z0-9.-]+/g, "-");
  const path = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${safe}`.slice(0, 200);
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) throw error;
  return path;
}

export async function removeFromBucket(bucket: "staff-photos" | "documents", path: string): Promise<void> {
  if (!path) return;
  await supabase.storage.from(bucket).remove([path]);
}

// -------------------- CLASS COLOR HELPERS --------------------

export const CLASS_COLOR_LABEL: Record<ClassColor, string> = {
  red: "Červená kostička",
  green: "Zelená kostička",
  blue: "Modrá kostička",
  yellow: "Žlutá kostička",
  none: "Bez třídy (provoz / vedení)",
};

export const CLASS_COLOR_TEXT: Record<ClassColor, string> = {
  red: "text-brand-red",
  green: "text-brand-green",
  blue: "text-brand-blue",
  yellow: "text-brand-yellow",
  none: "text-ink/70",
};

// -------------------- TEAM VIEW (public rendering) --------------------

// Shape shared by the homepage teacher carousel and the "o školce" team grid.
export type TeamMemberView = {
  name: string;
  role: string;
  roleColor: string;
  photo: string | null;
  alt: string;
  group: StaffGroup;
  bio: string;
};

export function staffToTeamMember(s: StaffWithPhoto): TeamMemberView {
  const name = staffFullName(s);
  return {
    name,
    role: fixPrepositions(s.position || ""),
    roleColor: CLASS_COLOR_TEXT[s.class_color],
    photo: s.photo_url,
    alt: `Portrét — ${name}`,
    group: s.staff_group,
    bio: fixPrepositions(s.bio ?? ""),
  };
}

// -------------------- SHARED QUERY OPTIONS (loaders + components) --------------------

export const staffPublicQueryOptions = queryOptions({
  queryKey: ["staff", "active"],
  queryFn: () => fetchStaff(true),
  staleTime: 60_000,
});

export const documentsPublicQueryOptions = queryOptions({
  queryKey: ["documents", "active"],
  queryFn: () => fetchDocuments(true),
  staleTime: 60_000,
});
