import React from "react";
import { useState, useEffect } from "react";

import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import CitySelector from "./MapComponents/CitySelector";
import PlacesLayer from "./MapComponents/PlacesLayer";
import LocationMarker from "./MapComponents/LocationMarker";
import NavigateMap from "./MapComponents/NavigateMap";
import CategorySelector from "./MapComponents/CategorySelector";
import { useLocation } from "react-router-dom";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'marker-icon-2x.png',
  iconUrl: 'marker-icon.png',
  shadowUrl: 'marker-shadow.png',
});


const SearchField = () => {
  const map = useMap();

  React.useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider: provider,
      style: 'bar',
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
  const [defaultCenter, setDefaultCenter] = useState([52.51085635037089, 13.399439386103111]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const location = useLocation();
  useEffect(() => {
    if (location.state) {
      setSelectedCity(location.state.city);
      setSelectedCategory(location.state.category);
    }
  }, [location.state]);

  return (
    <>
      <div>
        <div className="flex flex-col md:flex-row items-top p-4">
          <div className="flex flex-col md:flex-row"></div>
          <div className="container mx-auto w-full bg-[#C1DCDC] rounded-[24px] relative">
            <div className="flex flex-col md:flex-row w-full p-8">
              <div className="flex flex-col w-full md:w-2/3 text-left">
                <h1 className="font-poppins font-extrabold text-3xl md:text-5xl lg:text-5xl leading-tight text-black">
                  Wähle den gewünschten Standort <br /> auf der Karte aus 
                </h1>
                <div className="mt-4 text-[#1E1E1E] font-poppins font-medium text-[32px] leading-[48px]">
                  Benutze die Filter, um Städte und Kategorien zu finden und klicke auf das Icon in der Karte, um dir Bewertungen anzusehen.
                </div>
              </div>
              <div className="flex items-center justify-center w-full md:w-1/3 mt-4 md:mt-0">
                <img
                  src="/images//Icon_Karte.png"
                  alt="Icon Karte"
                  className="max-w-full max-h-[300px] object-cover rounded-lg"
                  style={{ width: '200px', height: '200px' }}
                />
              </div>
            </div>
          </div>
        </div>


        <div className="flex space-x-4 items-center mt-8">
          <div className="p-4 mr-9 ">
            <CitySelector selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
          </div>
          <div className="p-4 mx-9">
            <CategorySelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          </div>
        </div>

        <MapContainer
          center={defaultCenter}
          zoom={15}
          minZoom={14}
          style={{ zIndex: 9, height: "70vh", width: "100%" }}
        >
          <SearchField />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* <Marker position={[52.51444539703697, 13.400659561157228]}>
          <Popup>A pretty CSS3 popup. <br /> Easily customizable.</Popup>
        </Marker> */}
          {/* <SearchField /> */}
          {/* <LocationMarker /> */}
          <NavigateMap selectedCity={selectedCity} />
          <PlacesLayer selectedCategory={selectedCategory} />
        </MapContainer >
      </div>
    </>

  );
};

export default Map;