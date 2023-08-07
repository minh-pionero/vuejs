import { Module } from 'vuex'

import { MediaStateType, mediaState as state } from './states'
import { mediaGetters as getters } from './getters'
import { mediaMutations as mutations } from './mutations'
import { mediaAction as actions } from './actions'
import { RootStateTypes } from '@/store'

const mediaModule: Module<MediaStateType, RootStateTypes> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default mediaModule
