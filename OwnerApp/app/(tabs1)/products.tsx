import {useProductsStore} from "@/services/state/ProductsState";
import {useEffect, useMemo, useState} from "react";
import {ProductBackend} from "@/services/models/product/ProductBackend";
import {FlatList} from "react-native";
import ProductCard from "@/components/models/product/ProductCard";
import {VStack} from "@/components/ui/vstack";
import {Button, ButtonText} from "@/components/ui/button";
import {router} from "expo-router";
import {Box} from "@/components/ui/box";
import {Heading} from "@/components/ui/heading";
import {useCategoriesStore} from "@/services/state/CategoriesState";
import CategoryBack from "@/services/models/category/CategoryBack";
import {HStack} from "@/components/ui/hstack";
import {SearchInput} from "@/components/models/product/inputs/SearchInput";
import CategoryMultiSelect from "@/components/models/product/inputs/CategoryMultiSelect";
import AddToCart from "@/components/models/cart/AddToCart";
import MsgDialog from "@/components/custom/diaolog/MsgDialog";
import Modals from "@/components/custom/Modals";


function ProductsTab() {
  
  const {products, setProducts} = useProductsStore();
  const {allCategories, setAllCategories} = useCategoriesStore();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [filterString, setFilterString] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  
  const filteredProducts = useMemo(() => {
    
    let filtered = products;
    
    if (filterString !== "") {
      filtered = filtered.filter(product => {
        return product.name.toLowerCase().includes(filterString.toLowerCase());
      });
    }
    
    if (selectedIds.length > 0) {
      filtered = filtered.filter(products => {
        return selectedIds.some(id => products.categories.includes(id));
      })
    }

    return filtered;
  }, [filterString, products, selectedIds]);

  
  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const products = await ProductBackend.GetProducts();
      setProducts(products);
      
      const categories = await CategoryBack.loadAll();
      setAllCategories(categories);
    }
    catch (e) {
      console.error(e);
      setError("Greska pri ucitavanju proizvoda");
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);
  
  return (
    <>
      <VStack className="p-4 gap-4">

        <CategoryMultiSelect selectedIds={selectedIds} categories={allCategories} onChange={(cats) => {setSelectedIds(cats)}}/>

        <HStack className="justify-between align-middle">
          <Heading className="align-middle">Artikli:</Heading>
          <SearchInput onSearch={(val) => setFilterString(val)}/>
        </HStack>


        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <ProductCard product={item} toAdd={true}/>
          )}
          contentContainerStyle={{paddingBottom: 200}}
        />
      </VStack>
    </>
    
  )
}

export default ProductsTab;