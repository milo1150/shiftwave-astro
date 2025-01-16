import { ENDPOINT } from '@src/resources/endpoint'
import type { Branch } from '@src/types/Branch'
import axios from 'axios'

export const fetchBranches = async (): Promise<Branch[]> => {
  const res = await axios<Branch[]>({
    method: 'GET',
    url: ENDPOINT.branches,
  })

  if (res.status !== 200) {
    throw new Error('Failed to fetch reviews')
  }

  return res.data
}

export const updateBrach = async (payload: {
  isActive: boolean
  branchId: number
}): Promise<void> => {
  const res = await axios({
    method: 'PATCH',
    url: `${ENDPOINT.branch}/${payload.branchId}`,
    data: { is_active: payload.isActive },
  })

  if (res.status !== 200) {
    throw new Error('Failed to update branch')
  }
}

export const createBrach = async (payload: {
  branchName: string
}): Promise<void> => {
  const res = await axios({
    method: 'POST',
    url: `${ENDPOINT.branch}`,
    data: { branch_name: payload.branchName },
  })

  if (res.status !== 200) {
    throw new Error('Failed to create branch')
  }
}
