
import {create} from "zustand";
import {ProductsPage, ProductWithDiscounts} from "@/services/types";


type SearchStore = {
  
  // query data
  search?: string;
  category?: number;
  
  setQueryData: (search?: string, category?: number) => void;
  
  
  // page data
  page: ProductsPage
  setPageData: (page: ProductsPage) => void;
  
}

export const useSearchStore = create<SearchStore>((set) => ({
  
  search: undefined,
  category: undefined,

  setQueryData: (search?: string, category?: number) => {
    set({search, category})
  },

  page: {
    totalItems: 0,
    page: 1,
    pageSize: 20,
    items: []
  },

  setPageData: (page: ProductsPage) => {
    set({page})
  }
  
}));
