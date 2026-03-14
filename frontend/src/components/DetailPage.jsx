import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Star, ChevronLeft, Plus, Check, Clock, Calendar, Tv } from 'lucide-react';
import API_BASE_URL from '../api/config';
import './DetailPage.css';

const DetailPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [status, setStatus] = useState('Watching');

  useEffect(() => {
    const fetchDetailsAndCheck = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/anime?name=${name}`);
        const animeData = response.data;
        setAnime(animeData);

        if (animeData && animeData.id) {
          try {
            const listRes = await axios.get(`${API_BASE_URL}/mylist/${animeData.id}`);
            if (listRes.data) {
              setAdded(true);
              setStatus(listRes.data.status || 'Watching');
            }
          } catch (e) {
            // Not in list (404)
            setAdded(false);
            setStatus('Watching');
          }
        }
      } catch (err) {
        console.error("Error fetching details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetailsAndCheck();
  }, [name]);

  const toggleMyList = async () => {
    if (!anime || !anime.id) return;
    
    try {
      if (added) {
        await axios.delete(`${API_BASE_URL}/mylist/${anime.id}`);
        setAdded(false);
      } else {
        const payload = {
          malId: anime.id,
          title: anime.title,
          poster: anime.poster,
          score: anime.score,
          episodes: anime.episodes
        };
        await axios.post(`${API_BASE_URL}/mylist`, payload);
        setAdded(true);
      }
    } catch(err) {
      console.error('Error toggling list:', err);
    }
  };
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    if (!anime || !anime.id || !added) return;
    try {
      await axios.put(`${API_BASE_URL}/mylist/${anime.id}/status`, { status: newStatus });
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status.');
    }
  };
  if (loading) return <div className="loader container">Fetching anime data...</div>;
  if (!anime) return <div className="error-msg container">Anime not found.</div>;

  return (
    <div className="detail-page container">
      <button className="btn-back" onClick={() => navigate(-1)}>
        <ChevronLeft size={20} /> Back
      </button>

      <div className="detail-layout">
        <div className="detail-poster">
          <img src={anime.poster} alt={anime.title} className="glass shadow" />
          <button className={`btn-add ${added ? 'added' : ''}`} onClick={toggleMyList}>
            {added ? <Check size={20} /> : <Plus size={20} />}
            {added ? 'In My List' : 'Add to My List'}
          </button>
        </div>

        <div className="detail-info">
          <div className="detail-header">
            <h1 className="detail-title">{anime.title}</h1>
            
            {added && (
              <select 
                className={`status-dropdown status-${status.toLowerCase()}`}
                value={status} 
                onChange={handleStatusChange}
              >
                <option value="Watching">Watching</option>
                <option value="Completed">Completed</option>
                <option value="Dropped">Dropped</option>
                <option value="faveart">faveart</option>
              </select>
            )}
          </div>
          
          <div className="detail-meta">
            <span className="meta-item score">
              <Star size={18} fill="currentColor" /> {anime.score}
            </span>
            <span className="dot"></span>
            <span className="meta-item"><Tv size={16} /> {anime.type}</span>
            <span className="dot"></span>
            <span className="meta-item"><Clock size={16} /> {anime.episodes} Episodes</span>
            <span className="dot"></span>
            <span className="meta-item"><Calendar size={16} /> {anime.year}</span>
          </div>

          <div className="detail-synopsis">
            <h3>Synopsis</h3>
            <p>{anime.synopsis}</p>
          </div>

          <div className="detail-tags">
            {/* These tags could be dynamic if the API provided them */}
            <span className="tag">Recommanded</span>
            <span className="tag">Fan Favorite</span>
            <span className="tag">Trending</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
