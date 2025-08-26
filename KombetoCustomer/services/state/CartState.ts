import {create} from 'zustand';
import {ProductWithDiscounts} from "@/services/types";
import {createJSONStorage, persist} from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ProductToAddStore = {
  product: ProductWithDiscounts | null;
  setProduct: (product: ProductWithDiscounts) => void;
  resetProduct: () => void;
}

export const useProductToAddStore = create<ProductToAddStore>((set) => ({
  product: null,
  setProduct: (product) => set({product}),
  resetProduct: () => set({ product: null }),
}))


type CartStore = {
  cartProducts: ProductWithDiscounts[];
  addProductToCart: (product: ProductWithDiscounts) => void;
  clearCart: () => void;
  cartCount: () => number;
}


export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartProducts: [],

      addProductToCart: (product) =>
        set((state) => ({
          cartProducts: [...state.cartProducts, product],
        })),

      clearCart: () => set({ cartProducts: [] }),

      cartCount: () => get().cartProducts.length,
    }),
    {
      name: "cart-storage", // storage key
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);