## Cíl
Tečky na timeline vlnovce svisle zarovnat pod časy a nad polaroidy (stejný 5-sloupcový grid), a zmenšit je o 30 %.

## Provedení
1. V `site-daily-rhythm.tsx` přesunout tečky z absolutní pozice uvnitř SVG do vlastního `grid-cols-5 gap-6` řádku — tím se horizontálně přesně zarovnají ke sloupcům časů a polaroidů.
2. Uvnitř každého sloupce ponechat absolutní vertikální pozici (`top`) podle vlnovky a vycentrování `left: 50%` s `translate-x-1/2`.
3. Zmenšit tečky z `h-5 w-5` (20 px) na `h-3.5 w-3.5` (14 px) ≈ −30 %.
4. Nechat SVG vlnovku na místě, jen odstranit tečky z jejího `<svg>` kontejneru.

## Očekávaný výsledek
Tečky sedí přesně nad každým polaroidem, přímo pod svým časem, a jsou menší.