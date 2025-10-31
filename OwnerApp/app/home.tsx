import {VStack} from "@/components/ui/vstack";
import {Button, ButtonText} from "@/components/ui/button";
import {router} from "expo-router";

function HomePage() {
  return (
    <VStack className="h-full justify-center gap-10 p-10">
      <Button className="h-16" onPress={() => {
        router.push("/(tabs1)/orders")
      }}>
        <ButtonText>Pravna lica</ButtonText>
      </Button>
      <Button className="h-16" onPress={() => {
        router.push("/(tabs)/orders")
      }}>
        <ButtonText>Privatna lica i Upravljanje proizvodima</ButtonText>
      </Button>
    </VStack>
  )
}

export default HomePage;