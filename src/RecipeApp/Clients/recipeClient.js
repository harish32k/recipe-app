import axios from "axios";

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const RECIPE_API = `${BASE_API}/api/recipes`;

export const fetchRecipeByName = async (name) => {
  const response = await axios.get(`${RECIPE_API}/name/${name}`);
  return response.data;
};

export const fetchPosts = async () => {
  const response = await axios.get(`${RECIPE_API}/name/egg`);
  return response.data;
};

// export const approvePost = async (postId) => {
//   console.log("approve postId ", postId);
//   return postId;
// };

// export const deletePost = async (postId) => {
//   console.log("delete postId ", postId);
//   return postId;
// };

export const fetchCategories = async () => {
  const response = await axios.get(`${BASE_API}/api/categories`);
  return response.data;
};

export const fetchCategoryByName = async (category) => {
  const response = await axios.get(`${RECIPE_API}/category/${category}`);
  return response.data;
};

export const fetchAreas = async () => {
  const response = await axios.get(`${BASE_API}/api/areas`);
  return response.data;
};

export const fetchAreaByName = async (area) => {
  const response = await axios.get(`${RECIPE_API}/area/${area}`);
  return response.data;
};

export const createPost = async (formData) => {
  const response = await axios.post(`${RECIPE_API}`, formData);
  return response.data;
};

export const updatePost = async (formData, _id) => {
  const response = await axios.put(`${RECIPE_API}/id/${_id}`, formData);
  return response.data;
};

export const approveRecipe = async (_id) => {
  const response = await axios.put(`${RECIPE_API}/approve/${_id}`);
  return response.data;
};

export const deleteRecipe = async (_id) => {
  const response = await axios.delete(`${RECIPE_API}/${_id}`);
  return response.data;
};

export const fetchRecipeByFavoriteCategoryOfUser = async (userId) => {
  const response = await axios.get(
    `${RECIPE_API}/random/category/favourite/${userId}`
  );
  return response.data;
};

export const fetchCompleteRandomRecipe = async () => {
  const response = await axios.get(
    `${RECIPE_API}/random/category/complete-random`
  );
  return response.data;
};

export const fetchSubscribedRecipe = async (userId) => {
  const response = await axios.get(`${RECIPE_API}/subscribed/user/${userId}`);
  return response.data;
};

export const fetchPostById = async (id) => {
  const response = await axios.get(`${RECIPE_API}/id/${id}`);
  console.log(response.data);
  return response.data;
};

export const fetchUserRecipes = async (id) => {
  const response = await axios.get(`${RECIPE_API}/user/${id}`);
  //console.log(response.data);
  return response.data;
};
