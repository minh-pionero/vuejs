import type { GetterTree } from 'vuex'
import type { MediaItemType } from '@/types/media.type'
import type { MediaStateType } from './states'
import type { RootStateTypes } from '@/store'

export enum EMediaGetters {
  IS_LOADING = 'isLoading',
  DIRECTORIES_REAL = 'directoriesReal',
  DIRECTORIES = 'directories',
  SELECTED_DIRECTORIES = 'selectedDirectories'
}

export type MediaGetterTypes = {
  [EMediaGetters.IS_LOADING](state: MediaStateType): boolean
  [EMediaGetters.DIRECTORIES_REAL](state: MediaStateType): MediaItemType[]
  [EMediaGetters.DIRECTORIES](state: MediaStateType): MediaItemType[]
  [EMediaGetters.SELECTED_DIRECTORIES](state: MediaStateType): MediaItemType | undefined
}

export const mediaGetters: GetterTree<MediaStateType, RootStateTypes> & MediaGetterTypes = {
  [EMediaGetters.IS_LOADING]: (state) => state.isLoading,
  [EMediaGetters.DIRECTORIES]: (state) => state.selectedDirectory?.children ?? state.directories,
  [EMediaGetters.SELECTED_DIRECTORIES]: (state) => state.selectedDirectory,
  [EMediaGetters.DIRECTORIES_REAL]: (state) => state.directories
}
