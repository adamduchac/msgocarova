## Plán: oprava high-severity zranitelností

Všechny nálezy pocházejí z transitivní závislosti `undici` přes `@tanstack/react-start@1.167.50`. Latest `@tanstack/react-start` je `1.168.26` — upgrade nejspíš stáhne novější `undici` a varování zmizí.

### Kroky
1. `bun update @tanstack/react-start @tanstack/react-router @tanstack/router-plugin` na nejnovější minor (1.168.x — drží se v rámci v1, žádný breaking).
2. `bun pm ls | grep undici` → ověřit, že nová verze `undici` už není ve zranitelném rozsahu.
3. Pokud bude undici stále stará (přes nested cache), přidat do `package.json` `overrides`:
   ```json
   "overrides": { "undici": "^8.5.0" }
   ```
   a `bun install`.
4. Spustit build (`bun run build`) — ověřit, že nic nepadne.
5. Označit security findings jako fixed.

### Poznámka k reálnému riziku
App běží na Cloudflare Workers (workerd), `undici` se v runtime nepoužívá — je to dev/SSR-build dependency. Tyto CVE (SOCKS5 proxy, WebSocket DoS) **na produkci nedopadají**. Přesto upgrade udělám, ať scanner mlčí a kódová báze je aktuální.

### Soubory
- `package.json` — version bumps, případně `overrides`
- `bun.lock` — regenerated