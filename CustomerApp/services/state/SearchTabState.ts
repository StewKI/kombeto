
import {create} from "zustand"
import {Category} from "@/services/types";


type SearchTabStore = {
  selectedCategory?: Category | "all"
  setSelectedCategory: (category?: Category | "all") => void;
}

export const useSearchTabStore = create<SearchTabStore>((set) => ({
  selectedCategory: undefined,
  setSelectedCategory: (category?: Category | "all") => {
    set({selectedCategory: category})
  }

}))