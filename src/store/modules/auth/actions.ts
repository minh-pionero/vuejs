import { toast } from 'vue3-toastify'
import type { ActionContext, ActionTree } from 'vuex'

import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '@/constants/messages'
import type { LoginType } from '@/types/auth.type'
import { ROUTER_NAME } from '@/constants/path'
import { loginApi } from '@/services/auth.service'
import router from '@/router'
import type { RootStateTypes } from '@/store'
import { AuthMutationTypes, type AuthMutations } from './mutations'
import type { AuthStateType } from './states'

export enum AuthActionTypes {
  LOGIN = '[AUTH] LOGIN'
}

type AugmentedActionContext = {
  commit<K extends keyof AuthMutations>(
    key: K,
    payload: Parameters<AuthMutations[K]>[1]
  ): ReturnType<AuthMutations[K]>
} & Omit<ActionContext<AuthStateType, RootStateTypes>, 'commit'>

export interface IAuthActions {
  [AuthActionTypes.LOGIN]({ commit }: AugmentedActionContext, payload: LoginType): Promise<void>
}

export const authAction: ActionTree<AuthStateType, RootStateTypes> & IAuthActions = {
  async [AuthActionTypes.LOGIN]({ commit }, payload) {
    try {
      commit(AuthMutationTypes.SET_IS_LOADING, true)
      const response = await loginApi(payload)
      router.push({ path: ROUTER_NAME.overview.path, replace: true })
      // commit('SET_USER', response.user)
      commit(AuthMutationTypes.SET_TOKEN, {
        token: response.access_token,
        remember: payload.isRemember
      })
      commit(AuthMutationTypes.SET_AUTHENTICATION, true)
      toast.success(SUCCESS_MESSAGE.LOGIN)
    } catch (error) {
      toast.error(ERROR_MESSAGE.LOGIN)
    } finally {
      commit(AuthMutationTypes.SET_IS_LOADING, false)
    }
  }
}
