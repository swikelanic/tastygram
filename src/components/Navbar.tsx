import '../components/Navbar.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../types';

interface NavbarProps {
  onSearch: React.Dispatch<React.SetStateAction<string>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, user, setUser }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <a onClick={() => navigate('/')}>TastyGram</a>
      </div>

      {/* Search bar */}
      <div className="navbar-search">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search recipes..."
        />
      </div>

      {/* Menu links */}
      <ul className="navbar-links">
        <li>
          <Link to="/recipes">Recipes</Link>
        </li>
        {user ? (
          <>
            <li>Hi, {user.username}</li>
            <li>
              <Link to="/upload">Upload</Link>
            </li>
            <li>
              {/* NEW: My Recipes Link */}
              <Link to="/my-recipes">My Recipes</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/guest">Guest</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
