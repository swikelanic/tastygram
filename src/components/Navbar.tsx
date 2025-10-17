// src/components/Navbar.tsx
import '../components/Navbar.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../types';

interface NavbarProps {
  onSearch: (query: string) => void; // required
  user: User | null;                 // required
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // required
  darkMode?: boolean;                // optional, default false
  setDarkMode?: React.Dispatch<React.SetStateAction<boolean>>; // optional
}

const Navbar: React.FC<NavbarProps> = ({
  onSearch,
  user,
  setUser,
  darkMode = false,
  setDarkMode,
}) => {
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
      <div className="navbar-logo" onClick={() => { navigate('/'); setMenuOpen(false); }}>
        TastyGram
      </div>

      <div className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
        <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/recipes" onClick={() => setMenuOpen(false)}>Recipes</Link>
          </li>

          {user ? (
            <>
              <li>Hi, {user.username}</li>
              <li>
                <Link to="/upload" onClick={() => setMenuOpen(false)}>Upload</Link>
              </li>
              <li>
                <Link to="/my-recipes" onClick={() => setMenuOpen(false)}>My Recipes</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              </li>
              <li>
                <Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>
              </li>
              <li>
                <Link to="/guest" onClick={() => setMenuOpen(false)}>Guest</Link>
              </li>
            </>
          )}
        </ul>

        <div className={`navbar-search ${menuOpen ? 'active' : ''}`}>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search recipes..."
          />
        </div>

        {setDarkMode && (
          <button
            className="dark-mode-toggle"
            onClick={() => setDarkMode(prev => !prev)}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
