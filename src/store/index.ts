import { CommitOptions, createStore, DispatchOptions, Module, Store as VuexStore } from 'vuex'
import type { InjectionKey } from 'vue'

// import sharedMutations from 'vuex-shared-mutations'
// import persistedState from 'vuex-persistedstate'

import authModule from '@/store/modules/auth'
import mediaModule from '@/store/modules/media'

export type RootStateTypes = {}

export type RootStore = VuexStore<RootStateTypes>

// define injection key
export const storeKey: InjectionKey<VuexStore<RootStateTypes>> = Symbol()

const store = createStore<RootStateTypes>({
  modules: {
    auth: authModule,
    media: mediaModule
  },
  plugins: [
    // sharedMutations({
    //   predicate: []
    // }),
    // persistedState({
    //   storage: window.sessionStorage
    // })
  ]
})

export default store
