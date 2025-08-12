// src/components/LoginForm.tsx

import React, { useState } from 'react';
import { useRecipeContext } from '../context/RecipeContext';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const { login, user, logout } = useRecipeContext();

  if (user) {
    return (
      <div>
        <p>Welcome, {user.username}!</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    if (trimmedUsername !== '') {
      login(trimmedUsername);
      setUsername('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Login
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
  },
  input: {
    padding: '8px',
    fontSize: '1rem',
  },
  button: {
    padding: '10px',
    fontSize: '1.1rem',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};

export default LoginForm;
