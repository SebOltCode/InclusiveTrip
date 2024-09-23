import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { UserIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function Navbar() {
  const { userInfo, logout } = useContext(AuthContext);
  document.querySelector("html").setAttribute("data-theme", "light");
  return (
    <nav className="flex space-x-4 items-center">
      <div className="flex space-x-8 ml-8">

        <NavLink to="/" className="text-black">Home</NavLink>
        <NavLink to="/map" className="text-black">Karte</NavLink>
        {userInfo && (
          <>
            <NavLink to="/user" className="text-black">
              User
            </NavLink>
          </>
        )}
        {userInfo ? (
          <NavLink onClick={logout} className="text-black">
            Logout
          </NavLink>
        ) : (
          <>
            <NavLink
              to="login"
              className={({ isActive }) =>
                isActive ? "text-red" : "text-black"
              }
            >
              <UserIcon className="w-6 h-6 mr-2" />
            </NavLink>

            <NavLink
              to="signup"
              className={({ isActive }) =>
                isActive
                  ? "text-slate-200 text-2xl hover:underline hover:underline-offset-4"
                  : " text-2xl hover:underline hover:underline-offset-4"

              }>

            </NavLink>
          </>
        )}
      </div>
      <ul className="flex space-x-6">
        {/* Weitere Navigationselemente können hier hinzugefügt werden */}
      </ul>
    </nav>
  );
}
