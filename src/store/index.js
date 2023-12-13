import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../RecipeApp/userReducers.js";

const store = configureStore({
  reducer: {
    userReducer,
  },
});

export default store;
