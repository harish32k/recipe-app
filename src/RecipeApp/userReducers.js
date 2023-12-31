import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: { username: "Guest", role: "GUEST", _id: "GUEST" },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = {};
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
