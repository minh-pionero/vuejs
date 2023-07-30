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
