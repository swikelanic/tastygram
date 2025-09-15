import React from 'react';
import SignupForm from '../components/SignupForm';

const SignupPage: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Sign Up</h1>
      <SignupForm />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '500px',
    margin: '2rem auto',
    padding: '1rem',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '1rem',
    fontSize: '2rem',
    color: '#5a3e36',
  },
};

export default SignupPage;
