import { MEMBERS_PASSWORD_HASH } from "./config";

const KEY = "delta:members-unlocked";

export async function sha(algo, text) {
  const buf = await crypto.subtle.digest(algo, new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function isUnlocked() {
  try {
    return localStorage.getItem(KEY) === MEMBERS_PASSWORD_HASH;
  } catch {
    return false;
  }
}

export async function unlock(password) {
  const ok = (await sha("SHA-256", password)) === MEMBERS_PASSWORD_HASH;
  if (ok) {
    try {
      localStorage.setItem(KEY, MEMBERS_PASSWORD_HASH);
    } catch {
      /* private mode: unlocked for this page view only */
    }
  }
  return ok;
}

export function lock() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
