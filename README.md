# L.H.D. Delta website

React 19 + Vite, hosted on Vercel. Data and photos come from AWS Amplify (AppSync + S3).

```bash
npm install
npm run dev       # local dev server on http://localhost:3000
npm run build     # production build in dist/
```

## Members-only pages (Leden & Besturen)

`/leden` and `/besturen` are behind a password and are excluded from search engines
(`robots.txt`, `noindex` meta tags, `X-Robots-Tag` headers via `vercel.json`, `rel="nofollow"` links).

Change the password:

```bash
npm run hash-password -- "nieuw-wachtwoord"
```

Put the printed hash in `src/lib/config.js` (`MEMBERS_PASSWORD_HASH`), or set it as the
`VITE_MEMBERS_PASSWORD_HASH` environment variable in the Vercel project settings and redeploy.

> Note: this is a client-side gate. It keeps visitors and Google out, but the underlying
> AppSync API still uses a public API key. For real data protection, move the API to Cognito auth.

## Vercel

`vercel.json` sets the framework (Vite), build command, output directory (`dist`), the SPA
rewrite (so `/leden` etc. work on refresh) and the `noindex` headers. Node 20.19+ is required
(see `engines` in `package.json`).

## Android (Capacitor 8)

```bash
npm run cap:sync   # build the site and copy it into android/
npx cap open android
```

Then build and export the APK/AAB from Android Studio. The app keeps its id `io.ionic.delta`; version is 5.0 (versionCode 5).
