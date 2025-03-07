import { DATA_KEY } from "@/constants/constants";
import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  pay: 0,
  expenses: [],
  goals: [],
  categories: [],
};

const initialState = {
  data: JSON.parse(localStorage.getItem(DATA_KEY) || "") || defaultState,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setPay: (state, action) => {
      state.pay = action.payload;
      localStorage.setItem(DATA_KEY, state);
    },
    setExpenses: (state, action) => {
      state.expenses = action.payload;
      localStorage.setItem(DATA_KEY, state);
    },
    setGoals: (state, action) => {
      state.goals = action.goals;
      localStorage.setItem(DATA_KEY, state);
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
      localStorage.setItem(DATA_KEY, state);
    },
  },
});

export const { setPay, setExpenses, setGoals, setCategories } =
  dataSlice.actions;

export default dataSlice;
