export const BASE_URL = 'http://localhost:8080/'

export const ENDPOINT = {
  review: `${BASE_URL}review`,
  reviews: `${BASE_URL}reviews`,
  generatePDF: `${BASE_URL}generate-pdf`,
} as const
