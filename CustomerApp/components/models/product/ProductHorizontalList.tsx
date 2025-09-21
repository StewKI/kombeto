import {ProductWithDiscounts} from "@/services/types";
import {FlatList, useWindowDimensions} from "react-native";
import ProductCard from "@/components/models/product/ProductCard";
import {Box} from "@/components/ui/box";
import {useState} from "react";

interface ProductHorizontalListProps {
  products: ProductWithDiscounts[];
}


function ProductHorizontalList({products}: ProductHorizontalListProps) {
  const { width } = useWindowDimensions();
  const cardGap = 16;       // spacing between cards
  const sideInset = 20;     // padding at the edges
  const cardWidth = width * 0.5; // ~70% of screen width = one and a half cards visible

  const [maxHeight, setMaxHeight] = useState(0);

  const handleLayout = (height: number) => {
    setMaxHeight((prev) => (height > prev ? height : prev));
  };

  return (
    <FlatList
      className="mt-3"
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Box
          style={{
            justifyContent: "space-evenly",
            width: cardWidth,
            marginRight: cardGap,
            height: maxHeight || undefined, // lock height once we know tallest
          }}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            handleLayout(height);
          }}
        >
          <ProductCard product={item} />
        </Box>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: sideInset,
      }}
      snapToInterval={cardWidth + cardGap}
      decelerationRate="fast"
      snapToAlignment="start"
    />
  );
}

export default ProductHorizontalList;