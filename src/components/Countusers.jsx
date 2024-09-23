import { useState, useEffect } from "react";
import axios from "axios";

export default function Countusers() {
  const [users, setUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;
  const usersCountUrl = `${API_URL}/users/count`;
  useEffect(() => {
    async function fetchUsers() {
      try {
        // API-Anfrage zum Abrufen aller Users
        const response = await axios.get(usersCountUrl); // URL anpassen, falls erforderlich

        setUsers(response.data); // Setze alle Users in den State
      } catch (error) {
        console.error("Fehler beim Abrufen der User-Daten:", error);
        setError("Fehler beim Abrufen der User-Daten");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div>
      {loading ? (
        "Laden..."
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div>
          <p>{users}</p>
        </div>
      )}
    </div>
  );
}
