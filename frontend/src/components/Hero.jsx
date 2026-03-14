import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = ({ animeList }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % animeList.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + animeList.length) % animeList.length);
  };

  const [lastScrollTime, setLastScrollTime] = useState(0);

  const handleWheel = (e) => {
    const now = Date.now();
    if (now - lastScrollTime < 200) return; // Throttle to 200ms
    
    if (e.deltaY > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
    setLastScrollTime(now);
  };

  if (!animeList || animeList.length === 0) return null;

  return (
    <section className="hero" onWheel={handleWheel}>
      <div className="hero-slider-container">
        <div className="hero-slider-track">
          {animeList.map((anime, index) => {
            // Circular offset calculation
            let offset = index - currentIndex;
            const half = animeList.length / 2;
            
            if (offset > half) offset -= animeList.length;
            if (offset < -half) offset += animeList.length;
            
            const isActive = index === currentIndex;
            const absOffset = Math.abs(offset);

            return (
              <div 
                key={anime.mal_id || index}
                className={`hero-card-item ${isActive ? 'active' : ''}`}
                style={{
                  '--offset': offset,
                  '--abs-offset': absOffset,
                  zIndex: 20 - Math.round(absOffset),
                  opacity: absOffset > 3 ? 0 : 1,
                  pointerEvents: isActive ? 'auto' : 'none',
                  visibility: absOffset > 3 ? 'hidden' : 'visible'
                }}
                onClick={() => isActive && navigate(`/anime/${anime.title}`)}
              >
                <div className="hero-card-glow-wrapper">
                  <img src={anime.poster} alt={anime.title} className="hero-card-img" />
                  <div className="hero-card-overlay">
                    <h3 className="hero-card-title">{anime.title}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>


      <div className="hero-nav-controls">
        <button className="hero-nav-btn prev" onClick={prevSlide} aria-label="Previous">
          <ChevronLeft size={32} />
        </button>
        <button className="hero-nav-btn next" onClick={nextSlide} aria-label="Next">
          <ChevronRight size={32} />
        </button>
      </div>
      
      <div className="hero-dots">
        {animeList.map((_, i) => (
          <span 
            key={i} 
            className={`hero-dot ${i === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;

