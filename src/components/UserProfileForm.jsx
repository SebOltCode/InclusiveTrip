import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;

export function UserProfileForm({ userData, setUserData }) {
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = Cookies.get("token");

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
      toast.success(t("userProfileForm.update_success"));
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start gap-2 w-full">
          <label
            htmlFor="username"
            className="text-center w-full text-lg sm:text-xl font-bold leading-[140%] text-[#1E1E1E]"
          >
            {t("userProfileForm.personal_data")}
          </label>
        </div>

        <div className="flex flex-col items-start gap-2 w-full">
          <label
            htmlFor="firstName"
            className="w-full text-sm sm:text-base font-normal leading-[140%] text-[#1E1E1E]"
          >
            {t("userProfileForm.first_name")}
          </label>
          <input
            className="flex items-center px-4 py-3 w-full bg-white border border-[#D9D9D9] rounded-lg"
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col items-start gap-2 w-full">
          <label
            htmlFor="lastName"
            className="w-full text-sm sm:text-base font-normal leading-[140%] text-[#1E1E1E]"
          >
            {t("userProfileForm.last_name")}
          </label>
          <input
            className="flex items-center px-4 py-3 w-full bg-white border border-[#D9D9D9] rounded-lg"
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col items-start gap-2 w-full">
          <label
            htmlFor="email"
            className="w-full text-sm sm:text-base font-normal leading-[140%] text-[#1E1E1E]"
          >
            {t("userProfileForm.email")}
          </label>
          <input
            className="flex items-center px-4 py-3 w-full bg-white border border-[#D9D9D9] rounded-lg"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mt-8 flex justify-center items-center">
        <button
          type="submit"
          className="px-8 py-3 bg-[#FFD700] border border-[#2C2C2C] rounded-lg"
        >
          {t("userProfileForm.save_changes")}
        </button>
      </div>
    </form>
  );
}
