import KeyboardAware from "@/components/custom/KeyboardAware";
import { Heading } from "@/components/ui/heading";
import {Text} from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import {useCartStore} from "@/services/state/CartState";
import { ScrollView } from "react-native";
import {Button, ButtonText} from "@/components/ui/button";


function WriteOrderPage() {
  
  const items = useCartStore(state => state.cartItems);
  
  return (
    <>
      <KeyboardAware>
        <VStack className="px-4 flex-1">
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled">

            <Heading className="text-center mb-1.5 mt-4">Pregled artikala:</Heading>
            <OrderItemsOverview items={items}/>

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

export default WriteOrderPage;