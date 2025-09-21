
export type Product = {
  id: number,
  name: string,
  price: number,
  variations?: string,
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

export type CartItem = ProductWithDiscounts & { 
  quantity: number,
  variation_list: string[],
}

export type ProductSectionData = {
  name: string,
  displayType: "grid" | "horizontal",
  products: ProductWithDiscounts[],
}

export type Customer = {
  id: number,
  name: string,
  phone: string,
  address: string,
  discount: number,
}

export type Category = {
  id: number,
  name: string,
  color: string,
}