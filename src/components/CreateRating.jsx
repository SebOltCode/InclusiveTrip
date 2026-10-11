import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import api, { getErrorMessage } from "../utils/api";
import { usePlaceFromUrl } from "../utils/placeUrl";
import {
  createReview,
  createBarrierReviews,
  uploadReviewPhotos,
} from "../utils/reviewHandler";

const MAX_FILES = 5;
const MAX_COMMENT_LENGTH = 255;
const STARS = [1, 2, 3, 4, 5];

function CreateRating() {
  const { t } = useTranslation();
  const { place, categoryId } = usePlaceFromUrl();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [barriers, setBarriers] = useState([]);
  const [selectedBarriers, setSelectedBarriers] = useState([]);
  const [barriersReviews, setBarriersReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const placeName = place.name || t("placeMarker.unnamed_place");

  useEffect(() => {
    api
      .get("/barriers/selected")
      .then((response) => setBarriers(response.data))
      .catch((error) => console.error(error));
  }, []);

  const previews = useMemo(() => files.map((file) => URL.createObjectURL(file)), [files]);
  useEffect(() => () => previews.forEach((url) => URL.revokeObjectURL(url)), [previews]);

  const handleBarrierReviewChange = (barrierId, rating) => {
    setBarriersReviews((prev) =>
      prev.map((item) => (item.barrierId === barrierId ? { ...item, rating } : item))
    );
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length + files.length > MAX_FILES) {
        setMessage(t("createRating.errorMessage.maxFiles"));
        return;
      }
      setMessage("");
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    },
    [files, t]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setMessage(t("createRating.errorMessage.emptyComment"));
      return;
    }
    if (!categoryId) {
      toast.error(t("auth.generic_error"));
      return;
    }

    setIsSubmitting(true);
    let reviewId;
    try {
      reviewId = await createReview({
        placeName,
        placeId: place.id,
        comment: comment.trim(),
        placeCategoryId: categoryId,
      });
      await createBarrierReviews(barriersReviews, reviewId);
    } catch (error) {
      console.error("Error creating review:", error);
      toast.error(getErrorMessage(error));
      setIsSubmitting(false);
      return;
    }

    if (files.length > 0) {
      try {
        await uploadReviewPhotos(files, reviewId);
      } catch (error) {
        console.error(error);
        toast.error(t("createRating.errorMessage.uploadError"));
      }
    }
    toast.success(t("createRating.successMessage"));
    navigate("/user");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setBarriersReviews(
      barriers
        .filter((barrier) => selectedBarriers.includes(barrier.id))
        .map((barrier) => ({
          barrierId: barrier.id,
          rating: barriersReviews.find((r) => r.barrierId === barrier.id)?.rating ?? 3,
        }))
    );
  };

  const handleCheckboxChange = (e) => {
    const barrierId = Number(e.target.value);
    setSelectedBarriers((prev) =>
      e.target.checked ? [...prev, barrierId] : prev.filter((id) => id !== barrierId)
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  return (
    <div className="p-4 md:p-8 w-full overflow-x-hidden">
      <div className="flex flex-col md:flex-row items-top p-4">
        <div className="container mx-auto w-full bg-[#C1DCDC] rounded-[24px] relative">
          <div className="flex flex-col md:flex-row w-full p-8">
            <div className="flex flex-col w-full md:w-2/3 text-left">
              <h1 className="font-poppins font-extrabold text-3xl md:text-5xl lg:text-6xl leading-tight text-black">
                {t("createRating.title")}
              </h1>
              <div className="mt-4 text-[#1E1E1E] font-poppins font-medium text-lg md:text-2xl lg:text-3xl leading-[1.5]">
                {t("createRating.subtitle", {
                  category: categoryId ? t(`categories.category${categoryId}`) : "",
                  place: placeName,
                })}
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center w-full md:w-1/3 mt-4 md:mt-0">
              <img
                src="/images/Icon_Create.png"
                alt=""
                className="max-w-full max-h-[300px] object-cover rounded-lg"
                style={{ width: "200px", height: "200px" }}
              />
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex items-center justify-center">
          <div className="p-6 w-full">
            <ul className="list-none space-y-4">
              {barriersReviews.map((barrierReview) => (
                <li key={barrierReview.barrierId} className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-[#FFD700] rounded-full"></div>
                  <span className="flex-1 text-lg" id={`barrier-label-${barrierReview.barrierId}`}>
                    {t("createRating.barrierSuitable", {
                      barrierName: t(`barriers.barrier${barrierReview.barrierId}`),
                    })}
                  </span>
                  <div
                    className="flex space-x-1 rating ml-auto"
                    role="radiogroup"
                    aria-labelledby={`barrier-label-${barrierReview.barrierId}`}
                  >
                    {STARS.map((star) => (
                      <input
                        key={star}
                        type="radio"
                        name={`barrier-${barrierReview.barrierId}`}
                        value={star}
                        aria-label={`${star} / 5`}
                        onChange={() => handleBarrierReviewChange(barrierReview.barrierId, star)}
                        className="mask mask-star"
                        checked={star === barrierReview.rating}
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start w-full">
          <label htmlFor="comment" className="pb-4 font-normal text-[#1E1E1E]">
            {t("createRating.commentLabel")}
          </label>
          <textarea
            required
            maxLength={MAX_COMMENT_LENGTH}
            className="flex px-4 py-2 w-full min-w-[240px] min-h-[160px] bg-white border border-[#D9D9D9] rounded-lg"
            name="comment"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t("createRating.commentPlaceholder")}
          />
          <span className="text-sm text-gray-500 self-end">
            {comment.length}/{MAX_COMMENT_LENGTH}
          </span>
        </div>
        <div>
          <div className="flex flex-col items-start mt-8 gap-2 w-full max-w-[487px]">
            <button
              type="button"
              className="text-[16px] font-normal leading-[140%] text-[#1E1E1E] underline"
              onClick={() => setIsModalOpen(true)}
            >
              {t("createRating.whatToWrite")}
            </button>
          </div>

          {isModalOpen && (
            <div
              className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
              role="dialog"
              aria-modal="true"
              aria-labelledby="barrier-modal-title"
            >
              <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2 relative">
                <h2 id="barrier-modal-title" className="text-xl font-bold mb-4">
                  {t("createRating.modalTitle")}
                </h2>
                <h3 className="text-lg font-semibold mb-2">
                  {t("createRating.modalSubtitle")}
                </h3>
                <div className="mb-4">
                  {barriers.map((barrier) => (
                    <div key={barrier.id} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`barrier-${barrier.id}`}
                        value={barrier.id}
                        checked={selectedBarriers.includes(barrier.id)}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                      />
                      <label htmlFor={`barrier-${barrier.id}`}>
                        {t(`barriers.barrier${barrier.id}`, { defaultValue: barrier.name })}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="btn bg-gray-300 px-4 py-2 rounded"
                    onClick={() => setIsModalOpen(false)}
                  >
                    {t("createRating.modalCancel")}
                  </button>
                  <button
                    type="button"
                    className="btn bg-yellow-400 px-4 py-2 rounded"
                    onClick={closeModal}
                  >
                    {t("createRating.modalOk")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center">
          <h3 className="text-3xl font-extrabold m-5">
            {t("createRating.addImagesTitle")}
          </h3>
          {message && (
            <p className="m-3" role="alert">
              {message}
            </p>
          )}
          <div
            {...getRootProps()}
            className="border-dashed border-2 border-gray-400 p-6 w-full max-w-xs text-center"
          >
            <input {...getInputProps()} />
            <p>{t("createRating.dropzoneText")}</p>
          </div>
          <div className="flex flex-wrap mt-4">
            {previews.map((url, index) => (
              <div key={url} className="w-24 h-24 m-2 border border-gray-300">
                <img
                  src={url}
                  alt={`${t("createRating.addImagesTitle")} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <button
            className="mt-8 flex justify-center items-center px-4 py-3 w-full max-w-[487px] h-[40px] bg-[#FFD700] border border-[#2C2C2C] rounded-lg disabled:opacity-50"
            type="submit"
            disabled={isSubmitting}
          >
            {t("createRating.submitButton")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateRating;
