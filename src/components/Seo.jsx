/** Per-page <title>/<meta>. React 19 hoists these into <head>. */
export default function Seo({ title, description, noindex = false }) {
  const full = title ? `${title} · L.H.D. Delta` : "L.H.D. Delta — hét dispuut van Quintus";
  return (
    <>
      <title>{full}</title>
      {description && <meta name="description" content={description} />}
      {noindex && <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />}
      {noindex && <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet" />}
    </>
  );
}
