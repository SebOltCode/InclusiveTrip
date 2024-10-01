import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;

export function FetchUserData({ setUserData, setProfilePhoto }) {
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let storedUserInfo = userInfo;

        console.log("Initial userInfo:", storedUserInfo);

        if (!storedUserInfo) {
          const localStorageUserInfo = localStorage.getItem("userInfo");
          console.log("LocalStorage userInfo:", localStorageUserInfo);
          if (localStorageUserInfo) {
            storedUserInfo = JSON.parse(localStorageUserInfo);
            setUserInfo(storedUserInfo);
          }
        }

        if (!storedUserInfo || !storedUserInfo.token) {
          throw new Error("No user information or token found");
        }

        console.log("Using token:", storedUserInfo.token);

        const response = await axios.get(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${storedUserInfo.token}`,
          },
          withCredentials: true,
        });

        setUserData(response.data);
        setProfilePhoto(response.data.profilePhoto);
        setLoading(false); // Daten erfolgreich abgerufen
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Fehler beim Laden der Benutzerdaten.");
        setLoading(false);
      }
    };

    // Abrufen der Daten nur ausführen, wenn der AuthContext initialisiert ist
    if (userInfo || localStorage.getItem("userInfo")) {
      fetchUserData();
    } else {
      setLoading(false); // Stoppe das Laden, wenn keine Daten vorhanden sind
    }
  }, [userInfo, setUserInfo, setUserData, setProfilePhoto]);

  if (loading) {
    return <p>Loading user data...</p>; // Ladeanzeige, während auf Daten gewartet wird
  }

  return null; // Keine Anzeige, wenn das Laden abgeschlossen ist
}
