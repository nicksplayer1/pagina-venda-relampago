export type SavedPageItem = {
  id?: string;
  title: string;
  slug: string;
  price?: string | null;
  image_url?: string | null;
  created_at?: string;
};

const STORAGE_KEY = "my_created_pages";

export function getSavedPages(): SavedPageItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];

    return parsed;
  } catch {
    return [];
  }
}

export function saveCreatedPage(page: SavedPageItem) {
  if (typeof window === "undefined") return;

  const current = getSavedPages();
  const filtered = current.filter((item) => item.slug !== page.slug);

  const next = [
    {
      ...page,
      created_at: page.created_at || new Date().toISOString(),
    },
    ...filtered,
  ].slice(0, 50);

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function clearSavedPages() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
