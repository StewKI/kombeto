import {ProductWithDiscounts} from "@/services/types";
import {useEffect, useMemo, useState} from "react";
import VariationsUtils from "@/services/models/product/VariationsUtils";
import {VStack} from "@/components/ui/vstack";
import {HStack} from "@/components/ui/hstack";
import {Text} from "@/components/ui/text";
import {QuantityInput} from "@/components/custom/QuantityInput";
import {Button, ButtonText} from "@/components/ui/button";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {useCartStore} from "@/services/state/CartState";

interface VariationAdderProps {
  product: ProductWithDiscounts
}

function VariationAdder({product}: VariationAdderProps) {
  
  const { addProductToCart, addVariation } = useCartStore();
  
  const variations = useMemo(() => {
    return VariationsUtils.getVariations(product);
  }, [product])


/* //nije za ovde
  const [quantities, setQuantities] = useState<number[]>([]);
  useEffect(() => {
    const newQuantities = new Array<number>(variations.length).fill(1);
    setQuantities(newQuantities);
  }, [variations]);
  
  const setQuantity = (index: number, n: number) => {
    setQuantities((prevState) => {
      const newState = [...prevState];
      newState[index] = n;
      return newState;
    })
  }*/
  
  const handleAdd = (index: number) => {
    addProductToCart(product, 1);
    addVariation(product.id, variations[index]);
    // TODO: message
  }
  
  return (
    <VStack>
      {variations.map((variation, index) => (
        <HStack key={index}>
          <Text>
            {variation}
          </Text>
          <Button
            className={"h-[30px] mb-5 rounded-lg"}
            onPress={() => handleAdd(index)}
          >
            <ButtonText>Dodaj</ButtonText>
            <FontAwesome
              name="shopping-cart"
              size={20}
              color={"white"}
              className="ml-2"
            />
          </Button>
        </HStack>
      ))}
    </VStack>
  )
}

export default VariationAdder;