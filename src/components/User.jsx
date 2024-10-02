import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FetchUserData } from "./FetchUserData";
import { ProfilePhotoUpload } from "./ProfilePhotoUpload";
import { UserProfileForm } from "./UserProfileForm";
import { FetchUserRatings } from "./FetchUserRatings";
import { useNavigate } from "react-router-dom";

function User() {
  const [userData, setUserData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    profilePhoto: "",
  });
  const [profilePhoto, setProfilePhoto] = useState("");
  const [userRatings, setUserRatings] = useState([]);
  const [loading, setLoading] = useState(true); 
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
          setLoading={setLoading} 
        />
        <FetchUserRatings setUserRatings={setUserRatings} />

        {loading ? (
          <p>Loading user data...</p> // Ladeanzeige
        ) : (
          <>
            <div className="flex flex-col md:flex-row items-top justify-center p-4">
              <div className="container mx-auto w-full min-h bg-[#C1DCDC] rounded-[24px] relative">
                <div className="flex flex-col md:flex-row justify-between p-8">
                  <div className="flex flex-col w-full md:w-2/3 text-left">
                    <h1 className="font-poppins font-extrabold text-3xl md:text-5xl lg:text-6xl leading-tight text-black">
                      Profil von {userData.firstName}
                    </h1>
                    <div className="mt-4 text-[#1E1E1E] font-poppins font-medium text-[32px] leading-[48px]">
                      Ändere deine Benutzerdaten und bearbeite deine bereits
                      abgegebenen Bewertungen.
                    </div>
                  </div>
                  <div className="flex items-center justify-end w-full md:w-2/3 mt-4 md:mt-0">
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
          </>
        )}
      </div>

      <h1 className="font-poppins font-bold text-[18px] text-center pt-12 mt-12 text-[#000000]">
        Deine Bewertungen
      </h1>

      {userRatings.map((rating, index) => (
        <div
          key={index}
          className="container mx-auto w-full bg-[#C1DCDC] rounded-[24px] mt-16"
        >
          <div className="w-full text-left p-8">
            <div className="flex items-center justify-between">
              <h1 className="font-poppins font-bold text-[18px] text-[#000000]">
                So hast du {rating.placeName} bewertet:
              </h1>

              <div className="font-poppins font-bold text-[18px] text-[#000000]">
                {" "}
                {new Date(rating.createdAt).toLocaleDateString()}
              </div>
            </div>
            <p className="mt-4 font-poppins font-medium text-[rgba(30,30,30,0.5)] text-left">
              {rating.comment}
            </p>

            <button
              className="btn bg-[#FFD700] border-black w-36 p-2 h-12 min-h-2 m-2 justify-center float-right"
              onClick={() => handleRateClick(rating)}
            >
              mehr lesen
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default User;
