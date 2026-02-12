import { useCallback, useEffect, useMemo, useState } from "react";
import { MovieContext } from "./MovieContext";

export function MovieProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem("watchlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addToWatchlist = useCallback((movie) => {
    setWatchlist((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  }, []);

  const removeFromWatchlist = useCallback((movieId) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== movieId));
  }, []);

  const isInWatchlist = useCallback(
    (movieId) => watchlist.some((m) => m.id === movieId),
    [watchlist]
  );

  useEffect(() => {
    try {
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    } catch {
      // ignore storage write errors
    }
  }, [watchlist]);

  const value = useMemo(
    () => ({
      watchlist,
      addToWatchlist,
      removeFromWatchlist,
      isInWatchlist,
    }),
    [watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist]
  );

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
}
