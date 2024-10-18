import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useDropzone } from "react-dropzone";

const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;

export function ProfilePhotoUpload({
  userData,
  profilePhoto,
  setProfilePhoto,
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const onDrop = async (acceptedFiles) => {
    let token = Cookies.get("token");

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
    let token = Cookies.get("token");

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
            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2 btn bg-transparent hover:bg-red-800 text-white ${isDeleting ? "opacity-50 cursor-not-allowed" : ""}`}
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
  );
}
