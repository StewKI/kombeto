import { View } from "react-native";
import { AnimatePresence, MotiView } from "moti";
import { useSearchTabStore } from "@/services/state/SearchTabState";
import ProductSearchView from "@/components/models/search/ProductSearchView";
import CategoryList from "@/components/models/category/CategoryList";
import { useRef, useEffect, useState } from "react";

function SearchTab() {
  const { selectedCategory, setSelectedCategory } = useSearchTabStore();

  // Track animation direction
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const prevSelected = useRef(selectedCategory);

  useEffect(() => {
    if (prevSelected.current && !selectedCategory) {
      // returning to category list
      setDirection("forward");
    } else if (!prevSelected.current && selectedCategory) {
      // going into product list
      setDirection("backward");
    }
    prevSelected.current = selectedCategory;
  }, [selectedCategory]);

  return (
    <View style={{ flex: 1, overflow: "hidden" }}>
      <AnimatePresence>
        {selectedCategory ? (
          <MotiView
            key="product"
            from={{
              translateX: direction === "forward" ? 300 : -300,
              opacity: 0,
            }}
            animate={{ translateX: 0, opacity: 1 }}
            exit={{
              translateX: direction === "forward" ? -300 : 300,
              opacity: 0,
            }}
            transition={{ type: "timing", duration: 200 }}
            style={{
              flex: 1,
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          >
            <ProductSearchView />
          </MotiView>
        ) : (
          <MotiView
            key="category"
            from={{
              translateX: direction === "backward" ? -300 : 300,
              opacity: 0,
            }}
            animate={{ translateX: 0, opacity: 1 }}
            exit={{
              translateX: direction === "backward" ? 300 : -300,
              opacity: 0,
            }}
            transition={{ type: "timing", duration: 200 }}
            style={{
              flex: 1,
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          >
            <CategoryList
              onSelect={(category) => {
                setSelectedCategory(category);
              }}
            />
          </MotiView>
        )}
      </AnimatePresence>
    </View>
  );
}

export default SearchTab;
