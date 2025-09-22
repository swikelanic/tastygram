// src/components/SignupForm.tsx
import React, { useState } from 'react';
import { User } from '../types';

interface SignupFormProps {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  darkMode?: boolean; // ← Add darkMode prop (optional)
}

const SignupForm: React.FC<SignupFormProps> = ({ setUser, darkMode = false }) => {
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
        backgroundColor: darkMode ? '#1f2937' : '#ffffff',
        color: darkMode ? '#f9fafb' : '#111827',
        padding: '1rem',
        borderRadius: '8px',
      }}
    >
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{
          padding: '8px',
          fontSize: '1rem',
          border: darkMode ? '1px solid #374151' : '1px solid #d1d5db',
          borderRadius: '4px',
          backgroundColor: darkMode ? '#374151' : '#ffffff',
          color: darkMode ? '#f9fafb' : '#111827',
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
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
