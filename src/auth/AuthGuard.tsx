import { deleteCookie, getCookieByKey } from '@src/utils/env'
import { loginUrl, reviewsUrl } from '@src/utils/location'
import _ from 'lodash'
import { useEffect, type ReactNode } from 'react'
import type React from 'react'

type GuardProps = {
  children: ReactNode
}

export const AdminGuard: React.FC<GuardProps> = ({ children }) => {
  const loginToken = getCookieByKey('j')

  useEffect(() => {
    if (!loginToken) {
      window.location.href = loginUrl()
    }
  }, [])

  if (!loginToken) {
    return null
  }

  return <>{children}</>
}

export const LoginGuard: React.FC<GuardProps> = ({ children }) => {
  const loginToken = getCookieByKey('j')

  useEffect(() => {
    if (loginToken) {
      window.location.href = reviewsUrl()
    }
  }, [])

  if (loginToken) {
    return null
  }

  return <>{children}</>
}

export function logout() {
  // Remove login token
  deleteCookie('j')

  // Redirect to login page
  window.location.href = loginUrl()
}
