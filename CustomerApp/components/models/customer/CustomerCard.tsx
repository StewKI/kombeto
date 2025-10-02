import {Customer} from "@/services/types";
import {Card} from "@/components/ui/card";
import {HStack} from "@/components/ui/hstack";
import {Ionicons} from "@expo/vector-icons";
import {Box} from "@/components/ui/box";
import {VStack} from "@/components/ui/vstack";
import {Text} from "@/components/ui/text";
import {Heading} from "@/components/ui/heading";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {useMemo} from "react";
import CustomerUtil from "@/services/models/customer/CustomerUtil";

interface CustomerCardProps {
  customer: Customer
}

function CustomerCard({customer}: CustomerCardProps) {
  
  const hasDiscount = useMemo(() => CustomerUtil.haveDiscount(customer), [customer]);
  
  return (
    <Card
      variant="elevated"
      className="m-5 align-middle justify-center shadow-2xl rounded-2xl"
    >
      <HStack>
        <Ionicons name="person-circle-outline" size={94} color="black" />
        <Box className="ml-4">
          <VStack space={"sm"}>
            <Heading>{customer.name}</Heading>
            <HStack>
              <Ionicons name="location-sharp" size={24} color="black" />
              <Text>  {customer.address}</Text>
            </HStack>
            <HStack className="ml-1">
              <FontAwesome name="phone" size={24} color="black" />
              <Text>  {customer.phone}</Text>
            </HStack>
            {hasDiscount && (
              <HStack>
                <Text className={"align-middle"}>Moj popust: </Text>
                <Text size={"lg"} bold>-{customer.discount}%</Text>
              </HStack>
            )}
          </VStack>
        </Box>
      </HStack>
    </Card>
  )
}

export default CustomerCard;