import { Button } from "@/components/ui/button";
import useDataStore from "@/hooks/useDataStore";
import useEditStore from "@/hooks/useEditStore";

export default function SpendingsCard({ expense }) {
  const { deleteExpense } = useDataStore();
  const { updateEditingExpense } = useEditStore();

  return (
    <div className="flex flex-col gap-y-2 p-4 shadow-md rounded-md bg-slate-100">
      <p>
        <span className="font-semibold">{expense.spendingCategory}</span> -&nbsp;
        <span className="font-semibold">{expense.dateSpent}</span>
      </p>
      <p className="font-medium text-gray-600">${expense.totalAmount}</p>
      <div className="mt-8">
        <Button onClick={() => deleteExpense(expense.id)} variant="destructive">
          Delete
        </Button>
        <Button onClick={() => updateEditingExpense(expense)}>Edit</Button>
      </div>
    </div>
  );
}
