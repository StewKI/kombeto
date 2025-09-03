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
import {Pressable} from "@/components/ui/pressable";

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
    <Pressable
      onPress={() => {
        setProduct(product);
      }}
      style={{flexGrow: 1}}
    >
      {({ pressed }) => (
        <Card size="md" variant={pressed ? "outline" : "elevated"} style={{flexGrow: 1}}>
          <VStack space="md">

            <ProductImageBadges product={product}/>

            {isDiscounted ? (
              <VStack>
                <Text size="sm" strikeThrough>
                  {product.price.toFixed(2)} RSD
                </Text>
                <Heading size="lg">
                  {discountedPrice.toFixed(2)} RSD
                </Heading>
              </VStack>
            ) : (
              <Heading size="lg">
                {product.price.toFixed(2)} RSD
              </Heading>
            )}

            <Text size="md">{product.name}</Text>

          </VStack>
        </Card>
      )}
      
    </Pressable>
  );
}

export default ProductCard;