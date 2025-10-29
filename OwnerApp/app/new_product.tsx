import {useProductsStore} from "@/services/state/ProductsState";
import ProductForm from "@/components/models/product/ProductForm";
import {useState} from "react";
import {ProductBackend} from "@/services/models/product/ProductBackend";
import {router} from "expo-router";
import {FullScreenLoader} from "@/components/custom/loader/FullScreenLoader";
import {Alert} from "@/components/ui/alert";
import {Text} from "@/components/ui/text";
import {VStack} from "@/components/ui/vstack";


function NewProductPage() {
  
  const {addProduct} = useProductsStore();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const submit 
    = async (name: string, variations: string, price: number, imageUrl: string, categories: number[]) => {
    
    setLoading(true);
    setError(null);
    try {
      const newProduct = await ProductBackend.CreateProduct(name, variations, price, imageUrl, categories);
      addProduct(newProduct);
      router.back();
    }
    catch (e) {
      console.error(e);
      setError("Greska pri dodavanju artikla");
    }
    finally {
      setLoading(false);
    }
  }
  
  if (loading) return (
    <FullScreenLoader/>
  )
  
  return (
    <VStack className={"gap-4"}>
      {error && (<Alert><Text>{error}</Text></Alert>)}
      
      <ProductForm onSubmit={(name, variations, basePrice, imageUrl, categories) => {
        submit(name, variations, basePrice, imageUrl, categories);
      }}/>
    </VStack>
  )
}

export default NewProductPage;