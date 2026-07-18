import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

const InputSchema = z.object({
  text: z.string().min(1).max(8000),
});

const SYSTEM_PROMPT = `Jsi český editor pro mateřskou školu. Dostaneš plain-text zprávu a vrátíš přesně tentýž text, jen lépe naformátovaný pro čtení.

POVINNĚ ZACHOVEJ:
- všechna slova, čísla, data, jména, e-maily, telefony, odkazy — nic nepřidávej, nic nemaž, nic nepřepisuj do synonym, neopravuj pravopis ani stylistiku
- pořadí informací

SMÍŠ pouze:
- rozdělit text do odstavců oddělených prázdným řádkem
- výčty převést na řádky začínající "- "
- zvýraznit **tučně** klíčové pojmy (max. 2–3 na odstavec), pokud v textu přirozeně vystupují

ZAKÁZÁNO: nadpisy, HTML, jiné značky, uvozovky kolem výsledku, úvodní/závěrečné věty od tebe.

Vrať pouze výsledný text.`;

export const formatAnnouncementContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleError || !isAdmin) {
      throw new Error("Forbidden: admin role required");
    }

    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("Missing LOVABLE_API_KEY");

    const gateway = createLovableAiGatewayProvider(apiKey);
    const model = gateway("google/gemini-3.5-flash");

    try {
      const result = await generateText({
        model,
        system: SYSTEM_PROMPT,
        prompt: data.text,
        temperature: 0.2,
      });
      return { text: cleanup(result.text) };
    } catch (err) {
      const message = err instanceof Error ? err.message : "AI selhala";
      if (/429|rate/i.test(message)) throw new Error("Příliš mnoho požadavků — zkuste to za chvíli.");
      if (/402|credit/i.test(message)) throw new Error("Došly AI kredity. Doplňte je v nastavení workspace.");
      throw new Error(message);
    }
  });

function cleanup(text: string): string {
  let t = text.trim();
  // Strip surrounding quotes if the model wrapped the result
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("„") && t.endsWith(""))) {
    t = t.slice(1, -1).trim();
  }
  return t;
}
