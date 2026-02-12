import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Watchlist from "./pages/Watchlist";

import "./App.css";

import { MovieProvider } from "./contexts/MovieProvider";


import { searchMovies } from "./services/movieservice";

function App() {
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async (query) => {
    const trimmed = query.trim();

    // empty query returns to default view (popular movies)
    if (!trimmed) {
      setSearchResults(null);
      return;
    }

    const results = await searchMovies(trimmed);
    setSearchResults(results);
  };

  const clearSearch = () => {
    setSearchResults(null);
  };

  return (
    <MovieProvider>
      <Router>
        <div className="app">
          <Header onSearch={handleSearch} onClear={clearSearch} />

          <Routes>
            <Route path="/" element={<Home searchResults={searchResults} />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </div>
      </Router>
    </MovieProvider>
  );
}

export default App;
