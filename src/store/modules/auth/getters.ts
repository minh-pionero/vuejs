import type { GetterTree } from 'vuex'

import type { UserType } from '@/types/auth.type'
import type { AuthStateType } from './states'
import type { RootStateTypes } from '@/store'

export type MediaGetterTypes = {
  isLoading(state: AuthStateType): boolean
  user(state: AuthStateType): UserType | null
  token(state: AuthStateType): string | null
  authenticated(state: AuthStateType): boolean
}

export const authGetters: GetterTree<AuthStateType, RootStateTypes> & MediaGetterTypes = {
  isLoading: (state) => state.isLoading,
  user: (state: AuthStateType) => state.user,
  token: (state: AuthStateType) => state.token,
  authenticated: (state: AuthStateType) => state.authenticated
}
