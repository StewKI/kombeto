import {Text} from "@/components/ui/text";
import {Center} from "@/components/ui/center";
import {VStack} from "@/components/ui/vstack";
import {useCartStore} from "@/services/state/CartState";
import OrderItemsOverview from "@/components/models/order/OrderItemsOverview";
import {Heading} from "@/components/ui/heading";
import {ScrollView} from "react-native";
import {useMemo, useState} from "react";
import {useCustomerStore} from "@/services/state/CustomerState";
import {Card} from "@/components/ui/card";
import CartUtil from "@/services/models/cart/CartUtil";
import DiscountUtil from "@/services/models/discount/DiscountUtil";
import {HStack} from "@/components/ui/hstack";
import {Button, ButtonText} from "@/components/ui/button";
import {Textarea, TextareaInput} from "@/components/ui/textarea";
import TotalPriceView from "@/components/models/order/TotalPriceView";
import OrderDetailsForm from "@/components/models/order/OrderDetailsForm";
import YesNoDialog from "@/components/custom/diaolog/YesNoDialog";
import {FullScreenLoader} from "@/components/custom/loader/FullScreenLoader";
import OrderBackend from "@/services/models/order/OrderBackend";
import {useMsgStore} from "@/services/state/MsgState";
import MsgDialog from "@/components/custom/diaolog/MsgDialog";
import {router} from "expo-router";
import KeyboardAware from "@/components/custom/KeyboardAware";


function PlaceOrderScreen() {
  
  const { cartItems, clearCart } = useCartStore();
  const { customer } = useCustomerStore();
  
  const hasDiscount = useMemo(() => {
    return customer.discount > 0.00;
  }, [customer])
  
  const price = useMemo(() => {
    return CartUtil.TotalSum(cartItems);
  }, [customer])
  
  const totalPrice = useMemo(() => {
    if (hasDiscount) {
      return DiscountUtil.applyOne(price, customer.discount);
    }
    return price;
  }, [hasDiscount, price])
  
  const [note, setNote] = useState<string>("");
  
  const {displayMsg} = useMsgStore();
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handlePlace = async () => {
    setShowDialog(false);
    setLoading(true);
    try {
      await OrderBackend.Place(customer.id, cartItems, note);
      //success
      setShowSuccess(true);
    }
    catch (e){
      console.error(e);
      displayMsg("Greška!", (
        <Text>Greška pri slanju porudžbine, proverite internet konekciju</Text>
      ))
    }
    finally {
      setLoading(false);
    }
  }
  
  return (
    <>
      {loading && <FullScreenLoader/>}
      
      <MsgDialog show={showSuccess} title="Uspešno" onOk={() => {
        clearCart();
        router.back();
      }}>
        <Text>Porudžbina uspešno poslata!</Text>
      </MsgDialog>
      
      <YesNoDialog 
        show={showDialog} 
        title="Potvrda porudžbine" 
        onYes={() => handlePlace()} 
        onNo={() => setShowDialog(false)}
      >
        <>
          <Text>Da li potvrđujete vašu porudžbinu od </Text>
          <Text bold>{totalPrice.toFixed(2)} RSD</Text>
        </>
      </YesNoDialog>
      
      <KeyboardAware>
        <VStack className="px-4 flex-1">
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled">

            <Heading className="text-center mb-1.5 mt-4">Pregled artikala:</Heading>
            <OrderItemsOverview items={cartItems}/>

            <Heading className="text-center mb-1.5 mt-4">Ukupno:</Heading>
            <TotalPriceView
              hasDiscount={hasDiscount}
              discount={customer.discount}
              price={price}
              totalPrice={totalPrice}
            />

            <Heading className="text-center mb-1.5 mt-4">Porudžbina:</Heading>
            <OrderDetailsForm onNoteChange={(text) => setNote(text)}/>

            <Button className="w-full h-16 my-10" onPress={() => setShowDialog(true)}>
              <ButtonText size="xl">Pošalji porudžbinu</ButtonText>
            </Button>

          </ScrollView>
        </VStack>
      </KeyboardAware>
    </>
  )
}

export default PlaceOrderScreen;