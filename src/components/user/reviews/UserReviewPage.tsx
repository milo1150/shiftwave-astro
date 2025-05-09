import type { AvailableLanguage } from '@src/i18n/i18n'
import type { DefaultPageProps } from '@src/types/DefaultType'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UserReviewComponent from '@src/components/user/reviews/UserReviewComponent'
import type React from 'react'

const queryClient = new QueryClient()
const params = new URLSearchParams(window.location.search)
const branchIdParam = params.get('branch_id')
const branchId = branchIdParam || null

const ReviewPage: React.FC<DefaultPageProps> = ({ lang }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserReviewComponent
          lang={lang as AvailableLanguage}
          branchId={branchId}
        />
      </QueryClientProvider>
    </>
  )
}

export default ReviewPage
