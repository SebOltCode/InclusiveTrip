import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Carousel from "../utils/Carousel";
import { fetchBarrierRatings, fetchReviewById } from "../utils/reviewHandler";
import Loading from "./Loading";
import NotFound from "./NotFound";
import StarRating from "./StarRating";

const DetailReview = () => {
  const { reviewId } = useParams();
  const [rating, setRating] = useState(null);
  const [barrierRatings, setBarrierRatings] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchReviewById(reviewId), fetchBarrierRatings(reviewId)])
      .then(([review, barriers]) => {
        if (cancelled) return;
        setRating(review);
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

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-top p-4">
        <div className="container mx-auto w-full bg-[#C1DCDC] rounded-[24px] relative">
          <div className="flex flex-col md:flex-row w-full p-8">
            <div className="flex flex-col w-full md:w-2/3 text-left">
              <h1 className="font-poppins font-extrabold text-lg md:text-3xl lg:text-4xl leading-tight text-black">
                {t("detailReview.review_of")} {rating.placeName}{" "}
                {t("detailReview.on")}{" "}
                {new Date(rating.createdAt).toLocaleDateString()}
              </h1>
              <div className="mt-4 text-[#1E1E1E] font-poppins font-medium text-lg md:text-2xl lg:text-3xl leading-[1.5]">
                {t("detailReview.reviewed_by", {
                  placeName: rating.placeName,
                  userName: rating.User?.firstName,
                })}
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

      <div className="flex items-center justify-center">
        <div className="p-6">
          <ul className="list-none space-y-4">
            {barrierRatings.map((barrierRating) => (
              <li key={barrierRating.id} className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-[#FFD700] rounded-full"></div>
                <span className="flex-1 text-lg">
                  {t("detailReview.suitable_for")}{" "}
                  {t(`barriers.barrier${barrierRating.barrierId}`)}
                </span>
                <StarRating
                  name={`barrier-${barrierRating.barrierId}`}
                  value={Number(barrierRating.reviews)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-center mb-4">
        <p className="w-full p-4 border border-gray-300 rounded-lg">{rating.comment}</p>
      </div>
      <button
        type="button"
        className="btn bg-yellow-400 border-black px-8 font-normal"
        onClick={() => navigate(-1)}
      >
        {t("detailReview.back")}
      </button>
    </div>
  );
};

export default DetailReview;
