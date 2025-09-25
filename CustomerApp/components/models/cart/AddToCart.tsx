
import {Drawer, DrawerBackdrop, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader} from "@/components/ui/drawer"
import {useProductToAddStore} from "@/services/state/CartState";
import {Heading} from "@/components/ui/heading";
import React, {useMemo} from "react";
import {ProductWithDiscounts} from "@/services/types";
import {Image} from "@/components/ui/image";
import {VStack} from "@/components/ui/vstack";
import {HStack} from "@/components/ui/hstack";
import DiscountsApplyList from "@/components/models/discount/DiscountsApplyList";
import XButton from "@/components/custom/XButton";
import FullAdder from "@/components/models/cart/CartAdder/FullAdder";
import VariationsUtils from "@/services/models/product/VariationsUtils";
import VariationAdder from "@/components/models/cart/CartAdder/VariationAdder";

function AddToCart() {
  
  const {product, resetProduct} = useProductToAddStore();
  
  const productSafe = useMemo<ProductWithDiscounts>(() => {
    if (product) return product;
    return {
      id: 0,
      name: "",
      price: 0,
      discounts: [],
      variations: undefined
    }
  }, [product])
  
  
  const isWithVariations = useMemo(() => {
    return VariationsUtils.containsVariations(productSafe);
  }, [productSafe])


  return (
    <Drawer
      isOpen={product != null}
      onClose={() => resetProduct()}
      anchor={"bottom"}
      size={"lg"}
    >
      <DrawerBackdrop/>
      
      <DrawerContent>
        <DrawerHeader>
          <VStack className="w-full">
            <HStack className="w-full justify-between items-center">
              <Heading>{productSafe.name}</Heading>
              <XButton onClick={() => resetProduct()}/>
            </HStack>
          </VStack>
        </DrawerHeader>
        <DrawerBody>

          <Image
            source={productSafe.imageUrl}
            alt={productSafe.name}
            size="none"
            resizeMode="contain"
            borderRadius={12}
            className="aspect-[1/1] w-full mb-3"
          />
          
          <HStack className="my-4">
            <DiscountsApplyList
              basePrice={productSafe.price}
              discounts={productSafe.discounts}
            />
          </HStack>

          {isWithVariations ? (
            <VariationAdder product={productSafe}/>
          ) : (
            <FullAdder product={productSafe}/>
          )}
        </DrawerBody>
        <DrawerFooter>
          
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default AddToCart;