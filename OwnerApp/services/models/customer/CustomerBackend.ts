import ApiService from "@/services/ApiService";
import {Customer} from "@/services/types";

type Login = {
  code: string;
}

export default class CustomerBackend {
  
  public static async GetCustomers() {
    return await ApiService.get<Customer[]>(`customers`);
  }
  
  public static async CreateCustomer(name: string, address: string, phone: string, discount: number) {
    
    const res = await ApiService.post<Login>("customers", {
      name: name,
      address: address,
      phone: this.toInternationalSerbianNumber(phone),
      discount: discount
    })
    
    return res.code;
  }

  private static toInternationalSerbianNumber(phone: string): string {
    // Remove spaces, dashes, and parentheses for consistency
    const normalized = phone.replace(/[\s\-()]/g, "");

    if (normalized.startsWith("+381")) {
      return normalized; // already in correct format
    }

    if (normalized.startsWith("0")) {
      return "+381" + normalized.substring(1); // replace leading 0 with +381
    }

    // If neither, return original (invalid or non-standard)
    return normalized;
  }

}