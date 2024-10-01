import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;

  const loginUrl = `${API_URL}/auth/signin`;
  const signupUrl = `${API_URL}/auth/register`;
  const authMeUrl = `${API_URL}/auth/me`;

  const [userInfo, setUserInfo] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(false);
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(authMeUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setUserInfo(response.data);
      localStorage.setItem("userInfo", JSON.stringify({...response.data, token }));
    } catch (error) {
      console.error("Error fetching user data:", error);
      Cookies.remove("token");
      setUserInfo(null);
    }
  };
  
  useEffect(() => { 
    if (Cookies.get("token") && (shouldFetch || !userInfo)) {
      fetchUserInfo(); 
    }
  }, [shouldFetch]);
  
  async function login(loginData) {
    try {
      const response = await axios.post(loginUrl, loginData, {
        withCredentials: true,
      });
  
      console.log("Login successful:", response);
  
     
      const token = response.data.token || Cookies.get("token");
  
      if (token) {
        
        setUserInfo({ ...response.data.user, token });
        localStorage.setItem("userInfo", JSON.stringify({ ...response.data.user, token }));
        Cookies.set("token", token, { path: "/", domain: window.location.hostname });
      } else {
        throw new Error("No token found in login response.");
      }
  
      navigate("/map");
    } catch (err) {
      console.error("Login error:", err.message);
      setUserInfo(null);
      Cookies.remove("token");
    }
  }
  
  
  function logout() {
    Cookies.remove("token", { path: "/", domain: window.location.hostname });
    localStorage.removeItem("userInfo");
    setUserInfo(null);
    setShouldFetch(false);
    console.log("Logout successful, userInfo and token removed.");
    navigate("/login");
  }

  function signup(userData) {
    axios
      .post(signupUrl, userData)
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        setUserInfo(null);
      });
  }

  return (
    
    <AuthContext.Provider
    
      value={{
        userInfo,
        setUserInfo,
        login,
        logout,
        signup,
      }}
    >
     
      {children}
    </AuthContext.Provider>
  );
};