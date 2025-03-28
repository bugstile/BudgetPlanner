import { setCategories, setExpenses, setGoals, setPay } from "@/state/dataSlice";
import { generateID } from "@/utils/helpers";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useEditStore from "./useEditStore";

const useDataStore = () => {
  const dispatch = useDispatch();
  const dataState = useSelector((state) => state.data);
  const { editingCategory } = useEditStore();

  // Default categories to be added, with a flag to identify them
  const defaultCategories = [
    { category: "Groceries", color: "hsl(var(--chart-1))", isDefault: true },
    { category: "Rent/Mortgage", color: "hsl(var(--chart-2))", isDefault: true },
    { category: "Utilities", color: "hsl(var(--chart-3))", isDefault: true },
    { category: "Transportation", color: "hsl(var(--chart-4))", isDefault: true },
    { category: "Dining/Restaurants", color: "hsl(var(--chart-5))", isDefault: true },
    { category: "Entertainment", color: "hsl(var(--chart-6))", isDefault: true },
    { category: "Healthcare", color: "hsl(var(--chart-7))", isDefault: true },
    { category: "Savings", color: "hsl(var(--chart-8))", isDefault: true },
    { category: "Debt Repayment", color: "hsl(var(--chart-9))", isDefault: true },
    { category: "Education", color: "hsl(var(--chart-10))", isDefault: true }
  ];

  // Set default categories if they haven't been set yet
  useEffect(() => {
    const storedData = localStorage.getItem("react_dashboard_data_key");
    const parsedData = storedData ? JSON.parse(storedData) : null;

    if (!parsedData || !parsedData.categories || parsedData.categories.length === 0) {
      const uniqueCategories = defaultCategories.map((category, index) => ({
        ...category,
        id: (index + 1).toString(), // Assign unique IDs based on index
      }));
      dispatch(setCategories(uniqueCategories));
    }
  }, [dispatch]);

  const deleteCategory = useCallback((categoryIds) => {
    const filteredCategories = dataState.categories.filter((cat) => !categoryIds.includes(cat.id));
    dispatch(setCategories(filteredCategories));
  }, [dispatch, dataState]);
  
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
      const filteredExpenses = dataState.expenses.filter((exp) => exp.id !== expenseId);
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
      const filteredGoals = dataState.goals.filter((goa) => goa.id !== goalId);
      dispatch(setGoals(filteredGoals));
    },
    [dispatch, dataState]
  );

  return {
    ...dataState,
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