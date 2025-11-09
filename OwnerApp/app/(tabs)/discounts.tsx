import {VStack} from "@/components/ui/vstack";
import {Button, ButtonText} from "@/components/ui/button";
import {router} from "expo-router";
import {Box} from "@/components/ui/box";
import {useDiscountsStore} from "@/services/state/DiscountsState";
import {ScrollView} from "react-native";
import {DiscountCard} from "@/components/models/discount/DiscountCard";
import {useEffect, useState, useMemo} from "react";
import {DiscountService} from "@/services/models/discount/DiscountService";
import {Discount} from "@/services/types";
import {HStack} from "@/components/ui/hstack";
import {Text} from "@/components/ui/text";


function DiscountsTab() {
  
  const {allDiscounts, setAllDiscounts} = useDiscountsStore();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showExpired, setShowExpired] = useState(false);
  
  const isExpired = (discount: Discount): boolean => {
    if (!discount.endDate) return false;
    const endDate = new Date(discount.endDate);
    const now = new Date();
    return endDate < now;
  };
  
  const filteredDiscounts = useMemo(() => {
    if (showExpired) {
      return allDiscounts.filter(discount => isExpired(discount));
    }
    return allDiscounts.filter(discount => !isExpired(discount));
  }, [allDiscounts, showExpired]);
  
  const load = async () => {
    setLoading(true);
    setError(null)
    try {
      const result = await DiscountService.getDiscounts();
      setAllDiscounts(result);
    }
    catch (e) {
      setError("Greska pri ucitavanju")
      console.error(e);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load()
  }, []);
  
  return (
    <>
      <VStack className="p-4 gap-4">
        <Box className="mb-4">
          <Button className="h-16" onPress={() => router.push("/new_discount")}>
            <ButtonText>Novi popust</ButtonText>
          </Button>
        </Box>

        <HStack className="justify-between items-center mb-2">
          <Text className="text-lg font-semibold">
            Popusti ({filteredDiscounts.length})
          </Text>
          <Button
            variant={showExpired ? "solid" : "outline"}
            size="sm"
            onPress={() => setShowExpired(!showExpired)}
          >
            <ButtonText>
              {showExpired ? "Sakrij istekle" : "Prikaži istekle"}
            </ButtonText>
          </Button>
        </HStack>

        <ScrollView>
          <VStack className="gap-4">
            {filteredDiscounts.length === 0 ? (
              <Text className="text-gray-500 text-center py-8">
                {showExpired ? "Nema isteklih popusta" : "Nema aktivnih popusta"}
              </Text>
            ) : (
              filteredDiscounts.map((discount) => (
                <DiscountCard key={discount.id} discount={discount}/>
              ))
            )}
          </VStack>
        </ScrollView>
        
      </VStack>
    </>
  )
}

export default DiscountsTab;
