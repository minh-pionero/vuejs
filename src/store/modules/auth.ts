import Cookies from 'js-cookie'

import { type LoginType, type UserType } from '@/types/auth'
import { loginApi } from '@/services/auth.service'

interface IAuthState {
  user: UserType | null
  token: string | null
}

export default {
  namespace: true,
  state(): IAuthState {
    return {
      user: null,
      token: Cookies.get('token')
    }
  },
  getters: {
    user(state: IAuthState) {
      return state.user
    },
    token(state: IAuthState) {
      return state.token
    }
  },
  mutations: {
    SET_TOKEN(state: IAuthState, { token, remember }: { token: string; remember?: boolean }) {
      state.token = token
      Cookies.set('token', token, { expires: remember ? 365 : null })
    },
    SET_USER(state: IAuthState, payload: UserType) {
      state.user = payload
    },
    LOGOUT(state: IAuthState) {
      state.user = null
      state.token = null
      Cookies.remove('token')
      window.sessionStorage.clear()
    }
  },
  actions: {
    async login({ commit }: { commit: Function }, payload: LoginType) {
      try {
        const response = await loginApi(payload)
        commit('SET_USER', response.user)
        commit('SET_TOKEN', { token: response.token })
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }
}
