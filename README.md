# L.H.D. Delta website

React 19 + Vite + AWS Amplify v6.

```bash
npm install
npm run dev       # local dev server on http://localhost:3000
npm run build     # production build in dist/
```

## Members-only pages (Leden & Besturen)

`/leden` and `/besturen` are behind a password and are excluded from search engines
(`robots.txt`, `noindex` meta tags, `X-Robots-Tag` headers via `customHttp.yml`, `rel="nofollow"` links).

Change the password:

```bash
npm run hash-password -- "nieuw-wachtwoord"
```

Put the printed hash in `src/lib/config.js` (`MEMBERS_PASSWORD_HASH`), or set it as the
`VITE_MEMBERS_PASSWORD_HASH` environment variable in the Amplify Hosting console and rebuild.

> Note: this is a client-side gate. It keeps visitors and Google out, but the underlying
> AppSync API still uses a public API key. For real data protection, move the API to Cognito auth.

## Amplify Hosting

- Build output directory: `dist` (was `build` with Create React App).
- Keep the SPA rewrite rule: `</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json|webp)$)([^.]+$)/>` → `/index.html` (200).

## Android (Capacitor)

Capacitor is upgraded to v8 and `webDir` is now `dist`. The old `android/` project was generated
with Capacitor 2 and has to be regenerated: `rm -rf android && npx cap add android && npm run cap:sync`.
