import ApiService from "@/services/ApiService";
import {CartItem, Order} from "@/services/types";
import VariationsUtils from "@/services/models/product/VariationsUtils";


export default class OrderBackend {

  public static async GetOrders() {
    return await ApiService.get<Order[]>(`orders?includeCustomer=true&includeItems=true`);
  }


  public static async Place(customerId: number, cartItems: CartItem[], totalPrice: number, note?: string) {

    const items = cartItems.map((item) => {
      //const finalPrice = DiscountUtil.applyMany(item.price, item.discounts)
      const finalPrice = item.price;
      const itemNote = this.generateNote(item);
      return {
        productId: item.id,
        quantity: item.quantity,
        price: finalPrice,
        note: itemNote
      }
    })


    await ApiService.post("orders", {
      customerId: customerId,
      note: note,
      price: totalPrice,
      items: items
    })

  }

  private static generateNote(item: CartItem) {

    const variations = VariationsUtils.getVariations(item);
    if (variations.length == 0) {
      return null;
    }

    let counts: number[] = [];
    variations.forEach((variation) => counts.push(0));

    item.variation_list.forEach((item) => {
      const idx = variations.indexOf(item);
      if (idx >= 0) {
        counts[idx]++;
      }
    })

    let note = "Poručene opcije su: ";
    variations.forEach((variation, index) => {
      const count = counts[index];
      if (count == 0) return;
      note = `${note} ${variation} x${count},`
    })

    return note;
  }

}