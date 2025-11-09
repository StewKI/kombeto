import {create} from "zustand";
import {Discount} from "@/services/types";


type DiscountsStore = {
  allDiscounts: Discount[],
  setAllDiscounts: (discounts: Discount[]) => void,
  addDiscount: (discount: Discount) => void,
  updateDiscount: (discount: Discount) => void,
  removeDiscount: (discount: Discount) => void,
  editDiscount: Discount | undefined,
  setEditDiscount: (discount?: Discount) => void,
}

export const useDiscountsStore = create<DiscountsStore>((set) => ({
  allDiscounts: [],
  setAllDiscounts: (discounts: Discount[]) => {
    set({allDiscounts: discounts})
  },
  addDiscount: (discount: Discount) => {
    set((state) => ({
      allDiscounts: [...state.allDiscounts, discount]
    }))
  },
  updateDiscount: (discount: Discount) => {
    set((state) => ({
      allDiscounts: state.allDiscounts.map(d => d.id === discount.id ? discount : d)
    }))
  },
  removeDiscount: (discount: Discount) => {
    set((state) => ({
      allDiscounts: state.allDiscounts.filter(d => d.id !== discount.id)
    }))
  },
  editDiscount: undefined,
  setEditDiscount: (discount?: Discount) => {
    set({editDiscount: discount})
  }
}))