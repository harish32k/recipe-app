import axios from "axios";

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const RECIPE_API = `${BASE_API}/api/favcategory`;

export const fetchUserFavourites = async (userId) => {
    const response = await axios.get(`${RECIPE_API}/list/users/${userId}`);
    return response.data;
};

export const fetchFavouritedStatus = async (userId, category) => {
    const response = await axios.get(`${RECIPE_API}/status/users/${userId}/category/${category}`);
    return response.data;
};
