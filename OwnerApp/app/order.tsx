import {useOrderStore} from "@/services/state/OrderState";
import {Text} from "@/components/ui/text";
import {VStack} from "@/components/ui/vstack";
import {HStack} from "@/components/ui/hstack";
import {ScrollView} from "react-native";
import {Heading} from "@/components/ui/heading";
import {Card} from "@/components/ui/card";
import {format} from "date-fns";
import StatusService from "@/services/models/status/StatusService";
import CustomerCard from "@/components/models/customer/CustomerCard";


function OrderPage() {
  
  const {order} = useOrderStore();
    
  if (order === undefined) return (
    <>Nema porudzbine</>
  )
  
  return (
    <ScrollView className="p-4">
      <VStack className="gap-4">
        <CustomerCard customer={order.customer}/>

        <Card>
          <VStack className="gap-2">
            <Heading>Detalji porudžbine</Heading>
            <HStack className="gap-2">
              <Text>Broj porudžbine:</Text>
              <Text bold>{order.id}</Text>
            </HStack>
            <HStack className="gap-2">
              <Text>Datum:</Text>
              <Text bold>{format(new Date(order.createdAt), "dd.MM.yyyy HH:mm")}</Text>
            </HStack>
            <HStack className="gap-2">
              <Text>Ukupno:</Text>
              <Text bold>{order.price.toFixed(2)} RSD</Text>
            </HStack>
            <HStack className="gap-2">
              <Text>Status:</Text>
              <Text bold>{StatusService.mapStatus(order.status)}</Text>
            </HStack>
          </VStack>
        </Card>

        <Card>
          <VStack className="gap-2">
            <Heading>Stavke</Heading>
            {order.items.map((item, index) => (
              <HStack key={index} className="justify-between border-t-2 pt-2">
                <Text>{item.product.name}</Text>
                <HStack className="gap-2">
                  <Text>{item.price.toFixed(2)} RSD x</Text>
                  <Text bold size={"xl"}>{item.quantity}</Text>
                </HStack>
              </HStack>
            ))}
          </VStack>
        </Card>
      </VStack>
    </ScrollView>
  )
}

export default OrderPage;