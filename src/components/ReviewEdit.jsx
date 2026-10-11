import { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import api from "../utils/api";
import {
  fetchBarrierRatings,
  fetchReviewById,
  updateBarrierReviews,
} from "../utils/reviewHandler";
import Carousel from "../utils/Carousel";
import { AuthContext } from "./AuthContext";
import Loading from "./Loading";
import NotFound from "./NotFound";

const STARS = [1, 2, 3, 4, 5];

const ReviewEdit = () => {
  const { reviewId } = useParams();
  const { userInfo } = useContext(AuthContext);
  const [rating, setRating] = useState(null);
  const [barrierRatings, setBarrierRatings] = useState([]);
  const [comment, setComment] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchReviewById(reviewId), fetchBarrierRatings(reviewId)])
      .then(([review, barriers]) => {
        if (cancelled) return;
        setRating(review);
        setComment(review.comment);
        setBarrierRatings(barriers);
      })
      .catch((error) => {
        console.error("Error fetching review:", error);
        if (!cancelled) setNotFound(true);
      });
    return () => {
      cancelled = true;
    };
  }, [reviewId]);

  if (notFound) return <NotFound />;
  if (!rating) return <Loading />;
  // Only the author may edit; everybody else gets the read-only view
  if (rating.userId !== userInfo?.id) {
    return <Navigate to={`/detailreview/${reviewId}`} replace />;
  }

  const handleBarrierReviewChange = (barrierId, value) => {
    setBarrierRatings((prev) =>
      prev.map((item) => (item.barrierId === barrierId ? { ...item, reviews: value } : item))
    );
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/reviews/${rating.id}`, {
        comment: comment.trim(),
        placeName: rating.placeName,
        placeId: rating.placeId,
        placeCategoryId: rating.placeCategoryId,
      });
      await updateBarrierReviews(barrierRatings, rating.id);
      toast.success(t("reviewEdit.update_success"));
    } catch (error) {
      console.error("Error updating review:", error);
      toast.error(t("reviewEdit.error_updating_review"));
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/reviews/${rating.id}`);
      toast.success(t("reviewEdit.delete_success"));
      navigate("/user", { replace: true });
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error(t("reviewEdit.error_deleting_review"));
    }
  };

  return (
    <div className="p-4 md:p-8 w-full overflow-x-hidden">
      <div className="flex flex-col md:flex-row items-top p-4">
        <div className="container mx-auto w-full bg-[#C1DCDC] rounded-[24px] relative">
          <div className="flex flex-col md:flex-row w-full p-8">
            <div className="flex flex-col w-full md:w-2/3 text-left">
              <h1 className="font-poppins font-extrabold text-2xl md:text-4xl lg:text-5xl leading-tight text-black">
                {rating.User?.firstName} {t("reviewEdit.had")} {rating.placeName}{" "}
                {t("reviewEdit.on")} {new Date(rating.createdAt).toLocaleDateString()}{" "}
                {t("reviewEdit.rated")}
              </h1>
              <div className="mt-4 text-[#1E1E1E] font-poppins font-medium text-lg md:text-2xl lg:text-3xl leading-[1.5]">
                {t("reviewEdit.learn_more")}
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center w-full md:w-1/3 mt-4 md:mt-0">
              <img
                src="/images/Icon_Bewertung.png"
                alt=""
                className="max-w-full max-h-[300px] object-cover rounded-lg"
                style={{ width: "200px", height: "200px" }}
              />
            </div>
          </div>
        </div>
      </div>

      {rating.FileUploads.length > 0 && (
        <div className="my-8">
          <Carousel images={rating.FileUploads.map((image) => image.filePath)} />
        </div>
      )}

      <form onSubmit={(e) => e.preventDefault()} className="w-full">
        <div className="flex items-center justify-center">
          <div className="p-6 w-full">
            <ul className="list-none space-y-4">
              {barrierRatings.map((barrierRating) => (
                <li key={barrierRating.id} className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-[#FFD700] rounded-full"></div>
                  <span className="flex-1 text-lg" id={`barrier-label-${barrierRating.barrierId}`}>
                    {t("reviewEdit.suitable_for")}{" "}
                    {t(`barriers.barrier${barrierRating.barrierId}`)}
                  </span>
                  <div
                    className="flex space-x-1 rating ml-auto"
                    role="radiogroup"
                    aria-labelledby={`barrier-label-${barrierRating.barrierId}`}
                  >
                    {STARS.map((star) => (
                      <input
                        key={star}
                        type="radio"
                        name={`barrier-${barrierRating.barrierId}`}
                        aria-label={`${star} / 5`}
                        onChange={() => handleBarrierReviewChange(barrierRating.barrierId, star)}
                        value={star}
                        className="mask mask-star"
                        checked={star === Number(barrierRating.reviews)}
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
            onChange={(e) => setComment(e.target.value)}
            maxLength={255}
            aria-label={t("reviewEdit.comment_placeholder")}
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
            disabled={!comment.trim()}
          >
            {t("reviewEdit.update")}
          </button>
          <button
            type="button"
            className="btn bg-yellow-400 border-black w-3/4 md:w-auto px-8 font-normal"
            onClick={() => setShowDeleteModal(true)}
          >
            {t("reviewEdit.delete")}
          </button>
          <button
            type="button"
            className="btn bg-yellow-400 border-black w-3/4 md:w-auto px-8 font-normal"
            onClick={() => navigate(-1)}
          >
            {t("reviewEdit.back")}
          </button>
        </div>
      </form>

      {showDeleteModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="delete-modal-title" className="text-xl font-semibold mb-4">
              {t("reviewEdit.confirm_delete")}
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="btn bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowDeleteModal(false)}
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
    </div>
  );
};

export default ReviewEdit;
