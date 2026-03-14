import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnimeCard from './AnimeCard';

const MyListPage = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/mylist');
      // Format to match what AnimeCard expects (it uses anime.id, visually)
      const formattedList = response.data.map(item => ({
        id: item.malId,
        title: item.title,
        poster: item.poster,
        score: item.score,
        episodes: item.episodes,
        status: item.status
      }));
      setList(formattedList);
    } catch (err) {
      console.error("Error fetching my list:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredList = list.filter(anime => {
    if (filterStatus === 'All') return true;
    const itemStatus = anime.status || 'Watching';
    return itemStatus === filterStatus;
  });

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '40px' }}>
      <div className="section-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', gap: '2rem' }}>
        <h2 className="section-title" style={{ fontSize: '2.5rem', margin: 0 }}>My List</h2>
        
        <div className="section-line" style={{ flex: 1, height: '2px', background: 'linear-gradient(to right, var(--primary), transparent)', opacity: 0.3 }}></div>
        
        <select 
          className="form-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            padding: '10px 15px',
            backgroundColor: '#1a1a2e',
            color: 'white',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            fontFamily: 'inherit',
            fontWeight: '600',
            cursor: 'pointer',
            minWidth: '150px'
          }}
        >
          <option value="All">All ({list.length})</option>
          <option value="Watching">Watching</option>
          <option value="Completed">Completed</option>
          <option value="Dropped">Dropped</option>
          <option value="faveart">faveart</option>
        </select>
      </div>
      
      {loading ? (
        <div className="loader">Loading your list...</div>
      ) : filteredList.length > 0 ? (
        <div className="anime-grid">
          {filteredList.map((anime) => (
            <AnimeCard 
              key={anime.id} 
              anime={anime} 
            />
          ))}
        </div>
      ) : list.length > 0 ? (
        <div style={{ textAlign: 'center', padding: '50px 0', color: 'rgba(255,255,255,0.6)'}}>
           <h3>No Anime found matching "{filterStatus}"</h3>
           <p>Change your filter to view other saved anime.</p>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '50px 0', color: 'rgba(255,255,255,0.6)'}}>
           <h3>No Anime added yet</h3>
           <p>Go to an anime detail page to add it to your list.</p>
        </div>
      )}
    </div>
  );
};

export default MyListPage;
