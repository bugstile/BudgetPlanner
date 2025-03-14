import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editingGoal: undefined,
  editingCategory: undefined
};

const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    setEditingGoal: (state, action) => {
      state.editingGoal = action.payload;
    },
    setEditingCategory: (state, action) => {
      state.editingCategory = action.payload;
    }
  },
});

export const { setEditingGoal, setEditingCategory } = editSlice.actions;

export default editSlice.reducer;
