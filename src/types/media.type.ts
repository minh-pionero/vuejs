export type MediaItemType = {
  key: string
  title: string
  path: string
  url?: string
  isImage?: boolean
  children?: MediaItemType[]
}

export enum FileType {
  FOLDER = '1',
  FILE = '2',
  IMAGE = '3'
}

export type MediaStateType = {
  isLoading: boolean
  directories: MediaItemType[]
  selectedDirectory?: MediaItemType
  selectedPath: string
}

export enum MediaMutation {
  SET_IS_LOADING = 'SET_IS_LOADING',
  SET_DIRECTORIES = 'SET_DIRECTORIES',
  SET_SELECTED_DIRECTORY = 'SET_SELECTED_DIRECTORY'
}
