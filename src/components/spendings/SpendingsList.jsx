import useDataStore from "@/hooks/useDataStore";
import React from "react";
import SpendingsCard from "./SpendingsCard";

export default function SpendingsList() {
  const { expenses } = useDataStore();
  return (
    <ul className="flex flex-wrap gap-12 p-8">
      {expenses.map((expense) => {
        return <SpendingsCard key={expense.id} expense={expense} />;
      })}
    </ul>
  );
}
