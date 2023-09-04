import client from '.'

export const getProfileApi = () => client.get(`/user`).then((res) => res.data)

export const updateProfileApi = (payload: any) =>
  client.put(`/user/${payload.id}`, payload).then((res) => res.data)

export const updatePasswordApi = (id: number, password: string) =>
  client.put(`/update-password/${id}`, { password }).then((res) => res.data)
