import ApiService from "@/services/ApiService";
import {Product, ProductsPage} from "@/services/types";


export default class ProductBackend {
  
  public static async Get() {
    const response = await ApiService.get<ProductsPage>("products");
    return response.items
  }
  
}