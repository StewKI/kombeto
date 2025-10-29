import {Product} from "@/services/types";
import {VStack} from "@/components/ui/vstack";
import {Heading} from "@/components/ui/heading";
import {HStack} from "@/components/ui/hstack";
import {Text} from "@/components/ui/text";
import StatusService from "@/services/models/status/StatusService";
import {Card} from "@/components/ui/card";
import {Image} from "@/components/ui/image";
import {useMemo} from "react";
import VariationsUtils from "@/services/models/product/VariationsUtils";
import {Button, ButtonText} from "@/components/ui/button";
import {useProductsStore} from "@/services/state/ProductsState";
import {router} from "expo-router";

interface ProductCardProps {
  product: Product
}

function ProductCard({product}: ProductCardProps) {
  
  const setEditProduct = useProductsStore(state => state.setEditProduct);
  
  const haveVars = useMemo(() => VariationsUtils.containsVariations(product), [product]) 
  
  const varsString = useMemo(() => {
    const vars = VariationsUtils.getVariations(product);
    return vars.join(", ");
  }, [product])
  
  return (
    <Card className="mb-4">
      <HStack>
        <Image
          source={product.imageUrl}
          alt={product.name}
          size="none"
          resizeMode="contain"
          borderRadius={5}
          className="aspect-[1/1] h-32"
        />
        <VStack className="gap-1">
          <Heading>{product.name}</Heading>
          {haveVars && (
            <HStack className="gap-2">
              <Text>Varijante:</Text>
              <Text bold>{varsString}</Text>
            </HStack>
          )}
          
          <HStack className="gap-2">
            <Text>Osnovna cena:</Text>
            <Text bold>{product.basePrice.toFixed(2)} RSD</Text>
          </HStack>
          <HStack className="gap-2">
            <Text>Cena:</Text>
            <Text bold>{product.price.toFixed(2)} RSD</Text>
          </HStack>
          <HStack className={""}>
            <Button onPress={() => {
              setEditProduct(product);
              router.push("/edit_product");
            }}>
              <ButtonText>
                Izmeni
              </ButtonText>
            </Button>
          </HStack>
        </VStack>
      </HStack>
      
    </Card>
  )
}

export default ProductCard