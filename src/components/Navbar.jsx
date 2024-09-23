import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { UserIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function Navbar() {
  const { userInfo, logout, setUserInfo } = useContext(AuthContext);

  console.log("Navbar userInfo: ", userInfo);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo && !userInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
    console.log("Navbar userInfo after effect: ", userInfo); // Debugging
  }, [userInfo, setUserInfo]);
  
  // Füge diesen zusätzlichen Effekt hinzu, um userInfo-Änderungen direkt zu überwachen
  useEffect(() => {
    if (userInfo) {
      console.log("User Info Updated in Navbar: ", userInfo); // Debugging
    }
  }, [userInfo]);
  

  return (
    <header className="h-[126px] bg-white z-10">
      <div className="container mx-auto flex items-center justify-between h-full px-4 lg:px-8">
        <div className="flex items-center">
          <NavLink to="/" href="index.html">
            <img className="w-[206px] h-[44px]" src="./images/Logo.png" alt="Logo" />
          </NavLink>
        </div>
        {userInfo && (
          <div>
            <p className="text-2xl font-semibold p-2">
              Willkommen {userInfo.firstName}
            </p>
          </div>
        )}
        <nav className="flex space-x-4 items-center">
          <div className="flex space-x-8 ml-8">
            <NavLink to="/" className="text-black">Home</NavLink>
            <NavLink to="/map" className="text-black">Karte</NavLink>
            {userInfo && (
              <>
                <NavLink to="/user" className="text-black">User</NavLink>
                <NavLink onClick={logout} className="text-black">Logout</NavLink>
              </>
            )}
            {!userInfo && (
              <>
                <NavLink to="/login" className="text-black">
                  <UserIcon className="w-6 h-6 mr-2" />
                </NavLink>
                <NavLink to="/signup" className="text-black">Signup</NavLink>
              </>
            )}
          </div>
          <ul className="flex space-x-6">
            {/* Weitere Navigationselemente können hier hinzugefügt werden */}
          </ul>
        </nav>
      </div>
    </header>
  );
}
