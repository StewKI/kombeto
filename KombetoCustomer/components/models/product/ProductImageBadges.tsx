import {Product, ProductWithDiscounts} from "@/services/types";
import {Box} from "@/components/ui/box";
import {Image} from "@/components/ui/image";
import DiscountBadge from "@/components/models/discount/DiscountBadge";
import {VStack} from "@/components/ui/vstack";
import {useEffect, useMemo} from "react";

interface ProductImageBadgesProps {
  product: ProductWithDiscounts
}

function ProductImageBadges({product}: ProductImageBadgesProps) {
  
  const sortedDiscounts = useMemo(() => {
    return product.discounts.sort((a, b) => b.discount - a.discount);
  }, [product])
  
  return (
    <Box className="relative">
      <Image
        source={product.imageUrl}
        alt={product.name}
        size="none"
        borderRadius={5}
        className="aspect-[1/1] w-full max-w-[320px]"
      />
      <Box className="absolute top-1 right-1">
        <VStack
          space={"xs"}
          className="items-end"
        >
          {product.discounts.length >= 1 && (
            <DiscountBadge discount={product.discounts[0]} size="lg"/>
          )}
          {product.discounts.length >= 2 && (
            <DiscountBadge discount={product.discounts[1]} size="md"/>
          )}
          {product.discounts.length >= 3 && (
            <DiscountBadge discount={product.discounts[2]} size="sm"/>
          )}
        </VStack>
      </Box>
    </Box>
  )
}

export default ProductImageBadges