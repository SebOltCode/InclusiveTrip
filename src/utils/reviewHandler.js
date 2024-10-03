
import axios from "axios";
import Cookies from "js-cookie";




const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;
const reviewsUrl = `${API_URL}/reviews`;
const barriersReviewsUrl = `${API_URL}/barriersReviews`;

let token = Cookies.get("token");
// function getCookie(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
//     return null;
// }
export async function createReview(ratingData) {

    if (!token) {
        // let token = getCookie('token');
        // if (!token) {
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
        let token = getCookie('token');
        if (!token) {
            throw new Error("No token found in create review from get cookie");
        }
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
        let token = getCookie('token');
        if (!token) {
            throw new Error("No token found in create review from get cookie");
        }
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
    if (!token) {
        let token = getCookie('token');
        if (!token) {
            throw new Error("No token found in create review from get cookie");
        }
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
        if (!token) {
            let token = getCookie('token');
            if (!token) {
                throw new Error("No token found in create review from get cookie");
            }
        }
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


        return 0;
    }
}





const deleteBarrierReviwesByReviweId = async (reviewId) => {

    if (!token) {
        let token = getCookie('token');
        if (!token) {
            toast.error("Keine Berechtigung. Bitte einloggen.");
            return;
        }
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


        return err.response || { message: err.message };
    }
};