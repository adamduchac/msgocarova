Cílem je tři drobná doladění komponenty `SiteAnnouncementBar`:

1. **Velikost fontu sdělení** — Změnit na `text-lg` (18px), stejně jako odstavec v `SiteHero` (`<p className="text-lg ...">`).
2. **Menší pravý CTA prvek** — Zmenšit kroužek se šipkou a celý pravý sloupec o ~40–45 %:
   - výška kontejneru z `72/80 px` na `44/48 px` (`h-11 sm:h-12`),
   - kroužek šipky z `72×72 / 80×80 px` na `44×44 / 48×48 px` (`h-11 w-11 sm:h-12 sm:w-12`),
   - sama šipka na `h-4 w-4`.
3. **Stabilní prostřední sloupec** — Pravý sloupec přepnout na pevnou šířku odpovídající plně rozbalenému stavu (např. ~12rem). Střední sloupec zůstane `1fr`, takže jeho šířka se při rozbalení CTA vůbec nezmění a text se nepřesune ani nezalomí jinak. Label „Podrobnosti“ se bude nadále rozbalovat doleva uvnitř tohoto rezervovaného prostoru.

Soubor: `src/components/site-announcement-bar.tsx`.
Žádné nové závislosti, žádné nové design tokeny.