import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EnfantProfile() {
  const [enfant, setEnfant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!userId || !token) {
          setError("Missing user ID or token. Please login again.");
          setLoading(false);
          return;
        }

        const res = await axios.get(`/api/enfant/${userId}/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setEnfant(res.data);
      } catch (err) {
        console.error("Error fetching enfant profile:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  if (!enfant) return <div>No data found.</div>;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Enfant Profile</h2>

      <div style={{ background: "#f9f9f9", borderRadius: "8px", padding: "20px" }}>
        <div><strong>Name:</strong> {enfant.name}</div>
        <div><strong>Email:</strong> {enfant.email}</div>
      </div>
    </div>
  );
}

export default EnfantProfile;
