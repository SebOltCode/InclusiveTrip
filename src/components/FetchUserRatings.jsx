import { useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;

export function FetchUserRatings({ setUserRatings }) {
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserRatings = async () => {
      try {
        if (!userInfo) {
          return;
        }

        const token = Cookies.get("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get(`${API_URL}/reviews/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setUserRatings(response.data);
      } catch (error) {
        console.error("Error fetching user ratings:", error);
        toast.error("Fehler beim Laden der Bewertungen.");
      }
    };

    fetchUserRatings();
  }, [userInfo, setUserRatings]);

  return null;
}
