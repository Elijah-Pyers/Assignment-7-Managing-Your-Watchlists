const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

function assertEnv() {
  if (!API_KEY) throw new Error("Missing VITE_TMDB_API_KEY in .env");
  if (!BASE_URL) throw new Error("Missing VITE_TMDB_BASE_URL in .env");
}

async function request(url, defaultErrorMessage) {
  const res = await fetch(url);

  if (!res.ok) {
    let extra = "";
    try {
      const data = await res.json();
      if (data?.status_message) extra = ` (${data.status_message})`;
    } catch {
      // ignore json parse issues
    }
    throw new Error(`${defaultErrorMessage}${extra}`);
  }

  return res.json();
}

export async function getPopularMovies() {
  assertEnv();
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
  const data = await request(url, "Failed to fetch popular movies");
  return data.results;
}

export async function searchMovies(query) {
  assertEnv();
  const safeQuery = encodeURIComponent(query);
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${safeQuery}`;
  const data = await request(url, "Failed to search movies");
  return data.results;
}
