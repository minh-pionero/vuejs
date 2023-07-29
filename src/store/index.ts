import { createStore } from 'vuex'
import sharedMutations from 'vuex-shared-mutations'
import persistedState from 'vuex-persistedstate'

import authModule from '@/store/modules/auth'

export default createStore({
  modules: {
    auth: authModule
  },
  plugins: [
    sharedMutations({
      predicate: []
    }),
    persistedState({
      storage: window.sessionStorage
    })
  ]
})
