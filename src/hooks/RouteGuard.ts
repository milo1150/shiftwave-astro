import { useUserStore } from '@src/store/store'
import { useEffect } from 'react'

export const useAdminRouteGuard = () => {
  const userProfile = useUserStore((state) => state.userProfile)
  useEffect(() => {
    if (userProfile?.role !== 'admin') {
      window.history.back()
    }
  }, [])
}
