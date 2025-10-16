import {Customer} from "@/services/types";
import {Card} from "@/components/ui/card";
import {Heading} from "@/components/ui/heading";
import {HStack} from "@/components/ui/hstack";
import {Text} from "@/components/ui/text";
import {Ionicons} from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {Button, ButtonText} from "@/components/ui/button";
import {Alert, Linking} from "react-native";

interface CustomerCardProps {
  customer: Customer
}

function CustomerCard({customer}: CustomerCardProps) {

  const makeCall = async () => {
    const url = `tel:${customer.phone}`;

    // Check if device can handle the call URL
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Calling not supported on this device');
    }
  };
  
  return (
    <>
      <Card className="gap-2 mb-4">
        <Heading>{customer.name}</Heading>
        <HStack>
          <Ionicons name="location-sharp" size={24} color="black" />
          <Text>  {customer.address}</Text>
        </HStack>
        <HStack className="ml-1">
          <FontAwesome name="phone" size={24} color="black" />
          <Text>  {customer.phone}</Text>
          <Button className="ml-auto" onPress={() => {
            makeCall();
          }}>
            <ButtonText>Pozovi</ButtonText>
          </Button>
        </HStack>
        <HStack>
          <Text className={"align-middle"}>Popust: </Text>
          {customer.discount > 0 ? (
            <Text size={"lg"} bold>-{customer.discount}%</Text>
          ) : (
            <Text>/</Text>
          )}
        </HStack>
      </Card>
    </>
  )
}

export default CustomerCard;

