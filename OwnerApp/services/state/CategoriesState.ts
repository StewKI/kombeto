import {create} from "zustand";
import {Category} from "@/services/types";


type CategoriesStore = {
  allCategories: Category[],
  setAllCategories: (categories: Category[]) => void;
}

export const useCategoriesStore = create<CategoriesStore>((set) => ({
  allCategories: [],
  setAllCategories: (categories: Category[]) => {
    set({allCategories: categories})
  }
}))