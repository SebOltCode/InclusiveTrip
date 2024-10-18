import React, { useEffect, useState } from "react";
import FilteredSelect from "./FilteredSelect";
import axios from "axios";
import FilterableSelect from "./FilterableSelect";

const CategorySelector = ({ selectedCategory, setSelectedCategory }) => {
  const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;

  const [categories, setCategories] = useState([]);

  const categoryUrl = `${API_URL}/placeCategories/selected`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(categoryUrl);
        if (response.data && response.data.length) {
          setCategories(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    };

    fetchData();
  }, []);

  const handleSelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <h1 className="text-xl sm:text-2xl font-bold mb-4">
        Wähle eine Kategorie aus:
      </h1>
      <div className="mb-4">
        <FilterableSelect
          items={categories}
          selectedValue={selectedCategory}
          onSelect={handleSelect}
        />
      </div>
    </>
  );
};

export default CategorySelector;
