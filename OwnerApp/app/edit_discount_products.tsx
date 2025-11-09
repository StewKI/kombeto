import {useDiscountsStore} from "@/services/state/DiscountsState";
import {useProductsStore} from "@/services/state/ProductsState";
import {DiscountService} from "@/services/models/discount/DiscountService";
import {ProductBackend} from "@/services/models/product/ProductBackend";
import {Product} from "@/services/types";
import {useEffect, useMemo, useState, useCallback} from "react";
import {FullScreenLoader} from "@/components/custom/loader/FullScreenLoader";
import {VStack} from "@/components/ui/vstack";
import {Alert} from "@/components/ui/alert";
import {Text} from "@/components/ui/text";
import {Heading} from "@/components/ui/heading";
import {FlatList} from "react-native";
import {Card} from "@/components/ui/card";
import {HStack} from "@/components/ui/hstack";
import {Button, ButtonText} from "@/components/ui/button";
import {Image} from "@/components/ui/image";
import {SearchInput} from "@/components/models/product/inputs/SearchInput";


function EditDiscountProductsPage() {
  
  const {editDiscount} = useDiscountsStore();
  const {products: allProducts, setProducts} = useProductsStore();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [discountProducts, setDiscountProducts] = useState<Product[]>([]);
  const [filterString, setFilterString] = useState("");
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  
  const loadProducts = useCallback(async (discountId: number) => {
    setLoading(true);
    setError(null);
    try {
      // Always reload discount products, but only load all products if store is empty
      const [discountProds] = await Promise.all([
        DiscountService.getProducts(discountId),
        allProducts.length === 0 ? ProductBackend.GetProducts().then(prods => {
          setProducts(prods);
          return prods;
        }) : Promise.resolve()
      ]);
      
      setDiscountProducts(discountProds);
    }
    catch (e) {
      console.error(e);
      setError("Greska pri ucitavanju artikala");
    }
    finally {
      setLoading(false);
    }
  }, [allProducts.length, setProducts]);
  
  const availableProducts = useMemo(() => {
    const discountProductIds = new Set(discountProducts.map(p => p.id));
    let available = allProducts.filter(p => !discountProductIds.has(p.id));
    
    if (filterString !== "") {
      available = available.filter(product => {
        return product.name.toLowerCase().includes(filterString.toLowerCase());
      });
    }
    
    return available;
  }, [allProducts, discountProducts, filterString]);
  
  const handleAddProduct = useCallback(async (product: Product) => {
    if (editDiscount === undefined) return;
    
    setActionLoading(product.id);
    try {
      await DiscountService.addProduct(editDiscount.id, product.id);
      await loadProducts(editDiscount.id);
    }
    catch (e) {
      console.error(e);
      setError("Greska pri dodavanju artikla");
    }
    finally {
      setActionLoading(null);
    }
  }, [editDiscount?.id, loadProducts]);
  
  const handleRemoveProduct = useCallback(async (product: Product) => {
    if (editDiscount === undefined) return;
    
    setActionLoading(product.id);
    setError(null);
    try {
      await DiscountService.removeProduct(editDiscount.id, product.id);
      // Reload discount products to reflect the change
      const updatedDiscountProducts = await DiscountService.getProducts(editDiscount.id);
      setDiscountProducts(updatedDiscountProducts);
    }
    catch (e) {
      console.error(e);
      setError("Greska pri uklanjanju artikla");
    }
    finally {
      setActionLoading(null);
    }
  }, [editDiscount?.id]);
  
  useEffect(() => {
    if (editDiscount?.id) {
      loadProducts(editDiscount.id);
    }
  }, [editDiscount?.id, loadProducts]);
  
  const renderDiscountProduct = useCallback(({item}: {item: Product}) => (
    <Card className="mb-4">
      <HStack>
        <Image
          source={item.imageUrl}
          alt={item.name}
          size="none"
          resizeMode="contain"
          borderRadius={5}
          className="aspect-[1/1] h-32"
        />
        <VStack className="gap-1 flex-1">
          <Heading>{item.name}</Heading>
          <HStack className="gap-2">
            <Text>Cena:</Text>
            <Text bold>{item.price.toFixed(2)} RSD</Text>
          </HStack>
          <Button 
            className="mt-2"
            onPress={() => handleRemoveProduct(item)}
            isDisabled={actionLoading === item.id}
          >
            <ButtonText>
              {actionLoading === item.id ? "Uklanjanje..." : "Ukloni"}
            </ButtonText>
          </Button>
        </VStack>
      </HStack>
    </Card>
  ), [actionLoading, handleRemoveProduct]);
  
  const renderAvailableProduct = useCallback(({item}: {item: Product}) => (
    <Card className="mb-4">
      <HStack>
        <Image
          source={item.imageUrl}
          alt={item.name}
          size="none"
          resizeMode="contain"
          borderRadius={5}
          className="aspect-[1/1] h-32"
        />
        <VStack className="gap-1 flex-1">
          <Heading>{item.name}</Heading>
          <HStack className="gap-2">
            <Text>Cena:</Text>
            <Text bold>{item.price.toFixed(2)} RSD</Text>
          </HStack>
          <Button 
            className="mt-2"
            onPress={() => handleAddProduct(item)}
            isDisabled={actionLoading === item.id}
          >
            <ButtonText>
              {actionLoading === item.id ? "Dodavanje..." : "Dodaj"}
            </ButtonText>
          </Button>
        </VStack>
      </HStack>
    </Card>
  ), [actionLoading, handleAddProduct]);
  
  if (loading) {
    return <FullScreenLoader/>
  }
  
  if (editDiscount === undefined) {
    return (
      <VStack className={"gap-4 p-4"}>
        <Alert action="error" variant="solid">
          <Text>Popust nije izabran</Text>
        </Alert>
      </VStack>
    )
  }
  
  return (
    <VStack className={"gap-4 p-4"} style={{flex: 1}}>
      <Heading>Artikli u popustu: {editDiscount.name}</Heading>
      
      {error && (
        <Alert action="error" variant="solid">
          <Text>{error}</Text>
        </Alert>
      )}
      
      <VStack className="gap-4" style={{maxHeight: 300}}>
        <Heading size="md">Artikli u popustu ({discountProducts.length})</Heading>
        
        {discountProducts.length === 0 ? (
          <Text className="text-gray-500">Nema artikala u ovom popustu</Text>
        ) : (
          <FlatList
            data={discountProducts}
            keyExtractor={item => `discount-${item.id}`}
            renderItem={renderDiscountProduct}
            scrollEnabled={true}
            nestedScrollEnabled={true}
            removeClippedSubviews={true}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            windowSize={3}
            style={{maxHeight: 250}}
          />
        )}
      </VStack>
      
      <VStack className="gap-4" style={{flex: 1, minHeight: 200}}>
        <Heading size="md">Dostupni artikli za dodavanje ({availableProducts.length})</Heading>
        
        <SearchInput onSearch={(val) => setFilterString(val)}/>
        
        {availableProducts.length === 0 ? (
          <Text className="text-gray-500">
            {filterString ? "Nema rezultata pretrage" : "Svi artikli su već u popustu"}
          </Text>
        ) : (
          <FlatList
            data={availableProducts}
            keyExtractor={item => `available-${item.id}`}
            renderItem={renderAvailableProduct}
            contentContainerStyle={{paddingBottom: 200}}
            removeClippedSubviews={true}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            style={{flex: 1}}
          />
        )}
      </VStack>
    </VStack>
  )
}

export default EditDiscountProductsPage;

