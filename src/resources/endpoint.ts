// export const BASE_URL = 'http://localhost:8080/v1/'
export const BASE_URL = `${import.meta.env.PUBLIC_API_BASE_URL}/v1/`
// export const WS_BASE_URL = 'ws://localhost:8080/v1/'
export const WS_BASE_URL = `${import.meta.env.PUBLIC_API_BASE_URL}/v1/`
// export const DEFAULT_BASE_URL = 'http://localhost:8080/'
export const DEFAULT_BASE_URL = `${import.meta.env.PUBLIC_API_BASE_URL}/`

export const ENDPOINT = {
  login: `${BASE_URL}login`,
  generatePDF: `${DEFAULT_BASE_URL}generate-pdf`,
  averageRating: `${BASE_URL}reviews/average-rating`,

  // Review
  review: `${BASE_URL}review`,
  reviews: `${BASE_URL}reviews`,

  // Branch
  branch: `${BASE_URL}branch`,
  branches: `${BASE_URL}branches`,

  // User
  users: `${BASE_URL}user/get-users`,
  updateUsers: `${BASE_URL}user/update-users`,
  createUser: `${BASE_URL}user/create-user`,
  userProfile: `${BASE_URL}user/user-profile`,

  // ratelimit
  reviewLimit: `${BASE_URL}review/limit`,

  // ws
  wsReviews: `${WS_BASE_URL}reviews/m-ws`,

  // sse
  sseReviews: `${BASE_URL}reviews/sse`,
} as const
