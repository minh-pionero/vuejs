export type BlogCategoryType = {
  id: number
  name: string
  thumbnail: string
  createdAt: string
  updatedAt: string
}

export type BlogType = {
  id: number
  categoryId: number
  title: string
  thumbnail: string
  shortDescription: string
  content: string
  isDraft: boolean
  isDelete: boolean
  createdAt: string
  updatedAt: string
}


