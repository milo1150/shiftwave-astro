import type { DefaultPageProps } from '@src/types/DefaultType'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type React from 'react'

const queryClient = new QueryClient()

const AdminSettingPage: React.FC<DefaultPageProps> = () => {
  return (
    <div>
      <p>admin - setting</p>
    </div>
  )
}

const WrappedAdminSettingPage: React.FC<DefaultPageProps> = (props) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AdminSettingPage {...props} />
      </QueryClientProvider>
    </>
  )
}

export default WrappedAdminSettingPage
