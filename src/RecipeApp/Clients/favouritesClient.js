import axios from "axios";

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const RECIPE_API = `${BASE_API}/api/favcategory`;

const request = axios.create({
    baseURL: RECIPE_API,
    withCredentials: true,
  });
  
export const fetchUserFavourites = async (userId) => {
    const response = await request.get(`${RECIPE_API}/list/users/${userId}`);
    return response.data;
};

export const fetchFavouritedStatus = async (userId, category) => {
    const response = await request.get(`${RECIPE_API}/status/users/${userId}/category/${category}`);
    return response.data;
};

export const addFavouriteCategory = async (userId, category) => {
    try {
        const response = await request.post(`${RECIPE_API}/user/${userId}/category/${category}`);
        return response.data;
    } catch (error) {
        // Handle error here
        console.error("Error adding favourite category:", error);
        throw error; // Throw error to handle it in the calling function
    }
};

export const removeFavouriteCategory = async (userId, category) => {
    try {
        const response = await request.delete(`${RECIPE_API}/user/${userId}/category/${category}`);
        return response.data;
    } catch (error) {
        // Handle error here
        console.error("Error removing favourite category:", error);
        throw error; // Throw error to handle it in the calling function
    }
};
