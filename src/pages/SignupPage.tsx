// src/components/SignupForm.tsx
import React, { useState } from 'react';
import { useRecipeContext } from '../context/RecipeContext';
import { User } from '../types';

interface SignupFormProps {
  darkMode?: boolean;
  setUser?: React.Dispatch<React.SetStateAction<User | null>>; // optional App-level state
}

const SignupForm: React.FC<SignupFormProps> = ({ darkMode = false, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signup, user, logout, setUser: contextSetUser } = useRecipeContext();

  // Already logged in
  if (user) {
    return (
      <div
        style={{
          ...styles.loggedInContainer,
          backgroundColor: darkMode ? '#1f2937' : '#fefefe',
          color: darkMode ? '#fff' : '#000',
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

    signup(trimmedUsername, trimmedPassword);

    const newUser: User = { id: trimmedUsername, username: trimmedUsername };
    (setUser || contextSetUser)?.(newUser);

    setUsername('');
    setPassword('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        ...styles.form,
        backgroundColor: darkMode ? '#1f2937' : '#fff',
        color: darkMode ? '#fff' : '#000',
      }}
    >
      <h2 style={styles.heading}>Sign Up</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{
          ...styles.input,
          border: '1px solid ' + (darkMode ? '#555' : '#ccc'),
          backgroundColor: darkMode ? '#374151' : '#fff',
          color: darkMode ? '#fff' : '#000',
        }}
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{
          ...styles.input,
          border: '1px solid ' + (darkMode ? '#555' : '#ccc'),
          backgroundColor: darkMode ? '#374151' : '#fff',
          color: darkMode ? '#fff' : '#000',
        }}
      />
      <button type="submit" style={styles.button}>
        Sign Up
      </button>
    </form>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  form: {
    maxWidth: '320px',
    margin: '4rem auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    textAlign: 'center',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'default',
  },
  heading: { fontSize: '1.8rem', marginBottom: '1rem' },
  input: {
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '6px',
    outline: 'none',
  },
  button: {
    padding: '12px',
    fontSize: '1.1rem',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#007BFF',
    color: '#fff',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  loggedInContainer: {
    maxWidth: '320px',
    margin: '4rem auto',
    padding: '2rem',
    textAlign: 'center',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
  },
  welcomeText: { fontSize: '1.3rem', marginBottom: '1rem' },
  logoutButton: {
    padding: '10px',
    fontSize: '1rem',
    backgroundColor: '#FF4D4D',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default SignupForm;
