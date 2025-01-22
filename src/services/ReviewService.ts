import type { LANG } from '@src/i18n/i18n'
import axiosInstanceWithAuth from '@src/middleware/axios'
import { ENDPOINT } from '@src/resources/endpoint'
import type {
  AverageRatingResponse,
  FetchReviewsQueryParams,
  FetchReviewsResponse,
} from '@src/types/Review'
import axios from 'axios'

export const fetchReviews = async (
  pageParam: FetchReviewsQueryParams
): Promise<FetchReviewsResponse> => {
  const res = await axiosInstanceWithAuth<FetchReviewsResponse>({
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
  lang: LANG
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
