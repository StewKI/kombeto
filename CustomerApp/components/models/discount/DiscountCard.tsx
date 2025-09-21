import {Discount} from "@/services/types";
import {useMemo} from "react";
import ColorUtil from "@/services/general/ColorUtil";
import {Card} from "@/components/ui/card";
import {HStack} from "@/components/ui/hstack";
import {Text} from "@/components/ui/text";
import {format} from "date-fns";
import {VStack} from "@/components/ui/vstack";

interface DiscountCardProps {
  discount: Discount
}

function DiscountCard ({discount}: DiscountCardProps) {
  
  const textColor = 
    useMemo(() => ColorUtil.getTextColor(discount.color), [discount]);
  
  const endDate = useMemo(() => {
    if (discount.endDate) {
      const date = new Date(discount.endDate)
      return format(date, "dd.MM.yyyy");
    }
    return null;
  }, [discount])
  
  return (
    <Card className="rounded-full" size={"sm"} variant={"filled"} style={{backgroundColor: discount.color}}>
      <HStack space="md">
        <Text size="xl" bold style={{color: textColor}} className="align-middle">
          -{discount.discount}%
        </Text>
        <VStack className="justify-center">
          <Text size="sm" style={{color: textColor}}>
            {discount.name}
          </Text>
          {endDate && (
            <Text size={"2xs"} style={{color: textColor}}>
              Do {endDate}
            </Text>
          )}
        </VStack>
      </HStack>
    </Card>
  )
}

export default DiscountCard;