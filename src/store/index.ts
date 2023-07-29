import { createStore } from 'vuex'
import sharedMutations from 'vuex-shared-mutations'
import persistedState from 'vuex-persistedstate'

import authModule from '@/store/modules/auth'

export default createStore({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    auth: authModule
  },
  plugins: [
    sharedMutations({
      predicate: ['SET_USER', 'SET_AUTHENTICATION', 'SET_THEME']
    }),
    persistedState({
      storage: window.sessionStorage
    })
  ]
})
