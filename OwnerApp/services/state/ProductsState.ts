import {create} from "zustand";
import {Product} from "@/services/types";


type ProductsStore = {
  products: Product[],
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  editProduct?: Product;
  setEditProduct: (product?: Product) => void;
}

export const useProductsStore = create<ProductsStore>((set) => ({
  products: [],
  setProducts: (products: Product[]) => {
    set({products})
  },
  addProduct: (product: Product) => {
    set((state) => ({
      products: [...state.products, product]
    }))
  },
  updateProduct: (product: Product) => {
    set((state) => ({
      products: state.products.map(p => p.id === product.id ? product : p)
    }))
  },
  editProduct: undefined,
  setEditProduct: (product?: Product) => {
    set({editProduct: product})
  }
}))