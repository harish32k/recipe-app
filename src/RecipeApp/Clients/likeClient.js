import axios from "axios";

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const LIKE_API = `${BASE_API}/api/like`;

export const fetchLikesOfPost = async (postId) => {
  //   const response = await axios.get(`${LIKE_API}/post/${postId}`);
  const response = await axios.get(`${LIKE_API}/users`, {
    body: { recipeId: "52795" },
  });
  console.log("response ", response);
  return response.data;
};
