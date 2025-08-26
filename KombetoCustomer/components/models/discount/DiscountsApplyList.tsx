import {Discount} from "@/services/types";
import {VStack} from "@/components/ui/vstack";
import DiscountCard from "@/components/models/discount/DiscountCard";
import DiscountUtil from "@/services/models/discount/DiscountUtil";
import {useMemo} from "react";
import {HStack} from "@/components/ui/hstack";
import {Text} from "@/components/ui/text";

interface DiscountsApplyListProps {
  basePrice: number,
  discounts: Discount[]
}

function DiscountsApplyList({basePrice, discounts}: DiscountsApplyListProps) {
  
  const sortedDiscounts = useMemo(() => {
    return discounts.sort((a, b) => b.discount - a.discount);
  }, [discounts])
  
  const prices = useMemo(() => {
    return DiscountUtil.applySequentially(basePrice, sortedDiscounts);
  }, [basePrice, sortedDiscounts])
  
  return (
    <VStack space={"xs"}>
      {
        sortedDiscounts.map((discount, index) => (
          <HStack key={discount.id} space="md">
            <Text size="sm" className="align-middle" strikeThrough>RSD {prices[index].toFixed(2)}</Text>
            <DiscountCard discount={discount}/>
          </HStack>
        ))
      }
      <Text bold size="2xl" className="mt-4">
        RSD {prices[prices.length - 1].toFixed(2)}
      </Text>
    </VStack>
  )
}

export default DiscountsApplyList