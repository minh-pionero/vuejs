import client from '.'

export const getBlogCategoriesApi = () => client.get('/blog-categories').then((res) => res.data)

export const createBlogCategoriesApi = (payload: any) =>
  client.post(`/blog-categories`, payload).then((res) => res.data)

export const updateBlogCategoriesApi = (payload: any) =>
  client.put(`/blog-categories/${payload.id}`, payload).then((res) => res.data)

export const deleteBlogCategoriesApi = (id: number) =>
  client.delete(`/blog-categories/${id}`).then((res) => res.data)

export const getBlogsApi = () => client.get('/blogs').then((res) => res.data)

export const createBlogApi = (payload: any) =>
  client.post(`/blogs`, payload).then((res) => res.data)

export const updateBlogApi = (payload: any) =>
  client.put(`/blogs/${payload.id}`, payload).then((res) => res.data)

export const deleteBlogApi = (id: number) => client.delete(`/blogs/${id}`).then((res) => res.data)
