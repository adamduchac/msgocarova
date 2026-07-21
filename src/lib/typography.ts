/**
 * Vloží pevnou mezeru před jednopísmenné české předložky a spojky
 * (k, s, v, z, o, u, a, i), aby na konci řádku nezůstávaly samy.
 *
 * Funkce je idempotetní – opakované použití výsledek nezmění.
 * Ovlivňuje pouze samostatná jednopísmenná slova následovaná mezerou.
 */
export function fixPrepositions(text: string): string {
  return text.replace(/(?<!\S)([k-svzouai])\s+(?=\S)/gi, "$1\u00A0");
}
