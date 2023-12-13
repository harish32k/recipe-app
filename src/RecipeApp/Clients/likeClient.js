import axios from "axios";

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const LIKE_API = `${BASE_API}/api/like`;

export const fetchLikesOfPost = async (postId) => {
  //   const response = await axios.get(`${LIKE_API}/post/${postId}`);
  const response = await axios.get(`${LIKE_API}/users/${postId}`);
  // console.log("response ", response);
  return response.data;
};

export const addLike = async (recipeId, userId) => {
  const response = await axios.post(`${LIKE_API}`, { recipeId, userId });
  return response.data;
};

export const removeLike = async (recipeId, userId) => {
  console.log("recipeId ", recipeId);
  console.log("userId ", userId);
  const response = await axios.delete(
    `${LIKE_API}/delete/recipe/${recipeId}/user/${userId}`
  );
  return response.data;
};

export const fetchLikeStatus = async (recipeId, userId) => {
  const response = await axios.get(
    `${LIKE_API}/liked-status/recipe/${recipeId}/user/${userId}`
  );
  return response.data;
};
