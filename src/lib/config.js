// SHA-256 hash of the password for the members-only pages (Leden & Besturen).
// Generate a new one with:  npm run hash-password -- "nieuw-wachtwoord"
// You can override it at build time with the VITE_MEMBERS_PASSWORD_HASH env var
// (e.g. in the Amplify Hosting console) so the hash doesn't have to live in git.
export const MEMBERS_PASSWORD_HASH =
  import.meta.env.VITE_MEMBERS_PASSWORD_HASH ||
  "0c79be05b60e898fbc212693da117a487b1516a1e64156379779b609ef16dd9b";

// SHA-512 hashes for the admin panel (unchanged from the old site).
export const ADMIN_PASSWORD_HASH =
  "4e18481eb479160677276c423983ce99049efa1491dbc7d701e22753c2aa8503bb2465d231f5f70ce01e4cbc5ff726981d4f1f71c9ca662b8cb85f8623089a7a";
export const PHOTO_UPLOAD_PASSWORD_HASH =
  "7bff1b9e9102564f27ce7b4947baf4cb3dbdefab2cc6999089d283b0ee13d689facc2c8f4533ef88c814964d038f662c4f056c6638f9b859220eb59ec70df120";

export const S3_PUBLIC_URL =
  "https://lhddeltas3152449-staging.s3.eu-west-2.amazonaws.com/public/";

export const INSTAGRAM_URL = "https://www.instagram.com/lhd_delta/";
export const FOUNDED = 1979;

// The lustrum gala page is only shown in lustrum years.
export const isLustrumYear = () => new Date().getFullYear() % 5 === 0;
