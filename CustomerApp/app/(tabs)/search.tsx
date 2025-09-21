import {Text} from "@/components/ui/text";
import {useCategoriesStore} from "@/services/state/CategoriesState";
import {useEffect} from "react";
import CategoryBack from "@/services/models/category/CategoryBack";
import CategoryList from "@/components/models/category/CategoryList";


function SearchTab() {
  
  const { categories, setCategories } = useCategoriesStore();

  useEffect(() => {
    CategoryBack.loadAll().then((categories) => setCategories(categories));
  }, []);
  
  return (
    <>
      <CategoryList categories={categories}/>
    </>
  )
}

export default SearchTab