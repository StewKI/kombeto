import {useEffect, useMemo, useRef, useState} from "react";
import { Box } from "@/components/ui/box";
import InlineLoader from "@/components/custom/loader/InlineLoader";
import ProductGrid from "@/components/models/product/ProductGrid";
import { ProductWithDiscounts } from "@/services/types";
import { useSearchStore } from "@/services/state/SearchState";
import ProductBackend from "@/services/models/product/ProductBackend";
import FastProductGrid from "@/components/models/product/FastProductGrid";
import {Text} from "@/components/ui/text";
import {useSearchTabStore} from "@/services/state/SearchTabState";

function InfiniteProducts() {
  const [products, setProducts] = useState<ProductWithDiscounts[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);


  const loadingRef = useRef(false);

  const { search } = useSearchStore();
  const { selectedCategory } = useSearchTabStore();
  
  const category = useMemo(() => {
    if (selectedCategory === "all") return undefined;
    if (selectedCategory) return selectedCategory.id;
    return undefined;
  }, [selectedCategory])

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [search, category]);

  useEffect(() => {
    loadProducts();
  }, [page]);

  const loadProducts = async () => {

    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    setLoading(true);

    const data = await ProductBackend.Get(search, page, undefined, category);

    setProducts((prev) => [...prev, ...data.items]);

    const newHasMore = hasMoreData(data.totalItems, page, data.pageSize);
    setHasMore(newHasMore);

    setLoading(false);
    loadingRef.current = false;
  };

  return (
    <FastProductGrid
      products={products}
      loading={loading}
      hasMore={hasMore}
      onLoadMore={() => {
        if (hasMore && !loadingRef.current) {
          setPage((prev) => prev + 1);
        }
      }}
    />
  );
}

export default InfiniteProducts;


function hasMoreData(totalItems: number, page: number, pageSize: number): boolean {
  const totalPages = Math.ceil(totalItems / pageSize);
  return page < totalPages;
}