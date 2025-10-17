// src/components/LoginForm.tsx
import React, { useState } from 'react';
import { useRecipeContext } from '../context/RecipeContext';
import { User } from '../types';

interface LoginFormProps {
  darkMode?: boolean;
  setUser?: React.Dispatch<React.SetStateAction<User | null>>; // Optional App-level state
}

const LoginForm: React.FC<LoginFormProps> = ({ darkMode = false, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user, login, logout, setUser: contextSetUser } = useRecipeContext();

  // Already logged in
  if (user) {
    return (
      <div
        style={{
          ...styles.loggedInContainer,
          backgroundColor: darkMode ? '#1f2937' : '#fff',
          color: darkMode ? '#fff' : '#333',
        }}
      >
        <p style={styles.welcomeText}>Welcome, {user.username}!</p>
        <button onClick={logout} style={styles.logoutButton}>
          Logout
        </button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      alert('Please enter both username and password.');
      return;
    }

    const success = login(trimmedUsername, trimmedPassword);
    if (!success) {
      alert('Invalid username or password');
      return;
    }

    const updateUser = setUser || contextSetUser;
    updateUser({ id: trimmedUsername, username: trimmedUsername });

    setUsername('');
    setPassword('');
  };

  return (
    <div style={styles.wrapper}>
      <form
        onSubmit={handleSubmit}
        style={{
          ...styles.card,
          background: darkMode
            ? 'linear-gradient(145deg, #2d3748, #1f2937)'
            : 'linear-gradient(145deg, #fefefe, #e0e0e0)',
          color: darkMode ? '#fff' : '#333',
        }}
      >
        <h2 style={styles.heading}>Login</h2>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            ...styles.input,
            backgroundColor: darkMode ? '#374151' : '#fff',
            color: darkMode ? '#fff' : '#000',
          }}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            ...styles.input,
            backgroundColor: darkMode ? '#374151' : '#fff',
            color: darkMode ? '#fff' : '#000',
          }}
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
  },
  card: {
    width: '350px',
    padding: '2rem',
    borderRadius: '20px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  heading: {
    textAlign: 'center',
    fontSize: '1.8rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  input: {
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '10px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'all 0.3s',
  },
  button: {
    padding: '12px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    background: '#FF6B6B',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  loggedInContainer: {
    maxWidth: '350px',
    margin: '5rem auto',
    padding: '2rem',
    textAlign: 'center',
    borderRadius: '20px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
  },
  welcomeText: { fontSize: '1.2rem', marginBottom: '1rem' },
  logoutButton: {
    padding: '12px',
    fontSize: '1rem',
    backgroundColor: '#FF4D4D',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
  },
};

export default LoginForm;
