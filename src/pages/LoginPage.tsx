import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '1rem', border: '1px solid #ccc' }}>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
