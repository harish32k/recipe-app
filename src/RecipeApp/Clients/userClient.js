import axios from "axios";

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const AUTH_API = `${BASE_API}/api/auth`;
export const USER_API = `${BASE_API}/api/users`;

export const fetchUserDetails = async (token) => {
  const response = await axios.get(`${AUTH_API}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchUserById = async (id) => {
  const response = await axios.get(`${USER_API}/${id}`);
  return response.data;
};

export const signup = async (user) => {
  const response = await axios.post(`${USER_API}`, user);
  return response.data;
};
