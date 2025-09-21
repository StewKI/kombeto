import {Category} from "@/services/types";
import {VStack} from "@/components/ui/vstack";
import CategoryCard from "@/components/models/category/CategoryCard";

interface CategoryListProps {
  categories: Category[]
}

function CategoryList({categories}: CategoryListProps) {
  
  
  return (
    <VStack space={"md"} className="p-3">
      {categories.map(category => (
        <CategoryCard key={category.id} category={category}/>
      ))}
    </VStack>
  )
}

export default CategoryList;