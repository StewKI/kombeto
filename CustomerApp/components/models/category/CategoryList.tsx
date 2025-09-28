import {Category} from "@/services/types";
import {VStack} from "@/components/ui/vstack";
import CategoryCard from "@/components/models/category/CategoryCard";
import {Pressable, ScrollView} from "react-native";
import {useCategoriesStore} from "@/services/state/CategoriesState";
import {useEffect, useState} from "react";
import CategoryBack from "@/services/models/category/CategoryBack";
import {FullScreenLoader} from "@/components/custom/loader/FullScreenLoader";
import {Text} from "@/components/ui/text";
import {Center} from "@/components/ui/center";
import {Button, ButtonText} from "@/components/ui/button";

interface CategoryListProps {
  onSelect: (category: Category | "all") => void;
}

function CategoryList({onSelect}: CategoryListProps) {
  
  const { categories, setCategories } = useCategoriesStore();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const categoriesRes = await CategoryBack.loadAll();
      setCategories(categoriesRes);
    }
    catch (error) {
      setError("Greška pri učitavanju kategorija.");
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    if (categories.length === 0) load();
  }, []);
  
  
  return (
    <>
      {loading && <FullScreenLoader/>}
      {error ? (
        <Center>
          <Text className="text-error-100">{error}</Text>
          <Button onPress={() => load()}>
            <ButtonText>Pokušaj ponovo</ButtonText>
          </Button>
        </Center>
        ) : (

        <ScrollView>
          <VStack space={"md"} className="p-3">

            <CategoryCard category={categoryAll} onPress={() => onSelect("all")}/>

            {categories.map(category => (
              <CategoryCard key={category.id} category={category} onPress={(category) => onSelect(category)}/>
            ))}
          </VStack>
        </ScrollView>
        
      )}
      
    </>
    
    
  )
}

export default CategoryList;


export const categoryAll: Category = {
  id: -1,
  name: "SVE",
  color: "#55B"
}