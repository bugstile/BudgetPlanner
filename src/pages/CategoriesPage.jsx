import CategoryForm from "../components/form/CategoryForm"
import CategoryCard from "@/components/form/CategoryCard"

export default function CategoriesPage() {
  return <div>
        <CategoryForm/>
        <CategoryCard color="#000" category="Food"/>
  </div>;
}
