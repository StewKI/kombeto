import {Category} from "@/services/types";
import {VStack} from "@/components/ui/vstack";
import CategoryCard from "@/components/models/category/CategoryCard";
import {ScrollView} from "react-native";

interface CategoryListProps {
  categories: Category[]
}

function CategoryList({categories}: CategoryListProps) {
  
  
  return (
    <ScrollView>
      <VStack space={"md"} className="p-3">
        {categories.map(category => (
          <CategoryCard key={category.id} category={category}/>
        ))}
      </VStack>  
    </ScrollView>
    
  )
}

export default CategoryList;