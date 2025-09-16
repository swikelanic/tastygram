import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

interface NavbarProps {
  onSearch?: (query: string) => void; // made optional
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(search); // only call if provided
    }
    navigate("/recipes"); // Redirect to recipes page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Tastygram</Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/recipes">Recipes</Link></li>
      </ul>

      <form className="navbar-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>
    </nav>
  );
};

export default Navbar;
