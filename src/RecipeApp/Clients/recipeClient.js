import axios from "axios";

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const RECIPE_API = `${BASE_API}/api/recipes`;
export const DOMAIN_API = `${BASE_API}/api/domains`;

const request = axios.create({
  withCredentials: true,
});

export const fetchRecipeByName = async (name) => {
  const response = await request.get(`${RECIPE_API}/name/${name}`);
  return response.data;
};

export const fetchPosts = async () => {
  const response = await request.get(`${RECIPE_API}/name/te`);
  return response.data;
};

export const fetchUnapprovedPosts = async () => {
  const response = await request.get(`${RECIPE_API}/unapproved`);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await request.get(`${DOMAIN_API}/categories`);
  return response.data;
};

export const fetchCategoryByName = async (category) => {
  const response = await request.get(`${RECIPE_API}/category/${category}`);
  return response.data;
};

export const fetchAreas = async () => {
  const response = await request.get(`${DOMAIN_API}/areas`);
  return response.data;
};

export const fetchAreaByName = async (area) => {
  const response = await request.get(`${RECIPE_API}/area/${area}`);
  return response.data;
};

export const createPost = async (formData) => {
  const response = await request.post(`${RECIPE_API}`, formData);
  return response.data;
};

export const updatePost = async (formData, _id) => {
  const response = await request.put(`${RECIPE_API}/id/${_id}`, formData);
  return response.data;
};

export const approveRecipe = async (_id) => {
  const response = await request.put(`${RECIPE_API}/approve/${_id}`);
  return response.data;
};

export const deleteRecipe = async (_id) => {
  const response = await request.delete(`${RECIPE_API}/id/${_id}`);
  return response.data;
};

export const fetchRecipeByFavoriteCategoryOfUser = async (userId) => {
  const response = await request.get(
    `${RECIPE_API}/random/category/favourite/${userId}`
  );
  return response.data;
};

export const fetchCompleteRandomRecipe = async () => {
  const response = await request.get(
    `${RECIPE_API}/random/category/complete-random`
  );
  return response.data;
};

export const fetchSubscribedRecipe = async (userId) => {
  const response = await request.get(`${RECIPE_API}/subscribed/user/${userId}`);
  return response.data;
};

export const fetchPostById = async (id) => {
  const response = await request.get(`${RECIPE_API}/id/${id}`);
  console.log(response.data);
  return response.data;
};

export const fetchUserRecipes = async (id) => {
  const response = await request.get(`${RECIPE_API}/user/${id}`);
  //console.log(response.data);
  return response.data;
};
