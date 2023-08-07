import type { UserType } from '@/types/auth.type'

export type AuthStateType = {
  user: UserType | null
  token: string | null
  isLoading: boolean
  authenticated: boolean
}

export const authState: AuthStateType = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  authenticated: false
}
