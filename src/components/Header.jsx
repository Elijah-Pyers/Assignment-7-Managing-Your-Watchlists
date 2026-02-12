import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Header({ onSearch, onClear }) {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  
  useEffect(() => {
    const trimmed = searchQuery.trim();

    // Empty -> reset to popular
    if (!trimmed) {
      onClear?.();
      return;
    }

    const timer = setTimeout(() => {
      onSearch?.(trimmed);
    }, 450);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch, onClear]);

  const runSearch = () => onSearch?.(searchQuery.trim());

  const handleKeyDown = (e) => {
    if (e.key === "Enter") runSearch();
  };

  const handleClear = () => {
    setSearchQuery("");
    onClear?.();
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="app-title" onClick={handleClear}>
          MovieShelf
        </Link>

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
            className={`nav-link ${location.pathname === "/favorites" ? "active" : ""}`}
          >
            Favorites
          </Link>
        </nav>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="search-button" onClick={runSearch}>
            Search
          </button>
          <button className="search-button" onClick={handleClear} type="button">
            Clear
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
