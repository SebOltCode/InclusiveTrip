import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Carousel from "../utils/Carousel";

const Ratings = () => {
  const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;

  const location = useLocation();
  const { place, category } = location.state || {};
  const [placeRatings, setPlaceRatings] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaceRatings = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/reviews/place/${place.id}`
        );
        setPlaceRatings(response.data);

        const images = response.data.flatMap((rating) =>
          rating.FileUploads.map((file) => file.filePath)
        );
        setCarouselImages(images);
      } catch (error) {
        console.error("Error fetching Place ratings:", error);
        toast.error("Fehler beim Laden der Bewertungen.");
      }
    };

    fetchPlaceRatings();
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
    <div>
      <div className="flex flex-col md:flex-row items-top p-4">
        <div className="container mx-auto w-full bg-[#C1DCDC] rounded-[24px] relative">
          <div className="flex flex-col md:flex-row w-full p-8">
            <div className="flex flex-col w-full md:w-2/3 text-left">
              <h1 className="font-poppins font-extrabold text-3xl md:text-5xl lg:text-6xl leading-tight text-black">
                {place.name} {category.name}
              </h1>
            </div>
          </div>
        </div>
      </div>
      {carouselImages.length > 0 && (
        <div className="my-8">
          <Carousel images={carouselImages} />
        </div>
      )}

      <div className="p-4">
        <button
          type="button"
          className="mt-8 btn bg-yellow-400 border-black px-8 font-normal"
          onClick={handleBackClick}
        >
          Zurück
        </button>
        <button
          className="btn bg-[#FFD700] p-2 mt-4 h-12 min-h-2 m-2 justify-end float-right"
          onClick={() => handleCreateRate(place)}
        >
          Bewertung hinzufügen
        </button>

        <h1 className="font-poppins font-bold text-[18px] text-center pt-12 mt-12 text-[#000000]">
          Bewertungen
        </h1>

        {placeRatings.map((rating, index) => (
          <div
            key={index}
            className="container mx-auto w-full bg-[#C1DCDC] rounded-[24px] mt-16 pr-8"
          >
            <div className="w-full text-left p-8">
              <div className="flex items-center justify-between">
                <h1 className="font-poppins font-bold text-[18px] text-[#000000]">
                  Bewertung von {rating.User.firstName}
                </h1>
                <h1 className="font-poppins font-bold text-[18px] text-[#000000]">
                  vom {new Date(rating.createdAt).toLocaleDateString()}
                </h1>
              </div>
              <p className="mt-4 font-poppins font-medium text-[rgba(30,30,30,0.5)] text-left">
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
