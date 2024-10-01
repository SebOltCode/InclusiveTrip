import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;

export function FetchUserData({ setUserData, setProfilePhoto }) {
  const { userInfo, setUserInfo } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let storedUserInfo = userInfo;

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
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Fehler beim Laden der Benutzerdaten.");
      }
    };

    fetchUserData();
  }, [userInfo, setUserInfo, setUserData, setProfilePhoto]);

  return null;
}
