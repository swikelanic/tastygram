// src/components/LoginForm.tsx
import React, { useState } from 'react';
import { User } from '../types';

interface LoginFormProps {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  darkMode?: boolean; // <-- Add darkMode here
}

const LoginForm: React.FC<LoginFormProps> = ({ setUser, darkMode = false }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() !== '') {
      setUser({ id: Date.now().toString(), username: username.trim() });
      setUsername('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '300px',
        margin: '2rem auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        textAlign: 'center',
        backgroundColor: darkMode ? '#1f2937' : '#fff', // dark mode bg
        color: darkMode ? '#fff' : '#000', // dark mode text
        padding: '1rem',
        borderRadius: '8px',
      }}
    >
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{
          padding: '8px',
          fontSize: '1rem',
          borderRadius: '4px',
          border: '1px solid ' + (darkMode ? '#555' : '#ccc'),
          backgroundColor: darkMode ? '#374151' : '#fff',
          color: darkMode ? '#fff' : '#000',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '10px',
          fontSize: '1.1rem',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '4px',
        }}
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
