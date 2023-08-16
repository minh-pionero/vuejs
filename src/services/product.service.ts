import client from '.'
import type { ProductType, ResponseProductType } from '@/types/product.type'

export const getProductsApi = (page: number): Promise<ResponseProductType> =>
  client.get(`/products?page=${page}`).then((res) => res.data)

export const createProductApi = (payload: any) =>
  client.post('/products', payload).then((res) => res.data)

export const updateProductApi = (payload: ProductType) =>
  client.put(`/products/${payload.id}`, payload).then((res) => res.data)

export const deleteProductApi = (id: number) =>
  client.delete(`/products/${id}`).then((res) => res.data)

export const getProductCategoriesApi = () =>
  client.get('/product-categories').then((res) => res.data)
