// src/App.jsx
import { Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AdjacentProfile from './pages/AdjacentProfile';
import EnfantProfile from './pages/EnfantProfile';
import './App.css';

function App() {
  return (
    <>
      <nav className="navbar">
        <h2>FM6</h2>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          {/* Removed Profile, Adjacent, and Enfant links */}
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/adjacent/profile" element={<AdjacentProfile />} />
          <Route path="/enfant/profile" element={<EnfantProfile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
