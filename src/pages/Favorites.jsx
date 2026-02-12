import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";
import { getFavorites, favoritesEventName } from "../utils/favorites";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = () => {
    setFavorites(getFavorites());
  };

  useEffect(() => {
    // initial load
    loadFavorites();

    // update when favorites change in THIS tab
    const handler = () => loadFavorites();
    window.addEventListener(favoritesEventName(), handler);

    // also update if favorites change in ANOTHER tab
    const storageHandler = (e) => {
      if (e.key === "favoriteMovies") loadFavorites();
    };
    window.addEventListener("storage", storageHandler);

    return () => {
      window.removeEventListener(favoritesEventName(), handler);
      window.removeEventListener("storage", storageHandler);
    };
  }, []);

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>Favorites</h2>
        <p>Your saved movies (stored in localStorage)</p>
      </div>

      {favorites.length > 0 ? (
        <MovieGrid movies={favorites} />
      ) : (
        <div className="empty-state">
          <p>No favorites yet. Go add some from the Home page!</p>
        </div>
      )}
    </main>
  );
}

export default Favorites;
