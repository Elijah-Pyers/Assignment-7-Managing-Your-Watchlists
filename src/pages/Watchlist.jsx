//import { useMovies } from "../contexts/MovieProvider";
import { useMovies } from "../contexts/useMovies";

import MovieCard from "../components/MovieCard";

export default function Watchlist() {
  const { watchlist } = useMovies();

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>Watchlist</h2>
        <p>Movies you want to watch</p>
      </div>

      {watchlist.length > 0 ? (
        <div className="movie-grid">
          {watchlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No movies in your watchlist yet. Add some from Home!</p>
        </div>
      )}
    </main>
  );
}
