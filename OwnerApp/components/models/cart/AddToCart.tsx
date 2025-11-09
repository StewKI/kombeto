
import {Drawer, DrawerBackdrop, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader} from "@/components/ui/drawer"
import {useProductToAddStore} from "@/services/state/CartState";
import {Heading} from "@/components/ui/heading";
import React, {useMemo} from "react";
import {Product} from "@/services/types";
import {Image} from "@/components/ui/image";
import {VStack} from "@/components/ui/vstack";
import {HStack} from "@/components/ui/hstack";
//import DiscountsApplyList from "@/components/models/discount/DiscountsApplyList";
import XButton from "@/components/custom/XButton";
import FullAdder from "@/components/models/cart/CartAdder/FullAdder";
import VariationsUtils from "@/services/models/product/VariationsUtils";
import VariationAdder from "@/components/models/cart/CartAdder/VariationAdder";
import {Box} from "@/components/ui/box";

function AddToCart() {
  
  
  const product = useProductToAddStore(state => state.product);
  const resetProduct = useProductToAddStore(state => state.resetProduct);


  const productSafe = useMemo<Product>(() => {
    if (product) return product;
    return {
      id: 0,
      name: "",
      basePrice: 0,
      price: 0,
      imageUrl: "",
      variations: "",
      categories: [1],
      //discounts: [],
    }
  }, [product])
  
  
  const isWithVariations = useMemo(() => {
    return VariationsUtils.containsVariations(productSafe);
  }, [productSafe])


  return (
    
    
    
    <Drawer
      isOpen={product !== null}
      onClose={() => resetProduct()}
      anchor={"bottom"}
      size={"lg"}
    >
      
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


          {/*
          <HStack className="my-4">
            <DiscountsApplyList
              basePrice={productSafe.price}
              discounts={productSafe.discounts}
            />
          </HStack>
          */}
            
          {isWithVariations ? (
            <VariationAdder product={productSafe}/>
          ) : (
            <FullAdder product={productSafe}/>
          )}
          
          <Box className="h-4"/>
        </DrawerBody>
        <DrawerFooter>
          
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default AddToCart;