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
        // function getCookie(name) {
        // const value = `; ${document.cookie}`;
        // const parts = value.split(`; ${name}=`);
        // if (parts.length === 2) return parts.pop().split(';').shift();
        // return null;
    }
    if (!token) {


        const tokenFromCookies = getCookie('token');
        console.log(tokenFromCookies);
        if (!tokenFromCookies) {
            throw new Error("No token found in create review from get cookie");
        }

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
