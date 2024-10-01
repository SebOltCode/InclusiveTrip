import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;

export function FetchUserData({ setUserData, setProfilePhoto }) {
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let storedUserInfo = userInfo;

        console.log("Initial userInfo:", storedUserInfo);

       
        if (!storedUserInfo?.token) {
          console.log("No token found in userInfo. Trying localStorage or cookies.");
          
        
          const localStorageUserInfo = localStorage.getItem("userInfo");
          const tokenFromCookie = Cookies.get("token");
          console.log("Token from Cookie:", tokenFromCookie);
          
          if (localStorageUserInfo) {
            storedUserInfo = JSON.parse(localStorageUserInfo);
            setUserInfo(storedUserInfo);
          } else if (tokenFromCookie) {
            storedUserInfo = { ...storedUserInfo, token: tokenFromCookie };
            console.log("Using token from Cookie:", tokenFromCookie);
          } else {
            throw new Error("No token found in userInfo, localStorage, or cookies.");
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

        console.log("API response:", response);

        setUserData(response.data);
        setProfilePhoto(response.data.profilePhoto);
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching user data:", error.response || error);
        toast.error("Fehler beim Laden der Benutzerdaten.");
        setLoading(false);
      }
    };

    
    if (userInfo || localStorage.getItem("userInfo")) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo, setUserData, setProfilePhoto]);

  if (loading) {
    return <p>Loading user data...</p>;
  }

  return null;
}
