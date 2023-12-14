import axios from "axios";

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const USER_API = `${BASE_API}/api/users`;

const request = axios.create({
    baseURL: USER_API,
    withCredentials: true,
});

export const updateUser = async (id, user) => {
  const response = await request.put(`${USER_API}/${id}`, user);
  return response.data;
};
