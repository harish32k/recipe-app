import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../RecipeApp/tokenReducers.js";
import userReducer from "../RecipeApp/userReducers.js";

const store = configureStore({
  reducer: {
    tokenReducer,
    userReducer,
  },
});

export default store;
