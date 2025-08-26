import {Product, ProductWithDiscounts} from "@/services/types";
import { Button, ButtonText } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"
import { Image } from "@/components/ui/image"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import {useProductToAddStore} from "@/services/state/CartState";
import {useMemo} from "react";
import DiscountUtil from "@/services/models/discount/DiscountUtil";
import ProductImageBadges from "@/components/models/product/ProductImageBadges";

interface ProductCardProps {
  product: ProductWithDiscounts;
}

function ProductCard({product}: ProductCardProps) {
  
  const {setProduct} = useProductToAddStore();
  
  const isDiscounted = useMemo(() => {
    return product.discounts.length > 0;
  }, [product])
  
  const discountedPrice = useMemo(() => {
    return DiscountUtil.applyMany(product.price, product.discounts);
  }, [product])

  return (
    <Card size="md" variant="elevated">
      <VStack space="md">
        
        <ProductImageBadges product={product}/>
        
        <Heading size="md">{product.name}</Heading>
        
        {isDiscounted ? (
          <VStack>
            <Text size="sm" strikeThrough>
              RSD {product.price.toFixed(2)}
            </Text>
            <Text size="lg" bold>
              RSD {discountedPrice.toFixed(2)}
            </Text>
          </VStack>
        ) : (
          <Text size="lg">
            RSD {product.price.toFixed(2)}
          </Text>
        )}
        
        <Button size="md" variant="solid"
          onPress={() => setProduct(product)}
        >
          <ButtonText>Pogledaj</ButtonText>
        </Button>
      </VStack>
    </Card>
  );
}

export default ProductCard;