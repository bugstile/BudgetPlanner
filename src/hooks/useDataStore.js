import { setCategories, setExpenses, setGoals, setPay } from "@/state/dataSlice";
import { generateID } from "@/utils/helpers";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const useDataStore = () => {
  const dispatch = useDispatch();
  const dataState = useSelector((state) => state.data);

  const updatePay = useCallback(
    (pay) => {
      dispatch(setPay(pay));
    },
    [dispatch]
  );

  const addExpense = useCallback(
    (expense) => {
      const expenseWithId = {
        ...expense,
        id: generateID(dataState.expenses.map((exp) => exp.id)),
      };
      const updatedExpenses = [...dataState.expenses, expenseWithId];
      dispatch(setExpenses(updatedExpenses));
    },
    [dispatch, dataState]
  );

  const editExpense = useCallback(
    (editedExpense) => {
      const updatedExpenses = [...dataState.expenses].map((exp) =>
        exp.id === editedExpense.id ? editedExpense : exp
      );
      dispatch(setExpenses(updatedExpenses));
    },
    [dispatch, dataState]
  );

  const deleteExpense = useCallback(
    (expenseId) => {
      const filteredExpenses = [...dataState.expenses].filter((exp) => exp.id !== expenseId);
      dispatch(setExpenses(filteredExpenses));
    },
    [dispatch, dataState]
  );

  const addGoal = useCallback(
    (goal) => {
      const goalWithId = {
        ...goal,
        id: generateID(dataState.goals.map((goa) => goa.id)),
      };
      const updatedGoals = [...dataState.goals, goalWithId];
      dispatch(setGoals(updatedGoals));
    },
    [dispatch, dataState]
  );

  const editGoal = useCallback(
    (editedGoal) => {
      const updatedGoals = [...dataState.goals].map((goa) =>
        editedGoal.id === goa.id ? editedGoal : goa
      );
      dispatch(setGoals(updatedGoals));
    },
    [dispatch, dataState]
  );

  const deleteGoal = useCallback(
    (goalId) => {
      const filteredGoals = [...dataState.goals].filter((goa) => goa.id !== goalId);
      dispatch(setGoals(filteredGoals));
    },
    [dispatch, dataState]
  );

  const addCategory = useCallback(
    (category) => {
      const categoryID = {
        ...category,
        id: generateID(dataState.categories.map((cat) => cat.id)),
      };
      const updatedCategories = [...dataState.categories, categoryID];
      dispatch(setCategories(updatedCategories));
    },
    [dispatch, dataState]
  );

  const editCategory = useCallback(
    (editedCategory) => {
      const updatedCategories = [...dataState.categories].map((cat) =>
        editedCategory.id === cat.id ? editedCategory : cat
      );
      dispatch(setCategories(updatedCategories));
    },
    [dispatch, dataState]
  );

  const deleteCategory = useCallback(
    (categoryId) => {
      const filteredCategories = [...dataState.categories].filter((cat) => cat.id !== categoryId);
      dispatch(setCategories(filteredCategories));
    },
    [dispatch, dataState]
  );

  return {
    ...dataState,
    updatePay,
    addExpense,
    editExpense,
    deleteExpense,
    addGoal,
    editGoal,
    deleteGoal,
    addCategory,
    editCategory,
    deleteCategory,
  };
};

export default useDataStore;
