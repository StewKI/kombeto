import {Category} from "@/services/types";
import {Card} from "@/components/ui/card";
import {Pressable} from "@/components/ui/pressable";
import {Text} from "@/components/ui/text";

interface CategoryCardProps {
  category: Category
}

function CategoryCard({category}: CategoryCardProps) {
  
  return (
    <Pressable>
      <Card size="lg" className="">
        <Text style={{fontStyle: "italic"}} size="lg">
          {category.name}
        </Text>
      </Card>
    </Pressable>
  )
}

export default CategoryCard;