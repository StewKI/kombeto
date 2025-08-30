import {Product, ProductWithDiscounts} from "@/services/types";
import {Box} from "@/components/ui/box";
import {Image} from "@/components/ui/image";
import DiscountBadge from "@/components/models/discount/DiscountBadge";
import {VStack} from "@/components/ui/vstack";
import {useEffect, useMemo} from "react";

interface ProductImageProps {
  product: ProductWithDiscounts
}

function ProductImageBadges({product}: ProductImageProps) {
  
  const sortedDiscounts = useMemo(() => {
    return product.discounts.sort((a, b) => b.discount - a.discount);
  }, [product])
  
  return (
    <Box className="relative">
      <ProductImage product={product}/>
      <Box className="absolute top-1 right-1">
        <VStack
          space={"xs"}
          className="items-end"
        >
          {sortedDiscounts.length >= 1 && (
            <DiscountBadge discount={sortedDiscounts[0]} size="lg"/>
          )}
          {sortedDiscounts.length >= 2 && (
            <DiscountBadge discount={sortedDiscounts[1]} size="md"/>
          )}
          {sortedDiscounts.length >= 3 && (
            <DiscountBadge discount={sortedDiscounts[2]} size="sm"/>
          )}
        </VStack>
      </Box>
    </Box>
  )
}

function ProductImage({product}: ProductImageProps) {
  return (
    <Image
      source={product.imageUrl}
      alt={product.name}
      size="none"
      borderRadius={5}
      className="aspect-[1/1] w-full max-w-[320px]"
    />
  )
}


export default ProductImageBadges
export {ProductImage}