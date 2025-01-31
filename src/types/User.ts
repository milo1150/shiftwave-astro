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
  role: string
  branches: UserBranch[]
}

export type UserBranch = {
  branch_uuid: string
  name: string
  is_active: boolean
}
