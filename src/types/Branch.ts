export type Branch = {
  name: string
  is_active: boolean
  branch_uuid: string
}

export type UpdateBranch = {
  is_active: boolean
}
