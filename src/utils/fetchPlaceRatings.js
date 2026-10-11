import api from "./api";

// Loads all reviews of a place plus the aggregated barrier ratings (one request each)
const fetchPlaceRatings = async (placeId) => {
  const [reviewsResponse, summaryResponse] = await Promise.all([
    api.get(`/reviews/place/${placeId}`),
    api.get(`/reviews/place/${placeId}/summary`),
  ]);

  const reviews = reviewsResponse.data;
  return {
    reviews,
    images: reviews.flatMap((review) => review.FileUploads.map((file) => file.filePath)),
    averageRatings: summaryResponse.data.averages,
    overallAverageRating: summaryResponse.data.overallAverage,
    ratingsCount: summaryResponse.data.ratingsCount,
  };
};

export default fetchPlaceRatings;
