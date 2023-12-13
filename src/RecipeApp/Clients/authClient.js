import axios from "axios";

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const AUTH_API = `${BASE_API}/api/auth`;

const request = axios.create({
  baseURL: AUTH_API,
  withCredentials: true,
});

export const signin = async (credentials) => {
  const response = await request.post("/signin", credentials);
  const { message } = response.data;
  console.log(message);
  return response.data;
};

export const signout = async () => {
  const response = await request.delete("/signout");
  return response;
};

export const refreshAccessToken = async () => {
  const response = await request.post("/token");
  return response.data;
};

export const verifyAccessTokenFromCookie = async () => {
  const response = await request.get("/verify");
  return response.data;
};

export const fetchUserDetails = async () => {
  const response = await request.get(`/user`);
  return response.data;
};
