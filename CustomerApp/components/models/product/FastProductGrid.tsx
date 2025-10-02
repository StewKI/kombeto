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
      removeClippedSubviews
      windowSize={5}               // only render ~2.5 screens above & below
      maxToRenderPerBatch={10}     // render at most 10 per batch
      updateCellsBatchingPeriod={50} // ms between render batches
      getItemLayout={(data, index) => ({
        length: 250, // approximate item height (optimizes scroll)
        offset: 250 * index,
        index,
      })}
    />
  );
}

export default FastProductGrid;
