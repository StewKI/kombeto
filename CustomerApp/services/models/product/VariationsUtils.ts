import {Product} from "@/services/types";


export default class VariationsUtils {
  
  static containsVariations(product: Product) {
    if (product.variations && product.variations.length > 0) {
      return true;
    }
    return false;
  }
  
  static getVariations(product: Product) {
    if (this.containsVariations(product)) {
      return product.variations!.split("~");
    }
    return []; 
  }
  
}