// src/pages/LoginPage.tsx
import React from 'react';
import LoginForm from '../components/LoginForm';
import { User } from '../types';

interface LoginPageProps {
  darkMode?: boolean; // optional dark mode
  setUser?: React.Dispatch<React.SetStateAction<User | null>>; // optional, for App-level user state
}

const LoginPage: React.FC<LoginPageProps> = ({ darkMode = false, setUser }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        background: darkMode
          ? 'linear-gradient(135deg, #1f2937, #111827)'
          : 'linear-gradient(135deg, #fefefe, #e0e0e0)',
      }}
    >
      <LoginForm darkMode={darkMode} setUser={setUser} />
    </div>
  );
};

export default LoginPage;
