import axios from "axios";

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const USER_API = `${BASE_API}/api/users`;

export const fetchUserById = async (id) => {
  const response = await axios.get(`${USER_API}/${id}`);
  return response.data;
};

export const signup = async (user) => {
  const response = await axios.post(`${USER_API}`, user);
  return response.data;
};
