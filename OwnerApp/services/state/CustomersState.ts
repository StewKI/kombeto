import {create} from "zustand";
import {Customer} from "@/services/types";


type CustomersStore = {
  customers: Customer[]
  setCustomers: (customers: Customer[]) => void;
  addCustomer: (customer: Customer) => void;
  updateCustomer: (customer: Customer) => void;
  editCustomer?: Customer;
  setEditCustomer: (customer?: Customer) => void;
}

export const useCustomersStore = create<CustomersStore>((set) => ({
  customers: [],
  setCustomers: (customers: Customer[]) => {
    set({customers})
  },
  addCustomer: (customer: Customer) => {
    set((state) => ({
      customers: [...state.customers, customer]
    }))
  },
  updateCustomer: (customer: Customer) => {
    set((state) => ({
      customers: state.customers.map(c => c.id === customer.id ? customer : c)
    }))
  },
  editCustomer: undefined,
  setEditCustomer: (customer?: Customer) => {
    set({editCustomer: customer})
  }
}))