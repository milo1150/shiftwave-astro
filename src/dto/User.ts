import type { DefaultOptionType } from 'antd/es/select'
import { transformBranchOptions } from './Branch'
import type { UserDetail } from '@src/types/User'
import _ from 'lodash'

export type TransformUserDetail = {
  user_uuid: string
  username: string
  active_status: boolean
  role: string
  branches: DefaultOptionType[]
}

export function transformUserDetail(user: UserDetail): TransformUserDetail {
  const result: TransformUserDetail = { ...user, branches: [] }
  result.branches = transformBranchOptions(user.branches)
  return result
}

export type UpdateUserPayload = {
  user_uuid: string
  active_status: boolean
  role: string
  branches: string[]
}

export function transformUpdateUserPayload(
  data: TransformUserDetail[]
): UpdateUserPayload[] {
  const payload: UpdateUserPayload[] = data.map((v) => {
    return {
      user_uuid: v.user_uuid,
      active_status: v.active_status,
      role: v.role,
      branches: v.branches.map((b) => b.value),
    } as UpdateUserPayload
  })
  return payload
}
