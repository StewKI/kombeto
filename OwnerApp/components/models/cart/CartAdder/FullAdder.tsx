import {Product} from "@/services/types";

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
import IntegerInput from "@/components/models/product/inputs/IntegerInput";

interface FullAdderProps {
  product: Product
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
    <VStack>
      <HStack className="my-4 gap-5 items-center">
        <Text className="align-middle">Količina:</Text>
        <IntegerInput value={quantity} onChange={(n) => setQuantity(n)}/>
        <Button
          className={"h-[50px] rounded-lg"}
          onPress={() => handleAdd()}
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
    </VStack>
  )
}

export default FullAdder