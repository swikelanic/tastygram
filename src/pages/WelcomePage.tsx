import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import food1 from '../assets/carbonara.jpg';
import food2 from '../assets/foods.jpg';
import food3 from '../assets/odos.jpeg';
import food4 from '../assets/oods.jpg';
import food5 from '../assets/sam.jpg';

import './WelcomePage.css';

const images = [food1, food2, food3, food4, food5];

// ✅ Add props interface
interface WelcomePageProps {
  darkMode: boolean;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ darkMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 8000); // Change image every 8 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    // ✅ Use darkMode to optionally add a class
    <div className={`welcome-container ${darkMode ? 'dark' : ''}`}>
      {images.map((img, i) => (
        <div
          key={i}
          className="background-image"
          style={{
            backgroundImage: `url(${img})`,
            opacity: i === currentIndex ? 1 : 0,
          }}
        />
      ))}

      <div className="overlay" />

      <div className="content">
        <h1 className="title">
          Welcome to <span className="neon-text">TastyGram</span>
        </h1>
        <p className="slogan">
          Your recipe passport to{' '}
          <span className="gradient-text">flavor adventures</span>.
        </p>
        <p className="description">
          Discover authentic recipes, share your culinary secrets, and bring
          the world's flavors to your kitchen.
        </p>
        <button className="cta-button" onClick={() => navigate('/recipes')}>
          Explore Recipes
        </button>
        <div className="scroll-down">&#x2193;</div>
      </div>
    </div>
  );
};

export default WelcomePage;
