import type { DatePickerType } from '@src/components/datepicker/SwitchableDatepicker'
import type { LANG } from '@src/i18n/i18n'

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
  remark_en: string
  lang: LANG
}

export type AverageRatingResponse = {
  total_review: number
  average_rating: number
  five_star_count: number
  five_star_percent: number
  four_star_count: number
  four_star_percent: number
  three_star_count: number
  three_star_percent: number
  two_star_count: number
  two_star_percent: number
  one_star_count: number
  one_star_percent: number
}
