## Úprava pozice kostiček ve footeru

### Cíl
Upravit pozici červené kostičky ve footeru tak, aby byla cca −10 px schovaná za horním okrajem patičky (méně vykukuje, více „uvnitř“). Žlutá kostička vpravo dole má zůstat viditelná.

### Kroky

1. **Červená kostička (`cubeRed`)**
   - Soubor: `src/components/site-footer.tsx`
   - Aktuálně: `className="... absolute left-[4%] top-0 z-0 w-[6.3rem] -translate-y-1/2 ..."`
   - Změna: nahradit `top-0 -translate-y-1/2` za `top-[-10px]`
   - Efekt: horní okraj kostičky bude 10 px pod horním okrajem patičky, zůstane částečně viditelná (tzv. peeking dovnitř/nahoru)

2. **Žlutá kostička (`cubeYellow`)**
   - Ve stejném souboru již existuje s `absolute bottom-[-1rem] right-[-1.5rem]`
   - Ověřím, že není oříznutá vnitřním boxem s `overflow-hidden`; v případě potřeby ji vytáhnu na stejnou úroveň jako červenou kostičku

### Očekávaný výsledek
- Červená kostička vykukuje z patičky méně, cca o 10 px je schovaná za horním okrajem
- Žlutá kostička zůstává viditelná vpravo dole