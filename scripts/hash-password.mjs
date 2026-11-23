// Usage: npm run hash-password -- "nieuw-wachtwoord"
// Prints the SHA-256 hash to paste into VITE_MEMBERS_PASSWORD_HASH (or src/lib/config.js).
import { createHash } from "node:crypto";

const pw = process.argv[2];
if (!pw) {
  console.error('Gebruik: npm run hash-password -- "wachtwoord"');
  process.exit(1);
}
console.log(createHash("sha256").update(pw).digest("hex"));
