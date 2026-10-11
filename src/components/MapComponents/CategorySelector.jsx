import { useEffect, useState } from "react";
import api from "../../utils/api";
import FilterableSelect from "./FilterableSelect";
import { useTranslation } from "react-i18next";

const CategorySelector = ({ selectedCategory, setSelectedCategory }) => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api
      .get("/placeCategories/selected")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error(error));
  }, []);

  const translatedCategories = categories.map((category) => ({
    ...category,
    name: t(`categories.category${category.id}`, { defaultValue: category.name }),
  }));

  // The selection may come from another page (router state) in a different language
  const translatedSelection = selectedCategory
    ? {
        ...selectedCategory,
        name: t(`categories.category${selectedCategory.id}`, {
          defaultValue: selectedCategory.name,
        }),
      }
    : selectedCategory;

  return (
    <>
      <h2 className="text-xl sm:text-2xl font-bold mb-4">
        {t("categorySelector.select_category")}
      </h2>
      <div className="mb-4">
        <FilterableSelect
          items={translatedCategories}
          selectedValue={translatedSelection}
          onSelect={setSelectedCategory}
        />
      </div>
    </>
  );
};

export default CategorySelector;
