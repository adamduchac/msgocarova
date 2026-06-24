## Větší ilustrace v Barevných kostičkách + sladění mezer mezi sekcemi

### 1. Větší obrázek v `site-classes.tsx`
Wrapper ilustrace (řádek 75) zvětšit:
- `max-w-3xl` → `max-w-4xl` (768 → 896 px)
- na velkých rozlišeních ještě o něco větší přes `lg:max-w-[1024px]`
- aspect ratio ponechat `4/3` (obě verze obrázku mají stejný poměr 4:3)
- přepínač zůstane ukotvený `right-0 top-0 -translate-y-2/3`, jen logicky narůstá s obrázkem

### 2. Sjednocení vertikálních mezer mezi sekcemi
Většina sekcí (`SiteBenefits`, `SiteDailyRhythm`, `SiteClasses`, `SiteActivities`, `SiteAbout`, `SiteNews`) používá utility `section-y` → padding `clamp(56px, 8vw, 112px)`. Drobné odchylky:

- **`site-quick-links.tsx`** používá `relative -mt-2` bez `section-y` — visí těsně na předchozí Classes sekci a vůbec nemá vlastní spodní mezeru. Sjednotit:
  - odstranit `-mt-2`
  - dát sekci `py-12 md:py-16` (kompaktnější než plné `section-y`, protože jde o rozcestník – ale s viditelným dýchajícím prostorem ke Classes nad ní i k další sekci pod ní)
- **Gradient wrapper hero**: `pt-28 sm:pt-32` (kompenzace fixed menu) je OK; spodní okraj wrapperu plynule navazuje přes `SiteAnnouncementBar` (`pt-2 pb-6`). Bez změny.
- **Gradient wrapper okolo Activities + Footer**: nechat beze změny — Activities má `section-y`, Footer si nese vlastní padding.

### 3. Žádné další změny obsahu
- Žádné karty, texty, animace ani přepínač se nemění.
- Border boxu (`border-border/70`) zůstává.