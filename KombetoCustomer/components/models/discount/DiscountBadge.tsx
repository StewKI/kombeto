import {Discount} from "@/services/types";
import {Card} from "@/components/ui/card";
import {Text} from "@/components/ui/text";
import {use, useMemo} from "react";
import ColorUtil from "@/services/general/ColorUtil";
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
  
  const textSize = useMemo(() => {
    if (size === "lg") return "sm";
    if (size === "md") return "xs";
    return "2xs";
  }, [size])
  
  const textColor = useMemo(() => ColorUtil.getTextColor(discount.color), [discount])
  
  return (
    <Box
      className={`rounded-full shadow items-center justify-center`}
      style={{
        backgroundColor: discount.color,
        width: sizePx * 4,
        height: sizePx * 4,
      }}
    >
      <Text 
        style={{color: textColor}}
        size={textSize}
        className={`font-bold`}
      >
        -{discount.discount}%
      </Text>
    </Box>
  )
}

export default DiscountBadge