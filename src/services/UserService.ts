import axios from 'axios'

import type { LoginPayload, LoginResponse } from '@src/types/User'
import { ENDPOINT } from '@src/resources/endpoint'
import dayjs from 'dayjs'

export async function login(payload: LoginPayload) {
  const res = await axios.post<LoginResponse>(ENDPOINT.login, payload)

  if (res.status !== 200) {
    throw new Error('Failed to login')
  }

  return res.data
}

export function setJwtCookie(token: string) {
  const expire = dayjs().add(1, 'day').toString()
  // TODO: depend on ENV
  const secure = true // Set to true for HTTPS
  document.cookie = `j=${token}; Path=/; Secure=${secure}; SameSite=Strict; expires=${expire}`
}
