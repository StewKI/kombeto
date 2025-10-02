
import {create} from "zustand";
import {ProductsPage, ProductWithDiscounts} from "@/services/types";


type SearchStore = {
  
  // query data
  search?: string;
  
  setSearchQuery: (search?: string) => void;
  
  showSearchBox: boolean;
  setShowSearchBox: (show: boolean) => void;
  
  
}

export const useSearchStore = create<SearchStore>((set) => ({
  
  search: undefined,

  setSearchQuery: (search?: string) => {
    set({search})
  },
  
  showSearchBox: false,
  
  setShowSearchBox: (show: boolean) => {
    set({showSearchBox: show})
  }

}));
