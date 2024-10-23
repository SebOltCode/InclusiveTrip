import React, { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { createReview, createBarrierReviews } from "../utils/reviewHandler";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateRating() {
  const location = useLocation();
  const { place, category } = location.state || {};
  const [stars] = useState([1, 2, 3, 4, 5]);
  const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;
  const filesUrl = `${API_URL}/file-upload`;
  const navigate = useNavigate();

  useEffect(() => {
    if (!place || !category) {
      navigate("/error", {
        state: { message: "Place or category not defined" },
      });
    }
  }, [place, category, navigate]);

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [barriers, setBarriers] = useState([]);
  const [selectedBarriers, setSelectedBarriers] = useState([]);
  const [barriersReviews, setBarriersReviews] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/barriers/selected`);
        if (response.data && response.data.length) {
          setBarriers(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [API_URL]);

  const handleBarrierReviewChange = (e) => {
    const rating = Number(e.target.value);
    const barrierId = Number(e.target.name.split("-")[1]);
    setBarriersReviews((prev) =>
      prev.map((item) =>
        item.barrierId === barrierId ? { ...item, rating: rating } : item
      )
    );
  };

  const handleCommentChange = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length + files.length > 5) {
        setMessage("Es können maximal 5 Bilder hochgeladen werden");
        return;
      }
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles].slice(0, 5));
    },
    [files]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment) {
      setMessage("Das Erfahrungsbericht-Feld darf nicht leer sein.");
      return;
    }

    if (files.length > 5) {
      setMessage("Maximal 5 Dateien können hochgeladen werden");
      return;
    }
    const ratingData = {
      placeName: place.name,
      placeId: place.id,
      comment: comment,
      placeCategoryId: category.id,
    };

    const reviewId = await createReview(ratingData).then(
      (reviewId) => reviewId
    );
    if (!reviewId) {
      console.error("Error creating review");
      return;
    }
    await createBarrierReviews(barriersReviews, reviewId);

    if (files.length > 0) {
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      formData.append("reviewId", reviewId);
      try {
        const res = await axios.post(filesUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (err) {
        setMessage(
          "Fehler beim Hochladen der Dateien , bitte versuchen Sie es erneut"
        );
        console.log(err);
      }
    }
    toast.success("Vielen Dank, Ihre Bewertung wurde hinzugefügt!");
    setTimeout(() => {
      navigate(`/user`);
    }, 2000);
  };

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setBarriersReviews(
      barriers
        .filter((barrier) => selectedBarriers.includes(barrier.id))
        .map((barrier) => ({
          barrierName: barrier.name,
          barrierId: barrier.id,
          rating: 2,
        }))
    );
  };

  const handleCheckboxChange = (e) => {
    const barrierId = Number(e.target.value);
    setSelectedBarriers((prev) =>
      e.target.checked
        ? [...prev, barrierId]
        : prev.filter((id) => id !== barrierId)
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  return (
    <div className="p-4 md:p-8 w-full overflow-x-hidden">
      <ToastContainer />
      <div className="flex flex-col md:flex-row items-top p-4">
        <div className="flex flex-col md:flex-row"></div>
        <div className="container mx-auto w-full bg-[#C1DCDC] rounded-[24px] relative">
          <div className="flex flex-col md:flex-row w-full p-8">
            <div className="flex flex-col w-full md:w-2/3 text-left">
              <h1 className="font-poppins font-extrabold text-3xl md:text-5xl lg:text-6xl leading-tight text-black">
                Bewertung schreiben
              </h1>
              <div className="mt-4 text-[#1E1E1E] font-poppins font-medium text-lg md:text-2xl lg:text-3xl leading-[1.5]">
                Bewerte {category?.name} <b>{place?.name}</b> mit deinen
                Erfahrungen.
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center w-full md:w-1/3 mt-4 md:mt-0">
              <img
                src="/images/Icon_Create.png"
                alt="Icon Create"
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
                <li
                  key={barrierReview.barrierId}
                  className="flex items-center space-x-4"
                >
                  <div className="w-4 h-4 bg-[#FFD700] rounded-full"></div>
                  <span className="flex-1 text-lg">
                    Für {barrierReview.barrierName} geeignet
                  </span>
                  <div className="flex space-x-1 rating ml-auto">
                    {stars.map((star) => (
                      <input
                        key={star}
                        type="radio"
                        name={`barrier-${barrierReview.barrierId}`}
                        id={star}
                        value={star}
                        onChange={handleBarrierReviewChange}
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
            Berichte über deine Erfahrungen
          </label>
          <textarea
            required
            className="flex px-4 py-2 w-full min-w-[240px] min-h-[160px] bg-white border border-[#D9D9D9] rounded-lg"
            name="comment"
            id="comment"
            onChange={handleCommentChange}
            placeholder="Erfahrungsbericht"
          />
        </div>
        <div>
          <div className="flex flex-col items-start mt-8 gap-2 w-[487px] h-[70px]">
            <a
              href="#"
              className="w-full h-[22px] text-[16px] font-normal leading-[140%] text-[#1E1E1E] underline"
              onClick={openModal}
            >
              Was soll ich schreiben?
            </a>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2 relative">
                <h2 className="text-xl font-bold mb-4">
                  Was möchtest du bewerten?
                </h2>
                <h3 className="text-lg font-semibold mb-2">
                  Ich möchte die Zugänglichkeit für:
                </h3>
                <div className="mb-4">
                  {barriers.map((barrier) => (
                    <div key={barrier.id} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`barrier-${barrier.id}`}
                        value={barrier.id}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                      />
                      <label htmlFor={`barrier-${barrier.id}`}>
                        {`${barrier.name} bewerten.`}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    className="btn bg-gray-300 px-4 py-2 rounded"
                    onClick={closeModal}
                  >
                    Abbrechen
                  </button>
                  <button
                    className="btn bg-yellow-400 px-4 py-2 rounded"
                    onClick={closeModal}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center">
          <h3 className="text-3xl font-extrabold m-5">
            Füge Bilder zu deiner Bewertung hinzu!
          </h3>
          {message && <p className="m-3">{message}</p>}
          <div
            {...getRootProps({ className: "dropzone" })}
            className="border-dashed border-2 border-gray-400 p-6 w-full max-w-xs text-center"
          >
            <input {...getInputProps()} />
            <p>Ziehe Bilder hierher oder klicke, um Bilder auszuwählen</p>
          </div>
          <div className="flex flex-wrap mt-4">
            {files.slice(0, 5).map((file, index) => (
              <div key={index} className="w-24 h-24 m-2 border border-gray-300">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview-${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <button
            className="mt-8 flex justify-center items-center px-4 py-3 w-[487px] h-[40px] bg-[#FFD700] border border-[#2C2C2C] rounded-lg"
            type="submit"
          >
            Bewertung senden
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateRating;
