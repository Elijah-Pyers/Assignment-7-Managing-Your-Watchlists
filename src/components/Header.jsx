import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Header({ onSearch, onClear }) {
  const location = useLocation();
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    if (onClear) onClear();
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="app-title" onClick={handleClear}>
          MovieShelf
        </Link>

        {onSearch && (
          <form className="search-container" onSubmit={handleSubmit}>
            <input
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies..."
            />
            <button className="search-button" type="submit">
              Search
            </button>
          </form>
        )}

        <nav className="nav-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
            onClick={handleClear}
          >
            Home
          </Link>

          <Link
            to="/favorites"
            className={`nav-link ${
              location.pathname === "/favorites" ? "active" : ""
            }`}
          >
            Favorites
          </Link>

          <Link
            to="/watchlist"
            className={`nav-link ${
              location.pathname === "/watchlist" ? "active" : ""
            }`}
          >
            Watchlist
          </Link>
        </nav>
      </div>
    </header>
  );
}
