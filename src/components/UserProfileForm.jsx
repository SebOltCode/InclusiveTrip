import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import api, { getErrorMessage } from "../utils/api";
import { AuthContext } from "./AuthContext";

export function UserProfileForm() {
  const { t } = useTranslation();
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "" });

  useEffect(() => {
    setFormData({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
    });
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Only the editable profile fields are sent; role, password etc. stay untouched
      const response = await api.put(`/users/${userInfo.id}`, formData);
      setUserInfo(response.data);
      toast.success(t("userProfileForm.update_success"));
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-4">
      <div className="flex flex-col gap-4">
        <h2 className="text-center w-full text-lg sm:text-xl font-bold leading-[140%] text-[#1E1E1E]">
          {t("userProfileForm.personal_data")}
        </h2>

        {["firstName", "lastName", "email"].map((field) => (
          <div key={field} className="flex flex-col items-start gap-2 w-full">
            <label
              htmlFor={field}
              className="w-full text-sm sm:text-base font-normal leading-[140%] text-[#1E1E1E]"
            >
              {t(
                {
                  firstName: "userProfileForm.first_name",
                  lastName: "userProfileForm.last_name",
                  email: "userProfileForm.email",
                }[field]
              )}
            </label>
            <input
              className="flex items-center px-4 py-3 w-full bg-white border border-[#D9D9D9] rounded-lg"
              type={field === "email" ? "email" : "text"}
              id={field}
              name={field}
              required
              value={formData[field]}
              onChange={handleChange}
            />
          </div>
        ))}
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
