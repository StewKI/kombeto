import ApiService from "@/services/ApiService";
import {Customer} from "@/services/types";


export default class CustomerBackend {
  
  public static async GetCustomers() {
    return await ApiService.get<Customer[]>(`customers`);
  }
}