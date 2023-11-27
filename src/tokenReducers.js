import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  refreshToken: null,
  accessToken: null,
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setRefreshToken(state, action) {
      state.refreshToken = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    clearToken(state) {
      state.refreshToken = null;
      state.accessToken = null;
    },
  },
});

export const { setRefreshToken, setAccessToken, clearToken } =
  tokenSlice.actions;
export default tokenSlice.reducer;
