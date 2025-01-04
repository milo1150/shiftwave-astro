import type { AvailableLanguage } from '@src/i18n/i18n'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReviewComponent, {
  type ReviewComponentProps,
} from '@src/components/user/ReviewComponent'
import { toNumber } from 'lodash'

const queryClient = new QueryClient()
const params = new URLSearchParams(window.location.search)
const branchIdParam = params.get('branch_id')
const branchId = branchIdParam ? toNumber(branchIdParam) : null

export default function ReviewPage({ lang }: { lang: AvailableLanguage }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReviewComponent lang={lang as AvailableLanguage} branchId={branchId} />
      </QueryClientProvider>
    </>
  )
}
