import CategoryForm from "../components/form/CategoryForm"
import CategoryCard from "@/components/form/CategoryCard"

export default function CategoriesPage() {
  return (
    
    <div className="flex items-center flex-col w-full h-full">

      <div className="p-4"> 
        <h1 className="font-semibold text-2xl">Categories</h1>
      </div>

      <CategoryForm/>

      <div className="flex-row flex max-w-3xl flex-wrap">
        <CategoryCard color="#000" category="Food"/>
        <CategoryCard color="#000" category="Food"/>
        <CategoryCard color="#000" category="Food"/>
        <CategoryCard color="#000" category="Food"/>
        <CategoryCard color="#000" category="Food"/>
        <CategoryCard color="#000" category="Food"/>
        <CategoryCard color="#000" category="Food"/>
        <CategoryCard color="#000" category="Food"/>
        <CategoryCard color="#000" category="Food"/>
        <CategoryCard color="#000" category="Food"/>
        <CategoryCard color="#000" category="Food"/>
        <CategoryCard color="#000" category="Food"/>
        <CategoryCard color="#000" category="Food"/>
        <CategoryCard color="#000" category="Food"/>
      </div>
      
    </div>
  )
}
