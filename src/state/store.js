import { configureStore, combineReducers } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;
