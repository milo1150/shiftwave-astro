import { AdminGuard } from '@src/auth/AuthGuard'
import { useAntdStore } from '@src/store/store'
import type { DefaultPageProps } from '@src/types/DefaultType'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider, Divider, Flex, theme, Typography } from 'antd'
import { ScheduleTable } from './ScheduleTable'

const { Text } = Typography

const queryClient = new QueryClient()

const AdminSchedulePage: React.FC<DefaultPageProps> = () => {
  const { darkTheme } = useAntdStore((state) => state)
  return (
    <ConfigProvider
      theme={{
        algorithm: darkTheme ? theme.darkAlgorithm : [],
      }}
    >
      <Flex gap="middle" className="p-3" vertical>
        <Flex
          gap="small"
          className="w-full"
          justify="center"
          align="center"
          vertical
        >
          {/* Header */}
          <Flex gap="small" className="w-full">
            <Flex className="justify-between w-full">
              <Text className="text-3xl font-bold">Schedule</Text>
            </Flex>
          </Flex>
        </Flex>

        <Divider className="border-gray-300 mt-0 mb-2" type="horizontal" />

        <ScheduleTable />
      </Flex>
    </ConfigProvider>
  )
}

const WrappedAdminSchedulePage: React.FC<DefaultPageProps> = (props) => {
  return (
    <AdminGuard>
      <QueryClientProvider client={queryClient}>
        <AdminSchedulePage {...props} />
      </QueryClientProvider>
    </AdminGuard>
  )
}

export default WrappedAdminSchedulePage
