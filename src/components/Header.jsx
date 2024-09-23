import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import React from "react";
import Navbar from "./Navbar";

export default function Header() {
  const { userInfo, logout } = useContext(AuthContext);
  document.querySelector("html").setAttribute("data-theme", "light");
  return (
    <header className="h-[126px] bg-white z-10">
      <div className="container mx-auto flex items-center justify-between h-full px-4 lg:px-8">
        <div className="flex items-center">
          <NavLink to="/" href="index.html">
            <img
              className="w-[206px] h-[44px]"
              src="./images/Logo.png"
              alt="Logo"
            />
          </NavLink>
        </div>
        {userInfo && (
          <div>
            <p className="text-2xl font-semibold p-2">
              Willkommen {userInfo.firstName}
            </p>
          </div>
        )}
        <Navbar />
      </div>
    </header>
  );
}