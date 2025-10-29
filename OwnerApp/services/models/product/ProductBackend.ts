import {Product} from "@/services/types";
import ApiService from "@/services/ApiService";

type Res = {
  id: number;
}

export class ProductBackend 
{ 
  
  public static async GetProducts(): Promise<Product[]>
  {
    return await ApiService.get<Product[]>("products/all");
  }
  
  public static async CreateProduct(name: string, variations: string, price: number, imageUrl: string, categories: number[]): Promise<Product>
  {
    return await ApiService.post<Product>("products", {
      name: name,
      variations: variations,
      price: price,
      imageUrl: imageUrl,
      categories: categories
    });
  }
  
  public static async UpdateProduct(product: Product): Promise<Product>
  {
    return await ApiService.patch<Product>(`products/${product.id}`, {
      name: product.name,
      variations: product.variations,
      price: product.price,
      imageUrl: product.imageUrl,
      categories: product.categories
    });
  }
  
}