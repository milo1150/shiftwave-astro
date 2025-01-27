import { logout } from '@src/auth/AuthGuard'
import { getCookieByKey } from '@src/utils/env'
import { loginUrl } from '@src/utils/location'
import axios from 'axios'

// Create an Axios instance
const axiosInstanceWithAuth = axios.create()

// Add a request interceptor
axiosInstanceWithAuth.interceptors.request.use(
  (config) => {
    const token = getCookieByKey('j')

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    // Handle request error
    return Promise.reject(error)
  }
)

// Add a response interceptor (optional for handling errors)
axiosInstanceWithAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized: Redirecting to login.')

      // Force logout
      logout()
    }
    return Promise.reject(error)
  }
)

export default axiosInstanceWithAuth
