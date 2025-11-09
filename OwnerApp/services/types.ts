
export type Customer = {
  id: number,
  name: string,
  address: string,
  phone: string,
  discount: number
}

export type Product = {
  id: number,
  name: string,
  basePrice: number,
  price: number,
  imageUrl: string,
  variations: string
  categories: number[]
}

export type OrderItem = {
  id: number,
  productId: number,
  product: Product,
  quantity: number,
  price: number,
  note: string
}

export type Order = {
  id: number,
  customerId: number,
  customer: Customer,
  price: number,
  note: string,
  createdAt: string,
  status: number,
  items: OrderItem[]
}

export type Category = {
  id: number,
  name: string,
  color: string,
}

export type CartItem = Product & {
  quantity: number,
  variation_list: string[],
}

export type Discount = {
  id: number,
  name: string,
  discount: number,
  endDate?: string,
  color: string,
}