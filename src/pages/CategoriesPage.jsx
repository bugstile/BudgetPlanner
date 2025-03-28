import useDataStore from "@/hooks/useDataStore";
import useEditStore from "@/hooks/useEditStore";
import CategoryForm from "../components/form/CategoryForm";
import GenericTable from "../components/ui/data-table";

export default function CategoriesPage() {
  const { categories, deleteCategory } = useDataStore();
  const { editingCategory, updateEditingCategory } = useEditStore();

  const columns = [
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <div>{row.getValue("category")}</div>,
    },
    {
      accessorKey: "color",
      header: "Color",
      cell: ({ row }) => (
        <div style={{ backgroundColor: row.getValue("color"), width: "100px", height: "25px" }} />
      ),
    },
  ];

  const handleDeleteCategory = (categoryId) => {
    console.log(`Deleting category with ID: ${categoryId}`);
    deleteCategory(categoryId); // Delete the category by ID
  };

  const handleDeleteAllSelected = () => {
    if (selectedRowIds.length > 0) {
      console.log("Selected IDs to delete:", selectedRowIds); // Log selected IDs here
  
      // Ensure IDs are in the same format (string) as in localStorage data
      const validSelectedIds = selectedRowIds.map((id) => String(id));
  
      // Log the converted IDs
      console.log("Converted Selected IDs:", validSelectedIds);
  
      validSelectedIds.slice().reverse().forEach((id) => {
        console.log(`Deleting category with ID: ${id}`);
        deleteCategory(id);  // Call deleteCategory with correct ID
      });
    } else {
      console.log("No categories selected for deletion.");
    }
  };

  return (
    <div className="flex items-center flex-col w-full h-full">
      <div className="p-6 pt-12">
        <h1 className="font-semibold text-4xl">Categories</h1>
      </div>

      <CategoryForm editingCategory={editingCategory} />

      <div className="rounded-sm border-none flex min-h-[350px] w-full justify-center p-10 pt-2 items-center">
        <div className="w-full bg-lighterBackground p-8">
          <GenericTable
            data={categories}
            columns={columns}
            onEdit={updateEditingCategory}
            onDelete={handleDeleteCategory} // Single delete function
            deleteAllSelected={handleDeleteAllSelected} // Bulk delete function
            showCheckboxes={true}
            deleteCategory={deleteCategory} // Pass deleteCategory to GenericTable
            deleteMessage={'categories'}
          />
        </div>
      </div>
    </div>
  );
}
