import {CartItem} from "@/services/types";
import CartItemCard from "@/components/models/cart/CartItemCard";
import {VStack} from "@/components/ui/vstack";
import {ScrollView} from "react-native";

interface CartListProps {
  items: CartItem[]
}

function CartList({items}: CartListProps) {
  return (
    <VStack space="2xl" className="p-3">
      {items.map((item) => (
        <CartItemCard key={item.id} item={item}/>
      ))}
    </VStack>
  )
}

export default CartList;