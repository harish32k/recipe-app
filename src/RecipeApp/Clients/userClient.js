import axios from "axios";

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const USER_API = `${BASE_API}/api/user`;

export const fetchUserDetails = async (token) => {
  const response = await axios.get(`${BASE_API}/api/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
