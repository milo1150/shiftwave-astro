import type { LANG } from '@src/i18n/i18n'
import axiosInstanceWithAuth from '@src/middleware/axios'
import { ENDPOINT } from '@src/resources/endpoint'
import type {
  AverageRatingResponse,
  FetchReviewsQueryParams,
  FetchReviewsResponse,
} from '@src/types/Review'
import type { QueryObserverResult, InfiniteData } from '@tanstack/react-query'
import axios from 'axios'
import { has } from 'lodash'

export async function fetchReviews(
  pageParam: FetchReviewsQueryParams
): Promise<FetchReviewsResponse> {
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

export async function fetchAverageRating(
  pageParam: FetchReviewsQueryParams
): Promise<AverageRatingResponse> {
  const res = await axiosInstanceWithAuth<AverageRatingResponse>({
    method: 'GET',
    url: ENDPOINT.averageRating,
    params: { ...pageParam },
  })

  if (res.status !== 200) {
    throw new Error('Failed to fetch average rating')
  }

  return res.data
}

export async function createReview(payload: {
  score: number
  branch: number
  remark: string
  lang: LANG
}): Promise<unknown> {
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

export function webSocketReviews(
  refetchReviews: () => Promise<
    QueryObserverResult<InfiniteData<FetchReviewsResponse, unknown>, Error>
  >,
  refetchAverageRating: () => Promise<
    QueryObserverResult<InfiniteData<AverageRatingResponse, unknown>, Error>
  >
) {
  const socket = new WebSocket(`${ENDPOINT.wsReviews}`)

  // Listen for messages from the server
  socket.onmessage = (event) => {
    const res = event.data
    const parseRes = JSON.parse(res)

    // Select only signal from Review Table
    if (typeof parseRes === 'object') {
      if (has(parseRes, 'update')) {
        refetchReviews()
        refetchAverageRating()
      }
    }
  }

  // Handle WebSocket close
  socket.onclose = () => {
    console.log('WebSocket connection closed')
  }

  return () => {
    socket.close()
  }
}

export function sseReviews(
  refetchReviews: () => Promise<
    QueryObserverResult<InfiniteData<FetchReviewsResponse, unknown>, Error>
  >,
  refetchAverageRating: () => Promise<
    QueryObserverResult<InfiniteData<AverageRatingResponse, unknown>, Error>
  >
) {
  const eventSource = new EventSource(ENDPOINT.sseReviews)

  // Track the status of refetching to avoid overlapping calls
  let isFetching = false

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)
    if (has(data, 'update') && (data as { update: boolean }).update) {
      if (!isFetching) {
        isFetching = true // Prevent overlapping refetches
        Promise.all([refetchReviews(), refetchAverageRating()])
          .catch((error) => {
            console.error('Error during refetch:', error)
          })
          .finally(() => {
            isFetching = false // Reset fetch status
          })
      }
    }
  }

  // Handle errors (optional logging or reconnection logic could go here)
  eventSource.onerror = (error) => {
    console.error('SSE Error:', error)
    eventSource.close()
  }

  // Cleanup function to close the SSE connection
  return () => {
    eventSource.close()
    console.log('SSE connection closed')
  }
}
