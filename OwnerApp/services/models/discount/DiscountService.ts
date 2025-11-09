import ApiService from "@/services/ApiService";
import {Discount, Product} from "@/services/types";


export class DiscountService {
  
  public static async getDiscounts() {
    return await ApiService.get<Discount[]>("discounts");
  }
  
  public static async createDiscount(name: string, discount: number, endDate: string | undefined, color: string): Promise<Discount> {
    
    const id = await ApiService.post<number>("discounts", {
      name: name,
      discount: discount,
      endDate: endDate,
      color: color,
      products: []
    });
    
    return {
      id: id,
      name: name,
      discount: discount,
      endDate: endDate,
      color: color,
    }
  }
  
  public static async updateDiscount(discount: Discount): Promise<void> {
    await ApiService.patch(`discounts/${discount.id}`, {
      name: discount.name,
      discount: discount.discount,
      endDate: discount.endDate,
      color: discount.color,
    })
  }
  
  public static async addProduct(discountId: number, productId: number) {
    await ApiService.post(`discounts/${discountId}/products/${productId}`, {})
  }
  
  public static async removeProduct(discountId: number, productId: number) {
    await ApiService.delete(`discounts/${discountId}/products/${productId}`)
  }
  
  public static async getProducts(discountId: number): Promise<Product[]> {
    return await ApiService.get<Product[]>(`discounts/${discountId}/products`);
  }
}