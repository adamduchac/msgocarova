Cíl: Zavést typografické pravidlo, které automaticky vloží pevnou mezeru (`\u00A0`) před jednopísmenné předložky (k, s, v, z, o, u, a, i) ve všech českých textech na webu, aniž by se rozbily meta tagy, aria-label, alt texty, URL nebo anglické texty.

Provedení:
1. Vytvořit utilitu `src/lib/typography.ts` s funkcí `fixPrepositions(text: string): string`.
   - Nahrazuje obyčejnou mezeru před uvedenými předložkami za pevnou mezeru, pouze pokud je předložka samostatným slovem (regex s word boundary).
   - Umožňuje i variantu bez zadané předložky, např. pro výjimky.
2. Vytvořit wrapper komponentu `src/components/typography.tsx` (např. `<Text />`), která na string children automaticky aplikuje `fixPrepositions`.
3. Procházet komponenty a aplikovat opravu na všechny české texty určené ke čtení uživatelem:
   - odstavce (`<p>`),
   - nadpisy (`<h1>`, `<h2>`, `<h3>`),
   - popisky karet a tlačítka,
   - položky menu (`navItems` label).
4. Vyloučit místa, kde pevná mezera škodí nebo není vhodná:
   - meta tagy v `src/routes/__root.tsx` (title, description, og:*),
   - `aria-label` a `alt` atributy,
   - href/URL,
   - anglické texty (404 stránka, error boundary),
   - texty, které už pevnou mezeru obsahují.

Soubory k úpravě:
- `src/lib/typography.ts` (nový)
- `src/components/typography.tsx` (nový)
- `src/components/site-benefits.tsx`
- `src/components/site-about.tsx`
- `src/components/site-activities.tsx`
- `src/components/site-classes.tsx`
- `src/components/site-daily-rhythm.tsx`
- `src/components/site-footer.tsx`
- `src/components/site-hero.tsx`
- `src/components/site-news.tsx`
- `src/components/site-teachers.tsx`
- `src/components/site-navbar.tsx` (label v menu)
- `src/routes/__root.tsx` (pouze pro jistotu ověřit, že meta zůstávají nedotčená)
- `src/routes/*.tsx` (nové podstránky, pokud obsahují texty)

Rizika a jak jim předcházet:
- Přetékání na mobilu: pevná mezera zabraňuje zalomení. U nadpisů a krátkých sloupců může vzniknout dlouhá nezlomitelná skupina. Řešení: po implementaci ověřit layout na mobilním viewportu; v případě potřeby přidat `overflow-wrap: break-word` nebo `hyphens: auto` do CSS pro nadpisy.
- Anglické texty: funkce bude pracovat pouze s českými řetězci, wrapper se použije jen tam, kde je to žádoucí.
- SEO/meta: pevná mezera se nebude aplikovat na meta atributy.
- Přístupnost: `aria-label` zůstane bez změn; uživatelé čteček slyší text normálně.
- Případné duplikátní pevné mezery: utilita bude idempotentní (pokud už mezera pevná je, neudělá nic).

Verifikace:
- Prohledat stránku v prohlížeči a ověřit, že předložky jako "v centru", "u Labe", "s dopravním", "z akcí", "o víkendech" mají před sebou pevnou mezeru.
- Zkontrolovat mobilní viewport, že nedochází k horizontálnímu scrollbaru nebo přetékání nadpisů.
- Otestovat, že meta popisky, alt texty a URL zůstaly beze změn.
- Spustit build (`bun run build` / `vite build`) a zkontrolovat, že nedošlo k chybám.