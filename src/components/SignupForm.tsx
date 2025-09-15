import React, { useState } from 'react';
import { useRecipeContext } from '../context/RecipeContext';

const SignupForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const { signup, user, logout } = useRecipeContext();

  if (user) {
    return (
      <div style={styles.loggedInContainer}>
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
    if (trimmedUsername) {
      signup(trimmedUsername);
      setUsername('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>Sign Up</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Sign Up
      </button>
    </form>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  form: {
    maxWidth: '300px',
    margin: '2rem auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    textAlign: 'center',
    padding: '1.5rem',
    border: '1px solid #ccc',
    borderRadius: '12px',
    backgroundColor: '#fefefe',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  },
  heading: {
    margin: 0,
    fontSize: '1.5rem',
    color: '#5a3e36',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    fontSize: '1.1rem',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'background-color 0.3s ease',
  },
  loggedInContainer: {
    maxWidth: '300px',
    margin: '2rem auto',
    padding: '1.5rem',
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: '12px',
    backgroundColor: '#fefefe',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  },
  welcomeText: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    color: '#5a3e36',
  },
  logoutButton: {
    padding: '10px',
    fontSize: '1rem',
    backgroundColor: '#FF4D4D',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '6px',
  },
};

export default SignupForm;
