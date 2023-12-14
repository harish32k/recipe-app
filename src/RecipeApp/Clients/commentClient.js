import axios from "axios";

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const COMMENT_API = `${BASE_API}/api/comment`;

const request = axios.create({
  baseURL: COMMENT_API,
  withCredentials: true,
});

export const fetchCommentsOfPost = async (postId) => {
  const response = await request.get(`${COMMENT_API}/recipe/${postId}`);
  return response.data;
};

export const addComment = async (recipeId, userId, strComment) => {
  const response = await request.post(`${COMMENT_API}/recipe`, {
    recipeId,
    userId,
    strComment,
  });
  return response.data;
};

export const removeComment = async (_id) => {
  const response = await request.delete(`${COMMENT_API}/recipe/commentId/${_id}`);
  return response.data;
};

export const fetchCommentsByUser = async (_id) => {
  const response = await request.get(`${COMMENT_API}/user/${_id}`);
  return response.data;
};