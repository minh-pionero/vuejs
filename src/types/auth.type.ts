export type UserType = {
  id: number
  firstName: string
  lastName: string
  email: string
}

export type AuthType = {
  user: UserType | null
  token: string | null
}

export type LoginType = {
  email: string
  password: string
  isRemember?: boolean
}
