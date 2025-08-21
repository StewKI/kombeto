import {StyleSheet, View, Text} from 'react-native';
import {useEffect, useState} from "react";
import {Product} from "@/services/types";
import ProductBackend from "@/services/models/product/ProductBackend";
import ProductList from "@/components/models/product/ProductList";
import {Button, ButtonText} from "@/components/ui/button";


export default function TabOneScreen() {
  
  const [products, setProducts] = useState<Product[]>([])
  
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    setError(null);
    try {
      const loaded = await ProductBackend.Get();
      setProducts(loaded);
    }
    catch (err) {
      setError("Greska pri ucitavanju");
      console.error(err);
    }
    finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    
    load()
  }, [])
  
  return (
    <>
      {loading && <Text>Loading...</Text>}
      {error && (
        <>
          <Text>{error}</Text>
          <Button onPress={() => {
            load()
          }}>
            <ButtonText>Ponovo</ButtonText>
          </Button>
        </>
      )}
      <ProductList products={products}/>
    </>
  );
}

