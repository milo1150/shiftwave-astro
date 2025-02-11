export const ROUTING = {
  reviews: 'reviews',
  setting: 'setting',
  schedule: 'schedule',
} as const
export type ShiftwaveRoute = keyof typeof ROUTING
