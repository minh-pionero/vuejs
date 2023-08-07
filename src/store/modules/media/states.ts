import type { MediaItemType } from '@/types/media.type'

export type MediaStateType = {
  isLoading: boolean
  directories: MediaItemType[]
  selectedDirectory?: MediaItemType
}

export const mediaState: MediaStateType = {
  isLoading: false,
  directories: []
}
