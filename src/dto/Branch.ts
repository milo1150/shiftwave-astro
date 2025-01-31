import type { Branch } from '@src/types/Branch'
import type { DefaultOptionType } from 'antd/es/select'

export function transformBranchOptions(
  branches: Branch[]
): DefaultOptionType[] {
  return branches.map((branch) => {
    return {
      label: branch.name,
      value: branch.branch_uuid,
    } as DefaultOptionType
  })
}
