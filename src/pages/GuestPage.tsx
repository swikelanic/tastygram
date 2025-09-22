// src/pages/GuestPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import './GuestPage.css';

interface GuestPageProps {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  darkMode?: boolean; // ← Add this
}

const GuestPage: React.FC<GuestPageProps> = ({ setUser, darkMode = false }) => {
  const navigate = useNavigate();

  const handleGuestContinue = () => {
    setUser({
      id: 'guest',
      username: 'Guest',
    });
    navigate('/recipes');
  };

  return (
    <div className={`guest-container ${darkMode ? 'dark' : ''}`}>
      <div className="guest-card">
        <h1>Welcome, Guest!</h1>
        <p>You can browse recipes, but to upload your own, please sign up or log in.</p>

        <div className="guest-buttons">
          <button className="cta-button guest-continue" onClick={handleGuestContinue}>
            Continue as Guest
          </button>
          <button className="cta-button login" onClick={() => navigate('/login')}>
            Login
          </button>
          <button className="cta-button signup" onClick={() => navigate('/signup')}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestPage;
