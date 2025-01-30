export const BASE_URL = 'http://localhost:8080/v1/'
export const WS_BASE_URL = 'ws://localhost:8080/v1/'
export const REAL_BASE_URL = 'http://localhost:8080/'

export const ENDPOINT = {
  review: `${BASE_URL}review`,
  reviews: `${BASE_URL}reviews`,
  branch: `${BASE_URL}branch`,
  branches: `${BASE_URL}branches`,
  averageRating: `${BASE_URL}reviews/average-rating`,
  generatePDF: `${REAL_BASE_URL}generate-pdf`,
  login: `${BASE_URL}login`,

  // ratelimit
  reviewLimit: `${BASE_URL}review/limit`,

  // ws
  wsReviews: `${WS_BASE_URL}reviews/m-ws`,

  // sse
  sseReviews: `${BASE_URL}reviews/sse`,
} as const
