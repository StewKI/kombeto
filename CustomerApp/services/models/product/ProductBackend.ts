import ApiService from "@/services/ApiService";
import {ProductSectionData, ProductsPage} from "@/services/types";

type SortType = "relevance" | "price_asc" | "price_desc";

export default class ProductBackend {
  
  public static async Get(search?: string, page?: number, sortBy?: SortType, category?: number) {
    
    let queryParams: string[] = [];
    if (search) queryParams.push(`search=${search}`);
    if (page) queryParams.push(`page=${page}`);
    if (sortBy) queryParams.push(`sortBy=${sortBy}`);
    if (category) queryParams.push(`category=${category}`);
    
    const queryString = queryParams.join("&");

    return await ApiService.get<ProductsPage>(`products?${queryString}`)
  }
  
  public static async GetHome() : Promise<ProductSectionData[]> {
    return await ApiService.get<ProductSectionData[]>("products/home");
  }
  
}