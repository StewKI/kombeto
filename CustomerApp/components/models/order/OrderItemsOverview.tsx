import {CartItem} from "@/services/types";
import {Box} from "@/components/ui/box";
import {ScrollView} from "react-native";
import {Card} from "@/components/ui/card";
import {HStack} from "@/components/ui/hstack";
import {Text} from "@/components/ui/text";
import DiscountUtil from "@/services/models/discount/DiscountUtil";
import {useMemo} from "react";


interface OrderItemsOverviewProps {
  items: CartItem[]
}

type CartItemWithTotal = CartItem & {totalPrice: number}

function OrderItemsOverview({items}: OrderItemsOverviewProps) {
  
  const getPrice = (item: CartItem) => {
    return DiscountUtil.applyMany(item.price, item.discounts) * item.quantity
  }
  
  const itemsWithTotal = useMemo<CartItemWithTotal[]>(() => {
    return items.map((item: CartItem) => {
      return {
        ...item,
        totalPrice: getPrice(item)
      }
    })
  }, [items])
  
  return (
    <Card className="border-2">
      <>
        {itemsWithTotal.map((item) => (
          <HStack
            key={item.id}  
            className="justify-between pb-1 flex-wrap"
            style={{
              borderBottomWidth: 0.5
          }}
          >
            <Text className="italic flex-grow">{item.name}</Text>
            <HStack>
              <Text>
                x{item.quantity} =
              </Text>
              <Text bold className="ml-2">
                {item.totalPrice.toFixed(2)} RSD
              </Text>
            </HStack>
          </HStack>
        ))}
      </>
    </Card>
  )
}


export default OrderItemsOverview;