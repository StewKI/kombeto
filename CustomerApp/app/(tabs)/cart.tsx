import {useCartStore} from "@/services/state/CartState";
import CartList from "@/components/models/cart/CartList";
import EmptyCart from "@/components/models/cart/EmptyCart";
import {VStack} from "@/components/ui/vstack";
import {ScrollView} from "react-native";
import CartSummary from "@/components/models/cart/CartSummary";
import {Box} from "@/components/ui/box";
import YesNoDialog from "@/components/custom/diaolog/YesNoDialog";
import {useState} from "react";
import {CartItem} from "@/services/types";
import {Text} from "@/components/ui/text";



function CartTab() {
  
  const {cartItems, removeItem} = useCartStore();

  const [removingItem, setRemovingItem] = useState<CartItem | null>(null);
  
  if (cartItems.length === 0) {
    return (
      <EmptyCart/>
    )
  }
  
  return (
    <>
      <YesNoDialog 
        show={removingItem !== null} 
        title={"Ukloniti artikal iz korpe?"} 
        onYes={() => {
          if (removingItem) {
            removeItem(removingItem.id);
          }
          setRemovingItem(null);
        }} 
        onNo={() => setRemovingItem(null)}
      >
        <Text className="italic">{removingItem?.name ?? ""}</Text>
      </YesNoDialog>
      
      <ScrollView>
        <CartList items={cartItems} onRemove={(item) => setRemovingItem(item)}/>
      </ScrollView>
      <Box className="h-3"/>
      <CartSummary cartItems={cartItems}/>
    </>
  )
}

export default CartTab