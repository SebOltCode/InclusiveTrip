import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FetchUserData } from "./FetchUserData";
import { ProfilePhotoUpload } from "./ProfilePhotoUpload";
import { UserProfileForm } from "./UserProfileForm";
import { FetchUserRatings } from "./FetchUserRatings";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function User() {
  const { t } = useTranslation();
  const [userData, setUserData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    profilePhoto: "",
  });
  const [profilePhoto, setProfilePhoto] = useState("");
  const [userRatings, setUserRatings] = useState([]);
  const navigate = useNavigate();

  const handleRateClick = (rating) => {
    navigate(`/review-edit/${rating.id}`, { state: { rating: rating } });
  };

  return (
    <>
      <div>
        <ToastContainer />
        <FetchUserData
          setUserData={setUserData}
          setProfilePhoto={setProfilePhoto}
        />
        <FetchUserRatings setUserRatings={setUserRatings} />

        <div className="flex flex-col md:flex-row items-top justify-center p-4">
          <div className="container mx-auto w-full min-h bg-[#C1DCDC] rounded-[24px] relative">
            <div className="flex flex-col md:flex-row justify-between p-4 sm:p-8">
              <div className="flex flex-col w-full md:w-2/3 text-left">
                <h1 className="font-poppins font-extrabold text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-tight text-black">
                  {t("usersection.profile_of")} {userData.firstName}
                </h1>
                <div className="mt-4 text-[#1E1E1E] font-poppins font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight">
                  {t("usersection.change_user_data")}
                </div>
              </div>
              <div className="flex items-center justify-center w-full md:w-1/3 mt-4 md:mt-0">
                <ProfilePhotoUpload
                  userData={userData}
                  profilePhoto={profilePhoto}
                  setProfilePhoto={setProfilePhoto}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center mt-8">
          <UserProfileForm userData={userData} setUserData={setUserData} />
        </div>
      </div>

      <h1 className="font-poppins font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-center pt-12 mt-12 text-[#000000]">
        {t("usersection.your_ratings")}
      </h1>

      {userRatings.map((rating, index) => (
        <div
          key={index}
          className="container mx-auto w-full bg-[#C1DCDC] rounded-[24px] mt-8 sm:mt-16 p-4 sm:p-8"
        >
          <div className="w-full text-left">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <h1 className="font-poppins font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#000000]">
                {t("usersection.you_rated")} {rating.placeName}:
              </h1>
              <div className="font-poppins font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#000000]">
                {new Date(rating.createdAt).toLocaleDateString()}
              </div>
            </div>
            <p className="mt-4 font-poppins font-medium text-[rgba(30,30,30,0.5)] text-left">
              {rating.comment}
            </p>

            <button
              className="btn bg-[#FFD700] border-black w-full sm:w-36 p-2 h-12 min-h-2 mt-4 sm:mt-2 justify-center"
              onClick={() => handleRateClick(rating)}
            >
              {t("usersection.read_more")}
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default User;
