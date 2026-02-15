const KEY = "shot-studio-gallery";
const MAX = 24;

export type GalleryItem = {
  id: string;
  imageUrl: string;
  prompt: string;
  createdAt: number;
};

export function getGallery(): GalleryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as GalleryItem[];
    return Array.isArray(parsed) ? parsed.slice(0, MAX) : [];
  } catch {
    return [];
  }
}

export function addToGallery(item: Omit<GalleryItem, "id" | "createdAt">): void {
  const list = getGallery();
  const newItem: GalleryItem = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };
  const next = [newItem, ...list].slice(0, MAX);
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // quota or private mode
  }
}

export function removeFromGallery(id: string): void {
  const list = getGallery().filter((i) => i.id !== id);
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    //
  }
}
