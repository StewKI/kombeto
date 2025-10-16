import {create} from "zustand";
import {Order} from "@/services/types";


type OrderStore = {
  order?: Order,
  setOrder: (order?: Order) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  order: undefined,
  setOrder: (order?: Order) => {
    set({order})
  }
}))