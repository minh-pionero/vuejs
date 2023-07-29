import client from '.'

export const getProductsApi = () => client.get('/products').then((res) => res.data)
