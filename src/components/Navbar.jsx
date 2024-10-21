import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { UserIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function Navbar() {
  const { userInfo, logout } = useContext(AuthContext);

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
              Willkommen {userInfo.firstName}
            </p>
          </div>
        )}
        <nav className="flex flex-row space-x-4 items-center lg:ml-auto lg:order-3">
          <NavLink to="/" className="text-black underline mt-2 lg:mt-0">
            Home
          </NavLink>
          <NavLink to="/map" className="text-black underline mt-2 lg:mt-0">
            Karte
          </NavLink>
          {userInfo && (
            <>
              <NavLink to="/user" className="text-black underline mt-2 lg:mt-0">
                User
              </NavLink>
              <NavLink
                onClick={logout}
                className="text-black underline mt-2 lg:mt-0"
              >
                Logout
              </NavLink>
            </>
          )}
          {!userInfo && (
            <NavLink to="/login" className="text-black underline mt-2 lg:mt-0">
              <UserIcon className="w-6 h-6 mr-1 lg:mr-2" />
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
