import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import fetchPlaceRatings from "../utils/fetchPlaceRatings";
import { toast } from "react-toastify";
import Carousel from "../utils/Carousel";

const Ratings = () => {
  const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;

  const location = useLocation();
  const { place, category } = location.state || {};
  const [placeRatings, setPlaceRatings] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);
  const [averageRatings, setAverageRatings] = useState({});
  const [barrierNames, setBarrierNames] = useState({});
  const [overallAverageRating, setOverallAverageRating] = useState(0);
  const [totalReviewsCount, setTotalReviewsCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlaceRatings(
      API_URL,
      place.id,
      setPlaceRatings,
      setCarouselImages,
      setBarrierNames,
      setAverageRatings,
      setTotalReviewsCount,
      setOverallAverageRating
    );
  }, [place.id]);

  const handleMoreDetails = (rating) => {
    navigate(`/detailreview`, {
      state: { place: place, category: category, rating: rating },
    });
  };

  const handleCreateRate = (place) => {
    navigate(`/create`, { state: { place: place, category: category } });
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="p-4 md:p-8 w-full overflow-x-hidden">
      <div className="flex flex-col md:flex-row items-top p-4">
        <div className="container mx-auto w-full bg-[#C1DCDC] rounded-[24px] relative">
          <div className="flex flex-col md:flex-row w-full p-8">
            <div className="flex flex-col w-full md:w-2/3 text-left">
              <h1 className=" text-center font-poppins font-extrabold text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-tight text-black">
                {place.name}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {totalReviewsCount > 0 ? (
        <div className="flex items-center justify-center my-4">
          <div className="flex space-x-1 rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <input
                key={star}
                type="radio"
                name="overall-rating"
                id={`overall-${star}`}
                value={star}
                className="mask mask-star"
                checked={star <= overallAverageRating}
                readOnly
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center my-4">
          <p>
            Es liegen noch keine Bewertungen für diesen Ort vor. Schreibe eine
            Bewertung und teile deine Erfahrungen!
          </p>
        </div>
      )}

      {carouselImages.length > 0 && (
        <div className="my-8">
          <Carousel images={carouselImages} />
        </div>
      )}

      <div className="p-4">
        <div className="flex flex-col md:flex-row justify-between">
          <button
            type="button"
            className="mt-8 btn bg-yellow-400 border-black px-8 font-normal"
            onClick={() => handleCreateRate(place)}
          >
            Bewertung hinzufügen
          </button>
          <button
            type="button"
            className="mt-8 btn bg-yellow-400 border-black px-8 font-normal"
            onClick={handleBackClick}
          >
            Zurück
          </button>
        </div>

        <h1 className="font-poppins font-bold text-[18px] text-center pt-12 mt-12 text-[#000000]">
          Bewertungen
        </h1>

        <div className="flex items-center justify-center">
          <div className="p-6">
            <ul className="list-none space-y-4">
              {Object.keys(averageRatings).map((barrierId) => (
                <li key={barrierId} className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-[#FFD700] rounded-full"></div>
                  <span className="flex-1 text-lg">
                    Durchschnittliche Bewertung für {barrierNames[barrierId]}
                  </span>
                  <div className="flex space-x-1 rating ml-auto">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <input
                        key={star}
                        type="radio"
                        name={`barrier-${barrierId}`}
                        id={`barrier-${barrierId}-${star}`}
                        value={star}
                        className="mask mask-star"
                        checked={star <= (averageRatings[barrierId] || 0)}
                        readOnly
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {placeRatings.map((rating, index) => (
          <div
            key={index}
            className="container mx-auto w-full bg-[#C1DCDC] rounded-[24px] mt-16 pr-8"
          >
            <div className="w-full text-left p-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <h1 className="font-poppins font-bold md:text-[18px] text-[#000000]">
                  Bewertung von {rating.User.firstName}
                </h1>
                <h1 className="font-poppins font-bold md:text-[18px] text-[#000000]">
                  vom {new Date(rating.createdAt).toLocaleDateString()}
                </h1>
              </div>
              <p className="mt-4 font-poppins font-medium text-sm md:text-[rgba(30,30,30,0.5)] text-left">
                {rating.comment}
              </p>

              <button
                className="btn bg-[#FFD700] border-black w-36 p-2 h-12 min-h-2 m-2 justify-center float-right"
                onClick={() => handleMoreDetails(rating)}
              >
                Mehr lesen
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ratings;
