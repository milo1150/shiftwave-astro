import type { DatePickerType } from '@src/components/datepicker/SwitchableDatepicker'

export type FetchReviewsQueryParams = {
  page?: number
  page_size?: number
  date_type?: DatePickerType
  start_date?: string
  end_date?: string
  month?: number
  year?: number
}

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
