import {Center} from "@/components/ui/center";
import {VStack} from "@/components/ui/vstack";
import {Box} from "@/components/ui/box";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {Text} from "@/components/ui/text";
import {Button, ButtonText} from "@/components/ui/button";
import {router} from "expo-router";

function EmptyCart() {
  return (
    <Box className="flex-1 items-center justify-center">
      <VStack className="items-center" space="lg">

        <MaterialCommunityIcons name="cart-off" size={34} color="black" />
        <Text size="xl">Korpa je prazna.</Text>


      </VStack>
    </Box>
  )
}

export default EmptyCart;