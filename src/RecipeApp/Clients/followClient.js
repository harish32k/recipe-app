import axios from "axios";

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const FOLLOW_API = `${BASE_API}/api/follow`;

export const addFollow = async (userId, followId) => {
    const response = await axios.post(`${FOLLOW_API}/user/${userId}/following/${followId}`);
    return response.data;
};

export const removeFollow = async (userId, followId) => {
    const response = await axios.delete(`${FOLLOW_API}/user/${userId}/following/${followId}`);
    return response.data;
};

export const getFollowingCount = async (userId) => {
    const response = await axios.get(`${FOLLOW_API}/count/following/${userId}`);
    return response.data;
};

export const getFollowerCount = async (userId) => {
    const response = await axios.get(`${FOLLOW_API}/count/followers/${userId}`);
    return response.data;
};

export const followingUsers = async (userId) => {
    const response = await axios.get(`${FOLLOW_API}/list/following/${userId}`);
    return response.data;
};

export const followerUsers = async (userId) => {
    const response = await axios.get(`${FOLLOW_API}/list/followers/${userId}`);
    return response.data;
};

export const followingStatus = async (userId, followId) => {
    const response = await axios.get(`${FOLLOW_API}/status/user/${userId}/following/${followId}`);
    return response.data;
};