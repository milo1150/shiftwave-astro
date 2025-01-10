export const BASE_URL = 'http://localhost:8080/v1/'

export const ENDPOINT = {
  review: `${BASE_URL}review`,
  reviews: `${BASE_URL}reviews`,
  averageRating: `${BASE_URL}reviews/average-rating`,
  generatePDF: `${BASE_URL}generate-pdf`,
} as const
