import {ProductWithDiscounts} from "@/services/types";

import {Text} from "@/components/ui/text";
import {QuantityInput} from "@/components/custom/QuantityInput";
import {Button, ButtonIcon, ButtonText} from "@/components/ui/button";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {useState} from "react";
import {useCartStore} from "@/services/state/CartState";
import {VStack} from "@/components/ui/vstack";
import {HStack} from "@/components/ui/hstack";
import MessageService from "@/services/general/MessageService";
import {useMsgStore} from "@/services/state/MsgState";

interface FullAdderProps {
  product: ProductWithDiscounts
}

function FullAdder({product}: FullAdderProps) {

  const [quantity, setQuantity] = useState(1);

  const {addProductToCart} = useCartStore();
  
  const {displayMsg} = useMsgStore();

  function handleAdd() {
    addProductToCart(product, quantity);
    displayMsg("Uspešno", (
      <>
        <Text>Dodato u korpu:</Text>
        <HStack className="gap-1 flex-wrap">
          <Text className="italic">{quantity}kom</Text>
          <Text bold> {product.name}</Text>
        </HStack>
      </>
    ))
  }


  return (
    <VStack className="w-full">
      <HStack className="mb-4">
        <Text className="align-middle">Količina:</Text>
        <QuantityInput size="lg" value={quantity} onChange={(n) => setQuantity(n)}/>
      </HStack>
      <Button
        className={"w-full h-[50px] mb-5 rounded-lg"}
        onPress={() => handleAdd()}
      >
        <ButtonText>Dodaj u korpu</ButtonText>
        <FontAwesome
          name="shopping-cart"
          size={20}
          color={"white"}
          className="ml-2"
        />
      </Button>
    </VStack>
  )
}

export default FullAdder