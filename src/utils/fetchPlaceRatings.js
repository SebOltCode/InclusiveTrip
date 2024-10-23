import axios from "axios";
import { toast } from "react-toastify";

const fetchPlaceRatings = async (API_URL, placeId, setPlaceRatings, setCarouselImages, setBarrierNames, setAverageRatings, setTotalReviewsCount, setOverallAverageRating) => {
    try {
        const response = await axios.get(`${API_URL}/reviews/place/${placeId}`);
        setPlaceRatings(response.data);

        const images = response.data.flatMap((rating) =>
            rating.FileUploads.map((file) => file.filePath)
        );
        setCarouselImages(images);

        const barriersResponse = await axios.get(`${API_URL}/barriers`);
        const barriers = barriersResponse.data.reduce((acc, barrier) => {
            acc[barrier.id] = barrier.name;
            return acc;
        }, {});
        setBarrierNames(barriers);

        const barrierRatings = {};
        let totalReviewsSum = 0;
        let reviewsCount = 0;

        for (const barrierId of Object.keys(barriers)) {
            try {
                const barrierResponse = await axios.get(
                    `${API_URL}/reviews/filtered?placeId=${placeId}&barrierId=${barrierId}`
                );

                if (barrierResponse.data.length > 0) {
                    const totalReviews = barrierResponse.data.reduce(
                        (acc, review) => acc + parseInt(review.reviews, 10),
                        0
                    );
                    const averageReview = totalReviews / barrierResponse.data.length;
                    barrierRatings[barrierId] = Math.round(averageReview);
                    totalReviewsSum += totalReviews;
                    reviewsCount += barrierResponse.data.length;
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    continue;
                } else {
                    throw error;
                }
            }
        }

        setAverageRatings(barrierRatings);
        setTotalReviewsCount(reviewsCount);
        if (reviewsCount > 0) {
            const overallAverage = totalReviewsSum / reviewsCount;
            setOverallAverageRating(Math.round(overallAverage));
            console.log("Overall Average Rating:", overallAverage);
        }


    } catch (error) {
        console.error("Error fetching Place ratings:", error);
        toast.error("Fehler beim Laden der Bewertungen.");
    }
};

export default fetchPlaceRatings;