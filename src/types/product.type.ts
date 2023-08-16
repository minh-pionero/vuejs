export type ProductType = {
  id: number
  categoryId: number
  name: string
  price: number
  shortDescription?: string
  description?: string
  thumbnail?: string
  source?: string
  images?: string
  isVirtualProduct: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type ResponseProductType = {
  data: ProductType[]
  meta: {
    current_page: number
    from: number
    last_page: number
    per_page: number
    to: number
    total: number
  }
}
