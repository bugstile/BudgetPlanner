import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import useDataStore from "@/hooks/useDataStore";
import useEditStore from "@/hooks/useEditStore";

export default function CategoryCard({ category }) {
  const { deleteCategory } = useDataStore();
  const { updateEditingCategory } = useEditStore();

  return (
    <div>
      <Card className="flex flex-col gap-y-2 p-4 shadow-md rounded-md bg-card">
        <div className="h-4 rounded" style={{ backgroundColor: category.color }}></div>
        <CardContent className="font-medium text-card-foreground">
          <CardTitle className="text-card-foreground">{category.category}</CardTitle>
        </CardContent>
        <CardFooter className="p-0">
          <button className="bg-slate-300 px-2 text-xs py-0 my-0 rounded-md" onClick={() => updateEditingCategory(category)}>Edit</button>
          <button className="bg-red-500 px-2 text-xs py-0 my-0 rounded-md" onClick={() => deleteCategory(category.id)}>Delete</button>
        </CardFooter>
      </Card>
    </div>
  );
}