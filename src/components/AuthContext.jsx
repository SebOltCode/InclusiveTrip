import { createContext, useState, useEffect, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState(null);
  // true until the initial session check is done, so protected routes don't redirect too early
  const [authLoading, setAuthLoading] = useState(true);

  const refreshUserInfo = useCallback(async () => {
    try {
      const response = await api.get("/auth/me");
      setUserInfo(response.data);
      return response.data;
    } catch {
      setUserInfo(null);
      return null;
    }
  }, []);

  useEffect(() => {
    refreshUserInfo().finally(() => setAuthLoading(false));
  }, [refreshUserInfo]);

  async function login(loginData) {
    try {
      const response = await api.post("/auth/signin", loginData);
      setUserInfo(response.data);
      toast.success(t("auth.welcome_back"));
      return true;
    } catch (err) {
      const status = err.response?.status;
      if (status === 401) {
        toast.error(t("auth.invalid_credentials"));
      } else if (status === 403) {
        toast.error(t("auth.account_blocked"));
      } else {
        toast.error(t("auth.generic_error"));
      }
      console.error("Login error:", err);
      setUserInfo(null);
      return false;
    }
  }

  async function logout() {
    try {
      await api.delete("/auth/signout");
    } catch (err) {
      console.error("Logout error:", err);
    }
    setUserInfo(null);
    toast.info(t("auth.goodbye"));
  }

  // Throws on failure, so the caller can show the matching message
  async function signup(userData) {
    await api.post("/auth/register", userData);
  }

  return (
    <AuthContext.Provider
      value={{ userInfo, setUserInfo, authLoading, login, logout, signup, refreshUserInfo }}
    >
      <ToastContainer />
      {children}
    </AuthContext.Provider>
  );
};
