import type { Module } from 'vuex'

import type { RootStateTypes } from '@/store'
import { type AuthStateType, authState as state } from './states'
import { authGetters as getters } from './getters'
import { authMutations as mutations } from './mutations'
import { authAction as actions } from './actions'

const authModule: Module<AuthStateType, RootStateTypes> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default authModule
