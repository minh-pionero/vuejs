import client from '.'

export const getDirectoriesApi = () => client.get('/directory').then((res) => res.data)
