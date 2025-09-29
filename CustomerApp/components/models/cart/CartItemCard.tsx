import {CartItem} from "@/services/types";
import {Text} from "@/components/ui/text";
import {Card} from "@/components/ui/card";
import {HStack} from "@/components/ui/hstack";
import {VStack} from "@/components/ui/vstack";
import ProductImageBadges, {ProductImage} from "@/components/models/product/ProductImageBadges";
import {Box} from "@/components/ui/box";
import React, {useMemo} from "react";
import DiscountBadge from "@/components/models/discount/DiscountBadge";
import {Heading} from "@/components/ui/heading";
import DiscountUtil from "@/services/models/discount/DiscountUtil";
import XButton from "@/components/custom/XButton";
import {QuantityInput} from "@/components/custom/QuantityInput";
import {useCartStore, useProductToAddStore} from "@/services/state/CartState";
import FullView from "@/components/models/cart/QuantityView/FullView";
import VariationsUtils from "@/services/models/product/VariationsUtils";
import VariationAdder from "@/components/models/cart/CartAdder/VariationAdder";
import VariationView from "@/components/models/cart/QuantityView/VariationView";
import {Pressable} from "@/components/ui/pressable";

interface CartItemCardProps {
  item: CartItem
}

function CartItemCard({item}: CartItemCardProps) {
    
  const {removeItem} = useCartStore();
  const {setProduct} = useProductToAddStore();

  const sortedDiscounts = useMemo(() => {
    return item.discounts.sort((a, b) => b.discount - a.discount);
  }, [item])

  const isDiscounted = useMemo(() => {
    return item.discounts.length > 0;
  }, [item])

  const discountedPrice = useMemo(() => {
    return DiscountUtil.applyMany(item.price, item.discounts);
  }, [item])
  
  const totalPrice = useMemo(() => {
    return discountedPrice * item.quantity;
  }, [item])
  
  const containsVariations = useMemo(() => {
    return VariationsUtils.containsVariations(item);
  }, [item])

  return (
    <Card size={"sm"} className="border-2 rounded-2xl">
      
      <Box className="absolute top-2 right-2" style={{zIndex: 10}}>
        <XButton onClick={() => removeItem(item.id)}/>
      </Box>
      
      <HStack>
        <Pressable
          onPress={() => setProduct(item)}
        >
          {({pressed}) => (
            <Box className="w-32 h-32 mr-3" style={{opacity: pressed ? 0.5 : 1}}>
              <ProductImage product={item}/>
            </Box>
          )}
        </Pressable>
        
        <VStack space="sm">
          
          <Heading style={{fontSize: 14, maxWidth: 140}}>
            {item.name}
          </Heading>
          
          {sortedDiscounts.length > 0 && (
            <HStack space="xs">
              {sortedDiscounts.map((discount) => (
                <DiscountBadge key={discount.id} discount={discount} size={"sm"}/>
              ))}
            </HStack>
          )}
          
          <HStack space={"sm"} className="items-center">
            <Text size="sm">
              Komad:
            </Text>
            <Text size="sm" bold>
              {discountedPrice.toFixed(2)} RSD
            </Text>
            {isDiscounted && (
              <Text size="xs" strikeThrough>
                {item.price.toFixed(2)}
              </Text>
            )}
          </HStack>
        </VStack>
      </HStack>

      {containsVariations ? (
        <VariationView item={item} totalPrice={discountedPrice}/>
      ) : (
        <FullView item={item} totalPrice={totalPrice}/>
      )}
      
    </Card>
  )
}

export default CartItemCard