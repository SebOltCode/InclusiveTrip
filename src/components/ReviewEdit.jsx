import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { updateBarrierReview } from "../utils/reviewHandler";
import Carousel from "../utils/Carousel";
import { useTranslation } from "react-i18next";

const ReviewEdit = () => {
  const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;
  const location = useLocation();
  const { rating } = location.state || {};
  const [barrierRatings, setBarrierRatings] = useState([]);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [stars] = useState([1, 2, 3, 4, 5]);
  const [comment, setComment] = useState(rating.comment);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchBarrierRatings = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/barriersReviews/review/${rating.id}`,
          {}
        );
        setBarrierRatings(response.data);
      } catch (error) {
        console.error("Error fetching Place ratings:", error);
        toast.error(t("reviewEdit.error_loading_reviews"));
      }
    };

    fetchBarrierRatings();
  }, [rating.id, API_URL, t]);

  const handleBarrierReviewChange = (e) => {
    const rating = Number(e.target.value);
    const barrierId = Number(e.target.getAttribute("data-barrier-id"));
    setBarrierRatings((prev) =>
      prev.map((item) =>
        item.barrierId === barrierId ? { ...item, reviews: rating } : item
      )
    );
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleUpdate = async () => {
    let token = Cookies.get("token");

    try {
      await axios.put(
        `${API_URL}/reviews/${rating.id}`,
        {
          comment: comment,
          placeName: rating.placeName,
          placeId: rating.placeId,
          placeCategoryId: rating.placeCategoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      await updateBarrierReview(barrierRatings, rating.id);
      toast.success(t("reviewEdit.update_success"));
    } catch (error) {
      console.error("Error updating review:", error);
      toast.error(t("reviewEdit.error_updating_review"));
    }
  };

  const handleCommentChange = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  const handleDelete = async () => {
    let token = Cookies.get("token");

    try {
      await axios.delete(`${API_URL}/reviews/${rating.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      toast.success(t("reviewEdit.delete_success"));
      navigate(-1);
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error(t("reviewEdit.error_deleting_review"));
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="p-4 md:p-8 w-full overflow-x-hidden">
      <div className="flex flex-col md:flex-row items-top p-4">
        <div className="container mx-auto w-full bg-[#C1DCDC] rounded-[24px] relative">
          <div className="flex flex-col md:flex-row w-full p-8">
            <div className="flex flex-col w-full md:w-2/3 text-left">
              <h1 className="font-poppins font-extrabold text-2xl md:text-4xl lg:text-5xl leading-tight text-black">
                {rating.User.firstName} {t("reviewEdit.had")} {rating.placeName}{" "}
                {t("reviewEdit.on")}{" "}
                {new Date(rating.createdAt).toLocaleDateString()}{" "}
                {t("reviewEdit.rated")}
              </h1>
              <div className="mt-4 text-[#1E1E1E] font-poppins font-medium text-lg md:text-2xl lg:text-3xl leading-[1.5]">
                {t("reviewEdit.learn_more")}
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center w-full md:w-1/3 mt-4 md:mt-0">
              <img
                src="/images/Icon_Bewertung.png"
                alt={t("reviewEdit.icon_map")}
                className="max-w-full max-h-[300px] object-cover rounded-lg"
                style={{ width: "200px", height: "200px" }}
              />
            </div>
          </div>
        </div>
      </div>

      {rating.FileUploads.length > 0 && (
        <div className="my-8">
          <Carousel
            images={rating.FileUploads.map((image) => image.filePath)}
          />
        </div>
      )}

      <form onSubmit={(e) => e.preventDefault()} className="w-full">
        <div className="flex items-center justify-center">
          <div className="p-6 w-full">
            <ul className="list-none space-y-4">
              {barrierRatings.map((barrierRating) => (
                <li
                  key={barrierRating.Barrier.id}
                  className="flex items-center space-x-4"
                >
                  <div className="w-4 h-4 bg-[#FFD700] rounded-full"></div>
                  <span className="flex-1 text-lg">
                    {t("reviewEdit.suitable_for")}{" "}
                    {t(`barriers.barrier${barrierRating.Barrier.id}`)}
                  </span>
                  <div className="flex space-x-1 rating ml-auto">
                    {stars.map((star) => (
                      <input
                        key={star}
                        type="radio"
                        name={`barrier-${barrierRating.Barrier.id}`}
                        onChange={handleBarrierReviewChange}
                        id={star}
                        data-barrier-id={barrierRating.Barrier.id}
                        value={star}
                        className="mask mask-star"
                        defaultChecked={star == barrierRating.reviews}
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-center mb-4 w-full">
          <textarea
            value={comment}
            onChange={handleCommentChange}
            className="w-full p-4 border border-gray-300 rounded-lg"
            rows="4"
            placeholder={t("reviewEdit.comment_placeholder")}
          ></textarea>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 w-full">
          <button
            type="button"
            className="btn bg-yellow-400 border-black w-3/4 md:w-auto px-8 font-normal"
            onClick={handleUpdate}
          >
            {t("reviewEdit.update")}
          </button>
          <button
            type="button"
            className="btn bg-yellow-400 border-black w-3/4 md:w-auto px-8 font-normal"
            onClick={openDeleteModal}
          >
            {t("reviewEdit.delete")}
          </button>
          <button
            type="button"
            className="btn bg-yellow-400 border-black w-3/4 md:w-auto px-8 font-normal"
            onClick={handleBackClick}
          >
            {t("reviewEdit.back")}
          </button>
        </div>
      </form>

      {showDeleteModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={closeDeleteModal}
        >
          <div
            className="bg-white p-6 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">
              {t("reviewEdit.confirm_delete")}
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="btn bg-gray-300 px-4 py-2 rounded"
                onClick={closeDeleteModal}
              >
                {t("reviewEdit.cancel")}
              </button>
              <button
                type="button"
                className="btn bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDelete}
              >
                {t("reviewEdit.delete")}
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ReviewEdit;
