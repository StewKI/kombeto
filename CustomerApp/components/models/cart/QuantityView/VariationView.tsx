import {QuantityInput, QuantityInputSimple} from "@/components/custom/QuantityInput";
import {useCartStore} from "@/services/state/CartState";
import {CartItem} from "@/services/types";
import {HStack} from "@/components/ui/hstack";
import {Text} from "@/components/ui/text";
import {useEffect, useMemo, useState} from "react";
import VariationsUtils from "@/services/models/product/VariationsUtils";
import {useMsgStore} from "@/services/state/MsgState";


interface FullViewProps {
  item: CartItem,
  totalPrice: number,
}

function VariationView({item, totalPrice}: FullViewProps) {

  const {cartItems, addProductToCart, addVariation, removeVariation, getVariationCount} = useCartStore();


  const variations = useMemo(() => {
    return VariationsUtils.getVariations(item);
  }, [item])
  
  const quantities = useMemo<number[]>(() => {
    let arr = new Array<number>();
    
    variations.forEach((variation) => {
      const n = getVariationCount(item.id, variation);
      arr.push(n);
    })
    
    return arr;
  }, [cartItems, variations])

  const {displayMsg} = useMsgStore();

  const notifyIncreased = (variation: string) => {
    displayMsg("Količina povećana", (
      <>
        <Text>{item.name}</Text>
        <HStack className="mt-1">
          <Text className="italic mr-2">Opcija:</Text>
          <Text bold>{variation}</Text>
        </HStack>
      </>
    ))
  }

  const notifyDecreased = (variation: string) => {
    displayMsg("Količina smanjena", (
      <>
        <Text>{item.name}</Text>
        <HStack className="mt-1">
          <Text className="italic mr-2">Opcija:</Text>
          <Text bold>{variation}</Text>
        </HStack>
      </>
    ))
  }

  return (
    <>
      {variations.map((variation, index) => (
        <HStack key={index} className="mt-5 items-center justify-between" space={"md"}>
          <HStack className="items-center">
            <Text>{variation}: </Text>
            <QuantityInputSimple 
              size="md" 
              value={quantities[index]}
              onPlus={() => {
                notifyIncreased(variation);
                addProductToCart(item, 1);
                addVariation(item.id, variation);
              }}
              onMinus={() => {
                notifyDecreased(variation);
                addProductToCart(item, -1);
                removeVariation(item.id, variation);
              }}
            />
          </HStack>

          <Text size="lg" bold>{(totalPrice*quantities[index]).toFixed(2)} RSD</Text>
        </HStack>
      ))}
    </>
  )
}

export default VariationView