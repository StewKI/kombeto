import {Order} from "@/services/types";
import {Card} from "@/components/ui/card";
import {useMemo} from "react";
import {format} from "date-fns";
import {Text} from "@/components/ui/text";
import {VStack} from "@/components/ui/vstack";
import {HStack} from "@/components/ui/hstack";
import {Heading} from "@/components/ui/heading";

interface OrderCardProps {
  order: Order
}

function OrderCard({order}: OrderCardProps) {
  
  const formattedDate = useMemo(() => {
    const date: Date = new Date(order.createdAt);
    return format(date, "dd.MM.yyyy - HH:mm");
  }, [order])
  
  return (
    <Card className="p-4 m-2">
      <VStack space="md">
        <HStack className="justify-between">
          <Heading>Broj porudžbine: {order.id}</Heading>
          <Text className="text-sm text-gray-500">{formattedDate}</Text>
        </HStack>

        <HStack className="gap-2">
          <Text className="font-semibold">Cena:</Text>
          <Text className="font-bold">{order.price.toFixed(2)} RSD</Text>
        </HStack>

        {order.note && (
          <VStack space="sm">
            <Text className="font-semibold">Napomena:</Text>
            <Text className="text-gray-600">{order.note}</Text>
          </VStack>
        )}

        <HStack className="gap-2">
          <Text className="font-semibold">Status:</Text>
          <Text className={`font-medium ${
            order.status === 0 ? 'text-orange-500' :
              order.status === 1 ? 'text-blue-600' : 'text-green-600'
          }`}>
            {order.status === 0 ? 'Na čekanju' :
              order.status === 1 ? 'Spremno' : 'Isporučeno'}
          </Text>
        </HStack>
      </VStack>
    </Card>
  )
}

export default OrderCard;