import CartList from "@/components/models/cart/CartList";
import {useCartStore} from "@/services/state/CartState";
import {ScrollView} from "react-native";
import CartSummary from "@/components/models/cart/CartSummary";


function NewInternalOrderTab() {
  
  const items = useCartStore(state => state.cartItems);
  const removeItem = useCartStore(state => state.removeItem)
  
  
  return (
    <>
      <CartSummary cartItems={items}/>
      <ScrollView>
        <CartList items={items} onRemove={(item) => {
          removeItem(item.id)
        }}/>
      </ScrollView>
    </>
  )
}

export default NewInternalOrderTab;