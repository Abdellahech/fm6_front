import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [role, setRole] = useState('adherent');
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8080/api/login/${role}`, credentials);
      const token = response.data.token; // assuming backend returns token

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      alert('Login successful as ' + role);
      // redirect (based on role)
      window.location.href = `/${role}/dashboard`;

    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert('Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Login as:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="adherent">Adherent</option>
          <option value="adjacent">Adjacent</option>
          <option value="enfant">Enfant</option>
        </select>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
