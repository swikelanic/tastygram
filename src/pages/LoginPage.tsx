// src/pages/LoginPage.tsx
import React from 'react';
import LoginForm from '../components/LoginForm';
import { User } from '../types';

interface LoginPageProps {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  darkMode?: boolean; // <-- optional to be safe
}

const LoginPage: React.FC<LoginPageProps> = ({ setUser, darkMode = false }) => {
  return (
    <div
      className={`max-w-md mx-auto mt-10 p-6 border rounded shadow ${
        darkMode
          ? 'border-gray-600 bg-gray-800 text-white'
          : 'border-gray-300 bg-white text-black'
      }`}
    >
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <LoginForm setUser={setUser} darkMode={darkMode} />
    </div>
  );
};

export default LoginPage;
