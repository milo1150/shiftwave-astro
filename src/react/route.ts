import WrappedAdminReviewPage from '@src/components/admin/reviews/AdminReviewPage'
import WrapperAdminSettingPage from '@src/components/admin/setting/AdminSettingPage'
import AdminLayout from '@src/layouts/AdminLayout'
import {
  RouterProvider,
  createRoute,
  createRootRoute,
  createRouter,
} from '@tanstack/react-router'

export const ROUTING = {
  reviews: 'reviews',
  setting: 'setting',
} as const
export type ShiftwaveRoute = keyof typeof ROUTING

// Root route
const rootRoute = createRootRoute({
  component: AdminLayout,
})

// Child routes
const reviewsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/en/d/reviews',
  component: WrappedAdminReviewPage,
})
const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/:lang/d/settings',
  component: WrapperAdminSettingPage,
})

// Combine routes
const routeTree = rootRoute.addChildren([reviewsRoute, settingsRoute])

// Create the router
export const router = createRouter({ routeTree })
