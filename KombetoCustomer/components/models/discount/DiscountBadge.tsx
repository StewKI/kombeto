import {Discount} from "@/services/types";
import {Card} from "@/components/ui/card";
import {Text} from "@/components/ui/text";
import {use, useMemo} from "react";
import ColorUtil from "@/services/ui/ColorUtil";
import {Box} from "@/components/ui/box";

interface DiscountBadgeProps {
  discount: Discount
  size: "lg" | "md" | "sm"
}

function DiscountBadge({discount, size}: DiscountBadgeProps) {
  
  const sizePx = useMemo(() => {
    if (size === "lg") return 12;
    if (size === "md") return 10;
    return 8;
  }, [size])
  const sizeClassName = useMemo(() => `w-${sizePx} h-${sizePx}`, [sizePx]);
  
  const textSize = useMemo(() => {
    if (size === "lg") return "sm";
    if (size === "md") return "xs";
    return "2xs";
  })
  
  const textColor = useMemo(() => ColorUtil.getTextColor(discount.color), [discount])
  
  return (
    <Card
      size={"none"}
      className={`rounded-full shadow ${sizeClassName} items-center justify-center`}
      style={{backgroundColor: discount.color}}
    >
      <Text 
        style={{color: textColor}}
        className={`text-${textSize} font-bold`}
      >
        -{discount.discount}%
      </Text>
    </Card>
  )
}

export default DiscountBadge