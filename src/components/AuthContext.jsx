import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;

  const loginUrl = `${API_URL}/auth/signin`;
  const authMeUrl = `${API_URL}/auth/me`;

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.get(authMeUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setUserInfo(response.data);
      localStorage.setItem("userInfo", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching user data:", error);
      Cookies.remove("token");
      setUserInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Cookies.get("token") && !userInfo) {
      fetchUserInfo();
    } else {
      setLoading(false);
    }
  }, []);

  async function login(loginData) {
    try {
      const response = await axios.post(loginUrl, loginData, {
        withCredentials: true,
      });
      setUserInfo(response.data);
      toast.success("Willkommen zurück!");
      navigate("/map");
    } catch (err) {
      console.error("Login error:", err.response);
      toast.error("Login fehlgeschlagen.");
    }
  }

  return (
    <AuthContext.Provider value={{ userInfo, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
