import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import {Discount} from "@/services/types";
import { useDiscountsStore } from "@/services/state/DiscountsState";
import { DiscountService } from "@/services/models/discount/DiscountService";
import { router } from "expo-router";

interface DiscountCardProps {
  discount: Discount;
}

export const DiscountCard: React.FC<DiscountCardProps> = ({ discount }) => {
  const setEditDiscount = useDiscountsStore(state => state.setEditDiscount);
  const updateDiscount = useDiscountsStore(state => state.updateDiscount);
  const [ending, setEnding] = useState(false);

  const isExpired = (): boolean => {
    if (!discount.endDate) return false;
    const endDate = new Date(discount.endDate);
    const now = new Date();
    return endDate < now;
  };

  const handleEndDiscount = async () => {
    setEnding(true);
    try {
      // Set endDate to yesterday
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayISO = yesterday.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      
      const updatedDiscount: Discount = {
        ...discount,
        endDate: yesterdayISO
      };
      
      await DiscountService.updateDiscount(updatedDiscount);
      updateDiscount(updatedDiscount);
    }
    catch (e) {
      console.error(e);
      // Could show an error message here if needed
    }
    finally {
      setEnding(false);
    }
  };

  return (
    <Card
      className="rounded-2xl shadow-md"
      style={{ borderLeftWidth: 6, borderLeftColor: discount.color }}
    >
      <HStack className="justify-between align-middle">
        <Text className="text-lg font-semibold">{discount.name}</Text>
        <Box
          className="rounded-full px-3 py-1"
          style={{ backgroundColor: discount.color }}
        >
          <Text className="text-white font-semibold">
            -{discount.discount}%
          </Text>
        </Box>
      </HStack>

      <VStack space="xs">
        {discount.endDate ? (
          <Text className="text-sm text-gray-500">
            Završava se:{" "}
            {new Date(discount.endDate).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Text>
        ) : (
          <Text className="text-sm text-gray-500 italic">Nema krajnjeg datuma</Text>
        )}
      </VStack>

      <HStack className="mt-2 gap-2 justify-end">
        <Button 
          onPress={() => {
            setEditDiscount(discount);
            router.push("/edit_discount_products" as any);
          }}
        >
          <ButtonText>Artikli</ButtonText>
        </Button>
        <Button 
          onPress={() => {
            setEditDiscount(discount);
            router.push("/edit_discount");
          }}
        >
          <ButtonText>Izmeni</ButtonText>
        </Button>
        {!isExpired() && (
          <Button 
            onPress={handleEndDiscount}
            isDisabled={ending}
            variant="outline"
          >
            <ButtonText>
              {ending ? "Završavanje..." : "Završi"}
            </ButtonText>
          </Button>
        )}
      </HStack>
    </Card>
  );
};
