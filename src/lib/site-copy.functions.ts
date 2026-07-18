import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

const ListInput = z.object({ page: z.string() });
const UpsertInput = z.object({ page: z.string(), key: z.string().min(1), value: z.string() });
const DeleteInput = z.object({ page: z.string(), key: z.string().min(1) });

function createPublicClient() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

async function verifyAdmin(context: { supabase: any; userId: string }) {
  const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (roleError || !isAdmin) {
    throw new Error("Forbidden: admin role required");
  }
}

export const getSiteCopy = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => ListInput.parse(input))
  .handler(async ({ data }) => {
    const supabase = createPublicClient();
    const { data: rows, error } = await supabase
      .from("site_copy")
      .select("page, key, value")
      .eq("page", data.page);
    if (error) throw error;
    const map: Record<string, string> = {};
    for (const row of rows ?? []) {
      map[row.key] = row.value;
    }
    return map;
  });

export const upsertSiteCopy = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => UpsertInput.parse(input))
  .handler(async ({ data, context }) => {
    await verifyAdmin(context);
    const { error } = await context.supabase
      .from("site_copy")
      .upsert({ page: data.page, key: data.key, value: data.value }, { onConflict: "page, key" });
    if (error) throw error;
    return { ok: true };
  });

export const deleteSiteCopy = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => DeleteInput.parse(input))
  .handler(async ({ data, context }) => {
    await verifyAdmin(context);
    const { error } = await context.supabase.from("site_copy").delete().eq("page", data.page).eq("key", data.key);
    if (error) throw error;
    return { ok: true };
  });
