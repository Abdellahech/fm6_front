import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome to FM6 App</h1>
        <p style={styles.subtitle}>Please log in or create an account</p>

        <div style={styles.buttonContainer}>
          <Link to="/login" style={styles.button}>Login</Link>
          <Link to="/register" style={{ ...styles.button, backgroundColor: '#28a745' }}>Register</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f4f4f4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: '40px',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
    textAlign: 'center',
    maxWidth: '400px',
  },
  title: {
    marginBottom: '10px',
    fontSize: '28px',
    color: '#333',
  },
  subtitle: {
    fontSize: '16px',
    marginBottom: '30px',
    color: '#666',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
  },
  button: {
    flex: 1,
    padding: '12px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    textAlign: 'center',
  },
};

export default Home;
