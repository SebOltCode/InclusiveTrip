import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;

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
  const [isDeleting, setIsDeleting] = useState(false);
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userInfo || !userInfo.token) {
          throw new Error("No user info or token found");
        }

        const response = await axios.get(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
          withCredentials: true,
        });
        setUserData(response.data);
        setProfilePhoto(response.data.profilePhoto);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Fehler beim Laden der Benutzerdaten.");
      }
    };

    const fetchUserRatings = async () => {
      try {
        if (!userInfo) {
          return;
        }

        const token = Cookies.get("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get(`${API_URL}/reviews/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setUserRatings(response.data);
      } catch (error) {
        console.error("Error fetching user ratings:", error);
        toast.error("Fehler beim Laden der Bewertungen.");
      }
    };

    fetchUserData();
    fetchUserRatings();
  }, [userInfo]);

  const handleRateClick = (rating) => {
    navigate(`/review-edit/${rating.id}`, { state: { rating: rating } });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    if (!token) {
      console.error("No token found");
      return;
    }

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

  const onDrop = async (acceptedFiles) => {
    const token = Cookies.get("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    try {
      const response = await axios.post(
        `${API_URL}/profilePhotos/${userData.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setProfilePhoto(response.data.profilePhoto);
      console.log("Profilfoto erfolgreich hochgeladen:", response.data);
    } catch (error) {
      console.error("Fehler beim Hochladen des Profilfotos:", error);
    }
  };

  const deleteProfilePhoto = async () => {
    const token = Cookies.get("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    setIsDeleting(true);

    try {
      await axios.delete(`${API_URL}/profilePhotos/${userData.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setProfilePhoto("");
    } catch (error) {
      console.error("Fehler beim Löschen des Profilfotos:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <div>
        <ToastContainer />
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
                <div className="relative w-1/3 md:w-1/4">
                  {profilePhoto ? (
                    <div className="relative">
                      <img
                        src={profilePhoto}
                        alt="Profilfoto"
                        className="w-full h-auto rounded-[24px]"
                      />
                      <button
                        onClick={deleteProfilePhoto}
                        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2 btn bg-red-500 text-white ${
                          isDeleting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={isDeleting}
                      >
                        {isDeleting ? "Löschen..." : "Profilfoto löschen"}
                      </button>
                    </div>
                  ) : (
                    <div
                      {...getRootProps()}
                      className="flex flex-col items-center justify-center border-dashed border-2 border-gray-400 rounded-[24px] p-4 cursor-pointer"
                    >
                      <input {...getInputProps()} name="file" />
                      <p>Profilfoto hochladen</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center mt-8">
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
        </div>
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