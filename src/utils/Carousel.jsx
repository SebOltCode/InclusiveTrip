import React, { useState } from "react";
import "./Carousel.css";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const rotateCarousel = (direction) => {
    if (direction === "left") {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    } else {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const leftIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
  const rightIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;

  return (
    <div className="relative flex items-center justify-center w-full h-64 md:h-96">
      <div className="carousel-container relative w-full h-full overflow-hidden">
        <div className="carousel-item left-item">
          <img
            src={images[leftIndex]}
            alt={`carousel-image-${leftIndex}`}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>

        <div className="carousel-item active-item">
          <img
            src={images[currentIndex]}
            alt={`carousel-image-${currentIndex}`}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>

        <div className="carousel-item right-item">
          <img
            src={images[rightIndex]}
            alt={`carousel-image-${rightIndex}`}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      </div>

      <button
        onClick={() => rotateCarousel("left")}
        className="absolute left-0 bg-gray-700 text-white px-2 py-1 rounded-full"
      >
        &#8592;
      </button>
      <button
        onClick={() => rotateCarousel("right")}
        className="absolute right-0 bg-gray-700 text-white px-2 py-1 rounded-full"
      >
        &#8594;
      </button>
    </div>
  );
};

export default Carousel;
