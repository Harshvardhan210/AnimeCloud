import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Grid, List, LogIn, X, ChevronDown } from 'lucide-react';
import './NavBar.css';

const NavBar = ({ onSearch, onLogoClick, onGenreSelect, onMyListClick }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isGenresOpen, setIsGenresOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isGenresOpen && genres.length === 0) {
      fetchGenres();
    }
  }, [isGenresOpen]);

  const fetchGenres = async () => {
    try {
      const response = await axios.get('http://localhost:8080/anime/genres');
      setGenres(response.data);
    } catch (err) {
      console.error("Error fetching genres:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <nav className="navbar glass">
      <div className="nav-container">
        <div className="nav-logo" onClick={() => onLogoClick && onLogoClick()} style={{ cursor: 'pointer' }}>
          <span className="logo-accent">Anime</span>Cloud
        </div>
        
        <div className="nav-right">
          <button className="nav-icon-btn search-trigger" onClick={() => setIsSearchOpen(true)}>
            <Search size={22} />
          </button>
          
          <div className="nav-links">
            <div className="nav-genres-wrapper">
              <button 
                className="nav-link genres-trigger" 
                onClick={() => setIsGenresOpen(!isGenresOpen)}
              >
                Genres <ChevronDown size={14} className={isGenresOpen ? 'rotate' : ''} />
              </button>
              
              {isGenresOpen && (
                <div className="genres-dropdown">
                  <div className="genres-grid">
                    {genres.map((genre) => (
                      <button 
                        key={genre.id} 
                        className="genre-item"
                        onClick={() => {
                          onGenreSelect && onGenreSelect(genre);
                          setIsGenresOpen(false);
                        }}
                      >
                        {genre.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button className="nav-link desktop-only" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem', color: 'inherit' }} onClick={() => onMyListClick && onMyListClick()}>My List</button>
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div className="nav-search-overlay">
          <form className="nav-search-form container" onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Search anime recommendations..." 
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="nav-search-input"
            />
            <div className="search-actions">
              <button type="submit" className="btn-primary">
                <Search size={18} /> <span>Search</span>
              </button>
              <button type="button" onClick={() => setIsSearchOpen(false)} className="btn-close">
                <X size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
