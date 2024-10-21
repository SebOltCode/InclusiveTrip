import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import Carousel from "../utils/Carousel";

const DetailReview = () => {
  const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;
  const location = useLocation();
  const { place, category, rating } = location.state || {};
  const [barrierRatings, setBarrierRatings] = useState([]);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [stars] = useState([1, 2, 3, 4, 5]);

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
        toast.error("Fehler beim Laden der Bewertungen.");
      }
    };

    fetchBarrierRatings();
  }, [rating.id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-top p-4">
        <div className="container mx-auto w-full bg-[#C1DCDC] rounded-[24px] relative">
          <div className="flex flex-col md:flex-row w-full p-8">
            <div className="flex flex-col w-full md:w-2/3 text-left">
              <h1 className="font-poppins font-extrabold text-lg md:text-3xl lg:text-4xl leading-tight text-black">
                Bewertung von {place.name} vom{" "}
                {new Date(rating.createdAt).toLocaleDateString()}
              </h1>
              <div className="mt-4 text-[#1E1E1E] font-poppins font-medium text-lg md:text-2xl lg:text-3xl leading-[1.5]">
                So wurde {place.name} durch {rating.User.firstName} bewertet:
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center w-full md:w-1/3 mt-4 md:mt-0">
              <img
                src="/images/Icon_Bewertung.png"
                alt="Icon Karte"
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

      <div className="flex items-center justify-center">
        <div className="p-6">
          <ul className="list-none space-y-4">
            {barrierRatings.map((barrierRating) => (
              <li
                key={barrierRating.Barrier.id}
                className="flex items-center space-x-4"
              >
                <div className="w-4 h-4 bg-[#FFD700] rounded-full"></div>
                <span className="flex-1 text-lg">
                  Für {barrierRating.Barrier.name} geeignet
                </span>
                <div className="flex space-x-1 rating ml-auto">
                  {stars.map((star) => (
                    <input
                      key={star}
                      type="radio"
                      name={`barrier-${barrierRating.Barrier.id}`}
                      id={star}
                      value={barrierRating.reviews}
                      className="mask mask-star"
                      defaultChecked={star == barrierRating.reviews}
                      disabled
                    />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-center mb-4">
        <p className="w-full p-4 border border-gray-300 rounded-lg">
          {rating.comment}
        </p>
      </div>
      <button
        type="button"
        className="btn bg-yellow-400 border-black px-8 font-normal"
        onClick={handleBackClick}
      >
        Zurück
      </button>

      <ToastContainer />
    </div>
  );
};

export default DetailReview;
