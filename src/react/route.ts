export const ROUTING = {
  reviews: 'reviews',
  setting: 'setting',
} as const
export type ShiftwaveRoute = keyof typeof ROUTING
