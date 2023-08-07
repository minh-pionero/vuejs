import { createStore, Store as VuexStore } from 'vuex'
import type { InjectionKey } from 'vue'

// import sharedMutations from 'vuex-shared-mutations'
// import persistedState from 'vuex-persistedstate'

import authModule from '@/store/modules/auth'
import mediaModule from '@/store/modules/media'

export type RootStateTypes = {
  isLoading: boolean
}

export type RootStore = VuexStore<RootStateTypes>

// define injection key
export const storeKey: InjectionKey<VuexStore<RootStateTypes>> = Symbol()

const store = createStore<RootStateTypes>({
  state() {
    return {
      isLoading: false
    }
  },
  getters: {
    isLoading: (state: RootStateTypes) => state.isLoading
  },
  mutations: {
    SET_IS_LOADING(state: RootStateTypes, payload: boolean) {
      state.isLoading = payload
    }
  },
  actions: {
    async setIsLoading({ commit }: { commit: Function }, status: boolean) {
      commit('SET_IS_LOADING', status)
    }
  },
  modules: {
    auth: authModule,
    media: mediaModule
  }
})

export default store
