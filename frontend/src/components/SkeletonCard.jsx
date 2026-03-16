import React from 'react';
import './AnimeCard.css';

const SkeletonCard = () => {
  return (
    <div className="anime-card skeleton-card">
      <div className="card-image skeleton">
        <div className="shimmer-effect"></div>
      </div>
      <div className="card-info">
        <div className="skeleton skeleton-title"></div>
        <div className="card-meta">
          <div className="skeleton skeleton-text"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
