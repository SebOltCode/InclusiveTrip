import api from "./api";

export const createReview = async (ratingData) => {
    const response = await api.post("/reviews", ratingData);
    return response.data.id;
};

export const createBarrierReviews = async (barriersReviews, reviewId) => {
    for (const { barrierId, rating } of barriersReviews) {
        await api.post("/barriersReviews", { barrierId, reviewId, reviews: rating });
    }
};

// Replaces all barrier ratings of a review
export const updateBarrierReviews = async (barriersReviews, reviewId) => {
    await api.delete(`/barriersReviews/review/${reviewId}`);
    for (const { barrierId, reviews } of barriersReviews) {
        await api.post("/barriersReviews", { barrierId, reviewId, reviews: Number(reviews) });
    }
};

export const uploadReviewPhotos = async (files, reviewId) => {
    const formData = new FormData();
    for (const file of files) {
        formData.append("files", file);
    }
    formData.append("reviewId", reviewId);
    await api.post("/file-upload", formData);
};

export const fetchReviewById = async (reviewId) => {
    const response = await api.get(`/reviews/reviewid/${reviewId}`);
    return response.data;
};

export const fetchBarrierRatings = async (reviewId) => {
    const response = await api.get(`/barriersReviews/review/${reviewId}`);
    return response.data;
};
