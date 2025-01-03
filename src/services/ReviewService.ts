import { ENDPOINT } from '@src/resources/endpoint'

export const fetchReview = async () => {
  const response = await fetch(ENDPOINT.review)
  if (!response.ok) {
    throw new Error('Failed to fetch reviews')
  }
  return response.json()
}

export const createReview = async (payload: {
  remark: string
  score: number
  branch: number
}) => {
  const response = await fetch(ENDPOINT.review, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    throw new Error('Failed to create review')
  }
  return response.json()
}
