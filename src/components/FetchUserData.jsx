import { useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;

export function FetchUserData({ setUserData, setProfilePhoto }) {
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userInfo) {
          return;
        }

        const token = Cookies.get("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setUserData(response.data);
        setProfilePhoto(response.data.profilePhoto);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Fehler beim Laden der Benutzerdaten.");
      }
    };

    fetchUserData();
  }, [userInfo]);

  return null;
}
