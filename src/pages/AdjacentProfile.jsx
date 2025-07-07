import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdjacentProfile() {
  const [data, setData] = useState(null);
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

        const res = await axios.get(`/api/adjacent/${userId}/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setData(res.data);
      } catch (err) {
        console.error("Error fetching adjacent profile:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  if (!data) return <div>No data found.</div>;

  const { adjacent, enfants } = data;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Adjacent Profile</h2>

      <div style={{ background: "#f9f9f9", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
        <div><strong>Name:</strong> {adjacent.name}</div>
        <div><strong>Email:</strong> {adjacent.email}</div>
      </div>

      <h3>Enfants</h3>
      {enfants.length > 0 ? (
        enfants.map(enf => (
          <div key={enf.id} style={{ background: "#f0f0f0", borderRadius: "6px", padding: "10px", marginBottom: "10px" }}>
            <div><strong>Name:</strong> {enf.name}</div>
            <div><strong>Email:</strong> {enf.email}</div>
          </div>
        ))
      ) : (
        <div>No enfants found.</div>
      )}
    </div>
  );
}

export default AdjacentProfile;
