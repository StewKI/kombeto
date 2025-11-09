import {Product} from "@/services/types";
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
import IntegerInput from "@/components/models/product/inputs/IntegerInput";

interface VariationAdderProps {
  product: Product
}

function VariationAdder({product}: VariationAdderProps) {

  const [quantity, setQuantity] = useState(1);
  
  const { addProductToCart, addVariation } = useCartStore();

  const {displayMsg} = useMsgStore();

  const variations = useMemo(() => {
    return VariationsUtils.getVariations(product);
  }, [product])

  const handleAdd = (index: number) => {
    addProductToCart(product, 1);
    addVariation(product.id, variations[index], quantity);
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
      <HStack className="gap-4 flex-wrap mb-4">
        <Text className="align-middle">Količina:</Text>
        <IntegerInput value={quantity} onChange={(n) => setQuantity(n)}/>
      </HStack>
      <Heading className="mb-2">Opcije:</Heading>
      {variations.map((variation, index) => (
        <Card key={index} variant="filled" size="sm" className="mb-4">
          <HStack className="justify-between gap-3">
            <Text className="align-middle">
              {variation}
            </Text>
            <Button
              className={"h-[40px] rounded-lg"}
              onPress={() => handleAdd(index)}
            >
              <ButtonText>Dodaj</ButtonText>
              <FontAwesome
                name="pencil"
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