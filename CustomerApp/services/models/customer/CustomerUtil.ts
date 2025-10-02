import {Customer} from "@/services/types";


export default class CustomerUtil {
  public static haveDiscount(customer: Customer) {
    return customer.discount !== undefined && customer.discount > 0;
  }
}