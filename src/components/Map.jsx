import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import CitySelector from "./MapComponents/CitySelector";
import PlacesLayer from "./MapComponents/PlacesLayer";
import NavigateMap from "./MapComponents/NavigateMap";
import CategorySelector from "./MapComponents/CategorySelector";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "marker-icon-2x.png",
  iconUrl: "marker-icon.png",
  shadowUrl: "marker-shadow.png",
});

const SearchField = () => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider: provider,
      style: "bar",
      showMarker: true,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
    });

    map.addControl(searchControl);

    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return null;
};

const Map = () => {
  const { t } = useTranslation();
  const [defaultCenter, setDefaultCenter] = useState([
    52.51085635037089, 13.399439386103111,
  ]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (location.state) {
      setSelectedCity(location.state.city);
      setSelectedCategory(location.state.category);
    }
  }, [location.state]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="flex flex-col items-center p-4">
        <div className="container mx-auto w-full bg-[#C1DCDC] rounded-[24px] relative">
          <div className="flex flex-col md:flex-row w-full p-4 sm:p-8">
            <div className="flex flex-col w-full text-left">
              <h1 className="mb-2 font-poppins font-extrabold text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-tight text-black">
                {t("map.where_to_travel")}
              </h1>
              <div className="flex flex-col md:flex-row items-center mt-4 sm:mt-4">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleModal();
                  }}
                  className="text-blue-800 hover:underline md:ml-4"
                >
                  {t("map.how_search_works")}
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleModal();
                  }}
                  className="md:ml-4"
                >
                  <img
                    src="/images/Icon_Karte.png"
                    alt={t("map.icon_map")}
                    className="max-w-full max-h-[200px] sm:max-h-[300px] object-cover rounded-lg"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center mt-4 sm:mt-8">
          <div className="p-2 sm:p-4 w-full sm:w-auto">
            <CitySelector
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
            />
          </div>
          <div className="p-2 sm:p-4 w-full sm:w-auto">
            <CategorySelector
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
        </div>

        <MapContainer
          center={defaultCenter}
          zoom={15}
          minZoom={14}
          style={{ zIndex: 9, height: "60vh", width: "100%" }}
        >
          <SearchField />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <NavigateMap selectedCity={selectedCity} />
          <PlacesLayer selectedCategory={selectedCategory} />
        </MapContainer>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-4 sm:mx-0">
            <h2 className="text-xl font-bold mb-4">
              {t("map.how_search_works_title")}
            </h2>
            <div className="text-[#1E1E1E] font-poppins font-medium text-lg sm:text-xl md:text-2xl lg:text-xl leading-tight">
              <div className="flex items-start mb-4">
                <span className="mr-2">1.</span>
                <p className="pl-2">{t("map.step1")}</p>
              </div>
              <div className="flex items-start mb-4">
                <span className="mr-2">2.</span>
                <p className="pl-2">{t("map.step2")}</p>
              </div>
              <div className="flex items-start mb-4">
                <span className="mr-2">3.</span>
                <p className="pl-2">{t("map.step3")}</p>
              </div>
            </div>
            <button
              onClick={toggleModal}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {t("map.close")}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Map;
