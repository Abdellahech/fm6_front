import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [adherent, setAdherent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [adherentName, setAdherentName] = useState('');
  const [adherentEmail, setAdherentEmail] = useState('');

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

        const res = await axios.get(`/api/adherents/${userId}/details`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setAdherent(res.data);
        setAdherentName(res.data.name);
        setAdherentEmail(res.data.email);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAdherentSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/api/adherents/${adherent.id}`, {
        name: adherentName,
        email: adherentEmail
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Adherent info updated successfully.");
    } catch (err) {
      console.error("Error updating adherent:", err);
      alert("Failed to update adherent info.");
    }
  };

  const handleAdjacentSave = async (adj) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/api/adherents/${adherent.id}/adjacents/${adj.id}`, {
        name: adj.name,
        email: adj.email
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Adjacent info updated successfully.");
    } catch (err) {
      console.error("Error updating adjacent:", err);
      alert("Failed to update adjacent info.");
    }
  };

  const handleEnfantSave = async (enf) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/api/adherents/${adherent.id}/enfants/${enf.id}`, {
        name: enf.name,
        email: enf.email
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Enfant info updated successfully.");
    } catch (err) {
      console.error("Error updating enfant:", err);
      alert("Failed to update enfant info.");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!adherent) return <div>No data found.</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>My Profile</h2>

      <div style={{ background: "#f9f9f9", borderRadius: "8px", padding: "20px", marginBottom: "20px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
        <h3>Adherent Information</h3>
        <div style={{ marginBottom: "10px" }}>
          <label><strong>Name:</strong></label><br />
          <input
            type="text"
            value={adherentName}
            onChange={(e) => setAdherentName(e.target.value)}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label><strong>Email:</strong></label><br />
          <input
            type="email"
            value={adherentEmail}
            onChange={(e) => setAdherentEmail(e.target.value)}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <button
          onClick={handleAdherentSave}
          style={{ padding: "10px 20px", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Save Changes
        </button>
      </div>

      <h3>Adjacents</h3>
      {adherent.adjacents?.length > 0 ? (
        adherent.adjacents.map((adj, index) => (
          <div key={adj.id} style={{ background: "#f9f9f9", borderRadius: "8px", padding: "15px", marginBottom: "15px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
            <div style={{ marginBottom: "10px" }}>
              <label><strong>Name:</strong></label><br />
              <input
                type="text"
                value={adj.name}
                onChange={(e) => {
                  const updatedAdj = { ...adj, name: e.target.value };
                  const newAdjacents = [...adherent.adjacents];
                  newAdjacents[index] = updatedAdj;
                  setAdherent({ ...adherent, adjacents: newAdjacents });
                }}
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label><strong>Email:</strong></label><br />
              <input
                type="email"
                value={adj.email}
                onChange={(e) => {
                  const updatedAdj = { ...adj, email: e.target.value };
                  const newAdjacents = [...adherent.adjacents];
                  newAdjacents[index] = updatedAdj;
                  setAdherent({ ...adherent, adjacents: newAdjacents });
                }}
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </div>

            <button
              onClick={() => handleAdjacentSave(adj)}
              style={{ padding: "8px 16px", background: "#28a745", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
              Save Changes
            </button>
          </div>
        ))
      ) : (
        <div>No adjacents found.</div>
      )}

      <h3>Enfants</h3>
      {adherent.enfants?.length > 0 ? (
        adherent.enfants.map((enf, index) => (
          <div key={enf.id} style={{ background: "#f9f9f9", borderRadius: "8px", padding: "15px", marginBottom: "15px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
            <div style={{ marginBottom: "10px" }}>
              <label><strong>Name:</strong></label><br />
              <input
                type="text"
                value={enf.name}
                onChange={(e) => {
                  const updatedEnf = { ...enf, name: e.target.value };
                  const newEnfants = [...adherent.enfants];
                  newEnfants[index] = updatedEnf;
                  setAdherent({ ...adherent, enfants: newEnfants });
                }}
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label><strong>Email:</strong></label><br />
              <input
                type="email"
                value={enf.email}
                onChange={(e) => {
                  const updatedEnf = { ...enf, email: e.target.value };
                  const newEnfants = [...adherent.enfants];
                  newEnfants[index] = updatedEnf;
                  setAdherent({ ...adherent, enfants: newEnfants });
                }}
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </div>

            <button
              onClick={() => handleEnfantSave(enf)}
              style={{ padding: "8px 16px", background: "#28a745", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
              Save Changes
            </button>
          </div>
        ))
      ) : (
        <div>No enfants found.</div>
      )}
    </div>
  );
}

export default Profile;
