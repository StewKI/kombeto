
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
  price: number,
  imageUrl: string,
  variations: string
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