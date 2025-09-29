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
import {Card} from "@/components/ui/card";
import MessageService from "@/services/general/MessageService";
import {Heading} from "@/components/ui/heading";
import {useMsgStore} from "@/services/state/MsgState";

interface VariationAdderProps {
  product: ProductWithDiscounts
}

function VariationAdder({product}: VariationAdderProps) {
  
  const { addProductToCart, addVariation } = useCartStore();
  
  const {displayMsg} = useMsgStore();
  
  const variations = useMemo(() => {
    return VariationsUtils.getVariations(product);
  }, [product])
  
  const handleAdd = (index: number) => {
    addProductToCart(product, 1);
    addVariation(product.id, variations[index]);
    displayMsg("Uspešno", (
      <>
        <Text>Dodato u korpu:</Text>
        <HStack className="gap-1 flex-wrap">
          <Text className="italic" bold>{variations[index]}</Text>
          <Text bold>{product.name}</Text>
        </HStack>
      </>
    ))
  }
  
  return (
    <VStack className="mt-4">
      <Heading className="mb-2">Opcije:</Heading>
      {variations.map((variation, index) => (
          <Card key={index} variant="filled" size="sm" className="mb-4">
              <HStack className="justify-between">
                  <Text className="align-middle">
                      {variation}
                  </Text>
                  <Button
                      className={"h-[40px] rounded-lg"}
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
          </Card>
      ))}
    </VStack>
  )
}

export default VariationAdder;