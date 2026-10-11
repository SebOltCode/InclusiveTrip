import { useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import api, { getErrorMessage } from "../utils/api";
import { AuthContext } from "./AuthContext";

export function ProfilePhotoUpload() {
  const { t } = useTranslation();
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const [isBusy, setIsBusy] = useState(false);

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    setIsBusy(true);
    try {
      const response = await api.post(`/profilePhotos/${userInfo.id}`, formData);
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error uploading profile photo:", error);
      toast.error(getErrorMessage(error));
    } finally {
      setIsBusy(false);
    }
  };

  const deleteProfilePhoto = async () => {
    setIsBusy(true);
    try {
      await api.delete(`/profilePhotos/${userInfo.id}`);
      setUserInfo({ ...userInfo, profilePhoto: null });
    } catch (error) {
      console.error("Error deleting profile photo:", error);
      toast.error(getErrorMessage(error));
    } finally {
      setIsBusy(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/jpeg": [], "image/png": [] },
  });

  return (
    <div className="relative w-1/3 md:w-1/4">
      {userInfo.profilePhoto ? (
        <div className="relative">
          <img
            src={userInfo.profilePhoto}
            alt={t("profilePhoto.alt")}
            className="w-full h-auto rounded-[24px]"
          />
          <button
            onClick={deleteProfilePhoto}
            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2 btn bg-transparent hover:bg-red-800 text-white ${isBusy ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isBusy}
          >
            {isBusy ? t("profilePhoto.deleting") : t("profilePhoto.delete")}
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="flex flex-col items-center justify-center border-dashed border-2 border-gray-400 rounded-[24px] p-4 cursor-pointer"
        >
          <input {...getInputProps()} name="file" />
          <p>{isBusy ? t("common.loading") : t("profilePhoto.upload")}</p>
        </div>
      )}
    </div>
  );
}
