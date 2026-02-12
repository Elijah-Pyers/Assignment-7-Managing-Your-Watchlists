import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { getPopularMovies } from "../services/movieservice";

function Home({ searchResults, searchError }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPopularMovies();
        setMovies(data);
      } catch (e) {
        setError(e.message || "Failed to load movies.");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPopular();
  }, []);

  // If user searched, show those; otherwise show popular
  const displayMovies = searchResults ?? movies;

  if (loading) {
    return (
      <main className="main-content">
        <LoadingSpinner text="Loading popular movies..." />
      </main>
    );
  }

  // Search error has priority (user is actively searching)
  if (searchError) {
    return (
      <main className="main-content">
        <ErrorMessage message={searchError} />
      </main>
    );
  }

  if (error) {
    return (
      <main className="main-content">
        <ErrorMessage message={error} />
      </main>
    );
  }

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>{searchResults ? "Search Results" : "Popular Movies"}</h2>
        <p>Discover and save your favorite films</p>
      </div>

      <MovieGrid movies={displayMovies} />
    </main>
  );
}

export default Home;
