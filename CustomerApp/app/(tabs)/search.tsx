import {Text} from "@/components/ui/text";
import {useCategoriesStore} from "@/services/state/CategoriesState";
import {useEffect, useState} from "react";
import CategoryBack from "@/services/models/category/CategoryBack";
import CategoryList from "@/components/models/category/CategoryList";
import {useSearchTabStore} from "@/services/state/SearchTabState";
import ProductSearchView from "@/components/models/search/ProductSearchView";


function SearchTab() {
  
  const { selectedCategory, setSelectedCategory } = useSearchTabStore();
  
  
  return (
    <>
      {selectedCategory ? (
        <ProductSearchView />
      ) : (
        <CategoryList
          onSelect={(category) => {
            setSelectedCategory(category);
          }}
        />
      )}
    </>
  )
}

export default SearchTab