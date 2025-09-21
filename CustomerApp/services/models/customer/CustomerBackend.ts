import {Customer} from "@/services/types";
import ApiService from "@/services/ApiService";


export default class CustomerBackend {
  
  static async GetProfile(): Promise<Customer> {
    return await ApiService.get<Customer>("logged_in/customer");
  }
  
}