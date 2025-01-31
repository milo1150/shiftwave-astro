import { transformBranchOptions } from './Branch'
import type {
  TransformUserDetail,
  UpdateUserPayload,
  UserDetail,
} from '@src/types/User'

export function transformUserDetail(user: UserDetail): TransformUserDetail {
  const result: TransformUserDetail = { ...user, branches: [] }
  result.branches = transformBranchOptions(user.branches)
  return result
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
