import { useParams, useSearchParams } from "react-router-dom";

// Place data lives in the URL (not in router state), so pages survive reloads and can be shared
export const placeSearch = (place, categoryId) => {
  const params = new URLSearchParams();
  if (place?.name) params.set("name", place.name);
  if (categoryId) params.set("category", categoryId);
  return `?${params.toString()}`;
};

export const ratingsUrl = (place, categoryId) =>
  `/ratings/${place.id}${placeSearch(place, categoryId)}`;

export const createRatingUrl = (place, categoryId) =>
  `/create/${place.id}${placeSearch(place, categoryId)}`;

export const usePlaceFromUrl = () => {
  const { placeId } = useParams();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  return {
    place: { id: placeId, name: searchParams.get("name") || "" },
    categoryId: category ? Number(category) : null,
  };
};
