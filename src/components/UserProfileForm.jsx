import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;

export function UserProfileForm({ userData, setUserData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  // function getCookie(name) {
  //     const value = `; ${document.cookie}`;
  //     const parts = value.split(`; ${name}=`);
  //     if (parts.length === 2) return parts.pop().split(';').shift();
  //     return null;
  //   }
  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = Cookies.get("token");
    
  // if (!token) {
  //     token = getCookie('token');
  //     if (!token) {
  //       console.error("No token found");
  //     return;
  //     }

  //   }

  
    const {
      firstName,
      lastName,
      email,
      password,
      roleId,
      profilePhoto,
      blocked,
    } = userData;
    const userDataToUpdate = {
      firstName,
      lastName,
      email,
      password,
      roleId,
      profilePhoto,
      blocked,
    };

    try {
      const response = await axios.put(
        `${API_URL}/users/${userData.id}`,
        userDataToUpdate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setUserData(response.data);
      console.log("User data updated successfully:", response.data);
      toast.success("Benutzerdaten erfolgreich aktualisiert.");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row gap-4">
        <div className="flex-1 p-4">
          <div className="flex flex-col items-start gap-2 w-[487px] h-[50px]">
            <label
              htmlFor="username"
              className="text-center w-full h-[22px] text-[20px] font-bold leading-[140%] text-[#1E1E1E]"
            >
              Persönliche Daten
            </label>
                      </div>

          <div className="flex flex-col items-start gap-2 w-[487px] h-[70px]">
            <label
              htmlFor="firstName"
              className="w-full h-[22px] text-[16px] font-normal leading-[140%] text-[#1E1E1E]"
            >
              Vorname
            </label>
            <input
              className="flex items-center px-4 py-3 w-[487px] min-w-[240px] h-[40px] bg-white border border-[#D9D9D9] rounded-lg"
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col items-start gap-2 w-[487px] h-[70px]">
            <label
              htmlFor="lastName"
              className="mt-6 w-full h-[22px] text-[16px] font-normal leading-[140%] text-[#1E1E1E]"
            >
              Nachname
            </label>
            <input
              className="flex items-center px-4 py-3 w-[487px] min-w-[240px] h-[40px] bg-white border border-[#D9D9D9] rounded-lg"
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
            />
          </div>

                    <div className="flex flex-col items-start gap-2 w-[487px] h-[70px]">
            <label
              htmlFor="email"
              className="mt-12 w-full h-[22px] text-[16px] font-normal leading-[140%] text-[#1E1E1E]"
            >
              Email
            </label>
            <input
              className="flex items-center px-4 py-3 w-[487px] min-w-[240px] h-[40px] bg-white border border-[#D9D9D9] rounded-lg"
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="ml-4 mt-16 flex justify-center items-center px-4 py-3 w-[487px] h-[40px] bg-[#FFD700] border border-[#2C2C2C] rounded-lg">
        <button type="submit">Änderungen speichern</button>
      </div>
    </form>
  );
}
