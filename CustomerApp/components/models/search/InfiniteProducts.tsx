import { useEffect, useState, useRef, useMemo } from "react";
import FastProductGrid from "@/components/models/product/FastProductGrid";
import { ProductWithDiscounts } from "@/services/types";
import { useSearchStore } from "@/services/state/SearchState";
import { useSearchTabStore } from "@/services/state/SearchTabState";
import ProductBackend from "@/services/models/product/ProductBackend";

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
  }, [selectedCategory]);

  // 🔹 Reset + first page load on search/category change
  useEffect(() => {
    const resetAndLoad = async () => {
      setProducts([]);
      setHasMore(true);
      setPage(1);
      await loadProducts(1);   // force page 1 load immediately
    };
    resetAndLoad();
  }, [search, category]);

  // 🔹 Load more when scrolling
  useEffect(() => {
    if (page > 1) {
      loadProducts(page);
    }
  }, [page]);

  const loadProducts = async (pageToLoad: number) => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    setLoading(true);

    const data = await ProductBackend.Get(search, pageToLoad, undefined, category);

    setProducts((prev) => [...prev, ...data.items]);
    setHasMore(hasMoreData(data.totalItems, pageToLoad, data.pageSize));

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
