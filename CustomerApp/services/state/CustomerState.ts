
import {create} from "zustand/index";
import {Customer} from "@/services/types";


type CustomerStore = {
  customer: Customer;
  setCustomer: (customer: Customer) => void;
}

export const useCustomerStore = create<CustomerStore>((set) => ({
  customer: {
    id: 0,
    name: "Nepoznat korisnik",
    phone: "/",
    address: "/",
    discount: 0
  },
  setCustomer: (customer) => set({customer}),
}))