import { BASE_URL, ENDPOINT } from '@src/resources/endpoint'
import type {
  AverageRatingResponse,
  FetchReviewsQueryParams,
  FetchReviewsResponse,
} from '@src/types/Review'
import axios from 'axios'

export const fetchReviews = async (
  pageParam: FetchReviewsQueryParams
): Promise<FetchReviewsResponse> => {
  const res = await axios<FetchReviewsResponse>({
    method: 'GET',
    url: ENDPOINT.reviews,
    params: { ...pageParam },
  })

  if (res.status !== 200) {
    throw new Error('Failed to fetch reviews')
  }

  return res.data
}

export const fetchAverageRating = async (
  pageParam: FetchReviewsQueryParams
): Promise<AverageRatingResponse> => {
  const res = await axios<AverageRatingResponse>({
    method: 'GET',
    url: ENDPOINT.averageRating,
    params: { ...pageParam },
  })

  if (res.status !== 200) {
    throw new Error('Failed to fetch average rating')
  }

  return res.data
}

export const createReview = async (payload: {
  score: number
  branch: number
  remark: string
}): Promise<unknown> => {
  const res = await axios({
    method: 'POST',
    url: ENDPOINT.review,
    data: payload,
  })

  if (res.status !== 200) {
    throw new Error('Failed to create review')
  }

  return res.data
}

// TODO: use axios insteadof fetch
export const generatePDF = async (payload: {
  branchId: number
}): Promise<void> => {
  // Construct URL with query parameters
  const baseUrl = new URL(ENDPOINT.generatePDF)
  baseUrl.searchParams.append('branch_id', payload.branchId.toString())

  const response = await fetch(baseUrl.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/pdf',
    },
  })

  if (!response.ok) {
    throw new Error('Server error')
  }

  const blob = await response.blob()
  const url = window.URL.createObjectURL(blob) // Create a URL for the Blob
  console.log(blob, url)

  // Trigger a download
  const link = document.createElement('a')
  link.href = url
  link.download = 'GeneratedPDF.pdf' // File name for the download
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
