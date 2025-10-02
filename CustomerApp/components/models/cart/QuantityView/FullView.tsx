import {QuantityInput} from "@/components/custom/QuantityInput";
import {useCartStore} from "@/services/state/CartState";
import {CartItem} from "@/services/types";
import {HStack} from "@/components/ui/hstack";
import {Text} from "@/components/ui/text";
import {useMsgStore} from "@/services/state/MsgState";


interface FullViewProps {
  item: CartItem,
  totalPrice: number,
}

function FullView({item, totalPrice}: FullViewProps) {

  const {updateQuantity} = useCartStore();
  
  const {displayMsg} = useMsgStore();
  
  const notifyIncreased = () => {
    displayMsg("Količina povećana", (
      <Text>{item.name}</Text>
    ))
  }

  const notifyDecreased = () => {
    displayMsg("Količina smanjena", (
      <Text>{item.name}</Text>
    ))
  }
  
  const update = (newQuantity: number) => {
    
    if (newQuantity > item.quantity) {
      notifyIncreased();
    } else if (newQuantity < item.quantity) {
      notifyDecreased();
    }
    
    if (newQuantity < 1) {
      newQuantity = 1;
    }
    
    updateQuantity(item.id, newQuantity);
  }

  return (
    <>
      <HStack className="mt-5 items-center justify-between" space={"md"}>
        <HStack className="items-center">
          <Text>Količina: </Text>
          <QuantityInput size="md" value={item.quantity} onChange={(n) => {
            update(n)
          }}/>
        </HStack>

        <Text size="lg" bold>{totalPrice.toFixed(2)} RSD</Text>
      </HStack>
    </>
  )
}

export default FullView