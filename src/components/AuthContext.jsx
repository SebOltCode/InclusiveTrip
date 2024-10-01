import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer, } from "react-toastify";
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
      const response = await axios.get(authMeUrl, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        withCredentials: true,
      });
      setUserInfo(response.data);
      localStorage.setItem("userInfo", JSON.stringify(response.data));
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
      setShouldFetch((prev) => !prev); 
      toast.success("Willkommen zurück!");
      await fetchUserInfo();
      navigate("/map");
      
      
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;
        console.error(
          `Error ${status}: ${data.message || "Unbekannter Fehler, bitte versuchen Sie es später erneut."}`
        );
        if (data.errors) {
          const validationErrors = data.errors.map((error) => ({
            field: error.field,
            message: error.message,
          }));
  
          console.error("Validation errors:", validationErrors);
        } else {
          console.error(
            `Error message: ${data.message || "Unbekannter Fehler, bitte versuchen Sie es später erneut."}`
          );
        }
      } else {
        console.error("Login error:", err.message);
      }
  
      Cookies.remove("token");
      setUserInfo(null);
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
      <ToastContainer />
      {children}
    </AuthContext.Provider>
  );
};