
import {Drawer, DrawerBackdrop, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader} from "@/components/ui/drawer"
import {Text} from "@/components/ui/text";
import {useCartStore, useProductToAddStore} from "@/services/state/CartState";
import {Heading} from "@/components/ui/heading";
import React, {useMemo, useState} from "react";
import {Product, ProductWithDiscounts} from "@/services/types";
import {Image} from "@/components/ui/image";
import {VStack} from "@/components/ui/vstack";
import {QuantityInput} from "@/components/custom/QuantityInput";
import {Button, ButtonIcon, ButtonText} from "@/components/ui/button";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {HStack} from "@/components/ui/hstack";
import DiscountCard from "@/components/models/discount/DiscountCard";
import DiscountsApplyList from "@/components/models/discount/DiscountsApplyList";
import XButton from "@/components/custom/XButton";

function AddToCart() {
  
  const {product, resetProduct} = useProductToAddStore();
  
  const productSafe = useMemo<ProductWithDiscounts>(() => {
    if (product) return product;
    return {
      id: 0,
      name: "",
      price: 0,
      discounts: []
    }
  }, [product])
  
  const [quantity, setQuantity] = useState(1);

  const {addProductToCart} = useCartStore();
  
  function handleAdd() {
    addProductToCart(productSafe, quantity);
    resetProduct();
  }

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
            borderRadius={12}
            className="aspect-[1/1] w-full mb-3"
          />
          
          <HStack className="my-4">
            <DiscountsApplyList
              basePrice={productSafe.price}
              discounts={productSafe.discounts}
            />
          </HStack>

          <VStack className="w-full">
            <HStack className="mb-4">
              <Text className="align-middle">Količina:</Text>
              <QuantityInput size="lg" value={quantity} onChange={(n) => setQuantity(n)}/>
            </HStack>
            <Button
              className={"w-full h-[50px] mb-5 rounded-lg"}
              onPress={() => handleAdd()}
            >
              <ButtonText>Dodaj u korpu</ButtonText>
              <FontAwesome
                name="shopping-cart"
                size={20}
                color={"white"}
                className="ml-2"
              />
            </Button>
          </VStack>
        </DrawerBody>
        <DrawerFooter>
          
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default AddToCart;