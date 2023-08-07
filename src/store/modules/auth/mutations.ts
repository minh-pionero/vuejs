import { Cookies } from 'js-cookie'
import type { MutationTree } from 'vuex'

import type { AuthStateType } from './states'
import type { UserType } from '@/types/auth.type'

export enum AuthMutationTypes {
  SET_IS_LOADING = '[AUTH] SET_IS_LOADING',
  SET_AUTHENTICATION = '[AUTH] SET_AUTHENTICATION',
  SET_TOKEN = '[AUTH] SET_TOKEN',
  SET_USER = '[AUTH] SET_USER',
  LOGOUT = '[AUTH] LOGOUT'
}

export type AuthMutations<S = AuthStateType> = {
  [AuthMutationTypes.SET_IS_LOADING](state: S, payload: boolean): void
  [AuthMutationTypes.SET_AUTHENTICATION](state: S, payload: boolean): void
  [AuthMutationTypes.SET_TOKEN](state: S, payload: { token: string; remember?: boolean }): void
  [AuthMutationTypes.SET_USER](state: S, payload: UserType): void
  [AuthMutationTypes.LOGOUT](state: S): void
}

export const authMutations: MutationTree<AuthStateType> & AuthMutations = {
  [AuthMutationTypes.SET_IS_LOADING](state: AuthStateType, payload: boolean) {
    state.isLoading = payload
  },
  [AuthMutationTypes.SET_AUTHENTICATION](state: AuthStateType, payload: boolean) {
    state.authenticated = payload
  },
  [AuthMutationTypes.SET_TOKEN](
    state: AuthStateType,
    payload: { token: string; remember?: boolean }
  ) {
    state.token = payload.token
    localStorage.setItem('token', payload.token)
  },
  [AuthMutationTypes.SET_USER](state: AuthStateType, payload: UserType) {
    state.user = payload
  },
  [AuthMutationTypes.LOGOUT](state: AuthStateType) {
    state.user = null
    state.token = null
    localStorage.removeItem('token')
  }
}
