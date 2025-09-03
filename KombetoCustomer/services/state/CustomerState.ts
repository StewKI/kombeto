
import {create} from "zustand/index";
import {Customer} from "@/services/types";


type CustomerStore = {
  customer: Customer;
  setCustomer: (customer: Customer) => void;
}

export const useCustomerStore = create<CustomerStore>((set) => ({
  customer: null!,
  setCustomer: (customer) => set({customer}),
}))