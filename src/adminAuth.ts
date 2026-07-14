// Client-side PIN gate for the admin review panel. This is deliberately NOT
// real security — anything shipped to the browser can be read or bypassed by
// whoever controls that browser. It only raises the bar past "view-source and
// grep for a plaintext PIN" and casual brute-forcing via the UI.

// SHA-256 of the actual PIN. Never store the plaintext PIN in source.
const PIN_HASH = "ff9a64b244f71656df01083af1700556dc2d9576474473ff95a9fdf89d8ffec1";

const ATTEMPTS_KEY = "eb_admin_attempts";
const LOCKOUT_UNTIL_KEY = "eb_admin_lockout_until";
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 5 * 60 * 1000; // 5 minutes

async function sha256Hex(text: string): Promise<string> {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function getLockoutRemainingMs(): number {
  const until = Number(localStorage.getItem(LOCKOUT_UNTIL_KEY) || 0);
  return Math.max(0, until - Date.now());
}

function recordFailedAttempt() {
  const attempts = Number(localStorage.getItem(ATTEMPTS_KEY) || 0) + 1;
  localStorage.setItem(ATTEMPTS_KEY, String(attempts));
  if (attempts >= MAX_ATTEMPTS) {
    localStorage.setItem(LOCKOUT_UNTIL_KEY, String(Date.now() + LOCKOUT_MS));
    localStorage.setItem(ATTEMPTS_KEY, "0");
  }
}

function resetAttempts() {
  localStorage.setItem(ATTEMPTS_KEY, "0");
  localStorage.removeItem(LOCKOUT_UNTIL_KEY);
}

// Returns true if the PIN was correct. Handles lockout + attempt bookkeeping.
export async function verifyAdminPin(pin: string): Promise<boolean> {
  if (getLockoutRemainingMs() > 0) return false;

  const hash = await sha256Hex(pin);
  if (hash === PIN_HASH) {
    resetAttempts();
    return true;
  }
  recordFailedAttempt();
  return false;
}
