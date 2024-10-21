import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;

  const loginUrl = `${API_URL}/auth/signin`;
  const signupUrl = `${API_URL}/auth/register`;
  const authMeUrl = `${API_URL}/auth/me`;

  const [userInfo, setUserInfo] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(false);
  const navigate = useNavigate();

  let token = Cookies.get("token");

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(authMeUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      Cookies.remove("token");
      setUserInfo(null);
    }
  };

  useEffect(() => {
    if (token && (shouldFetch || !userInfo)) {
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
      await fetchUserInfo();

      toast.success("Willkommen zurück!");
      navigate("/map");
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;
        toast.error(
          "Upps, das hätte nicht passieren sollen. Bitte versuche es später nochmal."
        );
        console.error(
          `Error ${status}: ${data.message || "Unbekannter Fehler, bitte versuchen Sie es später erneut."}`
        );
        if (data.errors) {
          const validationErrors = data.errors.map((error) => ({
            field: error.field,
            message: error.message,
          }));
          toast.error(
            `Validation error: ${validationErrors.map((e) => e.message).join(", ")}`
          );
          console.error("Validation errors:", validationErrors);
        } else {
          toast.error(
            "Upps, das hätte nicht passieren sollen. Bitte versuche es später nochmal."
          );
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
    Cookies.remove("token");
    setUserInfo(null);
    setShouldFetch(false);
    console.log("Logout successful, userInfo and token removed.");
    navigate("/home");
    toast.info("Auf Wiedersehen!");
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
    <AuthContext.Provider value={{ userInfo, login, logout }}>
      <ToastContainer />
      {children}
    </AuthContext.Provider>
  );
};
