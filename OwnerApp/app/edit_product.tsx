import {useProductsStore} from "@/services/state/ProductsState";
import ProductForm from "@/components/models/product/ProductForm";
import {useState} from "react";
import {ProductBackend} from "@/services/models/product/ProductBackend";
import {FullScreenLoader} from "@/components/custom/loader/FullScreenLoader";
import {VStack} from "@/components/ui/vstack";
import {Alert} from "@/components/ui/alert";
import {Text} from "@/components/ui/text";
import {router} from "expo-router";


function EditProductPage() {
  
  const {editProduct, updateProduct} = useProductsStore();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const submit 
    = async (name: string, variations: string, price: number, imageUrl: string, categories: number[]) => {
    
    if (editProduct === undefined) return;
    
    setLoading(true);
    setError(null);
    try {
      const updated = await ProductBackend.UpdateProduct({
        id: editProduct.id,
        name,
        variations,
        price,
        imageUrl,
        categories,
        basePrice: 0
      });
      updateProduct(updated);
      router.back();
    }
    catch (e) {
      console.error(e);
      setError("Greska pri cuvanju promena");
    }
    finally {
      setLoading(false);
    }
  }
  
  if (loading) return (<FullScreenLoader/>);
  
  return (
    <VStack className="gap-4">
      {error && (<Alert><Text>{error}</Text></Alert>)}
      
      <ProductForm 
        btnText={"Sačuvaj"}
        product={editProduct} 
        onSubmit={(name, variations, basePrice, imageUrl, categories) => {
          submit(name, variations, basePrice, imageUrl, categories);
        }}
      />
    </VStack>
  )
}

export default EditProductPage;