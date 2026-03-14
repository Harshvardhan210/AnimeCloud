import { Star, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './AnimeCard.css';

const AnimeCard = ({ anime }) => {
  const navigate = useNavigate();

  return (
    <div className="anime-card" onClick={() => navigate(`/anime/${anime.title}`)}>
      <div className="card-image">
        <img src={anime.poster} alt={anime.title} />
        <div className="card-hover">
          <button className="btn-info-sm">
            <Info size={20} />
          </button>
        </div>
        <div className="card-score">
          <Star size={12} fill="currentColor" />
          <span>{anime.score}</span>
        </div>
      </div>
      <div className="card-info">
        <h3 className="card-title">{anime.title}</h3>
        <div className="card-meta">
          <span>{anime.year || 'N/A'}</span>
          <span className="dot"></span>
          <span>{anime.type}</span>
          <span className="dot"></span>
          <span>{anime.episodes ? `${anime.episodes} eps` : 'Ongoing'}</span>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
