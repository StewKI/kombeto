import {useCartStore} from "@/services/state/CartState";
import CartList from "@/components/models/cart/CartList";
import EmptyCart from "@/components/models/cart/EmptyCart";



function CartTab() {
  
  const {cartItems, clearCart} = useCartStore();
  
  if (cartItems.length === 0) {
    return (
      <EmptyCart/>
    )
  }
  
  return (
    <>
      <CartList items={cartItems}/>
    </>
  )
}

export default CartTab