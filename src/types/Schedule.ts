export const MIN_SHIFT_PER_SCHEDULE = 1
export const MAX_SHIFT_PER_SCHEDULE = 5

export type Shift = {
  description: string
  duration: number
}

export type ShiftList = Array<Shift>
