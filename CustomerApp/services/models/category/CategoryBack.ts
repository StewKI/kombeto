import ApiService from "@/services/ApiService";
import {Category} from "@/services/types";


export default class CategoryBack {
  
  public static async loadAll() {
    return await ApiService.get<Category[]>("categories");
  }
  
}