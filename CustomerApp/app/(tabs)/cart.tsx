import {useCartStore} from "@/services/state/CartState";
import CartList from "@/components/models/cart/CartList";
import EmptyCart from "@/components/models/cart/EmptyCart";
import {VStack} from "@/components/ui/vstack";
import {ScrollView} from "react-native";
import CartSummary from "@/components/models/cart/CartSummary";
import {Box} from "@/components/ui/box";



function CartTab() {
  
  const {cartItems, clearCart} = useCartStore();
  
  if (cartItems.length === 0) {
    return (
      <EmptyCart/>
    )
  }
  
  return (
    <>
      <ScrollView>
        <CartList items={cartItems}/>
      </ScrollView>
      <Box className="h-3"/>
      <CartSummary cartItems={cartItems}/>
    </>
  )
}

export default CartTab