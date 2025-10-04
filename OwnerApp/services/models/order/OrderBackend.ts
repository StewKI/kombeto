import ApiService from "@/services/ApiService";
import {Order} from "@/services/types";


export default class OrderBackend {

  public static async GetOrders() {
    return await ApiService.get<Order[]>(`orders?includeCustomer=true&includeItems=true`);
  }
}