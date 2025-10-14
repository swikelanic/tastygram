import '../components/Navbar.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../types';

interface NavbarProps {
  onSearch: React.Dispatch<React.SetStateAction<string>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  darkMode?: boolean; // optional prop
  setDarkMode?: React.Dispatch<React.SetStateAction<boolean>>; // optional toggle
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, user, setUser, darkMode = false, setDarkMode }) => {
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false); // mobile menu state
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
    setMenuOpen(false); // close menu on logout
  };

  return (
    <nav className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
      {/* Logo */}
      <div className="navbar-logo">
        <a onClick={() => { navigate('/'); setMenuOpen(false); }}>TastyGram</a>
      </div>

      {/* Hamburger toggle for mobile */}
      <div className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Menu links + search */}
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

        {/* Search bar */}
        <div className={`navbar-search ${menuOpen ? 'active' : ''}`}>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search recipes..."
          />
        </div>

        {/* Dark mode toggle */}
        {setDarkMode && (
          <button
            className="dark-mode-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
