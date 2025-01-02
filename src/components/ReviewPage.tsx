import type { AvailableLanguage } from '@src/i18n/i18n'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReviewComponent, {
  type ReviewComponentProps,
} from '@src/components/ReviewComponent'

const queryClient = new QueryClient()

export default function ReviewPage({ lang }: ReviewComponentProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReviewComponent lang={lang as AvailableLanguage} />
      </QueryClientProvider>
    </>
  )
}
