import axios from "axios";
// import Cookies from "js-cookie";

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const AUTH_API = `${BASE_API}/api/auth`;

export const signin = async (credentials) => {
  const response = await axios.post(`${AUTH_API}/signin`, credentials);
  const { message, accessToken } = response.data;

  console.log(message);
  // Cookies.set("accessToken", accessT oken, { httpOnly: true });

  return response.data;
};

export const signout = async (token) => {
  const response = await axios.delete(`${AUTH_API}/signout`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // const response = await axios.delete(
  //   `${AUTH_API}/signout`,
  //   {},
  //   { withCredentials: true }
  // );
  return response.data;
};

export const posts = async (token) => {
  const response = await axios.get(`${BASE_API}/api/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // const response = await axios.get(
  //   `${BASE_API}/api/posts`,
  //   {},
  //   {
  //     withCredentials: true,
  //   }
  // );
  return response.data;
};

export const refreshToken = async (token) => {
  const response = await axios.post(`${AUTH_API}/token`, { token });
  return response.data;
};
