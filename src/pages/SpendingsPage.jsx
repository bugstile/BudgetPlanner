import SpendingsForm from "../components/spendings/SpendingsForm";
import SpendingsList from "../components/spendings/SpendingsList";
import useEditStore from "@/hooks/useEditStore";

export default function SpendingsPage() {

  const { editingExpense } = useEditStore();

  return (
    <div className="flex flex-col gap-y-12 px-8 py-4 pb-8 w-full">
      <SpendingsForm editingExpense={editingExpense}></SpendingsForm>
      <SpendingsList></SpendingsList>
    </div>
  );
}