import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editingGoal: undefined,
};

const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    setEditingGoal: (state, action) => {
      state.editingGoal = action.payload;
    },
  },
});

export const { setEditingGoal } = editSlice.actions;

export default editSlice.reducer;
