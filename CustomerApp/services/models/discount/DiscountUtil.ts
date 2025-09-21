import {Discount} from "@/services/types";

export default class DiscountUtil {
  public static applyOne = (price: number, discount: number) => {
    return price - (price * discount / 100);
  }
  
  public static applyMany = (price: number, discounts: Discount[]) => {
    let result = price;
    discounts.forEach(discount => {
      result = this.applyOne(result, discount.discount);
    });
    return result;
  }
  
  public static applySequentially = (price: number, discounts: Discount[]) => {
    let result: number[] = [price];
    discounts.forEach(discount => {
      result.push(this.applyOne(result[result.length - 1], discount.discount));
    });
    return result;
  }
}