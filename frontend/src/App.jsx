import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import AnimeCard from './components/AnimeCard';
import DetailPage from './components/DetailPage';
import MyListPage from './components/MyListPage';
import MobileMenu from './components/MobileMenu';
import './App.css';

function HomeContent({ searchQuery, recommendations, page, loading, error, handleLoadMore, displayList, canLoadMore, currentGenre }) {
  return (
    <>
      {recommendations && recommendations.length > 0 && <Hero animeList={recommendations.slice(0, 10)} />}
      <section className="anime-section container">
        <div className="section-header">
          <h2 className="section-title">
            {searchQuery ? `Results for "${searchQuery}"` : "Discover Recommendations"}
          </h2>
          <div className="section-line"></div>
        </div>

        {loading && page === 1 && <div className="loader">Loading recommendations...</div>}
        
        <div className="anime-grid">
          {displayList.map((anime, index) => (
            <AnimeCard key={`${anime.mal_id}-${index}`} anime={anime} />
          ))}
        </div>

        {canLoadMore && (
          <div className="load-more-container">
            <button className="btn-load-more" onClick={handleLoadMore}>
              See More {currentGenre ? "Genre Hits" : "Recommendations"}
            </button>
          </div>
        )}

        {loading && page > 1 && <div className="loader-sm">Loading more...</div>}
        {error && <div className="error-msg">{error}</div>}
      </section>
    </>
  );
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [currentGenre, setCurrentGenre] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecommendations(1);
  }, []);

  const fetchRecommendations = async (pageNum, append = false) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/anime/top?page=${pageNum}`);
      if (append) {
        setRecommendations(prev => [...prev, ...response.data]);
      } else {
        setRecommendations(response.data);
      }
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError("Could not fetch recommendations.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query) return;
    setSearchQuery(query);
    setCurrentGenre(null); // Reset genre if searching by name
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8080/anime?name=${query}`);
      if (response.data) {
        setSearchResults([response.data]);
      } else {
        setSearchResults([]);
        setError("No anime found with that name.");
      }
    } catch (err) {
      console.error("Error fetching search results:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchByGenre = async (genre, pageNum, append = false) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8080/anime/genre?genreId=${genre.id}&page=${pageNum}`);
      if (append) {
        setSearchResults(prev => [...prev, ...response.data]);
      } else {
        setSearchResults(response.data);
      }
      setSearchQuery(`Genre: ${genre.name}`);
      setCurrentGenre(genre);
      setPage(pageNum);
    } catch (err) {
      console.error("Error fetching by genre:", err);
      setError("Could not fetch anime for this genre.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    if (currentGenre) {
      fetchByGenre(currentGenre, nextPage, true);
    } else if (!searchQuery) {
      setPage(nextPage);
      fetchRecommendations(nextPage, true);
    }
  };

  const handleHome = (navigate) => {
    setSearchQuery('');
    setSearchResults([]);
    setCurrentGenre(null);
    setPage(1);
    fetchRecommendations(1);
    setError(null);
    if (navigate) navigate('/');
  };

  const handleGenreSelect = (genre) => {
    fetchByGenre(genre, 1, false);
  };

  const displayList = searchQuery ? searchResults : recommendations;

  // Show "See More" if it's top recommendations OR genre results (up to ~50 total if possible)
  const canLoadMore = !loading && (
    (!searchQuery && recommendations.length > 0) || 
    (currentGenre && searchResults.length > 0 && searchResults.length < 50)
  );

  return (
    <Router>
      <div className="app">
        <NavBarWrapper onSearch={handleSearch} onHome={handleHome} onGenreSelect={handleGenreSelect} />
        
        <main>
          <Routes>
            <Route path="/" element={
              <HomeContent 
                searchQuery={searchQuery}
                recommendations={recommendations}
                page={page}
                loading={loading}
                error={error}
                handleLoadMore={handleLoadMore}
                displayList={displayList}
                canLoadMore={canLoadMore}
                currentGenre={currentGenre}
              />
            } />
            <Route path="/anime/:name" element={<DetailPage />} />
            <Route path="/mylist" element={<MyListPage />} />
          </Routes>
        </main>

        <footer className="footer container">
          <p>&copy; 2026 AnimeCloud. All rights reserved. | Made by Harshvardhan</p>
        </footer>
        
        <MobileMenuWrapper />
      </div>
    </Router>
  );
}

import { useNavigate } from 'react-router-dom';

// Helper to handle navigation in NavBar
function NavBarWrapper({ onSearch, onHome, onGenreSelect }) {
  const navigate = useNavigate();
  return <NavBar onSearch={onSearch} onLogoClick={() => onHome(navigate)} onGenreSelect={(genre) => {
    onGenreSelect(genre);
    navigate('/');
  }} onMyListClick={() => navigate('/mylist')} />;
}

function MobileMenuWrapper() {
  const navigate = useNavigate();
  return <MobileMenu onMyListClick={() => navigate('/mylist')} />;
}

export default App;
