import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { UserIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { userInfo, logout } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const languageMap = {
    de: "Deutsch",
    en: "English",
    pt: "Português",
    fr: "Français",
    es: "Español",
    ar: "العربية",
    tr: "Türkçe",
    uk: "Українська",
    ru: "Русский",
    it: "Italiano",
    pl: "Polski",
    sv: "Svenska",
    no: "Norsk",
    ja: "日本語",
    "zh-CN": "简体中文",
    th: "ไทย",
    hi: "हिन्दी",
    id: "Bahasa Indonesia",
  };

  const getLanguageLabel = (lng) => {
    return languageMap[lng];
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
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="ml-4 bg-white border border-gray-300 rounded-lg px-4 py-2"
            >
              {i18n.language.toUpperCase()}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <ul className="max-h-60 overflow-y-auto">
                  {Object.keys(languageMap).map((lng) => (
                    <li
                      key={lng}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => changeLanguage(lng)}
                    >
                      {getLanguageLabel(lng)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
