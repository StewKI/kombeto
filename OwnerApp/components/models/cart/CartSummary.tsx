import {CartItem} from "@/services/types";
import {useMemo} from "react";
import CartUtil from "@/services/models/cart/CartUtil";
import {Card} from "@/components/ui/card";
import {VStack} from "@/components/ui/vstack";
import {HStack} from "@/components/ui/hstack";
import {Text} from "@/components/ui/text";
import {Button, ButtonText} from "@/components/ui/button";
import {CartCountSum} from "@/services/state/CartState";
import {router} from "expo-router";

interface CartSummaryProps {
  cartItems: CartItem[];
}

function CartSummary({cartItems}: CartSummaryProps) {
  
  const price = useMemo(() => {
    return CartUtil.TotalSum(cartItems);
  }, [cartItems])
  
  return (
    <Card className="rounded-b-none rounded-t-3xl shadow-hard-5 pt-5">
      <VStack space="lg">
        <HStack className="justify-between">
          <HStack space="sm">
            <Text className="align-middle">
              Artikala: 
            </Text>
            <Text bold size="2xl">
              {CartCountSum(cartItems)}
            </Text>
          </HStack>
          <HStack space="sm">
            <Text className="align-middle">
              Sve ukupno: 
            </Text>
            <Text bold size="2xl">
              {price.toFixed(2)} RSD
            </Text>
          </HStack>
        </HStack>
        <Button className="h-14" onPress={() => router.push("/write_order")}>
          <ButtonText>
            Upiši
          </ButtonText>
        </Button>
      </VStack>
    </Card>
  )
}

export default CartSummary;