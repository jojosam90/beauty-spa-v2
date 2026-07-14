export interface StoredReview {
  id: string;
  name: string;
  quote: string;
  translatedQuote: string;
  originalLang: "en" | "zh";
  rating: number;
  date: string;
}

const PENDING_KEY = "eb_pending_reviews";
const APPROVED_KEY = "eb_approved_reviews";
const DELETED_STATIC_KEY = "eb_deleted_static_reviews";

// Tamper-evidence, not real security: every write stores a checksum of the
// JSON alongside it. If someone hand-edits the data via devtools without
// recomputing a matching checksum (the overwhelmingly common case), the next
// read detects the mismatch and discards the data instead of trusting it.
// A reader who reverse-engineers this exact hash function could still forge
// a valid checksum — nothing running in the browser can prevent that.
function checksumKey(key: string): string {
  return `${key}__chk`;
}

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (Math.imul(31, hash) + str.charCodeAt(i)) >>> 0;
  }
  return hash.toString(36);
}

function read<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];

    const expected = localStorage.getItem(checksumKey(key));
    if (expected !== simpleHash(raw)) {
      console.warn(`[reviewStore] "${key}" failed its integrity check and was reset.`);
      localStorage.removeItem(key);
      localStorage.removeItem(checksumKey(key));
      return [];
    }

    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

function write<T>(key: string, value: T[]) {
  const json = JSON.stringify(value);
  localStorage.setItem(key, json);
  localStorage.setItem(checksumKey(key), simpleHash(json));
}

function formatToday(): string {
  const d = new Date();
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
}

function detectLang(text: string): "en" | "zh" {
  return /[一-鿿]/.test(text) ? "zh" : "en";
}

async function translateText(text: string, from: "en" | "zh", to: "en" | "zh"): Promise<string> {
  const langCode = (l: "en" | "zh") => (l === "zh" ? "zh-CN" : "en");
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langCode(from)}|${langCode(to)}`
    );
    const data = await res.json();
    return data?.responseData?.translatedText || text;
  } catch {
    return text;
  }
}

// Returns the review text in the requested display language, falling back to
// the original if it was already written in that language, or if this record
// predates the translation feature and has no translatedQuote saved.
export function getReviewText(review: StoredReview, lang: "en" | "zh"): string {
  if (review.originalLang === lang) return review.quote;
  return review.translatedQuote || review.quote;
}

export function getPendingReviews(): StoredReview[] {
  return read<StoredReview>(PENDING_KEY);
}

export function getApprovedReviews(): StoredReview[] {
  return read<StoredReview>(APPROVED_KEY);
}

export function getDeletedStaticNames(): string[] {
  return read<string>(DELETED_STATIC_KEY);
}

const MAX_NAME_LEN = 60;
const MAX_QUOTE_LEN = 600;
const SUBMIT_COOLDOWN_KEY = "eb_last_submit_at";
const SUBMIT_COOLDOWN_MS = 30 * 1000;

// Strips angle brackets/control characters and enforces a max length. React
// already escapes text on render so this isn't preventing an active XSS
// exploit today — it's defense-in-depth against this data being rendered
// unsafely somewhere down the line, plus general input hygiene.
function sanitize(text: string, maxLen: number): string {
  return text
    .replace(/[<>]/g, "")
    .replace(/[\x00-\x1F\x7F]/g, "")
    .trim()
    .slice(0, maxLen);
}

export function getSubmitCooldownRemainingMs(): number {
  const last = Number(localStorage.getItem(SUBMIT_COOLDOWN_KEY) || 0);
  return Math.max(0, last + SUBMIT_COOLDOWN_MS - Date.now());
}

export async function addPendingReview(
  name: string,
  quote: string,
  rating: number
): Promise<{ ok: boolean; reason?: "cooldown" | "invalid" }> {
  if (getSubmitCooldownRemainingMs() > 0) {
    return { ok: false, reason: "cooldown" };
  }

  const cleanName = sanitize(name, MAX_NAME_LEN);
  const cleanQuote = sanitize(quote, MAX_QUOTE_LEN);
  if (!cleanName || !cleanQuote) {
    return { ok: false, reason: "invalid" };
  }

  const safeRating = Math.min(5, Math.max(1, Math.round(rating)));
  const originalLang = detectLang(cleanQuote);
  const targetLang = originalLang === "zh" ? "en" : "zh";
  const translatedQuote = await translateText(cleanQuote, originalLang, targetLang);

  const pending = getPendingReviews();
  pending.unshift({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: cleanName,
    quote: cleanQuote,
    translatedQuote,
    originalLang,
    rating: safeRating,
    date: formatToday(),
  });
  write(PENDING_KEY, pending);
  localStorage.setItem(SUBMIT_COOLDOWN_KEY, String(Date.now()));

  return { ok: true };
}

export function approvePendingReview(id: string) {
  const pending = getPendingReviews();
  const review = pending.find((r) => r.id === id);
  if (!review) return;
  write(PENDING_KEY, pending.filter((r) => r.id !== id));
  const approved = getApprovedReviews();
  approved.unshift(review);
  write(APPROVED_KEY, approved);
}

export function rejectPendingReview(id: string) {
  write(PENDING_KEY, getPendingReviews().filter((r) => r.id !== id));
}

export function deleteApprovedReview(id: string) {
  write(APPROVED_KEY, getApprovedReviews().filter((r) => r.id !== id));
}

export function deleteStaticReview(name: string) {
  const deleted = getDeletedStaticNames();
  if (!deleted.includes(name)) {
    deleted.push(name);
    write(DELETED_STATIC_KEY, deleted);
  }
}

// Backfills translatedQuote/originalLang for reviews saved before the
// translation feature existed. Safe to call repeatedly; only touches
// records missing a translation.
export async function migrateLegacyReviews(): Promise<boolean> {
  let changed = false;

  for (const key of [PENDING_KEY, APPROVED_KEY]) {
    const list = read<StoredReview>(key);
    let listChanged = false;

    for (const review of list) {
      if (!review.translatedQuote) {
        const originalLang = review.originalLang || detectLang(review.quote);
        const targetLang = originalLang === "zh" ? "en" : "zh";
        review.originalLang = originalLang;
        review.translatedQuote = await translateText(review.quote, originalLang, targetLang);
        listChanged = true;
      }
    }

    if (listChanged) {
      write(key, list);
      changed = true;
    }
  }

  return changed;
}
