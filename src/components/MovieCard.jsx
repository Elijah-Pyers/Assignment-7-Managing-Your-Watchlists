import { useEffect, useState } from "react";
import { isFavorite, toggleFavorite } from "../utils/favorites";
//import { useMovies } from "../contexts/MovieProvider";
import { useMovies } from "../contexts/useMovies";


const IMAGE_BASE =
  import.meta.env.VITE_TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }) {
  const [fav, setFav] = useState(false);

  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useMovies();
  const inWatchlist = isInWatchlist(movie.id);

  useEffect(() => {
    setFav(isFavorite(movie.id));
  }, [movie.id]);

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE}${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Poster";

  const handleToggleFavorite = () => {
    toggleFavorite(movie);
    setFav((prev) => !prev);
  };

  const handleToggleWatchlist = () => {
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <div className="movie-card">
      <img className="movie-poster" src={posterUrl} alt={movie.title} />

      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>

        <p className="movie-meta">
          {movie.release_date ? movie.release_date.slice(0, 4) : "—"} • ⭐{" "}
          {movie.vote_average ? movie.vote_average.toFixed(1) : "—"}
        </p>

        <button
          className={`favorite-button ${fav ? "favorited" : ""}`}
          onClick={handleToggleFavorite}
        >
          {fav ? "♥ Remove Favorite" : "♡ Add Favorite"}
        </button>

        <button
          className={`watchlist-button ${inWatchlist ? "added" : ""}`}
          onClick={handleToggleWatchlist}
        >
          {inWatchlist ? "✓ Remove from Watchlist" : "+ Add to Watchlist"}
        </button>
      </div>
    </div>
  );
}
