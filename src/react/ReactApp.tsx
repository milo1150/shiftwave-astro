import { RouterProvider } from '@tanstack/react-router'
import { router } from '@src/react/route'

export default function ReactApp() {
  return <RouterProvider router={router} />
}
