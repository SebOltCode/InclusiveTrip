import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;
const reviewsUrl = `${API_URL}/reviews`;
const barriersReviewsUrl = `${API_URL}/barriersReviews`;

const getToken = () => {
    const token = Cookies.get("token");
    if (!token) {
        throw new Error("No token found");
    }
    return token;
};

export const createReview = async (ratingData) => {
    const token = getToken();
    let reviewId = 0;
    await axios
        .post(reviewsUrl, ratingData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        })
        .then((res) => {
            reviewId = res.data.id;
        })
        .catch((err) => {
            handleError(err);
        });
    return reviewId;
};

export const createBarrierReviews = async (barriersReviews, reviewId) => {
    const token = getToken();
    for (const barriersReview of barriersReviews) {
        const barrierRatingData = {
            barrierId: barriersReview.barrierId,
            reviewId: reviewId,
            reviews: barriersReview.rating,
        };
        try {
            await createBarrierReview(barrierRatingData);
        } catch (error) {
            console.error("Error creating barrier review:", error);
        }
    }
};

export const updateBarrierReview = async (barriersReviews, reviewId) => {
    const token = getToken();
    await deleteBarrierReviewsByReviewId(reviewId);
    for (const barriersReview of barriersReviews) {
        const barrierRatingData = {
            barrierId: barriersReview.barrierId,
            reviewId: reviewId,
            reviews: barriersReview.reviews,
        };
        try {
            await createBarrierReview(barrierRatingData);
        } catch (error) {
            console.error("Error creating barrier review:", error);
        }
    }
};

export const fetchReviewById = async (reviewId) => {
    const token = getToken();
    try {
        const response = await axios.get(`${API_URL}/reviews/reviewid/${reviewId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const createBarrierReview = async (barrierRatingData) => {
    const token = getToken();
    try {
        const response = await axios.post(barriersReviewsUrl, barrierRatingData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        return response.data.id;
    } catch (err) {
        handleError(err);
        return 0;
    }
};

export const deleteBarrierReviewsByReviewId = async (reviewId) => {
    const token = getToken();
    try {
        const response = await axios.delete(`${barriersReviewsUrl}/review/${reviewId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        return response;
    } catch (err) {
        handleError(err);
        return err.response || { message: err.message };
    }
};

const handleError = (err) => {
    if (err.response) {
        const { status, data } = err.response;
        console.error(`Error ${status}: ${data.message || "An unknown error occurred."}`);

        if (data.errors) {
            const validationErrors = data.errors.map((error) => ({
                field: error.field,
                message: error.message,
            }));
            console.error("Validation errors:", validationErrors);
        } else {
            console.error(`Error message: ${data.message || "An unknown error occurred."}`);
        }
    } else {
        console.error("Login error:", err.message);
    }
};