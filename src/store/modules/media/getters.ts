import type { GetterTree } from 'vuex'
import type { MediaItemType } from '@/types/media.type'
import type { MediaStateType } from './states'
import type { RootStateTypes } from '@/store'

export type MediaGetterTypes = {
  isLoading(state: MediaStateType): boolean
  directories(state: MediaStateType): MediaItemType[]
}

export const mediaGetters: GetterTree<MediaStateType, RootStateTypes> & MediaGetterTypes = {
  isLoading: (state) => state.isLoading,
  directories: (state) => state.selectedDirectory?.children ?? state.directories
}
