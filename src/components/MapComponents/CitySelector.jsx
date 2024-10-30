import React, { useEffect, useState } from "react";
import FilterableSelect from "./FilterableSelect";
import { useTranslation } from "react-i18next";

const CitySelector = ({ selectedCity, setSelectedCity }) => {
  const { t } = useTranslation();
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("/cities.geojson");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data && data.features) {
          const citiesData = data.features.map((feature) => ({
            name: feature.properties.name,
            id: feature.id,
            coord: feature.geometry.coordinates,
          }));

          setCities(citiesData);
        } else {
          console.error("Invalid GeoJSON format.");
        }
      } catch (error) {
        console.error("Error fetching GeoJSON file:", error.message);
      }
    };

    fetchCities();
  }, []);

  const handleSelect = (city) => {
    setSelectedCity(city);
  };

  return (
    <>
      <h1 className="text-xl sm:text-2xl font-bold mb-4">
        {t("citySelector.select_city")}
      </h1>
      <div className="mb-4">
        <FilterableSelect
          items={cities}
          selectedValue={selectedCity}
          onSelect={handleSelect}
        />
      </div>
    </>
  );
};

export default CitySelector;
