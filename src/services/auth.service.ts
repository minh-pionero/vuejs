import client from '.'
import type { LoginType } from '@/types/auth.type'

export const loginApi = (payload: LoginType): Promise<{ access_token: string }> =>
  client.post('/login', payload).then((res) => res.data)
