import clientAPI from '.'
import type { AuthType, LoginType } from '@/types/auth'

export const loginApi = (payload: LoginType): Promise<AuthType> =>
  clientAPI()
    .post('/login', payload)
    .then((res) => res.data)
