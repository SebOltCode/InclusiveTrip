import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { UserIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function Navbar() {
  const { userInfo, logout } = useContext(AuthContext);

  return (
    <header className="h-auto bg-white z-10">
      <div className="container mx-auto flex items-center justify-between h-full px-4 lg:px-8">
        <div className="flex items-center">
          <NavLink to="/" href="index.html">
            <img
              className="w-3/5 sm:w-2/5 h-auto"
              src="./images/Logo.png"
              alt="Logo"
            />
          </NavLink>
        </div>
        {userInfo && (
          <div className="flex-1 lg:flex-none lg:ml-8 mr-10 lg:mr-0 text-left lg:text-left">
            <p className="text-xl lg:text-2xl font-semibold p-2">
              Willkommen {userInfo.firstName}
            </p>
          </div>
        )}
        <nav className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 items-center lg:ml-auto">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 ml-0 sm:ml-8 mr-4">
            <NavLink to="/" className="text-black underline mt-2 sm:mt-0">
              Home
            </NavLink>
            <NavLink to="/map" className="text-black underline mt-2 sm:mt-0">
              Karte
            </NavLink>
            {userInfo && (
              <>
                <NavLink
                  to="/user"
                  className="text-black underline mt-2 sm:mt-0"
                >
                  User
                </NavLink>
                <NavLink
                  onClick={logout}
                  className="text-black underline mt-2 sm:mt-0"
                >
                  Logout
                </NavLink>
              </>
            )}
            {!userInfo && (
              <>
                <NavLink
                  to="/login"
                  className="text-black underline mt-2 sm:mt-0"
                >
                  <UserIcon className="w-6 h-6 mr-1 sm:mr-2" />
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
