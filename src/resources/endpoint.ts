export const BASE_URL = 'http://localhost:8080/v1/'
export const WS_BASE_URL = 'ws://localhost:8080/v1/'
export const REAL_BASE_URL = 'http://localhost:8080/'

export const ENDPOINT = {
  login: `${BASE_URL}login`,
  generatePDF: `${REAL_BASE_URL}generate-pdf`,
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

  // ratelimit
  reviewLimit: `${BASE_URL}review/limit`,

  // ws
  wsReviews: `${WS_BASE_URL}reviews/m-ws`,

  // sse
  sseReviews: `${BASE_URL}reviews/sse`,
} as const
