import {useEffect, useState} from "react";
import {ProductSectionData, ProductWithDiscounts} from "@/services/types";
import ProductBackend from "@/services/models/product/ProductBackend";
import ProductGrid from "@/components/models/product/ProductGrid";
import {Button, ButtonText} from "@/components/ui/button";
import Modals from "@/components/custom/Modals";
import {Text} from "@/components/ui/text";
import {Box} from "@/components/ui/box";
import ProductSection from "@/components/models/product/ProductSection";
import {ScrollView} from "react-native";
import {FullScreenLoader} from "@/components/custom/FullScreenLoader";


export default function TabOneScreen() {
  
  const [sections, setSections] = useState<ProductSectionData[]>([])
  
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    setError(null);
    try {
      const loaded = await ProductBackend.GetHome();
      setSections(loaded);
    }
    catch (err) {
      setError("Greška pri učitavanju");
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
      {loading && <FullScreenLoader/>}
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
      <Modals/>
      <ScrollView>
        {sections.map((productSection, index) => (
          <ProductSection key={index} data={productSection}/>
        ))}
        <Box className="mt-5"/>
      </ScrollView>
    </>
  );
}

