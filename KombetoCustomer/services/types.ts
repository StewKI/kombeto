
export type Product = {
  id: number,
  name: string,
  price: number,
  imageUrl?: string,
}

export type ProductsPage = {
  totalItems: number,
  page: number,
  pageSize: number,
  items: ProductWithDiscounts[],
}

export type ProductWithDiscounts = Product & { discounts: Discount[] }

export type Discount = {
  id: number,
  name: string,
  discount: number,
  endDate?: string,
  color: string,
}

export type CartItem = ProductWithDiscounts & { quantity: number }