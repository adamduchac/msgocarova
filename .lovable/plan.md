Úprava komponenty `SiteAnnouncements` (`src/components/site-announcements.tsx`):

- Přidat `cursor-pointer` na hlavní box/tlačítko oznámení, aby uživatel viděl, že celá plocha je klikací.
- Zajistit, že všechny děcké elementy uvnitř boxu (ikona, text, šipka) neblokují pointer events, takže kliknutí kamkoliv na box otevře detail.
- Ponechat všechny ostatní styly a chování (hover animace šipky, focus ring, modal) beze změny.

Jedná se o čistě vizuální/chování úpravu jedné komponenty, žádné změny datového modelu ani dalších stránek.