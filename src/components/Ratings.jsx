import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Ratings = () => {
  const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;

  const location = useLocation();
  const { place, category } = location.state || {};
  const [placeRatings, setPlaceRatings] = useState([]);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const fetchPlaceRatings = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/reviews/place/${place.id}`,
          {}
        );
        setPlaceRatings(response.data);
      } catch (error) {
        console.error("Error fetching Place ratings:", error);
        toast.error("Fehler beim Laden der Bewertungen.");
      }
    };

    fetchPlaceRatings();
  }, []);

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
        <div className="flex flex-col md:flex-row"></div>
        <div className="container mx-auto w-full bg-[#C1DCDC] rounded-[24px] relative">
          <div className="flex flex-col md:flex-row w-full p-8">
            <div className="flex flex-col w-full md:w-2/3 text-left">
              <h1 className="font-poppins font-extrabold text-3xl md:text-5xl lg:text-6xl leading-tight text-black">
                {place.name} {category.name}
              </h1>

              <div className=" text-[#1E1E1E] font-poppins font-medium text-[32px] leading-[48px] ml-16 mt-6">
                {placeRatings.length}
              </div>
              <div className="text-[18px] leading-[27px] mt-2 ml-8">
                Bewertungen
              </div>
            </div>
            <div className="flex items-center justify-center w-full md:w-1/3 mt-4 md:mt-0">
              <img
                src="/images/Icon_Location.png"
                alt="Icon Karte"
                className="max-w-full max-h-[300px] object-cover rounded-lg"
                style={{ width: "200px", height: "200px" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4 p-4">
        {placeRatings.map((rating, index) =>
          rating.FileUploads.map((file, index) => (
            <div
              key={index}
              className="w-1/4 p-2 cursor-pointer"
              onClick={() => openModal(file)}
            >
              <img
                src={file.filePath}
                alt="Photo"
                className="w-48 h-48 object-cover rounded-lg"
              />
            </div>
          ))
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div className="relative w-1/4 h-1/4">
            <img
              src={selectedImage.filePath}
              alt="Selected"
              className="w-full h-full object-cover rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-2 right-2 text-white text-2xl font-bold"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
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
