import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { updateBarrierReview } from "../utils/reviewHandler";


const DetailReview = () => {
  const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;
  const location = useLocation();
  const { rating } = location.state || {};
  const [barrierRatings, setBarrierRatings] = useState([]);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [stars] = useState([1, 2, 3, 4, 5]);
  const [comment, setComment] = useState(rating.comment);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
  }, []);


  const handleBarrierReviewChange = (e) => {
    const rating = Number(e.target.value);
    const barrierId = Number(e.target.getAttribute('data-barrier-id'));
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
    const token = Cookies.get("token");
    if (!token) {
      toast.error("Keine Berechtigung. Bitte einloggen.");
      return;
    }

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
      toast.success("Bewertung erfolgreich aktualisiert!");
    } catch (error) {
      toast.error("Fehler beim Aktualisieren der Bewertung.");
      console.log(error);
    }

    await updateBarrierReview(barrierRatings, rating.id);

  };

  const handleCommentChange = (e) => {
    const { value } = e.target;
    setComment(value);
  };


  const handleDelete = async () => {
    const token = Cookies.get("token");
    if (!token) {
      toast.error("Keine Berechtigung. Bitte einloggen.");
      return;
    }
    try {
      await axios.delete(`${API_URL}/reviews/${rating.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      toast.success("Bewertung erfolgreich gelöscht!");
      setTimeout(() => {
        navigate(`/user`);
      }, 2000);

    } catch (error) {
      toast.error("Fehler beim Löschen der Bewertung.");
      console.log(error);
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
    <div>
      <div className="flex flex-col md:flex-row items-top p-4">
        <div className="flex flex-col md:flex-row"></div>
        <div className="container mx-auto w-full bg-[#C1DCDC] rounded-[24px] relative">
          <div className="flex flex-col md:flex-row w-full p-8">
            <div className="flex flex-col items-left  w-full md:w-2/3 text-left">
              <h1 className="mt-4 font-poppins font-extrabold text-3xl md:text-5xl lg:text-5xl leading-[4] text-black">
                {rating.User.firstName} hat {rating.placeName} am {new Date(rating.createdAt).toLocaleDateString()} bewertet
              </h1>
              <div className="mt-4 text-[#1E1E1E] font-poppins font-medium text-[32px] leading-[48px]">
                Erfahre folgend mehr über diese Bewertung.
              </div>
            </div>

            <div className="flex flex-col items-center justify-center w-full md:w-1/3 mt-4 md:mt-0">
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

      <div>
        <div className="flex flex-wrap justify-center items-center gap-4 p-4">
          {rating.FileUploads.map((image, index) => (
            <div
              key={index}
              className="w-1/4 p-2 cursor-pointer"
              onClick={() => openModal(image)}
            >
              <img
                key={index}
                src={image.filePath}
                alt={`Bild ${index + 1}`}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
            onClick={closeModal}
          >
            <div className="relative">
              <img
                src={selectedImage.filePath}
                alt="Selected"
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                className="absolute top-4 right-4 text-white text-3xl font-bold"
                onClick={closeModal}
              >
              </button>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
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

        <div className="flex items-center justify-center mb-4">
          <textarea
            value={comment}
            onChange={handleCommentChange}
            className="w-full p-4 border border-gray-300 rounded-lg"
            rows="4"
            placeholder="Beschreibung hier eingeben"
          >
          </textarea>
        </div>


        <div className="flex items-center justify-left space-x-4">
          <button
            type="button"
            className="btn bg-yellow-400 border-black px-8 font-normal"
            onClick={handleUpdate}
          >
            Aktualisieren
          </button>
          <button
            type="button"
            className="btn bg-yellow-400 border-black px-8 font-normal"
            onClick={openDeleteModal}
          >
            Löschen
          </button>
          <button
            type="button"
            className="btn bg-yellow-400 border-black px-8 font-normal"
            onClick={handleBackClick}
          >
            Zurück
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
              Bewertung wirklich löschen?
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="btn bg-gray-300 px-4 py-2 rounded"
                onClick={closeDeleteModal}
              >
                Abbrechen
              </button>
              <button
                type="button"
                className="btn bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDelete}
              >
                Löschen
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default DetailReview;
