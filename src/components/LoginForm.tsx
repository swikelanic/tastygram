// src/components/LoginForm.tsx
import React, { useState } from 'react';
import { User } from '../types';

interface LoginFormProps {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const LoginForm: React.FC<LoginFormProps> = ({ setUser }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() !== '') {
      setUser({ id: Date.now().toString(), username: username.trim() });
      setUsername('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'center' }}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{ padding: '8px', fontSize: '1rem' }}
      />
      <button type="submit" style={{ padding: '10px', fontSize: '1.1rem', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
