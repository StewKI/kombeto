import {CartItem} from "@/services/types";
//import DiscountUtil from "@/services/models/discount/DiscountUtil";


export default class CartUtil {
  
  public static TotalSum(cartItems: CartItem[]) {
    
    let sum = 0;
    
    for (let i = 0; i<cartItems.length; i++) {
      
      const item = cartItems[i];
      let finalPrice = item.price;
      
      sum += finalPrice * item.quantity;
    }
    
    return sum;
  }
  
}