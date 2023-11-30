import axios from "axios";

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const MEAL_API = `${BASE_API}/api/meal`;

export const fetchMeals = async (token) => {
  const response = await axios.get(`${MEAL_API}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
