import SpendingsForm from "../components/spendings/SpendingsForm";
import useEditStore from "@/hooks/useEditStore";
import GenericTable from "@/components/ui/data-table";
import useDataStore from "@/hooks/useDataStore";

export default function SpendingsPage() {
  const { expenses, deleteExpense } = useDataStore();
  const { editingExpense, updateEditingExpense } = useEditStore();

  const columns = [
    {
      accessorKey: "spendingCategory",
      header: "Category",
      cell: ({ row }) => <div>{row.getValue("spendingCategory")}</div>,
    },
    {
      accessorKey: "dateSpent",
      header: "Date",
      cell: ({ row }) => <div>{row.getValue("dateSpent")}</div>,
    },
    {
      accessorKey: "expense",
      header: "Amount",
      cell: ({ row }) => <div>${row.getValue("expense")}</div>,
    },
  ];

  // Function to handle editing
  const handleEditExpense = (expense) => {
    updateEditingExpense(expense); // Update the editing expense in the store
  };

  // Function to delete a specific expense
  const handleDeleteExpense = (expenseId) => {
    console.log(`Deleting expense with ID: ${expenseId}`); // Debugging log
    deleteExpense(expenseId); // Call the delete function with the expense ID
  };

  // Function to delete selected expenses (bulk delete)
  const handleDeleteSelectedExpenses = (selectedIds) => {
    console.log("Selected IDs for deletion:", selectedIds); // Debugging log
    selectedIds.forEach((id) => {
      console.log(`Deleting expense with ID: ${id}`); // Debugging log
      deleteExpense(id); // Call the delete function for each selected expense ID
    });
  };


  return (
    <div className="flex items-center flex-col w-full h-full">
      <div className="p-6 pt-12">
        <h1 className="font-semibold text-4xl">Spendings</h1>
      </div>

      <div className="rounded-sm border-none flex min-h-[350px] w-full justify-center p-10 items-center">
        <div className="w-full bg-lighterBackground p-8">
        <SpendingsForm editingExpense={editingExpense} />
        </div>
      </div>
      <div className="rounded-sm border-none flex min-h-[350px] w-full justify-center p-10 pt-2 items-center">
        <div className="w-full bg-lighterBackground p-8">
          <GenericTable
            data={expenses}
            columns={columns}
            onEdit={handleEditExpense} // Handle edit when a row is selected
            onDelete={handleDeleteExpense} // Handle delete for a single expense
            deleteAllSelected={handleDeleteSelectedExpenses} // Handle delete for selected rows
            showCheckboxes={true}
            enablePagination={true}
            deleteCategory={deleteExpense}
            deleteMessage="expenses" // Custom message for expenses
          />
        </div>
      </div>
    </div>
  );
}