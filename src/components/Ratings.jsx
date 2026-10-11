import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import fetchPlaceRatings from "../utils/fetchPlaceRatings";
import { createRatingUrl, usePlaceFromUrl } from "../utils/placeUrl";
import Carousel from "../utils/Carousel";
import Loading from "./Loading";
import StarRating from "./StarRating";

const Ratings = () => {
  const { place, categoryId } = usePlaceFromUrl();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    let cancelled = false;
    setData(null);
    fetchPlaceRatings(place.id)
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((error) => {
        console.error("Error fetching place ratings:", error);
        toast.error(t("detailReview.error_loading_reviews"));
        if (!cancelled) setData({ reviews: [], images: [], averageRatings: {}, overallAverageRating: 0, ratingsCount: 0 });
      });
    return () => {
      cancelled = true;
    };
  }, [place.id, t]);

  if (!data) return <Loading />;

  const placeName = place.name || data.reviews[0]?.placeName || t("placeMarker.unnamed_place");
  // Category of an existing review is the fallback if the URL doesn't contain one
  const effectiveCategoryId = categoryId || data.reviews[0]?.placeCategoryId;

  return (
    <div className="p-4 md:p-8 w-full overflow-x-hidden">
      <div className="flex flex-col md:flex-row items-top p-4">
        <div className="container mx-auto w-full bg-[#C1DCDC] rounded-[24px] relative">
          <div className="flex flex-col md:flex-row w-full p-8">
            <div className="flex flex-col w-full md:w-2/3 text-left">
              <h1 className=" text-center font-poppins font-extrabold text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-tight text-black">
                {placeName}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {data.ratingsCount > 0 ? (
        <div className="flex items-center justify-center my-4">
          <StarRating name="overall-rating" value={data.overallAverageRating} className="" />
        </div>
      ) : (
        <div className="text-center my-4">
          <p>{t("ratingspage.no_reviews")}</p>
        </div>
      )}

      {data.images.length > 0 && (
        <div className="my-8">
          <Carousel images={data.images} />
        </div>
      )}

      <div className="p-4">
        <div className="flex flex-col md:flex-row justify-between">
          {effectiveCategoryId && (
            <button
              type="button"
              className="mt-8 btn bg-yellow-400 border-black px-8 font-normal"
              onClick={() => navigate(createRatingUrl({ ...place, name: placeName }, effectiveCategoryId))}
            >
              {t("ratingspage.add_review")}
            </button>
          )}
          <button
            type="button"
            className="mt-8 btn bg-yellow-400 border-black px-8 font-normal"
            onClick={() => navigate(-1)}
          >
            {t("ratingspage.back")}
          </button>
        </div>

        <h2 className="font-poppins font-bold text-[18px] text-center pt-12 mt-12 text-[#000000]">
          {t("ratingspage.reviews")}
        </h2>

        <div className="flex items-center justify-center">
          <div className="p-6">
            <ul className="list-none space-y-4">
              {Object.keys(data.averageRatings).map((barrierId) => (
                <li key={barrierId} className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-[#FFD700] rounded-full"></div>
                  <span className="flex-1 text-lg">
                    {t("ratingspage.average_rating_for")}{" "}
                    {t(`barriers.barrier${barrierId}`)}
                  </span>
                  <StarRating
                    name={`barrier-${barrierId}`}
                    value={data.averageRatings[barrierId]}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {data.reviews.map((rating) => (
          <div
            key={rating.id}
            className="container mx-auto w-full bg-[#C1DCDC] rounded-[24px] mt-16 pr-8"
          >
            <div className="w-full text-left p-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <h3 className="font-poppins font-bold md:text-[18px] text-[#000000]">
                  {t("ratingspage.review_by")} {rating.User?.firstName}
                </h3>
                <p className="font-poppins font-bold md:text-[18px] text-[#000000]">
                  {t("ratingspage.on")}{" "}
                  {new Date(rating.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p className="mt-4 font-poppins font-medium text-sm md:text-[rgba(30,30,30,0.5)] text-left">
                {rating.comment}
              </p>

              <button
                className="btn bg-[#FFD700] border-black w-36 p-2 h-12 min-h-2 m-2 justify-center float-right"
                onClick={() => navigate(`/detailreview/${rating.id}`)}
              >
                {t("ratingspage.read_more")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ratings;
