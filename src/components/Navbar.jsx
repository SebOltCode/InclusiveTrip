import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { UserIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { userInfo, logout } = useContext(AuthContext);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="h-auto bg-white z-10">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between h-full px-4 lg:px-8">
        <div className="flex items-center lg:order-1">
          <NavLink to="/" href="index.html">
            <img
              className="lg:block w-3/5 sm:w-3/5 h-auto -top-4 sm:-top-8"
              src="./images/Logo.png"
              alt="Logo"
            />
          </NavLink>
        </div>
        {userInfo && (
          <div className="flex flex-col lg:flex-row items-center lg:ml-8 mr-10 lg:mr-0 text-left lg:text-left lg:order-2">
            <p className="lg:text-2xl font-semibold p-2">
              {t("welcome")} {userInfo.firstName}
            </p>
          </div>
        )}
        <nav className="flex flex-row space-x-4 items-center lg:ml-auto lg:order-3">
          <NavLink to="/" className="text-black underline mt-2 lg:mt-0">
            {t("home")}
          </NavLink>
          <NavLink to="/map" className="text-black underline mt-2 lg:mt-0">
            {t("maplink")}
          </NavLink>
          {userInfo && (
            <>
              <NavLink to="/user" className="text-black underline mt-2 lg:mt-0">
                {t("user")}
              </NavLink>
              <NavLink
                onClick={logout}
                className="text-black underline mt-2 lg:mt-0"
              >
                {t("logout")}
              </NavLink>
            </>
          )}
          {!userInfo && (
            <NavLink to="/login" className="text-black underline mt-2 lg:mt-0">
              <UserIcon className="w-6 h-6 mr-1 lg:mr-2" />
            </NavLink>
          )}
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            className="ml-4"
          >
            <option value="de">Deutsch</option>
            <option value="en">English</option>
            <option value="pt">Português</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
            <option value="ar">العربية</option>
            <option value="tr">Türkçe</option>
            <option value="uk">Українська</option>
            <option value="ru">Русский</option>
            <option value="it">Italiano</option>
            <option value="pl">Polski</option>
            <option value="sv">Svenska</option>
            <option value="no">Norsk</option>
            <option value="ja">日本語</option>
            <option value="zh-CN">简体中文</option>
            <option value="th">ไทย</option>
            <option value="hi">हिन्दी</option>
            <option value="id">Bahasa Indonesia</option>
          </select>
        </nav>
      </div>
    </header>
  );
}
