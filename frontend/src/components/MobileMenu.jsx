import React, { useState } from 'react';
import { Menu, X, LogIn, UserPlus, List } from 'lucide-react';
import './MobileMenu.css';

const MobileMenu = ({ onMyListClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMyList = () => {
    setIsOpen(false);
    if (onMyListClick) onMyListClick();
  };

  return (
    <div className="mobile-menu-wrapper">
      {/* Floating Button */}
      <button 
        className={`floating-menu-btn ${isOpen ? 'active' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menu Overlay */}
      {isOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsOpen(false)}>
          <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
            <div className="menu-items">
              <button className="menu-item-btn" onClick={handleMyList}>
                <List size={20} />
                <span>My List</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
