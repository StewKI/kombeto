import {Order} from "@/services/types";
import {Card} from "@/components/ui/card";
import {VStack} from "@/components/ui/vstack";
import {Heading} from "@/components/ui/heading";
import {Text} from "@/components/ui/text";
import {useMemo} from "react";
import {format} from "date-fns";
import {HStack} from "@/components/ui/hstack";

interface OrderCardProps {
  order: Order
}

function OrderCard({order}: OrderCardProps) {
  
  const formattedDate = useMemo(() => {
    const date = new Date(order.createdAt);
    return format(date, "dd.MM.yyyy HH:mm");
  }, [order])
  
  return (
    <Card className="mb-4">
      <VStack className="gap-1">
        <Heading>{order.customer.name}</Heading>
        <HStack className="gap-2">
          <Text>Broj porudžbine:</Text>
          <Text bold>{order.id}</Text>
        </HStack>
        <HStack className="gap-2">
          <Text>Poslata:</Text>
          <Text bold>{formattedDate}</Text>
        </HStack>
        <HStack className="gap-2">
          <Text>Ukupno:</Text>
          <Text bold>{order.price.toFixed(2)} RSD</Text>
        </HStack>
      </VStack>
    </Card>
  )
}

export default OrderCard