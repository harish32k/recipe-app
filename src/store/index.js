import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../tokenReducers.js";

const store = configureStore({
  reducer: {
    tokenReducer,
  },
});

export default store;
