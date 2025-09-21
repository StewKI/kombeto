import ApiService from "@/services/ApiService";
import {Product, ProductSectionData, ProductsPage} from "@/services/types";


export default class ProductBackend {
  
  public static async Get() {
    const response = await ApiService.get<ProductsPage>("products");
    return response.items
  }
  
  public static async GetHome() : Promise<ProductSectionData[]> {
    return await ApiService.get<ProductSectionData[]>("products/home");
  }
  
}