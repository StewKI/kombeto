import {QuantityInput} from "@/components/custom/QuantityInput";
import {useCartStore} from "@/services/state/CartState";
import {CartItem} from "@/services/types";
import {HStack} from "@/components/ui/hstack";
import {Text} from "@/components/ui/text";


interface FullViewProps {
  item: CartItem,
  totalPrice: number,
}

function FullView({item, totalPrice}: FullViewProps) {

  const {removeItem, updateQuantity} = useCartStore();

  return (
    <>
      <HStack className="mt-5 items-center justify-between" space={"md"}>
        <HStack className="items-center">
          <Text>Količina: </Text>
          <QuantityInput size="md" value={item.quantity} onChange={(n) => {
            updateQuantity(item.id, n);
          }}/>
        </HStack>

        <Text size="lg" bold>{totalPrice.toFixed(2)} RSD</Text>
      </HStack>
    </>
  )
}

export default FullView