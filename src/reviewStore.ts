export interface StoredReview {
  id: string;
  name: string;
  quote: string;
  rating: number;
  date: string;
}

const PENDING_KEY = "eb_pending_reviews";
const APPROVED_KEY = "eb_approved_reviews";
const DELETED_STATIC_KEY = "eb_deleted_static_reviews";

function read<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function write<T>(key: string, value: T[]) {
  localStorage.setItem(key, JSON.stringify(value));
}

function formatToday(): string {
  const d = new Date();
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
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

export function addPendingReview(name: string, quote: string, rating: number) {
  const pending = getPendingReviews();
  pending.unshift({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    quote,
    rating,
    date: formatToday(),
  });
  write(PENDING_KEY, pending);
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
