import {create} from 'zustand';
import {CartItem, ProductWithDiscounts} from "@/services/types";
import {createJSONStorage, persist} from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Q} from "@expo/html-elements";

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
  cartItems: CartItem[];
  addProductToCart: (product: ProductWithDiscounts, quantity: number) => void;
  clearCart: () => void;
  
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}


export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],

      addProductToCart: (product, quantity) => {
        
        const oldItems = get().cartItems;
        const oldItem = oldItems.find((item) => item.id === product.id);
        if (oldItem) {
          const newQuantity = oldItem.quantity + quantity;
          const newItems = oldItems.map((item) => {
            if (item.id === product.id) {
              return { ...item, quantity: newQuantity };
            }
            return item;
          });
          set({ cartItems: newItems });
          return;
        }
        
        const newItem: CartItem = {
          quantity: quantity,
          ...product,
        }
        
        const newItems = [...get().cartItems, newItem]
        
        set((state) => ({
          cartItems: newItems,
        }))
      },

      clearCart: () => set({ 
        cartItems: [],
      }),

      
      removeItem: (id) => {
        const newItems = get().cartItems.filter((item) => item.id !== id);
        set({ cartItems: newItems });
      },
      
      updateQuantity: (id, quantity) => {
        const newItems: CartItem[] = get().cartItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity };
          }
          return item;
        })
        set({ cartItems: newItems });
      }
    }),
    {
      name: "cart-storage", // storage key
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export function CartCountSum(items: CartItem[]) {
  return items.reduce((acc, item) => acc + item.quantity, 0);
}