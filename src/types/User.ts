import type { DefaultOptionType } from 'antd/es/select'

export type UserRole = 'admin' | 'user'
export type LoginResponse = {
  token: string
}

export type LoginPayload = {
  u: string
  pwd: string
}

export type UserDetail = {
  user_uuid: string
  username: string
  active_status: boolean
  role: UserRole
  branches: UserBranch[]
}

export type UserBranch = {
  branch_uuid: string
  name: string
  is_active: boolean
}

export type TransformUserDetail = {
  user_uuid: string
  username: string
  active_status: boolean
  role: UserRole
  branches: DefaultOptionType[]
}

export type UpdateUserPayload = {
  user_uuid: string
  active_status: boolean
  role: string
  branches: string[]
}

export type CreateUserPayload = {
  u: string
  pwd: string
  role: UserRole
  branches: string[]
}
