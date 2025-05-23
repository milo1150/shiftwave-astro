import axios from 'axios'
import dayjs from 'dayjs'

import type {
  CreateUserPayload,
  LoginPayload,
  LoginResponse,
  UpdateUserPayload,
  UserDetail,
} from '@src/types/User'
import { ENDPOINT } from '@src/resources/endpoint'
import axiosInstanceWithAuth from '@src/middleware/axios'

export async function login(payload: LoginPayload) {
  const res = await axios.post<LoginResponse>(ENDPOINT.login, payload)

  if (res.status !== 200) {
    throw new Error('Failed to login')
  }

  return res.data
}

export function setJwtCookie(token: string) {
  const expire = dayjs().add(1, 'day').toString()
  const secure = true // Set to true for HTTPS
  document.cookie = `j=${token}; Path=/; Secure=${secure}; SameSite=Strict; expires=${expire}`
}

export async function fetchUsers(): Promise<UserDetail[]> {
  const res = await axiosInstanceWithAuth.get<UserDetail[]>(ENDPOINT.users)

  if (res.status !== 200) {
    throw new Error('Failed to fetch users')
  }

  return res.data
}

export async function updateUsers(payload: UpdateUserPayload[]) {
  const res = await axiosInstanceWithAuth.post(ENDPOINT.updateUsers, payload)

  if (res.status !== 200) {
    throw new Error('Failed to update users')
  }

  return res.data
}

export async function createUser(payload: CreateUserPayload) {
  const res = await axiosInstanceWithAuth.post(ENDPOINT.createUser, payload)

  if (res.status !== 201) {
    throw new Error('Failed to create users')
  }

  return res.status
}

export async function getUserProfile() {
  const res = await axiosInstanceWithAuth.get<UserDetail>(ENDPOINT.userProfile)

  if (res.status !== 200) {
    throw new Error('Failed to get user profile')
  }

  console.log(res.data)

  return res.data
}
