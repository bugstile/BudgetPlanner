import { setEditingGoal } from "@/state/editSlice";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const useEditStore = () => {
  const dispatch = useDispatch();
  const editState = useSelector((state) => state.edit);

  const updateEditingGoal = useCallback(
    (goal) => {
      dispatch(setEditingGoal(goal));
    },
    [dispatch]
  );

  return {
    ...editState,
    updateEditingGoal,
  };
};

export default useEditStore;
