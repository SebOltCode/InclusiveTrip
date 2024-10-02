
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");


const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;
const reviewsUrl = `${API_URL}/reviews`;
const barriersReviewsUrl = `${API_URL}/barriersReviews`;



export async function createReview(ratingData) {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }
    if (!token) {


        const tokenFromCookies = getCookie('token');
        console.log(tokenFromCookies);
        if (!tokenFromCookies) {
            throw new Error("No token found in create review from get cookie");
        }

    }
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
            if (err.response) {
                const { status, data } = err.response;
                console.error(
                    `Error ${status}: ${data.message || "An unknown error occurred."}`
                );
                if (data.errors) {
                    const validationErrors = data.errors.map((error) => ({
                        field: error.field,
                        message: error.message,
                    }));

                    console.error("Validation errors:", validationErrors);
                } else {
                    console.error(
                        `Error message: ${data.message || "An unknown error occurred."}`
                    );
                }
            } else {
                console.error("Login error:", err.message);
            }
        });
    return reviewId;
}

export async function createBarrierReviews(barriersReviews, reviewId) {
    if (!token) {
        throw new Error("No token found");
    }
    for (const barriersReview of barriersReviews) {

        const barrierRatingData = {
            barrierId: barriersReview.barrierId,
            reviewId: reviewId,
            reviews: barriersReview.rating,
        };

        try {
            const barrierReviewId = await createBarrierReview(barrierRatingData);
        } catch (error) {
            console.error("Error creating barrier review:", error);
        }

    }
}


export async function updateBarrierReview(barriersReviews, reviewId) {
    if (!token) {
        throw new Error("No token found");
    }

    const response = await deleteBarrierReviwesByReviweId(reviewId);

    for (const barriersReview of barriersReviews) {
        const barrierRatingData = {
            barrierId: barriersReview.barrierId,
            reviewId: reviewId,
            reviews: barriersReview.reviews,
        };
        try {
            const barrierReviewId = await createBarrierReview(barrierRatingData);
        } catch (error) {
            console.error("Error creating barrier review:", error);
        }
    }
}

export async function fetchReviewById(reviewId) {
    const token = Cookies.get("token");
    if (!token) {
        throw new Error("No token found");
    }
    try {
        const response = await axios.get(
            `${API_URL}/reviews/reviewid/${reviewId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        if (error.response) {
            const { status, data } = error.response;
            console.error(
                `Error ${status}: ${data.message || "An unknown error occurred."}`
            );
            if (data.errors) {
                const validationErrors = data.errors.map((error) => ({
                    field: error.field,
                    message: error.message,
                }));
                console.error("Validation errors:", validationErrors);
            } else {
                console.error(
                    `Error message: ${data.message || "An unknown error occurred."}`
                );
            }
        } else {
            console.error("Fetch error:", error.message);

        }
        throw error;
    }
}

export async function createBarrierReview(barrierRatingData) {
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

        // Return 0 or a specific value to indicate failure
        return 0;
    }
}





const deleteBarrierReviwesByReviweId = async (reviewId) => {
    const token = Cookies.get("token");
    if (!token) {
        toast.error("Keine Berechtigung. Bitte einloggen.");
        return;
    }

    try {
        const response = await axios.delete(`${barriersReviewsUrl}/review/${reviewId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        return response;
    } catch (err) {
        if (err.response) {
            const { status, data } = err.response;
            console.error(
                `Error ${status}: ${data.message || "An unknown error occurred."}`
            );
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

        // Return the error object in case you need to handle it outside this function
        return err.response || { message: err.message };
    }
};