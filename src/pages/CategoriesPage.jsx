import useDataStore from "@/hooks/useDataStore";
import CategoryForm from "../components/form/CategoryForm";
import useEditStore from "@/hooks/useEditStore";
import GenericTable from "../components/ui/data-table";

export default function CategoriesPage() {
  const { categories } = useDataStore(); // Fetch categories from your store
  const { editingCategory } = useEditStore();
  const { deleteCategory } = useDataStore();
  const { updateEditingCategory } = useEditStore();

  return (
    <div className="flex items-center flex-col w-full h-full">
      <div className="p-4">
        <h1 className="font-semibold text-2xl">Categories</h1>
      </div>

      <CategoryForm editingCategory={editingCategory} />

      <div className="flex min-h-[350px] w-full justify-center p-10 items-center">
        <GenericTable 
          categories={categories} 
          deleteCategory={deleteCategory} 
          updateEditingCategory={updateEditingCategory} 
        />
      </div>
    </div>
  );
}
