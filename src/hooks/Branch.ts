import { fetchBranches } from '@src/services/BranchService'
import { useSettingStore } from '@src/store/store'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export const useBranchQuery = () => {
  const { setBranches } = useSettingStore((state) => state)
  const { data: branches, refetch: refetchBranch } = useInfiniteQuery({
    queryKey: ['branches'],
    queryFn: fetchBranches,
    initialPageParam: '',
    getNextPageParam: () => undefined,
    retry: 2,
  })

  useEffect(() => {
    if (branches) {
      setBranches(branches.pages[0])
    }
  }, [branches])

  return { branches, refetchBranch }
}
