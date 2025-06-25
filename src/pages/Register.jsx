import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    adherentName: '',
    adherentEmail: '',
    adherentPassword: '',
    adjacents: [{ name: '', email: '', password: '' }],
    enfants: [{ name: '', email: '', password: '' }]
  });

  const handleChange = (e, group, index) => {
    if (group) {
      const updatedGroup = [...formData[group]];
      updatedGroup[index][e.target.name] = e.target.value;
      setFormData({ ...formData, [group]: updatedGroup });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const addField = (group) => {
    const newItem = { name: '', email: '', password: '' };
    setFormData({ ...formData, [group]: [...formData[group], newItem] });
  };

  const removeField = (group, index) => {
    const updatedGroup = formData[group].filter((_, i) => i !== index);
    setFormData({ ...formData, [group]: updatedGroup });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/register', formData);
      console.log('Success:', res.data);
      alert('Registration successful!');
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      alert('Registration failed!');
    }
  };

  return (
    <div>
      <h2>Register Adherent</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="adherentName"
          placeholder="Adherent Name"
          value={formData.adherentName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="adherentEmail"
          placeholder="Adherent Email"
          value={formData.adherentEmail}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="adherentPassword"
          placeholder="Adherent Password"
          value={formData.adherentPassword}
          onChange={handleChange}
          required
        />

        <h3>Adjacents</h3>
        {formData.adjacents.map((adj, i) => (
          <div key={i}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={adj.name}
              onChange={(e) => handleChange(e, 'adjacents', i)}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={adj.email}
              onChange={(e) => handleChange(e, 'adjacents', i)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={adj.password}
              onChange={(e) => handleChange(e, 'adjacents', i)}
              required
            />
          </div>
        ))}

        <h3>Enfants</h3>
        {formData.enfants.map((child, i) => (
          <div key={i}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={child.name}
              onChange={(e) => handleChange(e, 'enfants', i)}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={child.email}
              onChange={(e) => handleChange(e, 'enfants', i)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={child.password}
              onChange={(e) => handleChange(e, 'enfants', i)}
              required
            />
            {formData.enfants.length > 1 && (
              <button type="button" onClick={() => removeField('enfants', i)} style={{ marginBottom: '10px' }}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addField('enfants')} style={{ marginBottom: '20px' }}>
          + Add Enfant
        </button>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
