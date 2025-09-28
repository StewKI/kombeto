import { ProductWithDiscounts } from "@/services/types";
import ProductCard from "@/components/models/product/ProductCard";
import {FlatList, View} from "react-native";
import {Box} from "@/components/ui/box";
import InlineLoader from "@/components/custom/loader/InlineLoader";

interface FastProductGridProps {
  products: ProductWithDiscounts[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

function FastProductGrid({ products, loading, hasMore, onLoadMore }: FastProductGridProps) {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={{ gap: 12, paddingHorizontal: 12 }}
      contentContainerStyle={{ 
        gap: 12, 
        paddingVertical: 12,
        paddingBottom: 220
      }}
      renderItem={({ item }) => (
        <Box style={{ flex: 1 }}>
          <ProductCard product={item} />
        </Box>
      )}
      onEndReached={() => {
        if (!loading && hasMore) {
          onLoadMore();
        }
      }}
      onEndReachedThreshold={0.7}
      initialNumToRender={20}
      ListFooterComponent={loading ? (
        <Box className="items-center py-4">
          {loading && <InlineLoader />}
        </Box>
      ) : null}
      showsVerticalScrollIndicator={false}
    />
  );
}

export default FastProductGrid;
