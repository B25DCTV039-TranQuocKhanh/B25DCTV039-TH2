const KEY = 'FAV_BOOKS';

export function getFavorites() {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export function saveFavorites(favIds) {
  localStorage.setItem(KEY, JSON.stringify(favIds));
}