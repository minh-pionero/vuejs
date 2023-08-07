import { toast } from 'vue3-toastify'
import { ActionContext, ActionTree } from 'vuex'

import { MediaMutationTypes, MediaMutations } from './mutations'
import { MediaStateType } from './states'
import { ERROR_MESSAGE } from '@/constants/messages'
import { getDirectoriesApi } from '@/services/media.service'
import { MediaItemType } from '@/types/media.type'

export enum MediaActionTypes {
  GET_DIRECTORIES = 'GET_DIRECTORIES',
  HANDLE_SELECT_DIRECTORY = '[MEDIA] HANDLE_SELECT_DIRECTORY'
}

type AugmentedActionContext = {
  commit<K extends keyof MediaMutations>(
    key: K,
    payload: Parameters<MediaMutations[K]>[1]
  ): ReturnType<MediaMutations[K]>
} & Omit<ActionContext<MediaStateType, MediaStateType>, 'commit'>

export interface IMediaActions {
  [MediaActionTypes.GET_DIRECTORIES]({ commit }: AugmentedActionContext): Promise<void>
  [MediaActionTypes.HANDLE_SELECT_DIRECTORY](
    { commit }: AugmentedActionContext,
    payload: MediaItemType
  ): void
}

export const mediaAction: ActionTree<MediaStateType, MediaStateType> & IMediaActions = {
  async [MediaActionTypes.GET_DIRECTORIES]({ commit }) {
    try {
      commit(MediaMutationTypes.SET_IS_LOADING, true)
      const { data } = await getDirectoriesApi()
      commit(MediaMutationTypes.SET_DIRECTORIES, data)
    } catch (e) {
      toast.error(ERROR_MESSAGE.FETCHING)
    } finally {
      commit(MediaMutationTypes.SET_IS_LOADING, false)
    }
  },
  [MediaActionTypes.HANDLE_SELECT_DIRECTORY]({ commit }, payload) {
    commit(MediaMutationTypes.SET_SELECTED_DIRECTORY, payload)
  }
}
