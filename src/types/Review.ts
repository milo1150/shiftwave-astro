export type FetchReviewsResponse = {
  page: number
  page_size: number
  total_items: number
  items: Review[]
}

export type Review = {
  id: number
  created_at: string
  updated_at: string
  remark: string
  score: number
}
