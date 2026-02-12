const KEY = "favoriteMovies";
const EVENT_NAME = "favoritesUpdated";

export function getFavorites() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isFavorite(movieId) {
  return getFavorites().some((m) => m.id === movieId);
}

export function toggleFavorite(movie) {
  const favs = getFavorites();
  const exists = favs.some((m) => m.id === movie.id);

  const updated = exists
    ? favs.filter((m) => m.id !== movie.id)
    : [...favs, movie];

  localStorage.setItem(KEY, JSON.stringify(updated));

  // Notify the app in the same tab so Favorites page updates instantly
  window.dispatchEvent(new Event(EVENT_NAME));

  return updated;
}

export function favoritesEventName() {
  return EVENT_NAME;
}

export { KEY as FAVORITES_STORAGE_KEY };
