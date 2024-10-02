import { useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;

export function FetchUserData({ setUserData, setProfilePhoto, setLoading }) {
  const { userInfo, setUserInfo } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let storedUserInfo = userInfo;

        if (!storedUserInfo) {
          const localStorageUserInfo = localStorage.getItem("userInfo");
          if (localStorageUserInfo) {
            storedUserInfo = JSON.parse(localStorageUserInfo);
            setUserInfo(storedUserInfo);
          }
        }

        const tokenFromCookie = Cookies.get("token");

        if (!storedUserInfo?.token && !tokenFromCookie) {
          throw new Error("No token found.");
        }

        const token = storedUserInfo?.token || tokenFromCookie;
        console.log("Using token:", token);

        const response = await axios.get(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setUserData(response.data);
        setProfilePhoto(response.data.profilePhoto);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Fehler beim Laden der Benutzerdaten.");
        setLoading(false);
      }
    };

    if (userInfo || localStorage.getItem("userInfo") || Cookies.get("token")) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo, setUserData, setProfilePhoto, setLoading]);

  return null;
}
