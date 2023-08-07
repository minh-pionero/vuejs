import { MutationTree } from 'vuex'
import { MediaStateType } from './states'
import { MediaItemType } from '@/types/media.type'

export enum MediaMutationTypes {
  SET_IS_LOADING = '[MEDIA] SET_IS_LOADING',
  SET_DIRECTORIES = '[MEDIA] SET_DIRECTORIES',
  SET_SELECTED_DIRECTORY = '[MEDIA] SET_SELECTED_DIRECTORY'
}

export type MediaMutations<S = MediaStateType> = {
  [MediaMutationTypes.SET_IS_LOADING](state: S, payload: boolean): void
  [MediaMutationTypes.SET_DIRECTORIES](state: S, payload: MediaItemType[]): void
  [MediaMutationTypes.SET_SELECTED_DIRECTORY](state: S, payload: MediaItemType): void
}

export const mediaMutations: MutationTree<MediaStateType> & MediaMutations = {
  [MediaMutationTypes.SET_IS_LOADING](state: MediaStateType, payload: boolean) {
    state.isLoading = payload
  },
  [MediaMutationTypes.SET_DIRECTORIES](state: MediaStateType, payload: MediaItemType[]) {
    state.directories = payload
  },
  [MediaMutationTypes.SET_SELECTED_DIRECTORY](state: MediaStateType, payload: MediaItemType) {
    state.selectedDirectory = payload
    // state.selectedPath = payload.selectedPath ?? 'uploads'
  }
}
