import { Category } from "@/services/types";
import { Card } from "@/components/ui/card";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { LinearGradient } from "expo-linear-gradient";
import {HStack} from "@/components/ui/hstack";
import {EvilIcons} from "@expo/vector-icons";
import ColorUtil from "@/services/general/ColorUtil";

interface CategoryCardProps {
  category: Category;
}

function CategoryCard({ category }: CategoryCardProps) {
  
  //const textColor = ColorUtil.getTextColor(category.color);
  
  return (
    <Pressable>
      <LinearGradient
        colors={["#ffffff", category.color]}  // left → right
        start={{ x: 1.6, y: 0 }}
        end={{ x: -0.5, y: 0 }}
        style={{ 
          flex: 1, 
          justifyContent: "center", 
          padding: 16,
          borderRadius: 16
        }}
      >
        <HStack
          className="items-center justify-between"
        >
          <Text
            size="lg"
            style={{
              fontWeight: "600",
              flexGrow: 1,
              color: "#000000", // force dark text for readability
            }}
          >
            {category.name}
          </Text>
          <EvilIcons name="arrow-right" size={30} color="black" />
        </HStack>
      </LinearGradient>
    </Pressable>
  );
}

export default CategoryCard;
