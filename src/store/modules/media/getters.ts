import { MediaItemType } from '@/types/media.type'
import { MediaStateType } from './states'
import { GetterTree } from 'vuex'

export type MediaGetterTypes = {
  isLoading(state: MediaStateType): boolean
  directories(state: MediaStateType): MediaItemType[]
}

export const mediaGetters: GetterTree<MediaStateType, MediaStateType> & MediaGetterTypes = {
  isLoading: (state) => state.isLoading,
  directories: (state) => state.selectedDirectory?.children ?? state.directories
}
