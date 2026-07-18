## Změny v Top zprávách

### 1) Náhled = jen titulek
V `src/components/site-announcements.tsx` odstranit vykreslení `previewContent(a.content)` v desktop variantě a pomocnou funkci `previewContent`. V náhledu bude jen titulek; obsah pouze v modálu.

### 2) Tlačítko „Podrobnosti" — vrátit původní expand-on-hover
V klidu jen tmavá kulatá kapsle se šipkou. Po `group-hover` / `group-focus-visible` (celá karta jako spouštěč) se kapsle plynule rozšíří doleva a odhalí text „Podrobnosti".

- Text ve vnitřním `<span>` s `max-w-0 opacity-0` → `group-hover:max-w-[160px] group-hover:opacity-100`, `transition-[max-width,opacity] duration-300 ease-out whitespace-nowrap`
- Šipka: mírný `group-hover:translate-x-0.5 transition-transform`
- Bez scale, bez posunu karty (dle Core memory)
- Respektuje `focus-visible`
- Mobil (`sm:hidden`) ponechat s plným tlačítkem

### 3) Bold + odrážky v obsahu (rich rendering v modálu)
Malá utilita `src/lib/rich-text.tsx` (bez závislostí):
- `**text**` → `<strong>`
- Řádky začínající `- ` nebo `* ` → sloučit do `<ul class="list-disc pl-5 space-y-1">`
- Prázdný řádek = nový odstavec

Použití v `AnnouncementModal` místo současného `.split(/\n{2,}/).map(...)`.

### 4) Tlačítko „Vyladit přes AI" v editoru zprávy
V `src/components/admin/announcements-admin.tsx` do `EditorModal` přidat nad textareu obsahu tlačítko se sparkles ikonou:

- Klik → potvrzení „AI přeformátuje aktuální text — obsah zůstane stejný, upraví se jen struktura (odstavce, odrážky, tučné pojmy). Pokračovat?"
- Volá server function `formatAnnouncementContent({ text })` → nahradí `content` výsledkem
- Během běhu `disabled`, label „Ladím…", textarea `disabled`
- Chyby (429, 402, ostatní) zobrazit jako malou červenou zprávu pod tlačítkem
- Helper text pod textareou: „Podporováno: **tučně**, odrážky začínající `- `. Odstavce oddělte prázdným řádkem. Titulek se zobrazí v náhledu, obsah pouze v modálu po kliknutí."
- Label titulku upravit na: „Titulek (zobrazí se v náhledu na webu)"

### 5) Server function pro AI formátování — pouze struktura, žádná změna obsahu
Nový soubor `src/lib/announcements.functions.ts`:

- `formatAnnouncementContent` = `createServerFn({ method: "POST" }).middleware([requireSupabaseAuth])` s `.inputValidator(z.object({ text: z.string().min(1).max(8000) }).parse)`
- Ověření admin role přes `context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'admin' })` — jinak 403
- Provider `createLovableAiGatewayProvider(process.env.LOVABLE_API_KEY!)` (`src/lib/ai-gateway.server.ts`; pokud neexistuje, vytvořit dle `ai-sdk-lovable-gateway` — přesně tvar helperu)
- Ověřit přítomnost `LOVABLE_API_KEY` (v případě potřeby `ai_gateway--create`)
- Model: `google/gemini-3.5-flash`
- `generateText` s tímto systémovým promptem (přísně zakázat přepis obsahu):

  > „Jsi český editor pro mateřskou školu. Dostaneš plain-text zprávu a vrátíš přesně tentýž text, jen lépe naformátovaný pro čtení.
  >
  > POVINNĚ ZACHOVEJ:
  > - všechna slova, čísla, data, jména, e-maily, telefony, odkazy — nic nepřidávej, nic nemaž, nic nepřepisuj do synonym, neopravuj pravopis ani stylistiku
  > - pořadí informací
  >
  > SMÍŠ pouze:
  > - rozdělit text do odstavců oddělených prázdným řádkem
  > - výčty převést na řádky začínající `- `
  > - zvýraznit **tučně** klíčové pojmy (max. 2–3 na odstavec), pokud v textu přirozeně vystupují
  >
  > ZAKÁZÁNO: nadpisy, HTML, jiné značky, uvozovky kolem výsledku, úvodní/závěrečné věty od tebe.
  >
  > Vrať pouze výsledný text."

- `temperature: 0.2`, `maxTokens` úměrné vstupu
- Vrací `{ text: string }` (trim, ořezané případné wrapping uvozovky)
- Chyby z gateway propaguje se statusem/messagem, aby je frontend uměl zobrazit

### 6) Volání z klienta
V `EditorModal` `useServerFn(formatAnnouncementContent)` → `setForm({ ...form, content: result.text })`.

### Dotčené soubory
- `src/components/site-announcements.tsx` — 1 + 2
- `src/lib/rich-text.tsx` (nový) — 3
- `src/components/admin/announcements-admin.tsx` — 4 + 6
- `src/lib/announcements.functions.ts` (nový) — 5
- Případně `src/lib/ai-gateway.server.ts` (jen pokud ještě neexistuje)

Bez změn v DB. Bez edge function — v TanStack Start přes `createServerFn`.